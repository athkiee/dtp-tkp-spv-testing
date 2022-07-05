import React, { useEffect, useState } from "react";
import axios from "axios";
import FileSaver from "file-saver";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TableDashboard from "./Table";
import { DownloadOutlined, DownOutlined, SendOutlined, PushpinOutlined } from "@ant-design/icons";
import { Button, Breadcrumb, Dropdown, Popover, Checkbox, Menu, } from "antd";
import HeadBar from "../../constant/headBar";
import { ROUTES, API } from "../../../configs";

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
  downloadForm: {
    color: "#DA1E20",
    borderColor: "#DA1E20",
    marginLeft: 15,
    borderRadius: 10,
    background: "white",
    "&:hover": {
      background: "#DA1E20",
      borderColor: "#DA1E20",
    },
    "&:active":{
      background: "#DA1E20",
      borderColor: "#DA1E20",
    },
    "&:focus":{
      background: "#DA1E20",
      borderColor: "#DA1E20",
    }
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

const jumlahData = (
  <Menu>
    <Menu.Item key="0">
      5
    </Menu.Item>
    <Menu.Item key="1">
      10
    </Menu.Item>
    <Menu.Item key="2">
      15
    </Menu.Item>
    <Menu.Item key="3">
      20
    </Menu.Item>
  </Menu>
);

const exportData = (
  <Menu>
    <Menu.Item
      key="0"
      onClick={() => window.open(API.exportCsvUnderSpv + nikSpv + "/active")}
    >
      Ekspor Data (.Csv)
    </Menu.Item>
    <Menu.Item
      key="1"
      onClick={() => window.open(API.exportFileUnderSpv + nikSpv + "/active")}
    >
      Ekspor Data (.Zip)
    </Menu.Item>
  </Menu>
);

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

export default function EvaluasiTKP() {
  const classes = useStyles();
  const urlFormulir = API.getFormulir;
  const [evaluasiLink, getEvaluasi] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    downloadEvaluasi();
  }, []);

  const downloadEvaluasi = () => {
    axios.get(urlFormulir, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const urlEvaluasi = response.data;
      getEvaluasi(urlEvaluasi);
    });
  };

  const downloadSKI = () => {
    FileSaver.saveAs(
      evaluasiLink.form_evaluasi_ski
    );
  };

  const downloadISH = () => {
    FileSaver.saveAs(
      evaluasiLink.form_evaluasi_ish
    );
  };

  return (
    <div className={classes.root}>
      <HeadBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a onClick={_handleBreadcumbs}>Beranda</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{
              cursor: "pointer",
              fontColor: "#DA1E20 !important",
              fontWeight: "bold",
            }}
          >
            <a>Evaluasi TKP</a>
          </Breadcrumb.Item>
        </Breadcrumb>
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
            onClick={downloadISH}
            className={classes.downloadForm}
          >
            Unduh Form Evaluasi ISH
          </Button>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={downloadSKI}
            className={classes.downloadForm}
          >
            Unduh Form Evaluasi SKI
          </Button>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
        <div style={{ float: "left",  marginLeft: 15 }}> 
            <h3> Jumlah Data</h3>
          </div>
          <div style={{ float: "right", marginBottom: 20 }}>
            <Dropdown overlay={jumlahData} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Button style={{ marginRight: 730 }}>
                  10
                  <DownOutlined style={{ marginLeft: 40 }} />
                </Button>
              </a>
            </Dropdown>
            <Button className={classes.kirimSemua}>
              Kirim Semua
              <SendOutlined rotate={315} style={{ marginLeft: 40 }} />
            </Button>
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
