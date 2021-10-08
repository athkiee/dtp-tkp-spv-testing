import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SideMenu from '../../constant/sideMenu';
import TableDashboard from './Table';
import ActiveLastBreadcrumb from './Breadcumbs';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Menu, MenuItem } from '@material-ui/core';
import { useHistory } from "react-router";
import { getUser, removeUserSession } from '../../../utils/Common';
import './dashboard.css'
import axios from 'axios';
import ChartLoker from './ChartLoker';
import ChartJenjang from './ChartJenjang';
import ChartMitra from './ChartMitra';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#E5E5E5',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  navLogo: {
    width: 294,
    height: 152,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#E5E5E5',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Dashboard() {
  const user = getUser();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [supervisor, setSupervisor] = useState();

  // const handleGetDATA = async () => {
  //   try {
  //     const resp = await axios.get('http://localhost:4004/spv_api');
  //     console.log(resp.data[1]);
  // } catch (err) {
  //     // Handle Error Here
  //     console.error(err);
  // }
  // }

  // const handleGetDATA = () => {
  //   $.ajax({url: "http://localhost:4004/spv_api",
  //           success: function(data){
  //             console.log('test', data)
  //             // $('#test').html(String(data)),
  //             //   this.setState({cek:data},function(){console.log(data)})}.bind(this),
  //           }
  // }}
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:4004/spv/1")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleTest = () => {

  }

  let history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    removeUserSession();
    history.push('/');
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log('sess', sessionStorage);
  const nama_user = sessionStorage.getItem('nama');

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {user.nik}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ForumOutlinedIcon style={{ color: 'black' }} />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsNoneIcon style={{ color: 'black' }} />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon style={{ color: 'black' }} button onClick={handleTest} />
            {nama_user}
          </IconButton>
          <IconButton color="inherit" button onClick={handleClick1}>
            {open ? <ExpandMore style={{ color: 'black' }} /> : <ExpandLess style={{ color: 'black' }} />}
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open1}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <img onClick={handleDrawerClose} src='static/logo.png' className="nav-Logo" />
        </div>
        <List><SideMenu /></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <h2>Dashboard</h2>




        <ul>
          {/* {items.map(item => ( */}
          <li key={items.id_spv}>
            {items.nama_lengkap} {items.nik}
          </li>
          {/* ))} */}
        </ul>
        <ActiveLastBreadcrumb />
            Kelola data TKP pada halaman ini.
        <Container maxWidth="lg" className={classes.container}>

          <Box display="flex" marginBottom={2}>
            <Box display="flex"
              marginRight={5}
              padding={7}
              boxShadow={3}
              bgcolor="white"
              minHeight="1vh">
              <ChartLoker />
            </Box>

            <Box display="flex"
              marginRight={20}
              padding={7}
              boxShadow={3}
              bgcolor="white"
              minHeight="1vh">
              <ChartJenjang />
            </Box>
          </Box>

          <Box display="flex" marginBottom={2}>
            <Box display="flex"
              marginRight={20}
              padding={7}
              boxShadow={3}
              bgcolor="white"
              minHeight="1vh">
              <ChartMitra />
            </Box>
          </Box>


          <TableDashboard />
        </Container>
      </main>
    </div>
  );
}