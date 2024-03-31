const express = require('express')
const socket = require('socket.io')

const app = express()

app.use(express.static('public'))

const server = app.listen(3000,()=>{
    console.log('Running at http://localhost:3000')
})

const io = socket(server)

io.on('connection',(socket)=>{
    
    socket.on('chat',data => {
        io.sockets.emit('chat',data)
    })

    socket.on('typing',data=>{
        socket.broadcast.emit('typing',data)
    })

})
