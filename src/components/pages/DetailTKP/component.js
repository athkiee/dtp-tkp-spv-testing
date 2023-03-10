import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DragAndDrop from "../../element/DragAndDrop";
import HeadBar from "../../constant/headBar";
import { Tabs, Modal } from "antd";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import PDFViewer from "pdf-viewer-reactjs";
import { Collapse } from "antd";
import { CaretRightOutlined, UploadOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Avatar, Breadcrumb } from "antd";
import { API, ROUTES } from "../../../configs";
import moment from "moment";
import ModalSuccess from "../../element/ModalSuccess";
import Link from "@material-ui/core/Link";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const previousPath = sessionStorage.getItem("previousPath");

const styles = (theme) => ({
  root: {
    display: "flex",
    ".ant-modal-content": {
      width: 760,
      height: 296,
      borderRadius: 10,
    },
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
  modal: {
    display: "flex",
    justifyContent: "center",
  },
  previewImage: {
    display: "block",
    width: 617,
    height: 376,
    margin: "0px auto",
  },
  containerButton: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  buttonUnduh: {
    width: "100%",
    maxWidth: 403,
    height: 43,
    margin: "10px auto",
    borderRadius: 15,
    background: "#D51100",
    outline: "none",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: 24,
    cursor: "pointer",
  },
  buttonSimpan: {
    width: 140,
    height: 43,
    marginTop: 10,
    borderRadius: 5,
    background: "#D51100",
    outline: "none",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  buttonOke: {
    width: 216,
    height: 56,
    marginTop: 10,
    borderRadius: 15,
    background: "#D51100",
    outline: "none",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: 24,
    justifyContent: "right",
  },
  detailWrapper: {
    maxWidth: 1100,
    "& .desc": {
      paddingLeft: 16,
      marginBottom: 15,
    },
    "& .descLihat": {
      paddingLeft: 16,
      marginBottom: 15,
      color: "#DA1E20",
    },
    "& .unggahskck": {
      marginLeft: 16,
      background: "#FFFFFF",
      border: "1px solid #E22529",
      borderRadius: "5px",
      color: "#D51100",
      padding: "8px",
      cursor: "pointer",
    },
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
    width: "1200px",
    height: "auto",
    float: "center",
    margin: "0px 35px 40px 35px",
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalPreview: {
    width: "760px !important",
  },
  formModal: {
    height: "50px",
  },
  noteModal: {
    marginTop: "20px",
    fontSize: "14px",
    lineHeight: "12px",
    fontFamily: "Roboto",
    color: "#a0a0a0",
  },
  headPanel: {
    display: "flex",
  },
  headPanel2: {
    marginLeft: 50,
    padding: 10,
  },
  negativeCase: {
    color: "#EE2E24",
    marginTop: "20px",
    fontSize: "14px",
    lineHeight: "12px",
    fontFamily: "Roboto",
  },
});

const pathname = sessionStorage.getItem("previousPath");

class DetailTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalPreview: null,
      modalInputSkck: null,
      modalPhoto: null,
      modalSuccess: false,
      preview: "",
      editData: false,
      dataRiwayat: [],
      error_skck: "",
      file_skck: "",
    };
  }

  async componentDidMount() {
    let id_tkp = localStorage.getItem("detail_id");
    let token = localStorage.getItem("token");
    axios
      .get(`${API.detailTkp}` + id_tkp, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const detail = response.data;
        this.setState({
          dataDetail: detail[0],
        });
      });
    axios
      .get(`${API.detailTkp}` + id_tkp + "/riwayat", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const riwayat = response.data;
        this.setState({
          dataRiwayat: riwayat,
        });
      });
  }

  _handleDokumenPenunjang = async (value) => {
    let token = localStorage.getItem("token");
    console.log("asdasdasd", value);
    if (value.title === "CV" || value.title === "Berita Acara") {
      await axios
        .get(`${API.getFile}` + value.desc, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const urlDokumen = response.data;
          this.setState({
            preview: urlDokumen,
            modalPreview: true,
            modalTitle: value.title,
          });
          this._renderDokumenPenunjang();
        });
    } else if (value.title === "SKCK") {
      await axios
        .get(`${API.getFile}` + value.desc, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const urlDokumen = response.data;
          this.setState({
            preview: urlDokumen,
            modalTitle: value.title,
          });
          if (value.desc === "") {
            this.setState({
              modalInputSkck: true,
            });
          } else {
            this.setState({
              modalPreview: true,
            });
          }
        });
    }
  };

  _handleDokumenFoto = async (value) => {
    let token = localStorage.getItem("token");
    await axios
      .get(`${API.getFile}` + value.desc, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const urlDokumen = response.data;
        this.setState({
          preview: urlDokumen,
          modalPhoto: true,
          modalTitle: value.title,
        });
        this._renderDokumenFoto();
      });
  };

  _handleFilesFromDrag = (name, file) => {
    this.setState({ [name]: file, error_skck: undefined });
  };

  _handleSubmit = () => {
    const { file_skck } = this.state;
    let id_tkp = localStorage.getItem("detail_id");
    let token = localStorage.getItem("token");
    if (file_skck === "") {
      this.setState({
        error_skck: "errorEmpty",
      });
    }
    if (file_skck.size > 2000000) {
      this.setState({
        error_skck: "errorSize",
      });
    } else {
      var payload = new FormData();
      payload.append("id_tkp", id_tkp);
      payload.append("file_skck", file_skck);
      axios
        .put(`${API.uploadSKCK}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          this.setState({
            modalInputSkck: false,
            modalSuccess: true,
          });
        });
    }
  };

  _renderModalUpload = () => {
    const { modalInputSkck, modalTitle, handleBlur, error_skck, file_skck } =
      this.state;
    const { classes } = this.props;
    console.log("test", this.state.file_skck);
    return (
      <div>
        <Modal
          visible={modalInputSkck}
          onCancel={this._handleCloseModal}
          onClose={this._handleCloseModal}
          footer={null}
          className={classes.modalPreview}
        >
          <h2
            style={{
              fontSize: 40,
              color: "#DA1E20",
              fontWeight: "bold",
              marginTop: 15,
              textAlign: "center",
            }}
          >
            {modalTitle}
          </h2>
          <div className={classes.formModal}>
            <DragAndDrop
              acceptFiles="application/pdf"
              uploadType="SKCK"
              onChange={this._handleFilesFromDrag.bind(this, "file_skck")}
              onBlur={handleBlur}
              hintError={error_skck}
              value={file_skck}
            />
          </div>
          <p className={error_skck ? classes.negativeCase : classes.noteModal}>
            {error_skck === "errorSize"
              ? "Ukuran file melebihi 2MB"
              : "Format file berupa PDF dengan maksimal ukuran 2MB"}
          </p>
          <button
            className={classes.buttonSimpan}
            onClick={this._handleSubmit.bind(this.state.file_skck)}
          >
            Simpan
          </button>
        </Modal>
      </div>
    );
  };

  _renderDokumenPenunjang = () => {
    const { preview, modalPreview, modalTitle } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Modal
          visible={modalPreview}
          onCancel={this._handleCloseModal}
          footer={null}
          className={classes.modalPreview}
        >
          <h2
            style={{
              fontSize: 40,
              color: "#DA1E20",
              fontWeight: "bold",
              marginTop: 15,
              textAlign: "center",
            }}
          >
            {modalTitle}
          </h2>
          <PDFViewer
            document={{
              url: preview,
            }}
            css={{ height: "720px" }}
            hideNavbar={true}
          />
          <div className={classes.containerButton}>
            <button
              className={classes.buttonUnduh}
              onClick={() => window.open(preview)}
            >
              Unduh
            </button>
          </div>
        </Modal>
      </div>
    );
  };

  _renderDokumenFoto = () => {
    const { preview, modalPhoto, modalTitle } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.modal}>
        <Modal
          visible={modalPhoto}
          footer={null}
          onCancel={this._handleCloseModal}
          className={classes.modalPreview}
        >
          <h2
            style={{
              fontSize: 40,
              color: "#DA1E20",
              fontWeight: "bold",
              marginTop: 15,
              textAlign: "center",
            }}
          >
            {modalTitle}
          </h2>
          <div>
            <img src={preview} alt="preview" className={classes.previewImage} />
          </div>

          <div className={classes.containerButton}>
            <button
              className={classes.buttonUnduh}
              onClick={() => window.open(preview)}
            >
              Unduh
            </button>
          </div>
        </Modal>
      </div>
    );
  };

  _handleOpenBreadcumbs = () => {
    if (previousPath === "/Dashboard") {
      window.location = ROUTES.DASHBOARD();
    } else if (previousPath === "/pengajuan-tkp/dalam-proses") {
      window.location = ROUTES.PENGAJUAN_TKP_DALAM_PROSES();
    } else {
      window.location = ROUTES.PENGAJUAN_TKP_RIWAYAT();
    }
  };

  _renderBreadcrumbs = () => {
    if (pathname === "/Dashboard") {
      return (
        <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a href="#Beranda" onClick={this._handleOpenBreadcumbs}>
              Beranda
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{
              cursor: "pointer",
              color: "#DA1E20 !important",
              fontWeight: "bold",
            }}
          >
            <a href="#Beranda">Detail TKP</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    } else if (pathname === "/pengajuan-tkp/dalam-proses") {
      return (
        <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a href="#Beranda" onClick={this._handleOpenBreadcumbs}>
              Beranda
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a href="#PermintaanTKP" onClick={this._handleOpenBreadcumbs}>
              Pengajuan TKP
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a href="#DalamProses" onClick={this._handleOpenBreadcumbs}>
              Dalam Proses
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{
              cursor: "pointer",
              color: "#D51100 !important",
              fontWeight: "bold",
            }}
          >
            <a href="#DetailTKP">Detail TKP</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    } else if (pathname === "/pengajuan-tkp/riwayat") {
      return (
        <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a href="#Beranda" onClick={this._handleOpenBreadcumbs}>
              Beranda
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a href="#DataPermintaan" onClick={this._handleOpenBreadcumbs}>
              Riwayat TKP
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{
              cursor: "pointer",
              color: "#D51100 !important",
              fontWeight: "bold",
            }}
          >
            <a href="#DetailTKP">Detail TKP</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    } else {
      return (
        <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a href="#Beranda" onClick={this._handleOpenBreadcumbs}>
              Beranda
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{
              cursor: "pointer",
              color: "#DA1E20 !important",
              fontWeight: "bold",
            }}
          >
            <a href="#Beranda">Detail TKP</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    }
  };

  _handleCloseModal = () => {
    this.setState({
      modalPreview: false,
      modalPhoto: false,
      modalInputSkck: false,
      preview: "",
      file_skck: "",
      error_skck: "",
    });
  };

  _renderPanelHeader = (value) => {
    const { classes } = this.props;
    const coba = moment(value.tanggal_perubahan).format("MMMM YYYY");
    return (
      <div className={classes.headPanel}>
        <div>
          <h3>
            <b>{value.t_job_title_levelling.nama_job_title_levelling}</b>
          </h3>
          <p style={{ color: "#E17F93" }}>
            <b>{value.jenis_perubahan}</b>
          </p>
        </div>
        <div className={classes.headPanel2}>
          <h3 style={{ color: "#DA1E20" }}>
            {coba} - {value.tanggal_habis_kontrak || "Sekarang"}
          </h3>
        </div>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { dataDetail } = this.state;
    let { dataRiwayat } = this.state;
    const startOnboard = moment(get(dataDetail, "tanggal_onboard")).format(
      "MMMM YYYY"
    );
    const TL =
      moment(get(dataDetail, "tanggal_lahir")).format("DD MMMM YYYY") !==
      "Invalid date"
        ? moment(get(dataDetail, "tanggal_lahir")).format("DD MMMM YYYY")
        : "-";

    const listTab1 = [
      {
        title: "Nama lengkap sesuai TKP",
        desc: get(dataDetail, "nama_lengkap") || "-",
      },
      {
        title: "Nomor KTP",
        desc: get(dataDetail, "no_ktp") || "-",
      },
      {
        title: "Tempat, Tanggal Lahir",
        desc: get(dataDetail, "tempat_lahir") + `, ${TL}` || "-",
      },
      {
        title: "Alamat Lengkap sesuai KTP",
        desc: get(dataDetail, "alamat_ktp") || "-",
      },
      {
        title: "Kota/Kabupaten sesuai KTP",
        desc: get(dataDetail, "kabupaten_ktp") || "-",
      },
      {
        title: "Provinsi sesuai KTP",
        desc: get(dataDetail, "provinsi_ktp") || "-",
      },
      {
        title: "E-mail Aktif",
        desc: get(dataDetail, "email") || "-",
      },
      {
        title: "Nomor Handphone Aktif",
        desc: get(dataDetail, "no_hp") || "-",
      },
      {
        title: "Nama Bank (Payroll)",
        desc: (dataDetail && dataDetail.t_bank.nama_bank) || "-",
      },
      {
        title: "Nomor Rekening",
        desc: get(dataDetail, "no_rekening") || "-",
      },
      {
        title: "Pendidikan Terakhir",
        desc:
          (dataDetail &&
            dataDetail.t_jenjang_pendidikan.nama_jenjang_pendidikan) ||
          "-",
      },
      {
        title: "Jurusan Pendidikan Terakhir",
        desc: (dataDetail && dataDetail.t_jurusan.nama_jurusan) || "-",
      },
      {
        title: "Pengalaman Kerja",
        desc:
          (dataDetail &&
            dataDetail.t_pengalaman_kerja.keterangan_pengalaman_kerja) ||
          "-",
      },
      {
        title: "Akun T-Money",
        desc: get(dataDetail, "akun_tmoney") || "-",
      },
      {
        title: "Akun Trello/Jira",
        desc: get(dataDetail, "akun_trello") || "-",
      },
    ];
    const listTab2 = [
      {
        title: "Nama Bidang/Tribe",
        desc: (dataDetail && dataDetail.t_bidang.nama_bidang) || "-",
      },
      {
        title: "Lokasi Kerja",
        desc:
          (dataDetail && dataDetail.t_lokasi_kerja.nama_lokasi_kerja) || "-",
      },
      {
        title: "Job Title Usulan",
        desc: (dataDetail && dataDetail.t_job_title.nama_job_title) || "-",
      },
      {
        title: "Job Title Levelling Usulan",
        desc:
          (dataDetail &&
            dataDetail.t_job_title_levelling.nama_job_title_levelling) ||
          "-",
      },
      {
        title: "Job Role",
        desc: (dataDetail && dataDetail.t_job_role.nama_job_role) || "-",
      },
      {
        title: "Deskripsi Pekerjaan",
        desc: get(dataDetail, "deskripsi_pekerjaan") || "-",
      },
      {
        title: "Ekspektasi THP",
        desc: get(dataDetail, "thp") || "-",
      },
    ];
    const listTab3 = [
      {
        title: "CV",
        desc: get(dataDetail, "cv") || "-",
      },
      {
        title: "Foto/Scan KTP",
        desc: get(dataDetail, "foto_scanktp") || "-",
      },
      {
        title: "SKCK",
        desc: get(dataDetail, "file_skck") || "",
      },
    ];
    const listTab4 = [
      {
        title: "Status",
        desc:
          (dataDetail &&
            dataDetail.t_kategori_status_tkp.nama_kategori_status_tkp) ||
          "-",
      },
      {
        title: "Onboard",
        desc: startOnboard !== "Invalid date" ? startOnboard : "-" || "-",
      },
      {
        title: "Job Title Ketetapan Wawancara",
        desc: (dataDetail && dataDetail.t_job_title.nama_job_title) || "-",
      },
      {
        title: "Mitra",
        desc: (dataDetail && dataDetail.t_mitra.nama_mitra) || "-",
      },
      {
        title: "Paket",
        desc: (dataDetail && dataDetail.t_paket.keterangan_paket) || "-",
      },
      {
        title: "No. SP",
        desc: get(dataDetail, "no_sp") || "-",
      },
      {
        title: "Berita Acara",
        desc: get(dataDetail, "file_berita_acara_wawancara") || "-",
      },
    ];
    const listProfiler = [
      {
        title: "Status",
        desc:
          (dataDetail &&
            dataDetail.t_kategori_status_tkp.nama_kategori_status_tkp) ||
          "-",
      },
      {
        title: "Mulai Onboard",
        desc: startOnboard !== "Invalid date" ? startOnboard : "-" || "-",
      },
      {
        title: "Mitra",
        desc: (dataDetail && dataDetail.t_mitra.nama_mitra) || "-",
      },
    ];

    const namaTkp = dataDetail && dataDetail.nama_lengkap;
    const typeAuth = localStorage.getItem("typeAuth");
    const nikSpv = localStorage.getItem("nik");
    const namaSpv = localStorage.getItem("nama");
    console.log("coba", get(dataDetail, "file_berita_acara_wawancara"));

    return (
      <div className={classes.root}>
        <HeadBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this._renderBreadcrumbs()}
          <h1 style={{ marginLeft: 35, marginTop: 26 }}>
            <strong>Detail TKP</strong>
          </h1>
          <p style={{ marginLeft: 35 }}>Kelola data TKP pada halaman ini.</p>
          <Container maxWidth="lg" className={classes.container}>
            <h2
              style={{
                color: "#DA1E20",
                fontWeight: "bold",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Data Supervisor
            </h2>
            <div className={classes.detailWrapper}>
              <Grid container>
                <Grid item xs={2}>
                  <p>Nama Supervisor</p>
                </Grid>
                <Grid item xs={0}>
                  <p>:</p>
                </Grid>
                <Grid item xs={6}>
                  <p className="desc">{namaSpv}</p>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <p>NIK Supervisor</p>
                </Grid>
                <Grid item xs={0}>
                  <p>:</p>
                </Grid>
                <Grid item xs={6}>
                  <p className="desc">{nikSpv}</p>
                </Grid>
              </Grid>
              <h2
                style={{
                  color: "#DA1E20",
                  fontWeight: "bold",
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                Data Tenaga Kerja Penunjang
              </h2>
              <Row>
                <Col
                  span={12}
                  style={{
                    borderRight: "4px solid #DA1E20",
                    marginLeft: 30,
                  }}
                >
                  <Row>
                    <Col
                      span={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        size={96}
                        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                      >
                        {namaTkp && namaTkp.charAt(0).toUpperCase()}
                      </Avatar>
                    </Col>
                    <Col span={6}>
                      <h2
                        style={{
                          color: "#DA1E20",
                          fontWeight: "bold",
                          marginTop: 15,
                          width: 200,
                        }}
                      >
                        {namaTkp}
                      </h2>
                      <p style={{ maxWidth: 200, minWidth: 200, width: 200 }}>
                        {dataDetail && dataDetail.t_bidang.kode_bidang} /{" "}
                        {dataDetail &&
                          dataDetail.t_job_title_levelling
                            .nama_job_title_levelling}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col
                  span={10}
                  style={{
                    marginLeft: 30,
                  }}
                >
                  <div className={classes.detailWrapper}>
                    {listProfiler.map((item, idx) => (
                      <Grid container key={idx}>
                        <Grid item xs={4}>
                          <p>{item.title}</p>
                        </Grid>
                        <Grid item xs={0}>
                          <p>:</p>
                        </Grid>
                        <Grid item xs={6}>
                          <p className="desc">{item.desc}</p>
                        </Grid>
                      </Grid>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Data Diri" key="1">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Data Diri TKP
                </h2>
                <div className={classes.detailWrapper}>
                  {listTab1.map((item, idx) => (
                    <Grid container key={idx}>
                      <Grid item xs={4}>
                        <p>{item.title}</p>
                      </Grid>
                      <Grid item xs={0}>
                        <p>:</p>
                      </Grid>
                      <Grid item xs={6}>
                        <p className="desc">{item.desc}</p>
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </TabPane>
              <TabPane tab="Data Pekerjaan" key="2">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Data Pekerjaan
                </h2>
                <div className={classes.detailWrapper}>
                  {typeAuth === "sekretaris" ? (
                    <>
                      {listTab2
                        .filter(
                          (listTab2) => listTab2.title !== "Ekspektasi THP"
                        )
                        .map((item, idx) => (
                          <Grid container key={idx}>
                            <Grid item xs={4}>
                              <p>{item.title}</p>
                            </Grid>
                            <Grid item xs={0}>
                              <p>:</p>
                            </Grid>
                            <Grid item xs={6}>
                              <p className="desc">{item.desc}</p>
                            </Grid>
                          </Grid>
                        ))}
                    </>
                  ) : (
                    <>
                      {listTab2.map((item, idx) => (
                        <Grid container key={idx}>
                          <Grid item xs={4}>
                            <p>{item.title}</p>
                          </Grid>
                          <Grid item xs={0}>
                            <p>:</p>
                          </Grid>
                          <Grid item xs={6}>
                            <p className="desc">{item.desc}</p>
                          </Grid>
                        </Grid>
                      ))}
                    </>
                  )}
                </div>
              </TabPane>
              <TabPane tab="Dokumen Penunjang" key="3">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Dokumen Penunjang
                </h2>
                <div className={classes.detailWrapper}>
                  {listTab3.map((item, idx) => (
                    <Grid container key={idx}>
                      <Grid item xs={4}>
                        <p>{item.title}</p>
                      </Grid>
                      <Grid item xs={0}>
                        <p>:</p>
                      </Grid>
                      <Grid item xs={6}>
                        {item.title === "SKCK" && item.desc === "" ? (
                          <button
                            className="unggahskck"
                            onClick={this._handleDokumenPenunjang.bind(
                              this,
                              item
                            )}
                          >
                            <UploadOutlined /> Unggah SKCK
                          </button>
                        ) : (
                          <Link
                            className="descLihat"
                            onClick={
                              item.title === "Foto/Scan KTP"
                                ? this._handleDokumenFoto.bind(this, item)
                                : this._handleDokumenPenunjang.bind(this, item)
                            }
                          >
                            Lihat
                          </Link>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </div>
                <ModalSuccess
                  open={this.state.modalSuccess}
                  label="Unggah Dokumen SKCK Berhasil"
                  handleClose={() => window.location.reload()}
                />
                {this._renderModalUpload()}
                {this._renderDokumenFoto()}
                {this._renderDokumenPenunjang()}
              </TabPane>
              <TabPane tab="Data Ketetapan Wawancara" key="4">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Data Ketetapan Wawancara
                </h2>
                <div className={classes.detailWrapper}>
                  {listTab4.map((item, idx) => (
                    <Grid container key={idx}>
                      <Grid item xs={4}>
                        <p>{item.title}</p>
                      </Grid>
                      <Grid item xs={0}>
                        <p>:</p>
                      </Grid>
                      <Grid item xs={6}>
                        {item.title === "Berita Acara" && item.desc !== null ? (
                          <p
                            className="descLihat"
                            onClick={this._handleDokumenPenunjang.bind(
                              this,
                              item
                            )}
                          >
                            Lihat
                          </p>
                        ) : (
                          <p className="desc">{item.desc}</p>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </div>
                {this._renderModalUpload()}
                {this._renderDokumenFoto()}
                {this._renderDokumenPenunjang()}
              </TabPane>
              <TabPane tab="Status Terakhir" key="5">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Status Terakhir
                </h2>
                <div>
                  {dataRiwayat.map((item, idx) => {
                    const listStatusTerakhir1 = [
                      {
                        title: "Status",
                        desc: (item && item.jenis_perubahan) || "-",
                      },
                      {
                        title: "Onboard",
                        desc:
                          startOnboard !== "Invalid date"
                            ? startOnboard
                            : "-" || "-",
                      },
                      {
                        title: "Job Title",
                        desc: (item && item.t_job_title.nama_job_title) || "-",
                      },
                      {
                        title: "Mitra",
                        desc: (item && item.t_mitra.nama_mitra) || "-",
                      },
                      {
                        title: "Paket",
                        desc: (item && item.t_paket.keterangan_paket) || "-",
                      },
                      {
                        title: "No. SP",
                        desc: get(item, "no_sp") || "-",
                      },
                    ];
                    const listStatusTerakhir2 = [
                      {
                        title: "Berita Acara Wawancara",
                        desc: get(item, "file_berita_acara_wawancara") || "-",
                      },
                      {
                        title: "Tanggal Habis Kontrak",
                        desc: get(item, "tanggal_habis_kontrak") || "-",
                      },
                      {
                        title: "Keterangan",
                        desc: "-",
                      },
                      {
                        title: "Form Evaluasi",
                        desc: get(item, "file_form_evaluasi") || "-",
                      },
                      {
                        title: "Tanggal Resign",
                        desc: get(item, "tanggal_resign") || "-",
                      },
                      {
                        title: "Surat Resign",
                        desc: get(item, "file_surat_resign") || "-",
                      },
                    ];
                    return (
                      <Collapse
                        bordered={false}
                        key={idx}
                        expandIcon={({ isActive }) => (
                          <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                        className="site-collapse-custom-collapse"
                        expandIconPosition={"right"}
                        ghost
                      >
                        <Panel
                          header={this._renderPanelHeader(item)}
                          key="1"
                          className="site-collapse-custom-panel"
                        >
                          <Row>
                            <Col span={12}>
                              <div className={classes.detailWrapper}>
                                {listStatusTerakhir1.map((item, idx) => (
                                  <Grid container key={idx}>
                                    <Grid item xs={4}>
                                      <p>{item.title}</p>
                                    </Grid>
                                    <Grid item xs={0}>
                                      <p>:</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <p className="desc">{item.desc}</p>
                                    </Grid>
                                  </Grid>
                                ))}
                              </div>
                            </Col>
                            <Col span={12}>
                              <div className={classes.detailWrapper}>
                                {listStatusTerakhir2.map((item, idx) => (
                                  <Grid container key={idx}>
                                    <Grid item xs={4}>
                                      <p>{item.title}</p>
                                    </Grid>
                                    <Grid item xs={0}>
                                      <p>:</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <p className="desc">{item.desc}</p>
                                    </Grid>
                                  </Grid>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </Panel>
                      </Collapse>
                    );
                  })}
                </div>
              </TabPane>
            </Tabs>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(DetailTKP);
