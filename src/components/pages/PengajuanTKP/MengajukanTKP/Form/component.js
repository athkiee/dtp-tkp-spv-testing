import React from "react";
import Container from "@material-ui/core/Container";
import DragAndDrop from "../../../../element/DragAndDrop";
import HeadBar from "../../../../constant/headBar";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Select, Input, DatePicker, Modal, Breadcrumb } from "antd";
import { Formik } from "formik";
import moment from "moment";
import { ROUTES } from "../../../../../configs";

const { Option } = Select;
const dateFormatList = ["DD/MM/YYYY"];
const { TextArea } = Input;

const drawerWidth = 240;

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
  submitForm: {
    color: "white",
    borderColor: "#DA1E20",
    borderRadius: 10,
    backgroundColor: "#DA1E20",
    "&:hover": {
      color: "#DA1E20",
      backgroundColor: "white",
      borderColor: "#DA1E20",
    },
  },
  containerTataCara: {
    width: "100%",
    height: "auto",
    float: "left",
    marginLeft: 35,
    backgroundColor: "white",
    borderRadius: 10,
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
  negativeCase: {
    color: "#EE2E24",
  },
  inputForm: {
    display: "block",
    paddingLeft: 10,
    borderRadius: 2,
    height: 40,
    width: "100%",
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

class FormPengajuanTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataLokasiKerja: [],
      dataProvinsi: [],
      dataBidang: [],
      dataKota: [],
      dataBank: [],
      dataJurusan: [],
      datajobTitle: [],
      datajtLevel: [],
      datajobRole: [],
      dataExperience: [],
      dataPendidikan: [],
      nik_spv: "",
      nama_lengkap: "",
      no_ktp: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      alamat_ktp: "",
      provinsi_ktp: "",
      kabupaten_ktp: "",
      email: "",
      no_hp: "",
      id_bank: "",
      no_rekening: "",
      id_jenjang_pendidikan: "",
      id_jurusan: "",
      id_pengalaman_kerja: "",
      akun_tmoney: "",
      akun_trello: "",
      id_bidang: "",
      id_lokasi_kerja: "",
      id_job_title: "",
      id_kelompok_pekerjaan: "",
      id_job_role: "",
      deskripsi_pekerjaan: "",
      thp: "",
      keyRoles: "",
      cv: "",
      foto_scanktp: "",
      file_skck: "",
      id_mitra: "1",
      id_paket: "1",
      id_status_tkp: "1",
      status_tkp: "Menunggu Konfirmasi",
    };
  }

  componentDidMount() {
    axios
      .get("http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => {
        const prov = response.data.map((prov) => ({
          key: prov.id,
          name: prov.name,
        }));
        this.setState({
          dataProvinsi: prov,
        });
      });
    axios.get("http://localhost:4004/bidang/").then((response) => {
      const tribe = response.data.map((tribe) => ({
        key: tribe.id_bidang,
        name: tribe.kode_bidang,
      }));
      this.setState({
        dataBidang: tribe,
      });
    });
    axios.get("http://localhost:4004/lokasi_kerja/").then((response) => {
      const loker = response.data.map((loker) => ({
        key: loker.id_lokasi_kerja,
        name: loker.nama_lokasi_kerja,
      }));
      this.setState({
        dataLokasiKerja: loker,
      });
    });
    axios.get("http://localhost:4004/bank").then((response) => {
      const bank = response.data.map((bank) => ({
        key: bank.id_bank,
        name: bank.nama_bank,
      }));
      this.setState({
        dataBank: bank,
      });
    });
    axios.get("http://localhost:4004/jurusan").then((response) => {
      const jurusan = response.data.map((jurusan) => ({
        key: jurusan.id_jurusan,
        name: jurusan.nama_jurusan,
      }));
      this.setState({
        dataJurusan: jurusan,
      });
    });
    axios.get("http://localhost:4004/job_title").then((response) => {
      const jobTitle = response.data.map((jobTitle) => ({
        key: jobTitle.id_job_title,
        name: jobTitle.nama_job_title,
        keyRoles: jobTitle.id_kategori_job_title,
      }));
      this.setState({
        datajobTitle: jobTitle,
      });
    });
    axios.get("http://localhost:4004/pengalaman_kerja/").then((response) => {
      const experience = response.data.map((experience) => ({
        key: experience.id_pengalaman_kerja,
        name: experience.keterangan_pengalaman_kerja,
      }));
      this.setState({
        dataExperience: experience,
      });
    });
    axios.get("http://localhost:4004/jenjang_pendidikan").then((response) => {
      const jenjangPendidikan = response.data.map((jenjangPendidikan) => ({
        key: jenjangPendidikan.id_jenjang_pendidikan,
        name: jenjangPendidikan.nama_jenjang_pendidikan,
      }));
      this.setState({
        dataPendidikan: jenjangPendidikan,
      });
    });
    this.setState({
      nik_spv: sessionStorage.getItem("nik"),
    });
  }

  _onChangeProvinsi = (key, value) => {
    axios
      .get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${value.key}.json`
      )
      .then((response) => {
        const kota = response.data.map((kota) => ({
          key: kota.id,
          name: kota.name,
        }));
        this.setState({
          dataKota: kota,
          provinsi_ktp: value.value,
        });
      });
  };

  _onChangeJobTitle = (key, roles) => {
    axios
      .get(`http://localhost:4004/job_title_levelling/${key}`)
      .then((response) => {
        const jtLevel = response.data.map((jtLevel) => ({
          key: jtLevel.id_job_title_levelling,
          name: jtLevel.nama_job_title_levelling,
        }));
        this.setState({
          datajtLevel: jtLevel,
          id_job_title: key,
        });
      });
    axios
      .get(`http://localhost:4004/job_role/${roles.roles}`)
      .then((response) => {
        const jobRole = response.data.map((jobRole) => ({
          key: jobRole.id_job_role,
          name: jobRole.nama_job_role,
        }));
        this.setState({
          datajobRole: jobRole,
        });
      });
  };

  _handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  _handleChangeDate = (date, dateString) => {
    this.setState({
      tanggal_lahir: dateString,
    });
  };

  _handleBreadcumbs = () => {
    window.location = ROUTES.DASHBOARD();
  };

  _handleSelect = (name, value) => {
    this.setState({ [name]: value });
  };

  _handleFilesFromDrag = (name, file) => {
    this.setState({ [name]: file });
  };

  _renderModalInfo = () => {
    Modal.success({
      content: "Pengajuan TKP Anda telah berhasil",
      onOk() {},
    });
  };

  render() {
    const { classes } = this.props;
    const {
      nik_spv,
      nama_lengkap,
      no_ktp,
      tempat_lahir,
      tanggal_lahir,
      alamat_ktp,
      provinsi_ktp,
      kabupaten_ktp,
      email,
      no_hp,
      id_bank,
      no_rekening,
      id_jenjang_pendidikan,
      id_jurusan,
      id_pengalaman_kerja,
      akun_tmoney,
      akun_trello,
      id_bidang,
      id_lokasi_kerja,
      id_job_title,
      id_kelompok_pekerjaan,
      id_job_role,
      deskripsi_pekerjaan,
      thp,
      cv,
      foto_scanktp,
      file_skck,
      dataProvinsi,
      dataBidang,
      dataLokasiKerja,
      dataKota,
      dataBank,
      dataJurusan,
      datajobTitle,
      datajtLevel,
      datajobRole,
      dataExperience,
      dataPendidikan,
      id_mitra,
      id_paket,
      id_status_tkp,
      status_tkp,
    } = this.state;

    const body = {
      nik_spv,
      nama_lengkap,
      no_ktp,
      tempat_lahir,
      tanggal_lahir,
      alamat_ktp,
      provinsi_ktp,
      kabupaten_ktp,
      email,
      no_hp,
      id_bank,
      no_rekening,
      id_jenjang_pendidikan,
      id_jurusan,
      id_pengalaman_kerja,
      akun_tmoney,
      akun_trello,
      id_bidang,
      id_lokasi_kerja,
      id_job_title,
      id_kelompok_pekerjaan,
      id_job_role,
      deskripsi_pekerjaan,
      thp,
      cv,
      foto_scanktp,
      file_skck,
    };
    const optionProvinsi = dataProvinsi.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionBidang = dataBidang.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionLokasi = dataLokasiKerja.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionKota = dataKota.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionBank = dataBank.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionJurusan = dataJurusan.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionJobTitle = datajobTitle.map((d) => (
      <Option key={d.key} roles={d.keyRoles}>
        {d.name}
      </Option>
    ));
    const optionJTlevel = datajtLevel.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionJobRole = datajobRole.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionExperience = dataExperience.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionJenjang = dataPendidikan.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const namaSpv = sessionStorage.getItem("nama");
    const important = <b style={{ color: "#EE2E24" }}>*</b>;
    // console.log('testing', cv);

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
              <a>Pengajuan TKP</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{
                cursor: "pointer",
                fontColor: "#DA1E20 !important",
                fontWeight: "bold",
              }}
            >
              <a>Ajukan TKP</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 style={{ marginLeft: 35, marginTop: 35, fontSize: 20 }}>
            <strong>Mengajukan Formulir TKP</strong>
          </h1>
          <p style={{ marginLeft: 35, marginBottom: 10 }}>
            Ajukan data diri lengkap TKP dibawah ini.
          </p>
          <Container className={classes.containerTataCara}>
            <Formik
              enableReinitialize
              initialValues={body}
              validate={(values) => {
                const errors = {};
                if (!values.nama_lengkap) {
                  errors.nama_lengkap =
                    "Nama Lengkap sesuai KTP tidak boleh kosong";
                }
                if (!values.no_ktp) {
                  errors.no_ktp = "Nomor KTP tidak boleh kosong";
                }
                if (!values.tempat_lahir) {
                  errors.tempat_lahir = "Tempat lahir tidak boleh kosong";
                }
                if (!values.alamat_ktp) {
                  errors.alamat_ktp =
                    "Alamat Lengkap sesuai KTP tidak boleh kosong";
                }
                if (!values.provinsi_ktp) {
                  errors.provinsi_ktp =
                    "Provinsi sesuai KTP tidak boleh kosong";
                }
                if (!values.kabupaten_ktp) {
                  errors.kabupaten_ktp =
                    "Kota/Kabupaten sesuai KTP tidak boleh kosong";
                }
                if (!values.kabupaten_ktp) {
                  errors.kabupaten_ktp =
                    "Kota/Kabupaten sesuai KTP tidak boleh kosong";
                }
                if (!values.no_hp) {
                  errors.no_hp = "Nomor Handphone tidak boleh kosong";
                } else if (
                  !/^(\+62|62|0)8[1-9][0-9]{6,9}$/i.test(values.no_hp)
                ) {
                  errors.no_hp = "Nomor Handphone tidak valid";
                }
                if (!values.id_bank) {
                  errors.id_bank = "Nama Bank tidak boleh kosong";
                }
                if (!values.no_rekening) {
                  errors.no_rekening = "Nomor Rekening tidak boleh kosong";
                }
                if (!values.id_jenjang_pendidikan) {
                  errors.id_jenjang_pendidikan =
                    "Pendidikan Terakhir tidak boleh kosong";
                }
                if (!values.id_jurusan) {
                  errors.id_jurusan =
                    "Jurusan Pendidikan Terakhir tidak boleh kosong";
                }
                if (!values.id_pengalaman_kerja) {
                  errors.id_pengalaman_kerja =
                    "Pengalaman Kerja tidak boleh kosong";
                }
                if (!values.kabupaten_ktp) {
                  errors.kabupaten_ktp =
                    "Kota/Kabupaten sesuai KTP tidak boleh kosong";
                }
                if (!values.id_bidang) {
                  errors.id_bidang = "Nama Bidang/Tribe tidak boleh kosong";
                }
                if (!values.id_lokasi_kerja) {
                  errors.id_lokasi_kerja = "Lokasi Kerja tidak boleh kosong";
                }
                if (!values.id_job_title) {
                  errors.id_job_title = "Job Title Usulan tidak boleh kosong";
                }
                if (!values.id_kelompok_pekerjaan) {
                  errors.id_job_title_levelling =
                    "Job Title Level Usulan tidak boleh kosong";
                }
                if (!values.id_job_role) {
                  errors.id_kategori_job_title = "Job Role tidak boleh kosong";
                }
                if (!values.deskripsi_pekerjaan) {
                  errors.deskripsi_pekerjaan =
                    "Deskripsi Pekerjaan tidak boleh kosong";
                }
                if (!values.thp) {
                  errors.thp = "Ekspektasi THP tidak boleh kosong";
                }
                if (!values.cv) {
                  errors.cv = "CV tidak boleh kosong";
                }
                if (!values.foto_scanktp) {
                  errors.foto_scanktp = "Scan KTP tidak boleh kosong";
                }
                if (!values.email) {
                  errors.email = "Email Aktif tidak boleh kosong";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Email Aktif tidak valid";
                }
                if (!values.akun_tmoney) {
                  errors.akun_tmoney = "Akun T-Money tidak boleh kosong";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    values.akun_tmoney
                  )
                ) {
                  errors.akun_tmoney = "Akun T-Money tidak valid";
                }
                if (!values.akun_trello) {
                  errors.akun_trello = "Akun Trello/Jira tidak boleh kosong";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    values.akun_trello
                  )
                ) {
                  errors.akun_trello = "Akun Trello/Jira tidak valid";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                var formData = new FormData();
                formData.append("nama_lengkap", this.state.nama_lengkap);
                formData.append("email", this.state.email);
                formData.append("password", this.state.password);
                formData.append("id_status_tkp", this.state.id_status_tkp);
                formData.append("id_bidang", this.state.id_bidang);
                formData.append("id_job_title", this.state.id_job_title);
                formData.append("id_job_role", this.state.id_job_role);
                formData.append("id_mitra", this.state.id_mitra);
                formData.append("id_paket", this.state.id_paket);
                formData.append("no_sp", this.state.no_sp);
                formData.append("tempat_lahir", this.state.tempat_lahir);
                formData.append("jenis_kelamin", this.state.jenis_kelamin);
                formData.append("alamat_ktp", this.state.alamat_ktp);
                formData.append("id_bank", this.state.id_bank);
                formData.append("no_rekening", this.state.no_rekening);
                formData.append(
                  "id_jenjang_pendidikan",
                  this.state.id_jenjang_pendidikan
                );
                formData.append("provinsi_ktp", this.state.provinsi_ktp);
                formData.append("kabupaten_ktp", this.state.kabupaten_ktp);
                formData.append("id_jurusan", this.state.id_jurusan);
                formData.append(
                  "lembaga_pendidikan",
                  this.state.lembaga_pendidikan
                );
                formData.append("akun_tmoney", this.state.akun_tmoney);
                formData.append("akun_trello", this.state.akun_trello);
                formData.append(
                  "deskripsi_pekerjaan",
                  this.state.deskripsi_pekerjaan
                );
                formData.append("thp", this.state.thp);
                formData.append("nota_dinas", this.state.nota_dinas);
                formData.append("bulan_onboard", this.state.bulan_onboard);
                formData.append("no_hp", this.state.no_hp);
                formData.append("id_lokasi_kerja", this.state.id_lokasi_kerja);
                formData.append(
                  "id_pengalaman_kerja",
                  this.state.id_pengalaman_kerja
                );
                formData.append("no_ktp", this.state.no_ktp);
                formData.append("nik_spv", this.state.nik_spv);
                formData.append("tahun_onboard", this.state.tahun_onboard);
                formData.append("status_tkp", this.state.status_tkp);
                formData.append("tanggal_lahir", this.state.tanggal_lahir);
                formData.append("id_mitra", this.state.id_mitra);
                formData.append("id_paket", this.state.id_paket);

                formData.append("cv", this.state.cv);
                formData.append("foto_scanktp", this.state.foto_scanktp);
                formData.append("file_skck", this.state.file_skck);

                // Display the key/value pairs
                for (var pair of formData.entries()) {
                  console.log(pair[0] + ", " + pair[1]);
                }

                await axios
                  .post("http://localhost:4004/tkp/register", formData, {
                    headers: {
                      "Content-Type":
                        "multipart/form-data; boundary=--------------------------somestring123abcdefg",
                    },
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      axios
                        .post(
                          "http://localhost:4004/register-file-upload",
                          "lol",
                          {
                            headers: {
                              "Content-Type":
                                "multipart/form-data; boundary=--------------------------somestring123abcdefg",
                            },
                          }
                        )
                        .then((res) => {
                          if (res.status == 200) {
                            Modal.success({
                              content: "Pengajuan TKP Anda telah berhasil",
                              onOk() {},
                            });
                            console.log("OK!", values);
                          } else {
                            console.log("File upload gagal!", values);
                          }
                        });
                    }
                  });
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <h2
                    style={{
                      color: "#DA1E20",
                      fontWeight: "bold",
                      marginTop: 15,
                    }}
                  >
                    Data Supervisor
                  </h2>
                  <div style={{ marginBottom: 40 }}>
                    <label className="form-label">Nama Supervisor</label>
                    <Input
                      id="outlined-basic"
                      variant="outlined"
                      className={classes.inputForm}
                      type="text"
                      name="name"
                      value={namaSpv}
                      disabled
                    />
                  </div>
                  <div style={{ marginBottom: 40 }}>
                    <label className="form-label">NIK Supervisor</label>
                    <Input
                      id="outlined-basic"
                      variant="outlined"
                      className={classes.inputForm}
                      type="number"
                      name="nik_spv"
                      value={values.nik_spv}
                      disabled
                    />
                  </div>
                  <h2
                    style={{
                      color: "#DA1E20",
                      fontWeight: "bold",
                      marginTop: 15,
                    }}
                  >
                    Data Diri Calon TKP
                  </h2>
                  <Grid container>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Nama Lengkap sesuai KTP{important}
                        </label>
                        <Input
                          variant="outlined"
                          className={classes.inputForm}
                          placeholder="Contoh: John Doe"
                          type="text"
                          name={"nama_lengkap"}
                          onChange={this._handleChange}
                          onBlur={handleBlur}
                          value={values.nama_lengkap}
                        />
                        <p className={classes.negativeCase}>
                          {errors.nama_lengkap &&
                            touched.nama_lengkap &&
                            errors.nama_lengkap}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Nomor KTP{important}
                        </label>
                        <Input
                          variant="outlined"
                          className={classes.inputForm}
                          placeholder="Contoh: 34673268328239232"
                          type="number"
                          name={"no_ktp"}
                          onChange={this._handleChange}
                          onBlur={handleBlur}
                          value={values.no_ktp}
                        />
                        <p className={classes.negativeCase}>
                          {errors.no_ktp && touched.no_ktp && errors.no_ktp}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Tempat Lahir{important}
                        </label>
                        <Input
                          variant="outlined"
                          className={classes.inputForm}
                          type="text"
                          name={"tempat_lahir"}
                          onChange={this._handleChange}
                          onBlur={handleBlur}
                          value={values.tempat_lahir}
                        />
                        <p className={classes.negativeCase}>
                          {errors.tempat_lahir &&
                            touched.tempat_lahir &&
                            errors.tempat_lahir}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Tanggal Lahir{important}
                        </label>
                        <DatePicker
                          format={dateFormatList}
                          className={classes.inputForm}
                          placeholder="Pilih Tanggal"
                          name={"tanggal_lahir"}
                          onChange={this._handleChangeDate}
                          onBlur={handleBlur}
                          value={
                            values.tanggal_lahir &&
                            moment(tanggal_lahir, "DD/MM/YYYY")
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Alamat Lengkap sesuai KTP{important}
                    </label>
                    <Input
                      variant="outlined"
                      className={classes.inputForm}
                      placeholder="Contoh: Jalan ABC No 123"
                      type="text"
                      name={"alamat_ktp"}
                      onChange={this._handleChange}
                      onBlur={handleBlur}
                      value={values.alamat_ktp}
                    />
                    <p className={classes.negativeCase}>
                      {errors.alamat_ktp &&
                        touched.alamat_ktp &&
                        errors.alamat_ktp}
                    </p>
                  </div>
                  <Grid container>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Provinsi sesuai KTP{important}
                        </label>
                        <Select
                          showSearch
                          name={"provinsi_ktp"}
                          className={classes.inputForm}
                          optionFilterProp="children"
                          placeholder=" Pilih Provinsi"
                          onChange={this._onChangeProvinsi}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {optionProvinsi}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.provinsi_ktp &&
                            touched.provinsi_ktp &&
                            errors.provinsi_ktp}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Kota/Kabupaten sesuai KTP{important}
                        </label>
                        <Select
                          showSearch
                          name={"kabupaten_ktp"}
                          className={classes.inputForm}
                          optionFilterProp="children"
                          placeholder=" Pilih Kota/Kabupaten"
                          onChange={this._handleSelect.bind(
                            this,
                            "kabupaten_ktp"
                          )}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {optionKota}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.kabupaten_ktp &&
                            touched.kabupaten_ktp &&
                            errors.kabupaten_ktp}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Email Aktif{important}</label>
                    <Input
                      variant="outlined"
                      className={classes.inputForm}
                      placeholder="Contoh: johndoe@gmail.com"
                      type="email"
                      name={"email"}
                      label={"email aktif"}
                      onChange={this._handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <p className={classes.negativeCase}>
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Nomor Handphone Aktif{important}
                    </label>
                    <Input
                      variant="outlined"
                      className={classes.inputForm}
                      placeholder="Contoh: 08977788991"
                      type="number"
                      name={"no_hp"}
                      onChange={this._handleChange}
                      onBlur={handleBlur}
                      value={values.no_hp}
                    />
                    <p className={classes.negativeCase}>
                      {errors.no_hp && touched.no_hp && errors.no_hp}
                    </p>
                  </div>
                  <Grid container>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Nama Bank (Payroll){important}
                        </label>
                        <Select
                          name={"id_bank"}
                          className={classes.inputForm}
                          placeholder=" Pilih Bank"
                          onChange={this._handleSelect.bind(this, "id_bank")}
                          onBlur={handleBlur}
                        >
                          {optionBank}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.id_bank && touched.id_bank && errors.id_bank}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Nomor Rekening{important}
                        </label>
                        <Input
                          variant="outlined"
                          className={classes.inputForm}
                          type="number"
                          placeholder="Contoh: 1234567899876"
                          name={"no_rekening"}
                          onChange={this._handleChange}
                          onBlur={handleBlur}
                          value={values.no_rekening}
                        />
                        <p className={classes.negativeCase}>
                          {errors.no_rekening &&
                            touched.no_rekening &&
                            errors.no_rekening}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Pendidikan Terakhir{important}
                        </label>
                        <Select
                          name={"id_jenjang_pendidikan"}
                          className={classes.inputForm}
                          placeholder=" Pilih Pendidikan Terakhir"
                          onChange={this._handleSelect.bind(
                            this,
                            "id_jenjang_pendidikan"
                          )}
                          onBlur={handleBlur}
                        >
                          {optionJenjang}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.id_jenjang_pendidikan &&
                            touched.id_jenjang_pendidikan &&
                            errors.id_jenjang_pendidikan}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Jurusan Pendidikan Terakhir{important}
                        </label>
                        <Select
                          name={"id_jurusan"}
                          className={classes.inputForm}
                          placeholder=" Pilih Jurusan Pendidikan Terakhir"
                          onChange={this._handleSelect.bind(this, "id_jurusan")}
                          onBlur={handleBlur}
                        >
                          {optionJurusan}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.id_jurusan &&
                            touched.id_jurusan &&
                            errors.id_jurusan}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Pengalaman Kerja{important}
                    </label>
                    <Select
                      name={"id_pengalaman_kerja"}
                      className={classes.inputForm}
                      placeholder=" Pilih Pengalaman Kerja"
                      onChange={this._handleSelect.bind(
                        this,
                        "id_pengalaman_kerja"
                      )}
                      onBlur={handleBlur}
                    >
                      {optionExperience}
                    </Select>
                    <p className={classes.negativeCase}>
                      {errors.id_pengalaman_kerja &&
                        touched.id_pengalaman_kerja &&
                        errors.id_pengalaman_kerja}
                    </p>
                  </div>
                  <Grid container>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Akun T-Money{important}
                        </label>
                        <Input
                          variant="outlined"
                          className={classes.inputForm}
                          type="text"
                          name={"akun_tmoney"}
                          onChange={this._handleChange}
                          onBlur={handleBlur}
                          value={values.akun_tmoney}
                        />
                        <p className={classes.negativeCase}>
                          {errors.akun_tmoney &&
                            touched.akun_tmoney &&
                            errors.akun_tmoney}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Akun Trello/Jira{important}
                        </label>
                        <Input
                          variant="outlined"
                          className={classes.inputForm}
                          type="text"
                          name={"akun_trello"}
                          onChange={this._handleChange}
                          onBlur={handleBlur}
                          value={values.akun_trello}
                        />
                        <p className={classes.negativeCase}>
                          {errors.akun_trello &&
                            touched.akun_trello &&
                            errors.akun_trello}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <h2
                    style={{
                      color: "#DA1E20",
                      fontWeight: "bold",
                      marginTop: 15,
                    }}
                  >
                    Data Pekerjaan
                  </h2>
                  <Grid container>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Nama Bidang/Tribe{important}
                        </label>
                        <Select
                          className={classes.inputForm}
                          placeholder=" Pilih Bidang/Tribe"
                          name={"id_bidang"}
                          onChange={this._handleSelect.bind(this, "id_bidang")}
                          onBlur={handleBlur}
                        >
                          {optionBidang}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.id_bidang &&
                            touched.id_bidang &&
                            errors.id_bidang}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Lokasi Kerja{important}
                        </label>
                        <Select
                          className={classes.inputForm}
                          placeholder=" Pilih Lokasi Kerja"
                          name={"id_lokasi_kerja"}
                          onChange={this._handleSelect.bind(
                            this,
                            "id_lokasi_kerja"
                          )}
                          onBlur={handleBlur}
                        >
                          {optionLokasi}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.id_lokasi_kerja &&
                            touched.id_lokasi_kerja &&
                            errors.id_lokasi_kerja}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Job Title Usulan{important}
                        </label>
                        <Select
                          name={"id_job_title"}
                          className={classes.inputForm}
                          placeholder=" Pilih Job Title Usulan"
                          onChange={this._onChangeJobTitle}
                        >
                          {optionJobTitle}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.id_job_title &&
                            touched.id_job_title &&
                            errors.id_job_title}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Job Title Levelling Usulan{important}
                        </label>
                        <Select
                          name={"id_kelompok_pekerjaan"}
                          className={classes.inputForm}
                          placeholder=" Pilih Job Title Level Usulan"
                          onChange={this._handleSelect.bind(
                            this,
                            "id_kelompok_pekerjaan"
                          )}
                          onBlur={handleBlur}
                        >
                          {optionJTlevel}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.id_kelompok_pekerjaan &&
                            touched.id_kelompok_pekerjaan &&
                            errors.id_kelompok_pekerjaan}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Job Role{important}
                        </label>
                        <Select
                          name={"id_job_role"}
                          className={classes.inputForm}
                          placeholder=" Pilih Job Role"
                          onChange={this._handleSelect.bind(
                            this,
                            "id_job_role"
                          )}
                          onBlur={handleBlur}
                        >
                          {optionJobRole}
                        </Select>
                        <p className={classes.negativeCase}>
                          {errors.id_job_role &&
                            touched.id_job_role &&
                            errors.id_job_role}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Deskripsi Pekerjaan{important}
                    </label>
                    <TextArea
                      variant="outlined"
                      className={classes.inputForm}
                      placeholder="Contoh: Administrasi mengerjakan surat menyurat"
                      type="text"
                      name={"deskripsi_pekerjaan"}
                      rows={4}
                      onChange={this._handleChange}
                      onBlur={handleBlur}
                      value={values.deskripsi_pekerjaan}
                    />
                    <p className={classes.negativeCase}>
                      {errors.deskripsi_pekerjaan &&
                        touched.deskripsi_pekerjaan &&
                        errors.deskripsi_pekerjaan}
                    </p>
                  </div>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Ekspektasi THP{important}
                    </label>
                    <Input
                      variant="outlined"
                      className={classes.inputForm}
                      placeholder="Contoh: Rp. 5.000,000,-"
                      type="text"
                      name={"thp"}
                      onChange={this._handleChange}
                      onBlur={handleBlur}
                      value={values.thp}
                    />
                    <p className={classes.negativeCase}>
                      {errors.thp && touched.thp && errors.thp}
                    </p>
                  </div>
                  <h2
                    style={{
                      color: "#DA1E20",
                      fontWeight: "bold",
                      marginTop: 15,
                    }}
                  >
                    Dokumen Penunjang
                  </h2>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">CV{important}</label>
                    <DragAndDrop
                      acceptFiles="application/pdf"
                      uploadType="Creative CV"
                      onChange={this._handleFilesFromDrag.bind(this.file, "cv")}
                      onBlur={handleBlur}
                      value={this.state.cv}
                      name={"cv"}
                    />
                    <p className={classes.negativeCase}>
                      {errors.cv && touched.cv && errors.cv}
                    </p>
                  </div>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Scan KTP{important}</label>
                    <DragAndDrop
                      acceptFiles=".jpg,.jpeg,.png"
                      uploadType="KTP"
                      onChange={this._handleFilesFromDrag.bind(
                        this,
                        "foto_scanktp"
                      )}
                      onBlur={handleBlur}
                      value={this.state.foto_scanktp}
                      name={"foto_scanktp"}
                    />
                    <p className={classes.negativeCase}>
                      {errors.foto_scanktp &&
                        touched.foto_scanktp &&
                        errors.foto_scanktp}
                    </p>
                  </div>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">SKCK</label>
                    <DragAndDrop
                      acceptFiles="application/pdf"
                      uploadType="SKCK"
                      onChange={this._handleFilesFromDrag.bind(
                        this,
                        "file_skck"
                      )}
                      onBlur={handleBlur}
                      value={this.state.file_skck}
                      name={"file_skck"}
                    />
                  </div>

                  <input type="submit" disabled={isSubmitting} />
                </form>
              )}
            </Formik>
          </Container>
          <Container maxWidth="lg" className={classes.container}></Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(FormPengajuanTKP);
