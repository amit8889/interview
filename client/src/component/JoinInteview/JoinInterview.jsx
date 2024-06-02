
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import VideoComponent from '../VideoComponent/VideoComponent';
import CallEndIcon from '@mui/icons-material/CallEnd';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinInterview() {
//   const [open, setOpen] = React.useState(false);
const {socket} = useSelector((state)=>state.socket)
 let { id } = useParams();
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
const navigate = useNavigate()
const userMedia = React.useState(null);
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={true}
        
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            
            <Typography sx={{ ml: 2, flex: .7 }} variant="h4" component="div">
              React JS
              
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center',gap:24}}>
            <IconButton
              edge="start"
              aria-label="close"
              style={{backgroundColor: 'blue', width: 52, height: 52  }}
              onClick={()=>{ 
                //stop user media
                window.location.reload();
               
              }}
            >
              <SwapHorizIcon/>
            </IconButton>
            <IconButton
              edge="start"
              onClick={()=>{ 
                //stop user media
               
                 socket.emit('leaveAllRooms',"")
                
                navigate('/')
                window.location.reload();
               
              }}
              aria-label="close"
              style={{ backgroundColor: 'red', width: 52, height: 52 }}
              
            >
              <CallEndIcon/>
            </IconButton>
            
            </div>
            
          </Toolbar>
        </AppBar>
        <main>
           <VideoComponent id={id}/>
        </main>
      </Dialog>
    </React.Fragment>
  );
}