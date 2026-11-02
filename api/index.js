export default async function handler(req, res) {
  // السماح للتطبيق بالوصول
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id, token } = req.query;

  // كلمة السر الخاصة بك
  if (token !== "Ahmed20072007_TV") {
    return res.status(403).send("Unauthorized");
  }

  // الروابط الأصلية (أضفنا رابطين للتجربة)
  const streams = {
    "tod1": "https://castx.online/live/beinsports1/master.m3u8",
    "g1_sd": "http://hydraa.st:80/live/ghadax88/0569777788/406823.m3u8"
  };

  const targetUrl = streams[id];
  if (!targetUrl) return res.status(404).send("Stream Not Found");

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Range": req.headers.range || ""
      }
    });

    const contentType = response.headers.get('content-type');
    if (contentType) res.setHeader('Content-Type', contentType);

    const data = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(data));
  } catch (error) {
    res.status(500).send("Error fetching stream");
  }
}
