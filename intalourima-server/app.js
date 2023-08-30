require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const router = require('./routes')
const cors = require('cors')

const SocketController = require('./controllers/SocketController')
const errorHandler = require('./middlewares/errorHandler')

const http = require('http')
const {Server} = require('socket.io')

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  SocketController(socket)
})

app.use('/uploads', express.static('uploads'))
app.use(cors())

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use('/', router)
// app.use((req, res) => res.status(404).send('Not Found'))
app.use(errorHandler)
server.listen(port, () => console.log(`Listening on port: ${port}!`))
