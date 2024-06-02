import logo from './logo.svg';
import './App.css';
import '@fontsource/inter';
import { Home } from './component/Home/Home';
// import socketId from './connect/socket.connect'
import { useEffect } from 'react';
import { updateSocket } from './Action/socket.action';
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import JoinInterview from './component/JoinInteview/JoinInterview';
import Error from './Error';
function App() {
   const dispatch = useDispatch();
  // const socketData = useSelector(
  //   (state) => state.socket
  // );
  // console.log(socketData)
  useEffect(()=>{
    try {
      const socket = io();
      socket.emit('connectd', "Hello");
        dispatch(updateSocket(socket));

    } catch (error) {
       console.log(error)
    }
    
  },[])
  return <>
    <Error>
    <BrowserRouter >
    
    
    <Routes>
      <Route  exact path="/" element={<Home />}></Route>
      <Route  exact path="/room/:id" element={<JoinInterview />}></Route>
 </Routes>
 </BrowserRouter>
    </Error>
  </>
}

export default App;
