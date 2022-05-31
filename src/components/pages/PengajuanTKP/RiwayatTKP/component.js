import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TableDashboard from "./Table";
import HeadBar from "../../../constant/headBar";
import { Breadcrumb, Menu, Popover, Checkbox, Dropdown, Button } from "antd";
import { ROUTES } from "../../../../configs";
import { PushpinOutlined, DownloadOutlined } from "@ant-design/icons";
import {withStyles} from '@material-ui/core/styles';
import { API } from "../../../../configs";
import axios from "axios";
import fileDownload from "js-file-download";
import ModalConfirmation from "../../../ModalConfirmation";
import ModalSuccess from "../../../ModalSuccess";
import ModalLoading from "../../../ModalLoading";

const drawerWidth = 240;
const nikSpv = localStorage.getItem("nik");

const useStyles = (theme) => ({
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
});

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



 class RiwayatTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogConfirmation: false,
      dialogZip: false,
      dialogSuccess: false,
      dialogLoading: false,
    }
  }

 
  render() {
    const { classes } = this.props;
    const nikSpv = localStorage.getItem("nik");
    const token = localStorage.getItem("token");
    const nama = localStorage.getItem("nama");
    const handleExportCSV = () => {
      this.setState({ dialogConfirmation: true });
    };

    const handleExportZip = () => {
      this.setState({ dialogZip: true });
    };

    const getDataCSV = async () => {
      const dataCSV = await axios
        .get(`${API.getCSVTKPUnderSPV}${nikSpv}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        })
        .then((response) => response)
        .catch((error) => console.error(error));

      const { status, data } = dataCSV;
      if (status === 200) {
        this.setState({ dialogConfirmation: false });
        fileDownload(data, `tkp-active-under-spv-${nama}.csv`);
        this.setState({ dialogSuccess: true });
      }
    };

    const getDataZip = async () => {
      this.setState({ dialogZip: false });
      this.setState({ dialogLoading: true });
      const dataZip = await axios
        .get(`${API.getZipTKPUnderSPV}${nikSpv}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        })
        .then((response) => response)
        .catch((error) => console.error(error));

      const { status, data } = dataZip;
      if (status === 200) {
        this.setState({ dialogLoading: false });
        fileDownload(data, `tkp-active-under-spv-${nama}.zip`);
        this.setState({ dialogSuccess: true });
      }
    };

    const exportData = (
      <Menu>
        <Menu.Item key="0" onClick={handleExportCSV}>
          Ekspor Data (.Csv)
        </Menu.Item>
        <Menu.Item key="1" onClick={handleExportZip}>
          Ekspor Data (.Zip)
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
            {/* modal dialog confirmation csv */}
            <ModalConfirmation
              title={"Yakin ingin Ekspor Data Hasil Evaluasi (.csv)?"}
              description={
                "Banyaknya data akan berpengaruh pada proses ekspor."
              }
              open={this.state.dialogConfirmation}
              handleClose={() =>
                this.setState({ dialogConfirmation: false })
              }
              getData={() => getDataCSV()}
            />

            {/* modal dialog confirmation zip */}
            <ModalConfirmation
              title={"Yakin ingin Ekspor Data Hasil Evaluasi (.zip)?"}
              description={
                "Banyaknya data akan berpengaruh pada proses ekspor."
              }
              open={this.state.dialogZip}
              handleClose={() => this.setState({ dialogZip: false })}
              getData={() => getDataZip()}
            />

            {/* modal dialog Loading */}
            <ModalLoading
              open={this.state.dialogLoading}
              handleClose={() => this.setState({ dialogLoading: false })}
            />

            {/* modal dialog success */}
            <ModalSuccess
              open={this.state.dialogSuccess}
              handleClose={() => this.setState({ dialogSuccess: false })}
            />

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
 }
export default withStyles(useStyles)(RiwayatTKP);
