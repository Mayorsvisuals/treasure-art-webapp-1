const https = require('https');
const urls = [
  "https://picsum.photos/seed/151336/800/800",
  "https://picsum.photos/seed/153563/800/800",
  "https://picsum.photos/seed/154093/800/800",
  "https://picsum.photos/seed/162874/800/800",
  "https://picsum.photos/seed/160581/800/800",
  "https://picsum.photos/seed/162064/800/800",
  "https://picsum.photos/seed/151556/800/800",
  "https://picsum.photos/seed/160021/800/800",
  "https://picsum.photos/seed/160060/800/800",
  "https://picsum.photos/seed/154420/800/800",
  "https://picsum.photos/seed/158256/800/800"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(res.statusCode, url);
  });
});
