import React from 'react';
import './css/cardStyles.css'
import { AppBar, Toolbar, IconButton, CardMedia, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from './assets/images/chaoticneutralgameslogo.png'







function TopNavigation() {
 

return (
  
  <div>
      <AppBar position="static">
        
        <Toolbar>
        <Button>
         <CardMedia
          component="img"
          alt={'Card'}
          image={logo}
          className="menuLogo">

         </CardMedia>
         </Button>
         <Typography>Your Games</Typography>
         <Typography>Your Stats</Typography>
          <Button color="inherit">Login</Button>
          <IconButton edge="start" color="inherit" aria-label="menu"><MenuIcon /></IconButton>
        </Toolbar>
      </AppBar>
    </div>

)

}

export default TopNavigation; 
  