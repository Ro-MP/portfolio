import { en } from './en';
import { es } from './es';
import { Lang, SiteContent } from './types';

export const CONTENTS: Record<Lang, SiteContent> = { en, es };

export { CASE_SLUGS } from './types';
export type { CaseSlug, Lang, SiteContent } from './types';
