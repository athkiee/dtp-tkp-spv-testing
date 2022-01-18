import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import HeadBar from "../../constant/headBar";
import { Tabs, Modal } from "antd";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import PDFViewer from "pdf-viewer-reactjs";

const { TabPane } = Tabs;
const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
    ".ant-modal-content": {
      width: 760,
    },
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
  buttonUnduh: {
    width: 216,
    height: 56,
    marginTop: 10,
    borderRadius: 15,
    background: '#D51100',
    outline: 'none',
    border: 'none',
    color: '#fff',
    fontWeight: 700,
    fontSize: 24,
    float: 'center'
  },
  detailWrapper: {
    maxWidth: 1100,
    "& .desc": {
      paddingLeft: 16,
      marginBottom: 24,
    },
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
  modalPreview: {
    width: '760px !important',
  }
});

class DetailTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalPreview: null,
      preview: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4004/tkp/216").then((response) => {
      const detail = response.data;
      this.setState({
        dataDetail: detail[0],
      });
    });
  }

  _handleDokumenPenunjang = async (value) => {
    await axios
      .get("http://localhost:4004/tkp/get_file/" + value.desc)
      .then((response) => {
        const urlDokumen = response.data;
        this.setState({
          preview: urlDokumen,
          modalPreview: true,
          modalTitle: value.title
        });
        this._renderDokumenPenunjang();
      });
      console.log('coba', value);
  };

  _renderDokumenPenunjang = (value) => {
    const { preview, modalPreview, modalTitle } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Modal
          visible={modalPreview}
          onOk={this._handleCloseModal}
          onCancel={this._handleCloseModal}
          className={classes.modalPreview}
        >
          <h2
            style={{
              fontSize: 40,
              color: "#DA1E20",
              fontWeight: "bold",
              marginTop: 15,
              textAlign: "center"
            }}
          >
            {modalTitle}
          </h2>
          <PDFViewer
            document={{
              url: preview,
            }}
            hideNavbar={true}
          />
          <button
            className={classes.buttonUnduh}
            onClick={() => window.open(preview)}
          >
            Unduh
          </button>
        </Modal>
      </div>
    );
  };

  _handleCloseModal = () => {
    this.setState({
      modalPreview: false,
      preview: "",
    });
  };

  render() {
    const { classes } = this.props;
    const { dataDetail } = this.state;
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
        desc: get(dataDetail, "tanggal_lahir") || "-",
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
        desc: get(dataDetail, "nama_lengkap") || "-",
      },
      {
        title: "Jurusan Pendidikan Terakhir",
        desc: get(dataDetail, "nama_lengkap") || "-",
      },
      {
        title: "Pengalaman Kerja",
        desc: get(dataDetail, "nama_lengkap") || "-",
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
        desc: get(dataDetail, "file_skck") || "-",
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
        desc: get(dataDetail, "tanggal_onboard") || "-",
      },
      {
        title: "Job Title Ketetapan Wawancara",
        desc: "-",
      },
      {
        title: "Mitra",
        desc: (dataDetail && dataDetail.t_mitra.nama_mitra) || "-",
      },
      {
        title: "Paket",
        desc: "-",
      },
      {
        title: "No. SP",
        desc: get(dataDetail, "no_sp") || "-",
      },
      {
        title: "Berita Acara",
        desc: "-",
      },
    ];
    console.log("rev", this.state.preview);

    return (
      <div className={classes.root}>
        <HeadBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <h1 style={{ marginLeft: 35, marginTop: 35 }}>
            <strong>Detail TKP</strong>
          </h1>
          <p style={{ marginLeft: 35 }}>Kelola data TKP pada halaman ini.</p>
          <Container maxWidth="lg" className={classes.container}>
            <h2 style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}>
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
                  <p className="desc">Coba</p>
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
                  <p className="desc">1234567</p>
                </Grid>
              </Grid>
            </div>
            <h2 style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}>
              Data Tenaga Kerja Penunjang
            </h2>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Data Diri" key="1">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
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
                  }}
                >
                  Data Pekerjaan
                </h2>
                <div className={classes.detailWrapper}>
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
                </div>
              </TabPane>
              <TabPane tab="Dokumen Penunjang" key="3">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
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
                        <a
                          className="desc"
                          onClick={this._handleDokumenPenunjang.bind(
                            this,
                            item
                          )}
                        >
                          Lihat
                        </a>
                      </Grid>
                    </Grid>
                  ))}
                </div>
                {this._renderDokumenPenunjang()}
              </TabPane>
              <TabPane tab="Data Ketetapan Wawancara" key="4">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
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
                        <p className="desc">{item.desc}</p>
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </TabPane>
              <TabPane tab="Status Terakhir" key="5">
                <h2
                  style={{
                    color: "#DA1E20",
                    fontWeight: "bold",
                    marginTop: 15,
                  }}
                >
                  Status Terakhir
                </h2>
              </TabPane>
            </Tabs>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(DetailTKP);
