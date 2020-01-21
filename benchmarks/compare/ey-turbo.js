const ey = require('ey')
const Server = require('../../lib/server')

const app = ey()
const server = new Server()

const thunderstruck = Buffer.from('Thunderstruck..!')
app.get('/', (req, res) => res.end(thunderstruck))

server.on('request', app).listen(5050)
