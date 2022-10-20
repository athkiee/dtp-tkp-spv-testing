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
import ModalSuccess from "../../../element/ModalSuccess";
import Link from "@material-ui/core/Link";
import { Formik } from "formik";

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
  appBarSpacer: theme.mixins.toolbar,
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
    "&:active": {
      color: "#DA1E20",
      backgroundColor: "white",
      borderColor: "#DA1E20",
    },
    "&:focus": {
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
      allJobTitleLevelling: [],
      allJobRoles: [],
      datajobRole: [],
      bidang: "",
      jobTitle: "",
      jobTT: "",
      jobRole: "",
      id_job_title: "",
      file_name: "",
      modalSuccess: false,
      renderExtend: false,
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
          checked:
            (detailTKP && detailTKP.status_perpanjangan_kontrak) === 0
              ? 0
              : (detailTKP && detailTKP.status_perpanjangan_kontrak) || "",
          reason_kontrak: detailTKP.alasan_perpanjangan_kontrak || "",
          checkedPromotion:
            (detailTKP && detailTKP.status_rekomendasi_naik_job_level) === 0
              ? 0
              : (detailTKP && detailTKP.status_rekomendasi_naik_job_level) ||
                "",
          id_job_title:
            get(detailTKP.job_title_usulan, "id_job_title_usulan") || "",
          reason_levelling:
            (detailTKP && detailTKP.alasan_rekomendasi_naik_job_level) || "",
          bidang: get(detailTKP.bidang_usulan, "id_bidang_usulan") || "",
          jobTT:
            get(
              detailTKP.job_title_levelling_usulan,
              "id_job_title_levelling_usulan"
            ) || "",
          jobRole: get(detailTKP.job_role_usulan, "id_job_role_usulan") || "",
          file_name: detailTKP.file_hasil_penilaian_kinerja_tkp || "",
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
    // all job title leveling
    axios.get(API.allJobTitleLevelling).then((response) => {
      const jtLevel = response.data.map((jtLevel) => ({
        key: jtLevel.id_job_title_levelling,
        name: jtLevel.nama_job_title_levelling,
      }));
      this.setState({
        allJobTitleLevelling: jtLevel,
      });
    });
    // all job role
    axios.get(API.allJobRoles).then((response) => {
      const roles = response.data.map((roles) => ({
        key: roles.id_job_role,
        name: roles.nama_job_role,
      }));
      this.setState({
        allJobRoles: roles,
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
      renderExtend,
    } = this.state;
    if (nilai_evaluasi === "") {
      error_nilai = true;
    }
    if (checked === "") {
      error_perpanjang_kontrak = true;
    } else {
      extendStatus = checked;
      milestone = "step2";
      renderExtend = true;
    }
    this.setState({
      nilai_evaluasi,
      error_nilai,
      error_perpanjang_kontrak,
      extendStatus,
      milestone,
      renderExtend,
    });
  };

  _handleSubmitForm = () => {
    let {
      error_reason_kontrak,
      reason_kontrak,
      error_evaluasi,
      file_evaluasi,
      file_name,
    } = this.state;
    const formData = new FormData();
    formData.append("tanggal_evaluasi", moment());
    formData.append("nik_spv", nikSpv);
    formData.append("total_nilai_evaluasi_kerja", this.state.nilai_evaluasi);
    formData.append("status_perpanjangan_kontrak", this.state.extendStatus);
    formData.append("alasan_perpanjangan_kontrak", this.state.reason_kontrak);
    formData.append("id_job_title_usulan", this.state.id_job_title);
    formData.append(
      "status_rekomendasi_naik_job_level",
      this.state.checkedPromotion
    );
    formData.append(
      "alasan_rekomendasi_naik_job_level",
      this.state.reason_levelling
    );
    formData.append("id_bidang_usulan", this.state.bidang);
    formData.append("id_job_title_levelling_usulan", this.state.jobTT);
    formData.append("id_job_role_usulan", this.state.jobRole);
    formData.append(
      "file_hasil_penilaian_kinerja_tkp",
      this.state.file_evaluasi
    );
    if (reason_kontrak === "") {
      error_reason_kontrak = true;
    }
    if (file_evaluasi === "" && file_name === "") {
      error_evaluasi = true;
    } else {
      axios
        .put(API.detailTkp + id_tkp + "/evaluasi-tkp", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.setState({
            modalSuccess: true,
          });
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
      file_name,
    } = this.state;
    const formData = new FormData();
    formData.append("tanggal_evaluasi", moment());
    formData.append("total_nilai_evaluasi_kerja", this.state.nilai_evaluasi);
    formData.append("status_perpanjangan_kontrak", this.state.extendStatus);
    formData.append("alasan_perpanjangan_kontrak", this.state.reason_kontrak);
    formData.append(
      "status_rekomendasi_naik_job_level",
      this.state.checkedPromotion
    );
    formData.append(
      "file_hasil_penilaian_kinerja_tkp",
      this.state.file_evaluasi
    );
    if (reason_kontrak === "") {
      error_reason_kontrak = true;
    }
    if (file_evaluasi === "" && file_name === "") {
      error_evaluasi = true;
    } else {
      axios
        .put(API.detailTkp + id_tkp + "/evaluasi-tkp", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          this.setState({
            modalSuccess: true,
          });
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
    this.setState({
      [name]: file,
      file_name: file?.name,
      error_evaluasi: false,
    });
  };

  _handleSelect = (name, value) => {
    this.setState({ [name]: value });
  };

  _handleBack = () => {
    this.setState({
      milestone: "step1",
      renderExtend: false,
      error_evaluasi: false,
      error_perpanjang_kontrak: false,
      error_reason_kontrak: false,
    });
  };

  _onChangeJobTitle = (key, roles) => {
    axios.get(API.allJobTitleLevelling + key).then((response) => {
      const jtLevel = response.data.map((jtLevel) => ({
        key: jtLevel.id_job_title_levelling,
        name: jtLevel.nama_job_title_levelling,
      }));
      this.setState({
        id_job_title: key,
        allJobTitleLevelling: jtLevel,
        jobTT: "",
        jobRole: "",
      });
    });
    axios.get(API.allJobRoles + roles.roles).then((response) => {
      const roles = response.data.map((jobRole) => ({
        key: jobRole.id_job_role,
        name: jobRole.nama_job_role,
      }));
      this.setState({
        allJobRoles: roles,
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
            Apakah kontrak TKP diperpanjang{important}
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
      file_name,
      error_evaluasi,
      reason_kontrak,
      error_reason_kontrak,
    } = this.state;

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
                Silakan upload dokumen/file Hasil Penilaian TKP{" "}
                {new Date().getFullYear()} yang sudah di tanda tangani oleh
                Supervisor dan Atasan langsung Supervisor
                {important}
              </label>
              <DragAndDrop
                acceptFiles="application/pdf"
                uploadType="Penilaian Evaluasi TKP"
                onChange={this._handleFilesFromDrag.bind(this, "file_evaluasi")}
                hintError={error_evaluasi ? true : false}
                value={file_evaluasi}
                name={file_name}
              />
              <p className={classes.negativeCase}>
                {error_evaluasi
                  ? "Dokumen Hasil Penilaian Kinerja TKP tidak boleh kosong"
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
            <p className={classes.negativeCase}>
              {error_reason_kontrak
                ? "Alasan kontrak TKP diperpanjang tidak boleh kosong"
                : ""}
            </p>
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
      reason_levelling,
      id_job_title,
      bidang,
      jobTT,
      jobRole,
      file_name,
      allJobTitleLevelling,
      allJobRoles,
    } = this.state;

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
            value={bidang}
          >
            {dataBidang.map((data) => (
              <Select.Option key={data.key} value={data.key}>
                {data.name}
              </Select.Option>
            ))}
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
            {datajobTitle.map((data) => (
              <Select.Option
                key={data.key}
                value={data.key}
                roles={data.keyRoles}
              >
                {data.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ margin: 20 }}>
          <label className="form-label">Job Title Levelling{important}</label>
          <Select
            name={"jobTT"}
            className={classes.selectForm}
            placeholder=" Pilih Job Title Level Usulan"
            onChange={this._handleSelect.bind(this, "jobTT")}
            value={jobTT}
          >
            {allJobTitleLevelling.map((data) => (
              <Select.Option key={data.key} value={data.key}>
                {data.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ margin: 20 }}>
          <label className="form-label">Job Role{important}</label>
          <Select
            name={"jobRole"}
            className={classes.selectForm}
            placeholder=" Pilih Job Role"
            onChange={this._handleSelect.bind(this, "jobRole")}
            value={jobRole}
          >
            {allJobRoles.map((data) => (
              <Select.Option key={data.key} value={data.key}>
                {data.name}
              </Select.Option>
            ))}
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
              Silakan upload dokumen/file Hasil Penilaian Kinerja TKP{" "}
              {new Date().getFullYear()} dalam bentuk PDF yang sudah
              ditandatangani oleh Supervisor dan Atasan Langsung Supervisor
              {important}
            </label>
            <DragAndDrop
              acceptFiles="application/pdf"
              uploadType="Penilaian Evaluasi TKP"
              onChange={this._handleFilesFromDrag.bind(this, "file_evaluasi")}
              hintError={error_evaluasi ? true : false}
              value={file_evaluasi}
              name={file_name}
            />
            <p className={classes.negativeCase}>
              {error_evaluasi
                ? "Dokumen Hasil Penilaian Kinerja TKP tidak boleh kosong"
                : ""}
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
    const { file_evaluasi, error_evaluasi, file_name } = this.state;
    return (
      <Container className={classes.container2}>
        <div style={{ margin: 20 }}>
          <div>
            <label className="form-label">
              Silakan upload dokumen/file Hasil Penilaian Kinerja TKP{" "}
              {new Date().getFullYear()} dalam bentuk PDF yang sudah
              ditandatangani oleh Supervisor dan Atasan Langsung Supervisor
              {important}
            </label>
            <DragAndDrop
              acceptFiles="application/pdf"
              uploadType="Penilaian Evaluasi TKP"
              onChange={this._handleFilesFromDrag.bind(this, "file_evaluasi")}
              hintError={error_evaluasi ? true : false}
              value={file_evaluasi}
              name={file_name}
            />
            <p className={classes.negativeCase}>
              {error_evaluasi
                ? "Dokumen Hasil Penilaian Kinerja TKP tidak boleh kosong"
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
  };

  render() {
    const { milestone, checkedPromotion, dataTKP, extendStatus, renderExtend } =
      this.state;
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
        title: "Nama Lengkap Sesuai KTP",
        desc: namaTKP || "-",
      },
      {
        title: "Nama Bidang/Tribe",
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
              <Link onClick={this._handleBreadcumbs}>Beranda</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <Link a onClick={this._handleBreadcumbs2}>
                Evaluasi TKP
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{
                cursor: "pointer",
                fontColor: "#DA1E20 !important",
                fontWeight: "bold",
              }}
            >
              <Link>Evaluasi Penilaian Kinerja TKP</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 style={{ marginLeft: 35, marginTop: 35, fontSize: 20 }}>
            <strong>
              Evaluasi Penilaian Kinerja TKP DXB {new Date().getFullYear()}
            </strong>
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
            {checkedPromotion === 1 && extendStatus === 1 && renderExtend
              ? this._renderMilestone2Promotion()
              : checkedPromotion === 0 && extendStatus === 1 && renderExtend
              ? this._renderMilestone2NonPromotion()
              : ""}
          </Container>
          <Container maxWidth="lg" className={classes.container}>
            <ModalSuccess
              open={this.state.modalSuccess}
              label="Data Evaluasi Berhasil disimpan!"
              handleClose={() =>
                (window.location = ROUTES.KELOLA_EVALUASI_TKP())
              }
            />
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PenilaianTKP);
