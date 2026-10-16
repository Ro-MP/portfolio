import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = [
  '/en/',
  '/es/',
  '/en/cases/demand-forecasting/',
  '/es/cases/wms/',
  '/en/cases/tms/',
  '/es/cases/automations/',
];

test.describe('contenido y navegación', () => {
  test('la home en inglés tiene un h1, idioma correcto y los CTAs', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('link', { name: 'View case studies' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get in touch' }).first()).toBeVisible();
  });

  test('no hay lenguaje comercial ni nombres de cliente en el DOM', async ({ page }) => {
    for (const url of PAGES) {
      await page.goto(url);
      const text = (await page.locator('body').innerText()).toLowerCase();
      for (const banned of ['farmagana', 'redsinergia', 'freelance', 'work with me', 'cloud architect']) {
        expect(text, `${url} contiene "${banned}"`).not.toContain(banned);
      }
    }
  });

  test('el selector de idioma conserva la página y marca el idioma activo', async ({ page }) => {
    await page.goto('/en/cases/wms/');
    const switcher = page.getByRole('navigation', { name: 'Language' });
    await expect(switcher.getByRole('link', { name: 'English' })).toHaveAttribute('aria-current', 'true');
    await switcher.getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL(/\/es\/cases\/wms\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('h1')).toContainText('WMS');
    await expect(page.getByRole('navigation', { name: 'Idioma' })).toBeVisible();
  });

  test('la raíz redirige según el idioma del navegador', async ({ browser }) => {
    for (const [locale, expected] of [['es-MX', '/es'], ['en-US', '/en']] as const) {
      const context = await browser.newContext({ locale });
      const page = await context.newPage();
      await page.goto('/');
      await expect(page).toHaveURL(new RegExp(`${expected}/?$`));
      await context.close();
    }
  });

  test('cada etiqueta PENDIENTE es visible y los casos se enlazan entre sí', async ({ page }) => {
    await page.goto('/en/cases/demand-forecasting/');
    await expect(page.locator('app-pending').first()).toBeVisible();
    await page.getByRole('link', { name: /Next case study/ }).click();
    await expect(page).toHaveURL(/\/en\/cases\/wms\/?$/);
  });

  test('el enlace "All case studies" vuelve a la sección de casos', async ({ page }) => {
    await page.goto('/en/cases/wms/');
    await page.getByRole('link', { name: /All case studies/ }).click();
    await expect(page).toHaveURL(/\/en\/?#cases$/);
  });
});

test.describe('accesibilidad', () => {
  for (const url of PAGES) {
    test(`axe: sin violaciones serias en ${url}`, async ({ page }) => {
      // Sin movimiento: todo el contenido está visible y sin transiciones a medias que falseen el contraste.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }

  test('el primer foco es el enlace para saltar al contenido', async ({ page }) => {
    await page.goto('/en/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  });

  test('con "reducir movimiento" todo el contenido queda visible', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll('.reveal')].filter((e) => getComputedStyle(e).opacity === '0').length,
    );
    expect(hidden).toBe(0);
    await context.close();
  });
});

test.describe('móvil', () => {
  test('sin scroll horizontal y con menú que abre y cierra', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'solo en el proyecto móvil');
    for (const url of PAGES) {
      await page.goto(url);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${url} desborda ${overflow}px`).toBeLessThanOrEqual(0);
    }
    await page.goto('/en/');
    const burger = page.getByRole('button', { name: 'Open menu' });
    await burger.click();
    await expect(page.getByRole('link', { name: 'Contact' }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
  });

  test('los objetivos táctiles del header miden al menos 44 px', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'solo en el proyecto móvil');
    await page.goto('/en/');
    const boxes = await page
      .locator('app-header button, app-lang-switcher a')
      .evaluateAll((els) => els.map((e) => e.getBoundingClientRect()).map((r) => ({ w: r.width, h: r.height })));
    for (const b of boxes) {
      expect(b.h).toBeGreaterThanOrEqual(44);
      expect(b.w).toBeGreaterThanOrEqual(44);
    }
  });
});
