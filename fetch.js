const http = require('http');

http.get('http://localhost:3004/admin', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => { console.log("Request finished"); });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
