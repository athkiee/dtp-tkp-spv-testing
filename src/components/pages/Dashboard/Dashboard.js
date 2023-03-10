import React from "react";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import TableDashboard from "./Table";
import "./dashboard.css";
import HeadBar from "../../constant/headBar";
import {
  Select,
  Breadcrumb,
  Menu,
  Popover,
  Checkbox,
  Button,
  Dropdown,
} from "antd";
import { PushpinOutlined, DownloadOutlined } from "@ant-design/icons";
import { API } from "../../../configs";
import axios from "axios";
import fileDownload from "js-file-download";
import ModalConfirmation from "../../element/ModalConfirmation";
import ModalSuccess from "../../element/ModalSuccess";
import ModalLoading from "../../element/ModalLoading";

const drawerWidth = 240;
const { Option } = Select;

const styles = (theme) => ({
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
  filterJumlahdata: {
    display: "block",
    borderRadius: 2,
    height: 38,
    width: 73,
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
    width: "100%",
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
    marginBottom: 50,
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
});
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: 10,
      dialogConfirmation: false,
      dialogZip: false,
      dialogSuccess: false,
      dialogLoading: false,
      hiddenColumns: [],
    };
  }

  _handleFilterData = (value) => {
    this.setState({
      showData: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { showData } = this.state;
    const nikSpv = localStorage.getItem("nik");
    const token = localStorage.getItem("token");
    const nama = localStorage.getItem("nama");
    console.log(token);

    const buttonPin = (
      <Menu>
        <Menu.Item key="0">
          <Checkbox
            onChange={(e) => {
              this.setState({
                dialogConfirmation: true,
              });
            }}
          >
            Nama TKP
          </Checkbox>
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

    const handleExportCSV = () => {
      this.setState({ dialogConfirmation: true });
    };

    const handleExportZip = () => {
      this.setState({ dialogZip: true });
    };

    const getDataCSV = async () => {
      const dataCSV = await axios
        .get(`${API.getCSVTKPUnderSPV}${nikSpv}/active`, {
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
        .get(`${API.getZipTKPUnderSPV}${nikSpv}/active`, {
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

    const filterShowdata = [
      {
        key: 10,
        value: 10,
      },
      {
        key: 25,
        value: 25,
      },
      {
        key: 50,
        value: 50,
      },
      {
        key: 100,
        value: 100,
      },
    ];

    const optionJumlahData = filterShowdata.map((d) => (
      <Option key={d.key}>{d.value}</Option>
    ));

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
            <strong>Database TKP Aktif</strong>
          </h1>
          <p style={{ marginLeft: 35, marginBottom: 10 }}>
            Data dibawah ini adalah data TKP yang masih aktif
          </p>
          <Container className={classes.container}>
            <div
              style={{
                marginBottom: 20,
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <label className="form-label">Jumlah Data</label>
                <Select
                  className={classes.filterJumlahdata}
                  placeholder="10"
                  onChange={this._handleFilterData}
                >
                  {optionJumlahData}
                </Select>
              </div>
              <div style={{ marginTop: 25 }}>
                <Dropdown overlay={exportData} trigger={["click"]}>
                  <a
                    href="_black"
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
                  title={"Anda ingin Ekspor Riwayat (.csv)?"}
                  description={
                    "Proses ekspor data memerlukan waktu beberapa saat"
                  }
                  open={this.state.dialogConfirmation}
                  handleClose={() =>
                    this.setState({ dialogConfirmation: false })
                  }
                  getData={() => getDataCSV()}
                />

                {/* modal dialog confirmation zip */}
                <ModalConfirmation
                  title={"Anda ingin Ekspor Riwayat (.zip)?"}
                  description={
                    "Proses ekspor data memerlukan waktu beberapa saat"
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

                <Popover placement="bottom" content={buttonPin} trigger="click">
                  <PushpinOutlined
                    style={{
                      fontSize: 24,
                      color: "#DA1E20",
                    }}
                  />
                </Popover>
              </div>
            </div>
            <TableDashboard perPage={showData} />
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
