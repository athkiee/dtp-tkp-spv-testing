import React from "react";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import TableRiwayat from "./Table";
import HeadBar from "../../../constant/headBar";
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
import { API, ROUTES } from "../../../../configs";
import axios from "axios";
import fileDownload from "js-file-download";
import ModalConfirmation from "../../../element/ModalConfirmation";
import ModalSuccess from "../../../element/ModalSuccess";
import ModalLoading from "../../../element/ModalLoading";
import Link from "@material-ui/core/Link";

const { Option } = Select;

const styles = (theme) => ({
  root: {
    display: "flex",
    fontFamily: "Roboto",
  },
  filterJumlahdata: {
    display: "block",
    borderRadius: 2,
    height: 38,
    width: 73,
  },
  filterStatus: {
    display: "block",
    borderRadius: 2,
    height: 38,
    width: 200,
  },
  content: {
    width: "100%",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#E5E5E5",
  },
  appBarSpacer: theme.mixins.toolbar,
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
});
class RiwayatTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: 10,
      dialogConfirmation: false,
      dialogZip: false,
      dialogSuccess: false,
      dialogLoading: false,
      fStatus: "",
    };
  }

  _handleFilterData = (value) => {
    this.setState({
      showData: value,
    });
  };

  _handleFilterStatus = (value) => {
    this.setState({
      fStatus: value,
    });
  };

  _handleBreadcumbs = () => {
    window.location = ROUTES.DASHBOARD();
  };

  render() {
    const { classes } = this.props;
    const { showData, fStatus } = this.state;
    const nikSpv = localStorage.getItem("nik");
    const token = localStorage.getItem("token");
    const nama = localStorage.getItem("nama");

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
        fileDownload(data, `tkp-riwayat-under-spv-${nama}.csv`);
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
        fileDownload(data, `tkp-riwayat-under-spv-${nama}.zip`);
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

    const filterStatus = [
      {
        key: "",
        value: "Semua",
      },
      {
        key: "Menunggu Konfirmasi",
        value: "Menunggu Konfirmasi",
      },
      {
        key: "Wawancara",
        value: "Wawancara",
      },
      {
        key: "Diterima",
        value: "Diterima",
      },
      {
        key: "Ditolak",
        value: "Ditolak",
      },
      {
        key: "Resign",
        value: "Resign",
      },
      {
        key: "Perubahan Job Title",
        value: "Perubahan Job Title",
      },
      {
        key: "Kontrak Tidak Diperpanjang",
        value: "Kontrak Tidak Diperpanjang",
      },
    ];

    const optionJumlahData = filterShowdata.map((d) => (
      <Option key={d.key}>{d.value}</Option>
    ));
    const optionStatus = filterStatus.map((d) => (
      <Option key={d.key}>{d.value}</Option>
    ));

    return (
      <div className={classes.root}>
        <HeadBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <Link onClick={this._handleBreadcumbs}>Beranda</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <Link>Pengajuan TKP</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{
                cursor: "pointer",
                fontColor: "#DA1E20 !important",
                fontWeight: "bold",
              }}
            >
              <Link>Riwayat</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 style={{ marginLeft: 35, marginTop: 10, fontSize: 20 }}>
            <strong>Riwayat</strong>
          </h1>
          <p style={{ marginLeft: 35, marginBottom: 10 }}>
            Kelola data TKP pada halaman ini.
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
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: 30 }}>
                  <label className="form-label">Jumlah Data</label>
                  <Select
                    className={classes.filterJumlahdata}
                    placeholder="10"
                    onChange={this._handleFilterData}
                  >
                    {optionJumlahData}
                  </Select>
                </div>
                <div>
                  <label className="form-label">Status</label>
                  <Select
                    className={classes.filterStatus}
                    placeholder="Semua"
                    onChange={this._handleFilterStatus}
                  >
                    {optionStatus}
                  </Select>
                </div>
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
            <TableRiwayat perPage={showData} filterStat={fStatus} />
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RiwayatTKP);
