require('dotenv').config({path: '../.env'})
const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('socket.io')

const userController = require('./controllers/user');

app.use(cors());
app.use(bodyParser.json());

const port = process.env.SERVER_PORT ||3000;

app.use(userController);

const server= app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// Chatroom
const io = socket(server, {
  cors: {
    origin: '*',
  }})

let connectedUsersList=[];
io.on('connection', (socket => {
  
  socket.on('get again',()=>{
    io.sockets.emit('connected',connectedUsersList)
  })
  socket.on('new connection',(data)=>{
      connectedUsersList.push({
        'id' : data.id,
        'username' : data.name,
        'token' : socket.id
      })
      io.sockets.emit('connected',connectedUsersList)
      io.to(socket.id).emit('get name',data.name)
  })

  
  socket.on('accept game',(data)=>{
    io.to(data.token).emit('accept game',data);
  })
  socket.on('game invite',(data)=>{
    data["from"] = socket.id
    console.log(data);
    io.to(data.token).emit('gameInvite',data);
  })

  socket.on('chat',(data)=>{
      io.sockets.emit('chat',data);
  })

  socket.on('typing',(data)=>{
    io.sockets.emit('typing',data)
  })

  socket.on('connect',(data)=>{
    io.sockets.emit('connectedUsers',data)
  })

  socket.on('private message',(data)=>{
    io.to(data.to.token).emit('chat', data);
  });

  socket.on('disconnect',()=>{
    try{
      removeItem(connectedUsersList,socket.id);
      io.sockets.emit('connected',connectedUsersList)

    }catch(err){
      console.error("Error occurd!" , err);
    }
  })

  socket.on('game play',(data)=>{
    io
    .to(data.to)
    .emit('gameplay',data)
  })
  socket.on('change turn',(data)=>{
    io
    .to(data.to)
    .emit('changeturn',data)
  })
  socket.on('dice throw',(data)=>{
    io
    .to(data.to)
    .emit('dicethrow',data)
  })
  socket.on('Get turn',(data)=>{
    io
    .to(data.to)
    .emit('Getturn',data)
  })
  socket.on('you lose',(data)=>{
    io
    .to(data.to)
    .emit('youlose',data)
  })

  socket.on('game acssept',(data)=>{
    data["from"] = socket.id
    console.log(data);
    io.to(data).emit('gameacssept',data);
  })

  socket.on('game invite2',(data)=>{
    data["from"] = socket.id
    console.log(data);
    io.to(data.To.token).emit('gameinvite2',data);
  })

  socket.on('get user',(id)=>{
  })
  socket.on('Deny',(data)=>{
    io
    .to(data)
    .emit('DenyReturn',data)
  })
  // 
  socket.on('chat To Token',(data)=>{
    console.log('chat To Token');
    console.log(socket.id);
    io.to(data.To).emit('chat', data);
    // io.to(socket.id).emit('chat', data);
})
socket.on('chat To Token MySelf',(data)=>{
  console.log('chat To Token');
  console.log(socket.id);
  // io.to(data.To).emit('chat', data);
  io.to(socket.id).emit('chat', data);
})
}))

function removeItem(arr, value) {
  var index = arr.findIndex((x)=>x.token == value)
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
