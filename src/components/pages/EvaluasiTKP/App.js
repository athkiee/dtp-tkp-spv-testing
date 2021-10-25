import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SideMenu from "../../constant/sideMenu";
import TableDashboard from "./Table";
import { DownloadOutlined } from "@ant-design/icons";
import ActiveLastBreadcrumb from "./Breadcumbs";
import { Button } from "antd";
import FileSaver from "file-saver";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  downloadForm: {
    color: "#DA1E20",
    borderColor: "#DA1E20",
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#DA1E20",
      borderColor: "#DA1E20",
    },
  },
  containerTataCara: {
    width: 550,
    height: 180,
    float: "left",
    margin: 35,
    backgroundColor: "white",
    borderRadius: 10,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#E5E5E5",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#E5E5E5",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: "100%",
    height: "auto",
    float: "left",
    marginLeft: 35,
    backgroundColor: "white",
    borderRadius: 10,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function EvaluasiTKP() {
  const classes = useStyles();
  const download = () => {
    FileSaver.saveAs(
      "https://drive.google.com/u/0/uc?id=1kpX-YeopvB90bjc8VuhdTqawMkeJNDax&export=download",
      "test.pdf"
    );
  };
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
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
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ForumOutlinedIcon style={{ color: "black" }} />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsNoneIcon style={{ color: "black" }} />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon style={{ color: "black" }} />
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
          <img
            onClick={handleDrawerClose}
            src="static/logo.png"
            className="nav-Logo"
          />
        </div>
        <List>
          <SideMenu />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <ActiveLastBreadcrumb />
        <Container className={classes.containerTataCara}>
          <h2 style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}>
            Tata Cara Pengisian Evaluasi TKP
          </h2>
          <ol style={{ marginLeft: 20 }}>
            <li>Silahkan unduh Dokumen Form Evaluasi sesuai kebutuhan</li>
            <li>
              Bila pengisian dokumen telah selesai, simpan dengan format Excel
              (.xls)
            </li>
            <li>Upload Dokumen Evaluasi pada kolom “Aksi”</li>
          </ol>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={download}
            className={classes.downloadForm}
          >
            Unduh Form Evaluasi ISH
          </Button>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={download}
            className={classes.downloadForm}
          >
            Unduh Form Evaluasi SKI
          </Button>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <TableDashboard />
        </Container>
      </main>
    </div>
  );
}
