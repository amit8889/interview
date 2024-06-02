
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import JoinInterview from '../JoinInteview/JoinInterview';
import LiveChatcomponent from '../LiveChat/LiveChatcomponent';
import { useSelector } from 'react-redux';

export default function VideoComponent({id}) {
  const{socket} = useSelector((state)=>state.socket)
  const localVideoRef = React.useRef(null);
  const peerConnection = React.useRef(null)
  const remoteVideoRef = React.useRef(null)
  const[isLoading,setLoading] = React.useState(true)
  const checkPermission = async () => {
    const permissionStatus = await navigator.permissions.query({ name: 'camera',name:'microphone' });
    if (permissionStatus.state != 'granted') {
      return false;
    }
    return true;
  }
  let dataChannel;
  React.useEffect(() => {
    checkPermission().then((state) => {
      if (!state) {
        alert("Give access of micro phone and camera")
        return
      }
      createPeerConnection()
    }).catch((err) => {
      //console.log(err)
    })

  }, [])
  const connectRef= React.useRef(null);
  const createPeerConnection = async() => {
    try {
      const videoSrc = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = videoSrc
      peerConnection.current = new RTCPeerConnection();
     
     peerConnection.current.ontrack = (event) => {
      if(remoteVideoRef.current.srcObject){
          return
        }
       remoteVideoRef.current.srcObject = event.streams[0];
     };
 
     peerConnection.current.onicecandidate = (event) => {
      if(remoteVideoRef.current.srcObject){
        return
      }
      socket.emit('icecandidate',{room:id,event:event.candidate});
     };

     if (videoSrc) { 
      // Check if localStream is not null and has getTracks method
       videoSrc.getTracks().forEach(track => {
         peerConnection.current.addTrack(track, videoSrc);
       });
     } else {
       console.error('Local stream is null or missing getTracks method');
     }
     socket.on('offer', async (data) => {
      if(remoteVideoRef.current.srcObject){
        return
      }
       await peerConnection.current.setRemoteDescription(data);
       const answer = await peerConnection.current.createAnswer();
       await peerConnection.current.setLocalDescription(answer);
       peerConnection.current.ondatachannel=(e)=>{
           dataChannel=e.channel;
           dataChannel.onopen=()=>{
              console.log('channel open') ;
              socket.emit("leaveAllRooms","")
            }
           dataChannel.onmessage =(e)=>{
              console.log('Message : ',e.data)
            }
           dataChannel.onclose = () => {
             console.log("Data channel is closed");
             window.location.reload()
          };
       }
       socket.emit('answer', {room:id,answer:answer});
       
     });
 
     socket.on('answer', async (data) => {
      if(remoteVideoRef.current.srcObject){
        return
      }
      await peerConnection.current.setRemoteDescription(data);
    });
 
     socket.on('icecandidate', async (data) => {
      if(remoteVideoRef.current.srcObject){
        return
      }
       try {
         await peerConnection.current.addIceCandidate(data);
       } catch (error) {
         console.error('Error adding ICE candidate:', error);
       }
     });

     const offer = await peerConnection.current.createOffer();
     await peerConnection.current.setLocalDescription(offer);
     socket.emit('offer', {room:id,offer:offer});

      dataChannel = peerConnection.current.createDataChannel('bigData')
        dataChannel.onopen=()=>{
          console.log("channel open");
          socket.emit("leaveAllRooms","")
        }
       dataChannel.onmessage=(e)=>{
           console.log('Message : '+ e.data);
        }
       dataChannel.onclose = () => {
         console.log("Data channel is closed");
         window.location.reload()
       };
    } catch (error) {
       console.error(error.message)
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr .5fr', maxWidth: '90vw' }}>
      <Card
        variant="outlined"
        sx={{
          minWidth: 300,
          width: '72vw',
          maxWidth: '75vw',
          maxHeight: '88vh',
          // to make the card resizable
          overflow: 'hidden',
          resize: 'both',
        }}
      >
        <CardContent>
          <video 
          ref={remoteVideoRef} 
            autoPlay
            loop
          >
          </video>
          

        </CardContent>
        <video ref={localVideoRef} 
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
            style={{width:"150px",position:'absolute', top:18, right:'20px',zIndex:1}}
          >
          </video>
      </Card>
      <LiveChatcomponent />

    </div>
  );
}