import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SideMenu from "./sideMenu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router";
import { removeUserSession } from "../../utils/Common";
import { IMAGES } from "../../configs/";
import NotificationPopover from "./notification/component";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from '@mui/icons-material/Menu';
import Popover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./stylesHeadBar";
import { withRouter } from "react-router-dom";





 class HeadBar extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      anchorEl: null,
      openModal: null,
      openside:true,
    };
  }


  handleDrawerOpen = () => {
    this.setState({ openside: true });
  };

  handleDrawerClose = () => {
    this.setState({ openside: false });
  };
 
 handleClick1 = (event) => {
    this.setState({ open1: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open1: false });
  };
  
   handleLogout = () => {
    removeUserSession();
    this.props.history.push("/")
  };

 


  nama_user = localStorage.getItem("nama");


  // Modal
 handleOpenModal = () => {
    this.setState({ openModal: true });
  };
  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { open, open1, anchorEl, openModal, openside } = this.state;

    
    const { classes } = this.props;
    
    return (
      <div>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >

          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={openside ? this.handleDrawerClose : this.handleDrawerOpen}
              style={openside ? { marginLeft: 240 } : { marginLeft: 40}}
            >
              <MenuIcon fontSize="large" className={classes.menuicon}/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
            </Typography>


            <NotificationPopover />

            <IconButton
              color="inherit" >
              <Avatar
                fontSize="large"
                alt="Remy Sharp"
                className={classes.avatar}
              >
                {this.nama_user.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                className={classes.namaUser}
              >
                {this.nama_user.split(" ")[0]}
              </Typography>
            </IconButton>

            <IconButton color="inherit" onClick={this.handleClick1}>
              {open1 ? (
                <ExpandMore fontSize="large" className={classes.expandicon} />
              ) : (
                <ExpandLess fontSize="large" className={classes.expandicon} />
              )}
            </IconButton>


          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"

          classes={{
            paper: clsx(classes.drawerPaper, !openside && classes.drawerPaperClose),
          }}
          open={openside}

        >
          <div className={classes.toolbarIcon}>
            <img
              src={IMAGES.LOGO}
              className="nav-Logo"
              alt="logo"
            />
          </div>
          <List >
            <SideMenu />
          </List>
        </Drawer>
        {/*Popover arrow down*/}
        <Popover

          overflow="hidden"
          open={open1}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Box>
            <IconButton className={classes.iconbutton} onClick={this.handleClose}>
              <Box
                width="140px"
                textAlign={'left'}
              >
                Profile
              </Box>
            </IconButton>
          </Box>
          <Box>
            <IconButton className={classes.iconbutton} onClick={this.handleOpenModal}>
              <Box
                width="140px"
                textAlign={'left'}
              >
                Logout
              </Box>
            </IconButton>
          </Box>

        </Popover>

        {/* Modal Logout */}
        <Modal
          open={openModal}
          onClose={this.handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
          className={classes.box}
          >
            <Grid container spacing={3} d>
              <Grid item xs={12} container direction="row"
                justifyContent="center"
                alignItems="flex-end">
                <Avatar variant='elips' style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: "rgba(213, 17, 0, 0.1)",
                  color: "#DA1E20"
                }}>
                  <ReportProblemOutlinedIcon />
                </Avatar>
              </Grid>
              <Grid item xs={12} container direction="row"
                justifyContent="center"
                alignItems="flex-end">
                <Typography variant="h6" style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#DA1E20",
                  fontFamily: "Montserrat"
                }}>
                  Keluar
                </Typography>
              </Grid>
              <Grid item xs={12} container direction="row"
                justifyContent="center"
                alignItems="flex-end">
                <Typography variant="body1" gutterBottom>
                  Apakah anda yakin ingin keluar?
                </Typography>
              </Grid>
              <Grid item xs={6}
                container
                irection="row"
                justifyContent="center"
                alignItems="flex-end">
                <Button
                  variant="contained"
                  onClick={this.handleLogout}
                  style={{
                    backgroundColor: "#DA1E20",
                    color: "white",
                    width: "60%",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  Ya
                </Button>

              </Grid>
              <Grid item xs={6} container
                irection="row"
                justifyContent="center"
                alignItems="flex-end">
                <Button
                  variant="contained"
                  onClick={this.handleCloseModal}
                  style={{
                    backgroundColor: "#DA1E20",
                    color: "white",
                    width: "60%",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  Tidak
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        {/* Modal Logout End */}
      </div>
    );
  }
}
export default withStyles(useStyles) (withRouter(HeadBar));

