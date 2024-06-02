import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import JoinInterview from '../JoinInteview/JoinInterview';
import { useNavigate } from 'react-router-dom';
export default function BottomActionsCard({item}) {
   const navigate = useNavigate();
   const joinroom=()=>{
    navigate(`/room/${item.key}`)
   }
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 280,
        width: '17vw',
        // to make the card resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
       <Typography level="h2" style={{'color':'blue'}}>{item.name}</Typography>
        <AvatarGroup size="sm" sx={{ '--Avatar-size': '40px' }}>
          <Avatar src="/static/avatar/2.jpg" />
          <Avatar src="/static/avatar/3.jpg" />
          <Avatar src="/static/avatar/4.jpg" />
          <Avatar>+4</Avatar>
        </AvatarGroup>
      </Box>
      <CardContent>
      {/* <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*heU2x0fIJHE9Fsy1Fn1Hjw.png"/> */}
      <img src ="data:image/png;base64,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"/>
      
      </CardContent>
      <CardActions  buttonFlex=" 1 120px">
        
        <Button  onClick={()=>joinroom()} variant="solid" color="primary">
          Join
        </Button>
      </CardActions>
      
    </Card>
  );
}