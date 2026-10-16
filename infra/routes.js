// CloudFront Function (viewer-request, runtime cloudfront-js-2.0).
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Raíz: elige idioma según Accept-Language (español solo si es el primero).
  if (uri === '/') {
    var header = request.headers['accept-language'];
    var lang = header && header.value.toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
    return redirect(302, '/' + lang + '/', request);
  }

  // "/en/cases/wms" -> "/en/cases/wms/" (rutas sin extensión)
  var last = uri.substring(uri.lastIndexOf('/') + 1);
  if (uri.charAt(uri.length - 1) !== '/' && last.indexOf('.') === -1) {
    return redirect(301, uri + '/', request);
  }

  // "/en/" -> "/en/index.html"
  if (uri.charAt(uri.length - 1) === '/') {
    request.uri = uri + 'index.html';
  }
  return request;
}

function redirect(status, location, request) {
  var qs = [];
  for (var key in request.querystring) {
    qs.push(key + '=' + request.querystring[key].value);
  }
  return {
    statusCode: status,
    statusDescription: status === 301 ? 'Moved Permanently' : 'Found',
    headers: {
      location: { value: location + (qs.length ? '?' + qs.join('&') : '') },
      'cache-control': { value: status === 301 ? 'public, max-age=3600' : 'private, max-age=0' },
      vary: { value: 'Accept-Language' },
    },
  };
}
