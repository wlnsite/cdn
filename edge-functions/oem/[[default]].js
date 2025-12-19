export default function onRequest(event) {
  const { request } = event;
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


  return new Response('Not found: ' + url.pathname.toLowerCase() , { status: 404 });
  for(let i = dirList.length; i > 1; i--)
  {
    let path = dirList[0];
    for(let c = 1; c < i; c++)
    {
      path = path + '/' + dirList[c];
    }
    const resPNG = await fetch(`https://${url.hostname}/${path}.png`);
    if(resPNG.headers.get('content-type') == 'image/png')
    {
      return resPNG;
    }
    const resJPG = await fetch(`https://${url.hostname}/${path}.jpg`);
    if(resJPG.headers.get('content-type') == 'image/jpeg')
    {
      return resJPG;
    }
  }
  return new Response('Not found' , { status: 404 });
}