import React from "react";
import { Container, Grid } from "@material-ui/core";
import HeadBar from "../../../constant/headBar";
import DragAndDrop from "../../../element/DragAndDrop";
import { withStyles } from "@material-ui/core/styles";
import { Select, Input, Breadcrumb, Button } from "antd";
import { ROUTES, API } from "../../../../configs";
import { get } from "lodash";
import axios from "axios";
import TableRow from "./TableRow";
import moment from "moment";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ModalSuccess from "../../../ModalSuccess";

const mockData = [
  {
    id: 1,
    name: "YA",
  },
  {
    id: 0,
    name: "TIDAK",
  },
];
const id_tkp = localStorage.getItem("detail_id");
const token = localStorage.getItem("token");
const nikSpv = localStorage.getItem("nik");
const namaSpv = localStorage.getItem("nama");
const emailSpv = localStorage.getItem("email");

const important = <b style={{ color: "#EE2E24" }}>*</b>;
const { Option } = Select;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  submitForm: {
    color: "white",
    borderColor: "#DA1E20",
    borderRadius: 10,
    backgroundColor: "#DA1E20",
    marginBottom: 20,
    cursor: "pointer",
    "&:hover": {
      color: "#DA1E20",
      backgroundColor: "white",
      borderColor: "#DA1E20",
    },
  },
  negativeCase: {
    color: "#EE2E24",
    fontSize: 10,
  },
  backButton: {
    display: "flex",
    padding: 2,
    color: "#8E8181",
    marginBottom: "-20px",
    cursor: "pointer",
    "& p": {
      marginLeft: 10,
    },
  },
  noteModal: {
    marginTop: "8px",
    fontSize: "14px",
    lineHeight: "12px",
    fontFamily: "Roboto",
    color: "#000000",
  },
  container1: {
    width: "100%",
    height: "auto",
    float: "left",
    marginLeft: 35,
    backgroundColor: "white",
    borderRadius: 10,
  },
  container2: {
    width: "100%",
    height: "auto",
    float: "left",
    marginTop: 20,
    marginRight: 40,
    marginBottom: 60,
    backgroundColor: "#EFEFF0",
    borderRadius: 10,
  },
  container3: {
    width: "100%",
    height: "auto",
    float: "left",
    marginTop: 20,
    marginRight: 40,
    marginBottom: 21,
    backgroundColor: "#EFEFF0",
    borderRadius: 10,
  },
  inputForm: {
    display: "block",
    paddingLeft: 10,
    borderRadius: 5,
    height: 40,
    width: "100%",
  },
  selectForm: {
    display: "block",
    borderRadius: 5,
    height: 32,
    width: 445,
  },
  detailWrapper: {
    maxWidth: "100%",
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
  },
});

class PenilaianTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      extendStatus: "",
      milestone: "step1",
      checked: "",
      checkedPromotion: "",
      file_evaluasi: "",
      error_evaluasi: "",
      nilai_evaluasi: "",
      reason_kontrak: "",
      reason_levelling: "",
      error_nilai: false,
      error_perpanjang_kontrak: false,
      error_reason_kontrak: false,
      dataTKP: [],
      datajobTitle: [],
      dataBidang: [],
      datajtLevel: [],
      datajobRole: [],
      bidang: "",
      jobTitle: "",
      jobTT: "",
      jobRole: "",
      id_job_title: "",
      modalSuccess: false
    };
  }

  async componentDidMount() {
    await axios
      .get(API.detailTkp + id_tkp + "/evaluasi-tkp", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const detailTKP = response.data;
        this.setState({
          dataTKP: detailTKP,
          nilai_evaluasi: detailTKP.total_nilai_evaluasi_kerja || "",
          checked: detailTKP.status_perpanjangan_kontrak || "",
          reason_kontrak: detailTKP.alasan_perpanjangan_kontrak || "",
          checkedPromotion: detailTKP.status_rekomendasi_naik_job_level || "",
          id_job_title: detailTKP.id_job_title_levelling_usulan || ""
        });
      });
    axios.get(API.allJobTitle).then((response) => {
      const jobTitle = response.data.map((jobTitle) => ({
        key: jobTitle.id_job_title,
        name: jobTitle.nama_job_title,
        keyRoles: jobTitle.id_kategori_job_title,
      }));
      this.setState({
        datajobTitle: jobTitle,
      });
    });
    axios.get(API.allBidang).then((response) => {
      const tribe = response.data.map((tribe) => ({
        key: tribe.id_bidang,
        name: tribe.kode_bidang,
      }));
      this.setState({
        dataBidang: tribe,
      });
    });
  }

  _handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error_nilai: false,
      error_reason_kontrak: false,
    });
  };

  _handleCheckboxExtend = (id) => {
    this.setState({
      checked: id,
      error_perpanjang_kontrak: false,
    });
  };

  _handleCheckboxPromotion = (id) => {
    this.setState({
      checkedPromotion: id,
    });
  };

  _handleSubmit1 = () => {
    let {
      checked,
      nilai_evaluasi,
      error_nilai,
      error_perpanjang_kontrak,
      extendStatus,
      milestone,
    } = this.state;
    if (nilai_evaluasi === "") {
      error_nilai = true;
    }
    if (checked === "") {
      error_perpanjang_kontrak = true;
    } else {
      extendStatus = checked;
      milestone = "step2";
    }
    this.setState({
      nilai_evaluasi,
      error_nilai,
      error_perpanjang_kontrak,
      extendStatus,
      milestone,
    });
  };

  _handleSubmitForm = () => {
    let {
      error_reason_kontrak,
      reason_kontrak,
      error_evaluasi,
      file_evaluasi,
    } = this.state;
    const formData = new FormData();
    formData.append("tanggal_evaluasi", moment());
    formData.append("total_nilai_evaluasi_kerja", this.state.nilai_evaluasi);
    formData.append("status_perpanjangan_kontrak", this.state.extendStatus);
    formData.append("alasan_perpanjangan_kontrak", this.state.reason_kontrak);
    formData.append("id_job_title_levelling_usulan", this.state.id_job_title);
    formData.append(
      "file_hasil_penilaian_kinerja_tkp",
      this.state.file_evaluasi
    );
    if (reason_kontrak === "") {
      error_reason_kontrak = true;
    }
    if (file_evaluasi === "") {
      error_evaluasi = true;
    } else {
      axios
        .put(API.detailTkp + id_tkp + "/evaluasi-tkp", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.setState({
            modalSuccess: true
          })
        });
    }
    this.setState({
      error_reason_kontrak,
      error_evaluasi,
    });
  };

  _handleSubmitForm1 = () => {
    let {
      error_reason_kontrak,
      reason_kontrak,
      error_evaluasi,
      file_evaluasi,
    } = this.state;
    const formData = new FormData();
    formData.append("tanggal_evaluasi", moment());
    formData.append("total_nilai_evaluasi_kerja", this.state.nilai_evaluasi);
    formData.append("status_perpanjangan_kontrak", this.state.extendStatus);
    formData.append("alasan_perpanjangan_kontrak", this.state.reason_kontrak);
    formData.append(
      "file_hasil_penilaian_kinerja_tkp",
      this.state.file_evaluasi
    );
    if (reason_kontrak === "") {
      error_reason_kontrak = true;
    }
    if (file_evaluasi === "") {
      error_evaluasi = true;
    } else {
      axios
        .put(API.detailTkp + id_tkp + "/evaluasi-tkp", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.setState({
            modalSuccess: true
          })
        });
    }
    this.setState({
      error_reason_kontrak,
      error_evaluasi,
    });
  };

  _handleBreadcumbs = () => {
    window.location = ROUTES.DASHBOARD();
  };

  _handleBreadcumbs2 = () => {
    window.location = ROUTES.KELOLA_EVALUASI_TKP();
  };

  _handleFilesFromDrag = (name, file) => {
    this.setState({ [name]: file, error_evaluasi: false });
  };

  _handleSelect = (name, value) => {
    this.setState({ [name]: value });
  };

  _handleBack = () => {
    this.setState({
      milestone: "step1",
      checkedPromotion: "",
    });
  };

  _onChangeJobTitle = (key, roles) => {
    axios.get(API.allJobTitleLevelling + key).then((response) => {
      const jtLevel = response.data.map((jtLevel) => ({
        key: jtLevel.id_job_title_levelling,
        name: jtLevel.nama_job_title_levelling,
      }));
      this.setState({
        datajtLevel: jtLevel,
        id_job_title: key,
      });
    });
    axios.get(API.allJobRoles + roles.roles).then((response) => {
      const jobRole = response.data.map((jobRole) => ({
        key: jobRole.id_job_role,
        name: jobRole.nama_job_role,
      }));
      this.setState({
        datajobRole: jobRole,
      });
    });
  };

  _renderMilestone1 = () => {
    const { classes } = this.props;
    const { checked, error_nilai, error_perpanjang_kontrak, nilai_evaluasi } =
      this.state;

    return (
      <Container className={classes.container2}>
        <h2
          style={{
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Tahap 1 dan 2
        </h2>
        <div style={{ margin: 20 }}>
          <label className="form-label">
            Total Nilai Evaluasi Kerja{important}
          </label>
          <Input
            variant="outlined"
            className={classes.inputForm}
            type="number"
            placeholder="Contoh: 200"
            name={"nilai_evaluasi"}
            value={nilai_evaluasi}
            onChange={this._handleChange}
          />
          <p className={classes.negativeCase}>
            {error_nilai ? "Total Nilai Evaluasi Kerja tidak boleh kosong" : ""}
          </p>
        </div>
        <div style={{ margin: 20 }}>
          <label className="form-label">
            Apakah Kontrak TKP di Perpanjang{important}
          </label>
          <div>
            <table>
              <tbody>
                {mockData.map((rowData) => (
                  <TableRow
                    key={rowData.id}
                    selectedId={checked}
                    rowData={rowData}
                    onSelect={this._handleCheckboxExtend}
                  />
                ))}
              </tbody>
            </table>
            <p className={classes.negativeCase}>
              {error_perpanjang_kontrak
                ? "Wajib pilih salah satu checkbox"
                : ""}
            </p>
          </div>
        </div>
        <div>
          <Button
            type="primary"
            className={classes.submitForm}
            onClick={this._handleSubmit1}
            disabled={nilai_evaluasi !== "" && checked !== "" ? false : true}
          >
            <strong>Berikutnya</strong>
          </Button>
        </div>
      </Container>
    );
  };

  _renderMilestone2 = () => {
    const { classes } = this.props;
    const {
      extendStatus,
      checkedPromotion,
      file_evaluasi,
      error_evaluasi,
      reason_kontrak,
      error_reason_kontrak,
      dataTKP
    } = this.state;
    console.log('asdas', dataTKP.status_rekomendasi_naik_job_level);

    if (extendStatus === 0) {
      return (
        <Container className={classes.container2}>
          <h2
            style={{
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Tahap 2 dan 2
          </h2>
          <div style={{ margin: 20 }}>
            <label className="form-label">
              Alasan Kontrak TKP tidak diperpanjang{important}
            </label>
            <Input.TextArea
              variant="outlined"
              type="text"
              name={"reason_kontrak"}
              className={classes.inputForm}
              onChange={this._handleChange}
              value={reason_kontrak}
            />
            <p className={classes.negativeCase}>
              {error_reason_kontrak
                ? "Alasan kontrak TKP tidak diperpanjang tidak boleh kosong"
                : ""}
            </p>
          </div>
          <div style={{ margin: 20 }}>
            <div>
              <label className="form-label">
                Silakan upload dokumen/file Hasil Penilaian TKP 2021 yang sudah
                di tanda tangani oleh Supervisor dan Atasan langsung Supervisor
                {important}
              </label>
              <DragAndDrop
                acceptFiles="application/pdf"
                uploadType="Penilaian Evaluasi TKP"
                onChange={this._handleFilesFromDrag.bind(this, "file_evaluasi")}
                hintError={error_evaluasi}
                value={file_evaluasi}
              />
              <p className={classes.negativeCase}>
                {error_evaluasi
                  ? "Dokumen hasil penilaian kinerja tidak boleh kosong"
                  : ""}
              </p>
            </div>
          </div>
          <div>
            <Button
              onClick={this._handleSubmitForm1}
              type="primary"
              className={classes.submitForm}
            >
              <strong>Submit</strong>
            </Button>
          </div>
        </Container>
      );
    } else if (extendStatus === 1) {
      return (
        <Container className={classes.container3}>
          <h2
            style={{
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Tahap 2 dan 2
          </h2>
          <div style={{ margin: 20 }}>
            <label className="form-label">
              Alasan Kontrak TKP Diperpanjang{important}
            </label>
            <Input.TextArea
              variant="outlined"
              type="text"
              name={"reason_kontrak"}
              className={classes.inputForm}
              onChange={this._handleChange}
              value={reason_kontrak}
            />
          </div>
          <div style={{ margin: 20 }}>
            <label className="form-label">
              Apakah TKP tersebut direkomendasikan untuk naik Job Title?
              {important}
            </label>
            <div>
              <table>
                <tbody>
                  {mockData.map((rowData) => (
                    <TableRow
                      key={rowData.id}
                      selectedId={checkedPromotion}
                      rowData={rowData}
                      onSelect={this._handleCheckboxPromotion}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      );
    }
  };

  _renderMilestone2Promotion = () => {
    const { classes } = this.props;
    const {
      file_evaluasi,
      error_evaluasi,
      datajobTitle,
      dataBidang,
      datajtLevel,
      datajobRole,
      reason_levelling,
      id_job_title,
      dataTKP,
    } = this.state;
    console.log("asdad", id_job_title);
    const optionJobTitle = datajobTitle.map((d) => (
      <Option key={d.key} roles={d.keyRoles}>
        {d.name}
      </Option>
    ));
    const optionBidang = dataBidang.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionJTlevel = datajtLevel.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionJobRole = datajobRole.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));

    return (
      <Container className={classes.container2}>
        <div style={{ margin: 20 }}>
          <label className="form-label">
            Apabila TKP direkomendasikan naik Job Title, silakan pilih usulan
            Job Title untuk 2022{important}
          </label>
        </div>
        <div style={{ margin: 20 }}>
          <label className="form-label">Bidang{important}</label>
          <Select
            className={classes.selectForm}
            placeholder=" Pilih Bidang/Tribe"
            name={"bidang"}
            onChange={this._handleSelect.bind(this, "bidang")}
          >
            {optionBidang}
          </Select>
        </div>
        <div style={{ margin: 20 }}>
          <label className="form-label">Job Title{important}</label>
          <Select
            name={"id_job_title"}
            className={classes.selectForm}
            placeholder=" Pilih Job Title Usulan"
            onChange={this._onChangeJobTitle}
            value={id_job_title}
          >
            {optionJobTitle}
          </Select>
        </div>
        <div style={{ margin: 20 }}>
          <label className="form-label">Job Title Levelling{important}</label>
          <Select
            name={"jobTT"}
            className={classes.selectForm}
            placeholder=" Pilih Job Title Level Usulan"
            onChange={this._handleSelect.bind(this, "jobTT")}
          >
            {optionJTlevel}
          </Select>
        </div>
        <div style={{ margin: 20 }}>
          <label className="form-label">Job Role{important}</label>
          <Select
            name={"jobRole"}
            className={classes.selectForm}
            placeholder=" Pilih Job Role"
            onChange={this._handleSelect.bind(this, "jobRole")}
          >
            {optionJobRole}
          </Select>
        </div>
        <div style={{ margin: 20 }}>
          <label className="form-label">
            Alasan rekomendasi kenaikan Job Title{important}
          </label>
          <Input.TextArea
            variant="outlined"
            type="text"
            className={classes.inputForm}
            name={"reason_levelling"}
            onChange={this._handleChange}
            value={reason_levelling}
          />
        </div>
        <div style={{ margin: 20 }}>
          <div>
            <label className="form-label">
              Silakan upload dokumen/file Hasil Penilaian Kinerja TKP 2021 dalam
              bentuk PDF yang sudah ditandatangani oleh Supervisor dan Atasan
              Langsung Supervisor{important}
            </label>
            <DragAndDrop
              acceptFiles="application/pdf"
              uploadType="Penilaian Evaluasi TKP"
              onChange={this._handleFilesFromDrag.bind(this, "file_evaluasi")}
              hintError={error_evaluasi}
              value={file_evaluasi}
            />
            <p className={classes.noteModal}>
              Dokumen hasil penilaian kinerja tidak boleh kosong
            </p>
          </div>
        </div>
        <div>
          <Button
            type="primary"
            className={classes.submitForm}
            onClick={this._handleSubmitForm}
          >
            <strong>Submit</strong>
          </Button>
        </div>
      </Container>
    );
  };

  _renderMilestone2NonPromotion = () => {
    const { classes } = this.props;
    const { file_evaluasi, error_evaluasi } = this.state;
    return (
      <Container className={classes.container2}>
        <div style={{ margin: 20 }}>
          <div>
            <label className="form-label">
              Silakan upload dokumen/file Hasil Penilaian Kinerja TKP 2021 dalam
              bentuk PDF yang sudah ditandatangani oleh Supervisor dan Atasan
              Langsung Supervisor{important}
            </label>
            <DragAndDrop
              acceptFiles="application/pdf"
              uploadType="Penilaian Evaluasi TKP"
              onChange={this._handleFilesFromDrag.bind(this, "file_evaluasi")}
              hintError={error_evaluasi}
              value={file_evaluasi}
            />
            <p className={classes.noteModal}>
              Dokumen hasil penilaian kinerja tidak boleh kosong
            </p>
          </div>
        </div>
        <div>
          <Button type="primary" className={classes.submitForm}>
            <strong>Submit</strong>
          </Button>
        </div>
      </Container>
    );
  };

  render() {
    const { milestone, checkedPromotion, dataTKP } = this.state;
    const { classes } = this.props;
    const namaTKP = get(dataTKP.data_tkp, "nama_lengkap");
    const bidangTKP = get(dataTKP.data_tkp, "nama_bidang");
    console.log("asdad", dataTKP);
    const listProfilerSpv = [
      {
        title: "Nama Supervisor",
        desc: namaSpv || "-",
      },
      {
        title: "NIK Supervisor",
        desc: nikSpv || "-",
      },
      {
        title: "Email",
        desc: emailSpv || "-",
      },
    ];
    const listProfilerTKP = [
      {
        title: "Nama Bidang/Tribe",
        desc: namaTKP || "-",
      },
      {
        title: "Nama Lengkap Sesuai KTP",
        desc: bidangTKP || "-",
      },
    ];

    return (
      <div className={classes.root}>
        <HeadBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <a onClick={this._handleBreadcumbs}>Beranda</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <a a onClick={this._handleBreadcumbs2}>
                Evaluasi TKP
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{
                cursor: "pointer",
                fontColor: "#DA1E20 !important",
                fontWeight: "bold",
              }}
            >
              <a>Evaluasi Penilaian Kinerja TKP</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 style={{ marginLeft: 35, marginTop: 35, fontSize: 20 }}>
            <strong>Evaluasi Penilaian Kinerja TKP 2021 TKP</strong>
          </h1>
          <p style={{ marginLeft: 35, marginBottom: 10 }}>
            Lengkapi data Evaluasi TKP dibawah ini.
          </p>
          <Container className={classes.container1}>
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
              {listProfilerSpv.map((item, idx) => (
                <Grid container key={idx}>
                  <Grid item xs={3}>
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

            <h2
              style={{
                color: "#DA1E20",
                fontWeight: "bold",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Data TKP
            </h2>
            <div className={classes.detailWrapper}>
              {listProfilerTKP.map((item, idx) => (
                <Grid container key={idx}>
                  <Grid item xs={3}>
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
            {milestone === "step2" ? (
              <div className={classes.backButton} onClick={this._handleBack}>
                <ArrowLeftOutlined />
                <p>Kembali</p>
              </div>
            ) : (
              ""
            )}
            {milestone === "step1"
              ? this._renderMilestone1()
              : milestone === "step2"
              ? this._renderMilestone2()
              : ""}
            {checkedPromotion === 1
              ? this._renderMilestone2Promotion()
              : checkedPromotion === 0
              ? this._renderMilestone2NonPromotion()
              : ""}
          </Container>
          <Container maxWidth="lg" className={classes.container}>
            <ModalSuccess
              open={this.state.modalSuccess}
              label="Data Evaluasi Berhasil disimpan!"
              handleClose={() => window.location = ROUTES.KELOLA_EVALUASI_TKP()}
            />
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PenilaianTKP);
