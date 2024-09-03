import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CategoryIcon from '@mui/icons-material/Category';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Dashboard from './Dashboard/Dashboard';
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`, 
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`, // Corrected the template literal usage
      marginLeft: `${drawerWidth}px`, // Corrected the template literal usage
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    })
  }));
  

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  
  const navigate = useNavigate();
  const handledashboard = ()=>{
    navigate("/dashboard")
  }

  const handelRole = ()=>{
    navigate('/role')
  }

  const handelEmployee =()=>{
    navigate('/employee')
  }

  const handleCourse = ()=>{
    navigate('/course')
  }
  const handleStudent =()=>{
    navigate('/student')
  }

  const handleteacher =() =>{
    navigate('/teacher')
  }
  const handleBatch =()=>{
    navigate('/batch')
  }
  const handleBatch_Purchase =()=>{
    navigate('/batch_purchase')
  }
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }} style={{marginTop:'70px'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor:'#8DECB4'}} >
        <Toolbar>
          <IconButton
            color="white"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr:2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"
          sx={{flexGrow: 1}} style={{color:'black'}}>
           Welcome To E-Learning
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:'#8DECB4',
            color:'black'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <img src='https://www.pngkey.com/png/full/895-8951463_logo-of-e-learning.png'
        style={{height:'55px',width:'160px',marginRight:'20px'}}>
                </img>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List onClick={handledashboard} >
          {['Dashboard'  ].map((text, index) => (
            <ListItem key={text} disablePadding  onClick={handledashboard}>
              <ListItemButton
              
              >
                <ListItemIcon style={{color:'black'}}>
                  {index % 2 === 0 ? <DashboardCustomizeIcon /> : <DashboardCustomizeIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Role' ].map((text, index) => (
            <ListItem key={text} disablePadding  onClick={handelRole}>
              <ListItemButton>
                <ListItemIcon  style={{color:'black'}}>
                  {index % 2 === 0 ? <PeopleOutlineIcon/> : <PeopleOutlineIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Employee' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handelEmployee}>
              <ListItemButton>
                <ListItemIcon  style={{color:'black'}}>
                  {index % 2 === 0 ? <PersonOutlineIcon /> : <PersonOutlineIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Course' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleCourse}>
              <ListItemButton>
                <ListItemIcon  style={{color:'black'}}>
                  {index % 2 === 0 ? < CategoryIcon /> : <CategoryIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Student' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleStudent}>
              <ListItemButton>
                <ListItemIcon  style={{color:'black'}}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Teacher' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleteacher}>
              <ListItemButton>
                <ListItemIcon  style={{color:'black'}}>
                  {index % 2 === 0 ? < HomeWorkIcon /> : < HomeWorkIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Batch' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleBatch}>
              <ListItemButton>
                <ListItemIcon  style={{color:'black'}}>
                  {index % 2 === 0 ? <LocalOfferIcon  /> : <LocalOfferIcon  />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {['Batch_Purchase' ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleBatch_Purchase}>
              <ListItemButton>
                <ListItemIcon  style={{color:'black'}}>
                  {index % 2 === 0 ? <LocalOfferIcon  /> : <LocalOfferIcon  />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
      <div className='outlet w-100'>
      <Outlet />
      </div>
    </Box>
    
  );
}
