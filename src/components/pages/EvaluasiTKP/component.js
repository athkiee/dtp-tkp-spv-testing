import React, { useEffect, useState } from "react";
import axios from "axios";
import FileSaver from "file-saver";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TableDashboard from "./Table";
import { Select } from "antd";
import {
  DownloadOutlined,
  DownOutlined,
  SendOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Button, Breadcrumb, Dropdown, Popover, Checkbox, Menu } from "antd";
import HeadBar from "../../constant/headBar";
import { ROUTES, API } from "../../../configs";
import fileDownload from "js-file-download";
import ModalConfirmation from "../../ModalConfirmation";
import ModalSuccess from "../../ModalSuccess";
import ModalLoading from "../../ModalLoading";

const nikSpv = sessionStorage.getItem("nik");
const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    "&:active": {
      background: "#DA1E20",
      borderColor: "#DA1E20",
    },
    "&:focus": {
      background: "#DA1E20",
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
  filterJumlahdata: {
    display: "block",
    borderRadius: 2,
    height: 38,
    width: 73,
  },
}));

const _handleBreadcumbs = () => {
  window.location = ROUTES.DASHBOARD();
};

const jumlahData = (
  <Menu>
    <Menu.Item key="0">5</Menu.Item>
    <Menu.Item key="1">10</Menu.Item>
    <Menu.Item key="2">15</Menu.Item>
    <Menu.Item key="3">20</Menu.Item>
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
  const [evaluasiLink, getEvaluasi] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    downloadEvaluasi();
  }, []);

  const downloadEvaluasi = () => {
    axios
      .get(urlFormulir, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const urlEvaluasi = response.data;
        getEvaluasi(urlEvaluasi);
      });
  };

  // const getDataCSV = async () => {
  //   const nama = localStorage.getItem("nama");
  //   const dataCSV = await axios
  //     .get(`${API.getCSVTKPUnderSPV}${nikSpv}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       responseType: "blob",
  //     })
  //     .then((response) => response)
  //     .catch((error) => console.error(error));

  //   const { status, data } = dataCSV;
  //   if (status === 200) {
  //     this.setState({ dialogConfirmation: false });
  //     fileDownload(data, `tkp-riwayat-under-spv-${nama}.csv`);
  //     this.setState({ dialogSuccess: true });
  //   }
  // };

  // const getDataZip = async () => {
  //   this.setState({ dialogZip: false });
  //   this.setState({ dialogLoading: true });
  //   const nama = localStorage.getItem("nama");
  //   const dataZip = await axios
  //     .get(`${API.getZipTKPUnderSPV}${nikSpv}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       responseType: "blob",
  //     })
  //     .then((response) => response)
  //     .catch((error) => console.error(error));

  //   const { status, data } = dataZip;
  //   if (status === 200) {
  //     this.setState({ dialogLoading: false });
  //     fileDownload(data, `tkp-riwayat-under-spv-${nama}.zip`);
  //     this.setState({ dialogSuccess: true });
  //   }
  // };

  // const _handleFilterData = (value) => {
  //   this.setState({
  //     showData: value,
  //   });
  // };

  const downloadSKI = () => {
    FileSaver.saveAs(evaluasiLink.form_evaluasi_ski);
  };

  const downloadISH = () => {
    FileSaver.saveAs(evaluasiLink.form_evaluasi_ish);
  };

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
                  // onChange={this._handleFilterData}
                >
                  {optionJumlahData}
                </Select>
              </div>
            </div>
            <div style={{ marginTop: 25 }}>
              <Button style={{ marginRight: 20, borderRadius: 3, background: '#D51100', color: 'white', fontSize: 14, fontWeight: 700 }}>
                Kirim Semua
                <SendOutlined style={{ marginLeft: 40, marginBottom: 10, transform: 'rotate(-45deg)' }} />
              </Button>
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
          <TableDashboard />
        </Container>
      </main>
    </div>
  );
}
