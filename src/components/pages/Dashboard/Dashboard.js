import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TableDashboard from "./Table";
import { useHistory } from "react-router";
import { getUser, removeUserSession } from "../../../utils/Common";
import "./dashboard.css";
import HeadBar from "../../constant/headBar";
import { Breadcrumb, Menu, Popover, Checkbox, Button, Dropdown } from "antd";
import { PushpinOutlined, DownloadOutlined } from "@ant-design/icons";

const drawerWidth = 240;
const nikSpv = sessionStorage.getItem("nik");

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
  navLogo: {
    width: 294,
    height: 152,
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const buttonPin = (
  <Menu>
    <Menu.Item key="0">
      <Checkbox>Nama TKP</Checkbox>
    </Menu.Item>
    <Menu.Item key="1">
      <Checkbox>Job Title</Checkbox>
    </Menu.Item>
    <Menu.Item key="2">
      <Checkbox>Job Role</Checkbox>
    </Menu.Item>
    <Menu.Item key="3">
      <Checkbox>Mitra</Checkbox>
    </Menu.Item>
  </Menu>
);

const exportData = (
  <Menu>
    <Menu.Item key="0">Ekspor Data (.Csv)</Menu.Item>
    <Menu.Item
      key="1"
      onClick={() =>
        window.open(
          "http://ec2-34-238-164-78.compute-1.amazonaws.com:4004/tkp/get-zip/tkp-under-spv/" + nikSpv + "/active"
        )
      }
    >
      Ekspor Data (.Zip)
    </Menu.Item>
  </Menu>
);

export default function Dashboard() {
  const user = getUser();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [supervisor, setSupervisor] = useState();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4004/spv/1")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

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
    history.push("/");
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log("sess", sessionStorage);
  const nama_user = sessionStorage.getItem("nama");

  return (
    <div className={classes.root}>
      <HeadBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Breadcrumb
          style={{ marginLeft: 35, marginTop: 35, cursor: "pointer" }}
        >
          <Breadcrumb.Item>Beranda</Breadcrumb.Item>
        </Breadcrumb>
        <h1 style={{ marginLeft: 35, marginTop: 10, fontSize: 20 }}>
          <strong>Basis Data TKP</strong>
        </h1>
        <p style={{ marginLeft: 35, marginBottom: 10 }}>
          Kelola data TKP pada halaman ini.
        </p>
        <Container maxWidth="lg" className={classes.container}>
          <div style={{ float: "right", marginBottom: 20 }}>
            <Dropdown overlay={exportData} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Button style={{ marginRight: 20 }}>
                  Ekspor Data
                  <DownloadOutlined style={{ marginLeft: 40 }} />
                </Button>
              </a>
            </Dropdown>
            <Popover placement="bottom" content={buttonPin} trigger="click">
              <PushpinOutlined
                style={{
                  fontSize: 24,
                  color: "#DA1E20",
                }}
              />
            </Popover>
          </div>
          <TableDashboard />
        </Container>
      </main>
    </div>
  );
}
