import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TableDashboard from "./Table";
import HeadBar from "../../../constant/headBar";
import { Breadcrumb, Menu, Popover, Checkbox, Dropdown, Button } from "antd";
import { ROUTES } from "../../../../configs";
import { PushpinOutlined, DownloadOutlined } from "@ant-design/icons";

const drawerWidth = 240;
const nikSpv = localStorage.getItem("nik");

const useStyles = makeStyles((theme) => ({
  '@global': {
    ' .ant-popover-inner':{
      overflow: 'scroll',
      height: 400
    }
  },
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
    float: "center",
    backgroundColor: "white",
    borderRadius: 10,
    maxWidth: "95.3%",
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

const buttonPin = (
  <Menu>
    <Menu.Item key="0">
      <Checkbox>Pilih Semua</Checkbox>
    </Menu.Item>
    <Menu.Item key="1">
      <Checkbox>No</Checkbox>
    </Menu.Item>
    <Menu.Item key="2">
      <Checkbox>Nama TKP</Checkbox>
    </Menu.Item>
    <Menu.Item key="3">
      <Checkbox>Bidang</Checkbox>
    </Menu.Item>
    <Menu.Item key="4">
      <Checkbox>Lokasi Kerja</Checkbox>
    </Menu.Item>
    <Menu.Item key="5">
      <Checkbox>Nama SPV</Checkbox>
    </Menu.Item>
    <Menu.Item key="6">
      <Checkbox>NIK SPV</Checkbox>
    </Menu.Item>
    <Menu.Item key="7">
      <Checkbox>Status</Checkbox>
    </Menu.Item>
    <Menu.Item key="8">
      <Checkbox>Job Role</Checkbox>
    </Menu.Item>
    <Menu.Item key="9">
      <Checkbox>Kelompok Pekerjaan</Checkbox>
    </Menu.Item>
    <Menu.Item key="10">
      <Checkbox>Mitra</Checkbox>
    </Menu.Item>
    <Menu.Item key="11">
      <Checkbox>Paket</Checkbox>
    </Menu.Item>
    <Menu.Item key="12">
      <Checkbox>No. SP</Checkbox>
    </Menu.Item>
    <Menu.Item key="13">
      <Checkbox>THP</Checkbox>
    </Menu.Item>
    <Menu.Item key="14">
      <Checkbox>Headcount</Checkbox>
    </Menu.Item>
    <Menu.Item key="15">
      <Checkbox>On Board</Checkbox>
    </Menu.Item>
    <Menu.Item key="16">
      <Checkbox>Perubahan Status Terakhir</Checkbox>
    </Menu.Item>
  </Menu>
);

const exportData = (
  <Menu>
    <Menu.Item
      key="0"
      onClick={() =>
        window.open(
          "http://ec2-34-238-164-78.compute-1.amazonaws.com:4004/tkp/export-csv/tkp-under-spv/" +
            nikSpv
        )
      }
    >
      Ekspor Data (.Csv)
    </Menu.Item>
    <Menu.Item
      key="1"
      onClick={() =>
        window.open(
          "http://ec2-34-238-164-78.compute-1.amazonaws.com:4004/tkp/get-zip/tkp-under-spv/" +
            nikSpv
        )
      }
    >
      Ekspor Data (.Zip)
    </Menu.Item>
  </Menu>
);

export default function RiwayatTKP() {
  const classes = useStyles();

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
        <Container  className={classes.container}>
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
            <Popover
              placement="bottom"
              content={buttonPin}
              trigger="click"
            >
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
