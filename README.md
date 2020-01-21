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

Benchmark averages are taken after one warm-up round.

&nbsp;        | Requests/s | Latency | Throughput/Mb
------------- | ---------- | ------- | --------------
ey-turbo.js   | 132108.8   | 0.72    | 9.85          
turbo-http.js | 130611.2   | 0.72    | 9.85          
bare-node.js  | 79340.8    | 1.21    | 8.75          
ey.js         | 77856      | 1.23    | 8.75          
polka.js      | 76243.2    | 1.25    | 8.55          
fastify.js    | 74156.8    | 1.29    | 11.15         
rayo.js       | 72684.8    | 1.32    | 8.18          
express.js    | 66809.61   | 1.44    | 7.38          
hapi.js       | 45532.8    | 2.13    | 6.83          

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
