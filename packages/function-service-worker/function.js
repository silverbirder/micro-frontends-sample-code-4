const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  switch(pathname) {
    case '/public/bundle.js':
      var raw = fs.createReadStream( './public/bundle.js' );
      res.writeHead(200);
      raw.pipe(res);
  }
})

server.listen(9010, () => {
  console.log('Function Server started at 9010')
})
