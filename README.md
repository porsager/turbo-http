# turbo-http

A low level http library for Node.js based on [turbo-net](https://github.com/mafintosh/turbo-net)

```
npm i turbo-http
```

[![build status](https://travis-ci.org/mafintosh/turbo-http.svg?branch=master)](https://travis-ci.org/mafintosh/turbo-http)

WIP, this module is already *really* fast but there are some HTTP features
missing and easy performance gains to be had. :D :D :D

On my laptop I can serve simple hello world payloads at around 100k requests/seconds compared to 10k requests/second using node core.

## Usage

``` js
const turbo = require('turbo-http')

const server = turbo.createServer(function (req, res) {
  res.setHeader('Content-Length', '11')
  res.write(Buffer.from('hello world'))
})

server.listen(8080)
```

## API

#### `server = turbo.createServer([onrequest])`

Create a new http server. Inherits from [the turbo-net tcp server](https://github.com/mafintosh/turbo-net#server--turbocreateserveroptions-onsocket)

#### `server.on('request', req, res)`

Emitted when a new http request is received.

#### `res.statusCode = code`

Set the http status

#### `res.setHeader(name, value)`

Set a http header

#### `res.write(buf, [length], [callback])`

Write a buffer. When the callback is called, the buffer
has been *completely* flushed to the underlying socket and is safe to
reuse for other purposes

#### `res.writev(buffers, [lengths], [callback])`

Write more that one buffer at once.

#### `res.end([buf], [length], [callback]`)

End the request. Only needed if you do not provide a `Content-Length`.

#### `req.url`

Request url

#### `req.method`

Request method

#### `req.socket`

Request [turbo-net](https://github.com/mafintosh/turbo-net) socket

#### `value = req.getHeader(name)`

Get a request header.

#### `headers = req.getAllHeaders()`

Get all request headers as a map.

#### `req.ondata(buffer, start, length)`

Called when there is data read. If you use the buffer outside of this function
you should copy it.

#### `req.onend()`

Called when the request is fully read.


## Benchmarks

Comparing `turbo-http` to other frameworks is like comparing oranges to apples.
`turbo-http` could be thought of as a replacement of Node's native [http](https://nodejs.org/api/http.html) module, while all available frameworks actually use it.

Benchmark it:
- `clone this repo`,
- `npm i`
- `npm run bench`

Benchmark averages are taken after five warm-up rounds.

&nbsp;        | Requests/s | Latency | Throughput/Mb
------------- | ---------- | ------- | --------------
turbo-http.js | 140633.6   | 0.65    | 10.65         
ey-turbo.js   | 139328     | 0.67    | 10.55         
uws.js        | 135769.6   | 0.68    | 9.75          
bare-node.js  | 85472      | 1.12    | 9.45          
polka.js      | 82617.61   | 1.15    | 9.25          
ey.js         | 81440      | 1.17    | 8.95          
rayo.js       | 79532.8    | 1.2     | 8.75          
fastify.js    | 73478.4    | 1.3     | 11.05         
express.js    | 68230.4    | 1.41    | 7.58          
hapi.js       | 45782.4    | 2.12    | 6.83          

> **Note:** Nevermind these numbers, this benchmark was run on a slow computer and the above table is for illustrative purposes only.

Optionally, you may also define your test's parameters:
```
$> npm run bench -- -u http://localhost:5050 -c 100 -p 10 -d 5
```
* `-u` (_url_) -Defaults to `http://localhost:5050`
* `-c` (_connections_) -Defaults to `100`
* `-p` (_pipelines_) -Defaults to `10`
* `-d` (_duration_) -Defaults to `5` (seconds)


## Acknowledgements

This project was kindly sponsored by [nearForm](http://nearform.com).

## License

MIT
