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



// export default function HeadBar() {

//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const handleTest = () => { };



//   let history = useHistory();
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const [anchorEl, setAnchorEl] = React.useState(false);
//   const open1 = Boolean(anchorEl);
//   const handleClick1 = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     removeUserSession();
//     history.push("/");
//   };


//   const nama_user = localStorage.getItem("nama");


//   // Modal
//   const [openModal, setOpenModal] = React.useState(false);
//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };
//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };


//   return (
//     <div>
//       <CssBaseline />
//       <AppBar
//         position="absolute"
//         className={clsx(classes.appBar, open && classes.appBarShift)}

//         style={{ borderBottom: "3px solid #000000" }}
//       >

//         <Toolbar className={classes.toolbar}>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             onClick={open ? handleDrawerClose : handleDrawerOpen}
//             style={open ? { marginLeft: drawerWidth } : { marginLeft: -20 }}
//           >
//             <MenuIcon fontSize="large" style={{
//               color: "#000000"
//             }} />
//           </IconButton>
//           <Typography
//             component="h1"
//             variant="h6"
//             color="inherit"
//             noWrap
//             className={classes.title}
//           >
//           </Typography>


//           <NotificationPopover />

//           <IconButton
//             color="inherit" onClick={handleTest}>
//             <Avatar
//               fontSize="large"
//               alt="Remy Sharp"
//               style={{
//                 marginRight: "10px",
//                 backgroundColor: "#6D6E71",
//               }}

//             >
//               {nama_user.charAt(0).toUpperCase()}
//             </Avatar>
//             <Typography
//               style={{
//                 color: "#000000",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 fontFamily: "Montserrat",
//               }}
//             >
//               {nama_user.split(" ")[0]}
//             </Typography>
//           </IconButton>

//           <IconButton color="inherit" onClick={handleClick1}>
//             {open1 ? (
//               <ExpandMore fontSize="large" style={{ color: "black" }} />
//             ) : (
//               <ExpandLess fontSize="large" style={{ color: "black" }} />
//             )}
//           </IconButton>


//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"

//         classes={{
//           paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
//         }}
//         open={open}

//         onMouseEnter={handleDrawerOpen}
//       >
//         <div className={classes.toolbarIcon}>
//           <img
//             src={IMAGES.LOGO}
//             className="nav-Logo"
//             alt="logo"
//           />
//         </div>
//         <List >
//           <SideMenu />
//         </List>
//       </Drawer>
//       {/*Popover arrow down*/}
//       <Popover

//         overflow="hidden"
//         open={open1}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//       >
//         <Box>
//           <IconButton style={{
//             fontSize: "14px",
//             fontFamily: "Roboto",
//             color: "#000000",
//           }} onClick={handleClose}>
//             <Box
//               width="140px"
//               textAlign={'left'}
//             >
//               Profile
//             </Box>
//           </IconButton>
//         </Box>
//         <Box>
//           <IconButton style={{
//             fontSize: "14px",
//             fontFamily: "Roboto",
//             color: "#000000",
//           }} onClick={handleOpenModal}>
//             <Box
//               width="140px"
//               textAlign={'left'}
//             >
//               Logout
//             </Box>
//           </IconButton>
//         </Box>

//       </Popover>

//       {/* Modal Logout */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           style={{
//             backgroundColor: "#E5E5E5",
//             height: "280px",
//             width: "467px",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             position: "absolute",
//             borderRadius: "10px",
//             padding: "20px",
//             boxShadow: "rgba(0, 0, 0, 0.25)",
//             justifyContent: "center",
//             alignItems: "center",
//             display: "flex",

//           }}
//         >
//           <Grid container spacing={3} d>
//             <Grid item xs={12} container direction="row"
//               justifyContent="center"
//               alignItems="flex-end">
//               <Avatar variant='elips' style={{
//                 width: '50px',
//                 height: '50px',
//                 backgroundColor: "rgba(213, 17, 0, 0.1)",
//                 color: "#DA1E20"
//               }}>
//                 <ReportProblemOutlinedIcon />
//               </Avatar>
//             </Grid>
//             <Grid item xs={12} container direction="row"
//               justifyContent="center"
//               alignItems="flex-end">
//               <Typography variant="h6" style={{
//                 fontWeight: "bold",
//                 fontSize: "20px",
//                 color: "#DA1E20",
//                 fontFamily: "Montserrat"
//               }}>
//                 Keluar
//               </Typography>
//             </Grid>
//             <Grid item xs={12} container direction="row"
//               justifyContent="center"
//               alignItems="flex-end">
//               <Typography variant="body1" gutterBottom>
//                 Apakah anda yakin ingin keluar?
//               </Typography>
//             </Grid>
//             <Grid item xs={6}
//               container
//               irection="row"
//               justifyContent="center"
//               alignItems="flex-end">
//               <Button
//                 variant="contained"
//                 onClick={handleLogout}
//                 style={{
//                   backgroundColor: "#DA1E20",
//                   color: "white",
//                   width: "60%",
//                   height: "40px",
//                   borderRadius: "10px",
//                 }}
//               >
//                 Ya
//               </Button>

//             </Grid>
//             <Grid item xs={6} container
//               irection="row"
//               justifyContent="center"
//               alignItems="flex-end">
//               <Button
//                 variant="contained"
//                 onClick={handleCloseModal}
//                 style={{
//                   backgroundColor: "#DA1E20",
//                   color: "white",
//                   width: "60%",
//                   height: "40px",
//                   borderRadius: "10px",
//                 }}
//               >
//                 Tidak
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Modal>
//       {/* Modal Logout End */}
//     </div>
//   );
// }