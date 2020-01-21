const ey = require('ey')
const http = require('http')

const app = ey()

const thunderstruck = Buffer.from('Thunderstruck..!')
app.get('/', (req, res) => res.end(thunderstruck))

http.createServer(app).listen(5050)
