import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Breadcrumb } from "antd";
import TextField from "@material-ui/core/TextField";
import HeadBar from "../../../constant/headBar";
import { ROUTES } from "../../../../configs";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  submitForm: {
    color: "white",
    borderColor: "#DA1E20",
    borderRadius: 10,
    backgroundColor: "#DA1E20",
    "&:hover": {
      color: "#DA1E20",
      backgroundColor: "white",
      borderColor: "#DA1E20",
    },
  },
  containerTataCara: {
    maxWidth: "95.3%",
    height: 360,
    float: "center",
    marginLeft: 35,
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

const _handleBreadcumbs = () => {
  window.location = ROUTES.DASHBOARD()
}


export default function MengajukanTKP() {
  const classes = useStyles();
  const namaSpv = localStorage.getItem("nama");
  const nikSpv = localStorage.getItem("nik");
  

  return (
    <div className={classes.root}>
      <HeadBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a onClick={_handleBreadcumbs}>Beranda</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a>Pengajuan TKP</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{
              cursor: "pointer",
              fontColor: "#DA1E20 !important",
              fontWeight: "bold",
            }}
          >
            <a>Ajukan TKP</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 style={{ marginLeft: 35, marginTop: 35, fontSize: 20 }}>
          <strong>Ajukan TKP</strong>
        </h1>
        <p style={{ marginLeft: 35, marginBottom: 10 }}>
          Ajukan data diri TKP secara lengkap dengan mengisi kolom di bawah ini.
        </p>
        <Container className={classes.containerTataCara}>
          <h2 style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}>
            Data Supervisor
          </h2>
          <p>
            Silahkan mengisi Data Supervisor di bawah ini untuk membuka formulir
            TKP
          </p>
          <div style={{ marginBottom: 40 }}>
            <label className="form-label">Nama Supervisor</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="form-input"
              type="text"
              name="name"
              value={namaSpv}
              disabled
            />
          </div>
          <div style={{ marginBottom: 40 }}>
            <label className="form-label">NIK Supervisor</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="form-input"
              type="number"
              name="nik"
              value={nikSpv}
              disabled
            />
          </div>
          <Button
            type="primary"
            onClick={() => (window.location = ROUTES.PENGAJUAN_TKP_FORM())}
            className={classes.submitForm}
          >
            <strong>SUBMIT</strong>
          </Button>
        </Container>
        <Container maxWidth="lg" className={classes.container}></Container>
      </main>
    </div>
  );
}
