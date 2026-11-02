export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  // كلمة السر
  if (token !== "Ahmed20072007_TV") {
    return new Response("Unauthorized", { status: 403 });
  }

  // الروابط (للتجربة)
  const streams = {
    "tod1": "https://castx.online/live/beinsports1/master.m3u8",
    "g1_sd": "http://hydraa.st:80/live/ghadax88/0569777788/406823.m3u8"
  };

  const targetUrl = streams[id];
  if (!targetUrl) return new Response("Stream Not Found", { status: 404 });

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Range": req.headers.get("range") || ""
      }
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET, OPTIONS");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
