import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TableDashboard from "./Table";
import HeadBar from "../../../constant/headBar";
import { Breadcrumb, Menu, Dropdown, Checkbox } from "antd";
import { ROUTES } from "../../../../configs";
import { PushpinOutlined } from "@ant-design/icons";

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

const _handleBreadcumbs = () => {
  window.location = ROUTES.DASHBOARD();
};

export default function RiwayatTKP() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Checkbox>No</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>INT</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>Bidang</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>Nama TKP</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>Supervisor/PIC</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>NIK SPV</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>Loker</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>Status</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>Job Title</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>On Board</Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox>Perubahan Status Terakhir</Checkbox>
      </Menu.Item>
    </Menu>
  );

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
            <a>Riwayat TKP</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 style={{ marginLeft: 35, marginTop: 35, fontSize: 20 }}>
          <strong>Riwayat TKP</strong>
        </h1>
        <p style={{ marginLeft: 35, marginBottom: 10 }}>
          Kelola data riwayat TKP pada halaman ini.
        </p>
        <Container maxWidth="lg" className={classes.container}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <PushpinOutlined />
            </a>
          </Dropdown>
          <TableDashboard />
        </Container>
      </main>
    </div>
  );
}
