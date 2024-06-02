import io from 'socket.io-client';

const socketID = () => {
  
    const socket = io('http://localhost:8000');
    socket.emit('connectd', "Hello");
    // socket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });
    return socket
};

export default socketID();
