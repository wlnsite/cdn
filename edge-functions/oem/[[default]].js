export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const dirList = url.pathname.split('/').filter(item => item !== "");

  // List of static file extensions to pass through
  const staticExtensions = [ '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp'];
    
  // Check if the path has a static file extension
  const hasExtension = staticExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext));
    
  // Pass through static assets to EdgeOne Pages platform
  if (hasExtension) {
    return fetch(request);
  }

  for(let i = dirList.length; i > 1; i--)
  {
    let path = dirList[0];
    for(let c = 1; c < i; c++)
    {
      path = path + '/' + dirList[c];
    }

    const png = await fetch(`https://${url.hostname}/${path}.png`);
    if(png.ok)
    {
      return new Response(png.body, { status: png.status, headers: png.headers });
    }

    const jpg = await fetch(`https://${url.hostname}/${path}.jpg`);
    if(jpg.ok)
    {
      return new Response(jpg.body, { status: jpg.status, headers: jpg.headers });
    }

    const ico = await fetch(`https://${url.hostname}/${path}.ico`);
    if(ico.ok)
    {
      return new Response(ico.body, { status: ico.status, headers: ico.headers });
    }

  }
  return new Response('Not found' , { status: 404 });
}