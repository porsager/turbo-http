const uws = require('uWebSockets.js')

uws.App().get('/', (res, req) =>
  res.end('Thunderstruck..!')
).listen(5050, () => {})
