const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server,{cors: {
    origin: '*'
  }});



  let {active_user,
    matching_queue,
    active_offer,
    
    handleMatching,
    group_map} = require('../utils/random.connect')





io.on('connection', (socket) => {

    socket.on('connectd',()=>{
       ++active_user
       io.emit("live_user",active_user)
       //handle active offer
       //when candidate visite page and socket connect create 
       //at time of emititng connected event 
      //  //push in active_offer
      //   active_offer={
      //     ...active_offer,
      //     [socket.id]:offer
      //   }
   })
  socket.on('offer', (data) => {
    //console.log("offer",data.room)
    // active_offer={
    //   ...active_offer,
    //   [socket.id]:data.offer
    // }
    socket.join(data.room)
    socket.to(data.room).emit('offer', data.offer);
    // if(active_offer.get(0)){
    //   active_offer.set(0,{...active_offer.get(0),[socket.id]:data.offer})
    // }else{
    //   active_offer.set(0,{[socket.id]:data.offer})
    // }
    // if(group_map && group_map.has(data.id) && active_offer.get(0)[socket.id]){
    //           group_map.get(data.id).push(socket.id);
    //           //handle connect for that group
    //           handleMatching(data.id,socket)
    // }else if(group_map && active_offer.get(0)[socket.id] ){
    //       group_map.set(data.id,[socket.id]);
    //       //handle connect for that group
    //       handleMatching(data.id,socket)
    // }
  });

  socket.on('answer', (data) => {
   // console.log("ans",data)
    socket.to(data.room).emit('answer', data.answer);
  });

  socket.on('icecandidate', (data) => {
   // console.log("ics",data)
    socket.to(data.room).emit('icecandidate', data.event);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
 
  socket.on('leaveAllRooms', () => {
    socket.leaveAll(); // Leave all rooms the socket has joined
    console.log('User left all rooms');
});
   //emit event when join the group
  //  socket.on('join_group',(data)=>{
  //   // put in that group list 
  //   if(group_map && group_map.has(data.id) && active_offer[socket.id]){
  //         group_map.get(data.id).push(socket.id);
  //         //handle connect for that group
  //         handleMatching(data.id,io)
  //   }else if(group_map && active_offer[socket.id] ){
  //     group_map.set(data.id,[socket.id]);
  //     //handle connect for that group
  //     handleMatching(data.id,io)
  //   }
  //  })
  // socket.on('answer', (data) => {
  //    //check weather user exit or not on which we ant establish connect to wala

  //       //handle incong ans and set to remote user

       
  //       // let data ={
  //       //   to: 'socketIs',
  //       //   from :'socketid',
  //       //   group_id :'groupid',
  //       //   answer:'answer'
  //       // }
  //       io.to(data.to).emit('ice_candidate',data);

  // });

  // socket.on('iceCandidate', candidate => {
  //   socket.broadcast.emit('iceCandidate', candidate);
  // });

   socket.on('disconnect', () => {
    active_user = active_user>0?--active_user:0;
    io.emit("live_user",active_user)
    //hnadel user on disconnection

    //delete user form active_offerlist
     delete active_offer[socket.id];
})
})























module.exports={server,app};
