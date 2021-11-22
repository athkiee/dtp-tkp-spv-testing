import React from "react";
import Container from "@material-ui/core/Container";
import DragAndDrop from "../../../../element/DragAndDrop";
import HeadBar from "../../../../constant/headBar";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Select, Input, DatePicker } from "antd";
import { Formik } from "formik";

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
      nik_spv: sessionStorage.getItem('nik'),
    })
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

  _handleSelect = (name, value) => {
    this.setState({ [name]: value });
  };

  _handleFilesFromDrag = (name, file) => {
    this.setState({ [name]: file });
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
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionLokasi = dataLokasiKerja.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionKota = dataKota.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionBank = dataBank.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionJurusan = dataJurusan.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionJobTitle = datajobTitle.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionJTlevel = datajtLevel.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionJobRole = datajobRole.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionExperience = dataExperience.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const optionJenjang = dataPendidikan.map((d) => (
      <Option key={d.key} value={d.name}>
        {d.name}
      </Option>
    ));
    const namaSpv = sessionStorage.getItem("nama");
    const important = <b style={{ color: "#EE2E24" }}>*</b>;

    return (
      <div className={classes.root}>
        <HeadBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <h1 style={{ marginLeft: 35, marginTop: 35 }}>
            <strong>Mengajukan Formulir TKP</strong>
          </h1>
          <p style={{ marginLeft: 35 }}>
            Ajukan data diri lengkap TKP dibawah ini.
          </p>
          <Container className={classes.containerTataCara}>
            <Formik
              enableReinitialize
              initialValues={body}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                // setTimeout(() => {
                //   axios({
                //     method: "post",
                //     url: "http://localhost:4004/tkp/register",
                //     data: values,
                //   }).then(function (response) {
                //     console.log(response);
                //   });
                //   setSubmitting(false);
                // }, 400);
                console.log('test', values);
              }}
            >
              {
                this._handleChange,
              ({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
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
                      className="form-input"
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
                      className="form-input"
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
                          className="form-input"
                          placeholder="Contoh: John Doe"
                          type="text"
                          name={"nama_lengkap"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nama_lengkap}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Nomor KTP{important}
                        </label>
                        <Input
                          variant="outlined"
                          className="form-input"
                          placeholder="Contoh: 34673268328239232"
                          type="number"
                          name={"no_ktp"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.no_ktp}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Tempat Lahir{important}
                        </label>
                        <Input
                          variant="outlined"
                          className="form-input"
                          type="text"
                          name={"tempat_lahir"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tempat_lahir}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Tanggal Lahir{important}
                        </label>
                        {/* <DatePicker
                          format={dateFormatList}
                          className="form-input"
                          placeholder="Pilih Tanggal"
                          name={"tanggal_lahir"}
                          onChange={this._handleSelect.bind(this, 'tanggal_lahir')}
                          onBlur={handleBlur}
                          value={values.tanggal_lahir}
                        /> */}
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Alamat Lengkap sesuai KTP{important}
                    </label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      placeholder="Contoh: Jalan ABC No 123"
                      type="text"
                      name={"alamat_ktp"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.alamat_ktp}
                    />
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
                          className={"form-input"}
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
                          className={"form-input"}
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
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Email Aktif{important}</label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      placeholder="Contoh: johndoe@gmail.com"
                      type="email"
                      name={"email"}
                      label={"email aktif"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                  </div>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Nomor Handphone Aktif{important}
                    </label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      placeholder="Contoh: 08977788991"
                      type="number"
                      name={"no_hp"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.no_hp}
                    />
                  </div>
                  <Grid container>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Nama Bank (Payroll){important}
                        </label>
                        <Select
                          name={"id_bank"}
                          className={"form-input"}
                          placeholder=" Pilih Bank"
                          onChange={this._handleSelect.bind(this, 'id_bank')}
                          onBlur={handleBlur}
                        >
                          {optionBank}
                        </Select>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Nomor Rekening{important}
                        </label>
                        <Input
                          variant="outlined"
                          className="form-input"
                          type="number"
                          placeholder="Contoh: 1234567899876"
                          name={"no_rekening"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.no_rekening}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Pendidikan Terakhir{important}
                        </label>
                        <Select
                          name={"id_jenjang_pendidikan"}
                          className={"form-input"}
                          placeholder=" Pilih Pendidikan Terakhir"
                          onChange={this._handleSelect.bind(this, 'id_jenjang_pendidikan')}
                          onBlur={handleBlur}
                        >
                          {optionJenjang}
                        </Select>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Jurusan Pendidikan Terakhir{important}
                        </label>
                        <Select
                          name={"id_jurusan"}
                          className={"form-input"}
                          placeholder=" Pilih Jurusan Pendidikan Terakhir"
                          onChange={this._handleSelect.bind(this, 'id_jurusan')}
                          onBlur={handleBlur}
                        >
                          {optionJurusan}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Pengalaman Kerja{important}
                    </label>
                    <Select
                      name={"id_pengalaman_kerja"}
                      className={"form-input"}
                      placeholder=" Pilih Pengalaman Kerja"
                      onChange={this._handleSelect.bind(this, 'id_pengalaman_kerja')}
                      onBlur={handleBlur}
                    >
                      {optionExperience}
                    </Select>
                  </div>
                  <Grid container>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Akun T-Money{important}
                        </label>
                        <Input
                          variant="outlined"
                          className="form-input"
                          type="text"
                          name={"akun_tmoney"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.akun_tmoney}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Akun Trello/Jira{important}
                        </label>
                        <Input
                          variant="outlined"
                          className="form-input"
                          type="text"
                          name={"akun_trello"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.akun_trello}
                        />
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
                          className={"form-input"}
                          placeholder=" Pilih Bidang/Tribe"
                          name={"id_bidang"}
                          onChange={this._handleSelect.bind(this, 'id_bidang')}
                          onBlur={handleBlur}
                        >
                          {optionBidang}
                        </Select>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Lokasi Kerja{important}
                        </label>
                        <Select
                          className={"form-input"}
                          placeholder=" Pilih Lokasi Kerja"
                          name={"id_lokasi_kerja"}
                          onChange={this._handleSelect.bind(this, 'id_lokasi_kerja')}
                          onBlur={handleBlur}
                        >
                          {optionLokasi}
                        </Select>
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
                          className={"form-input"}
                          placeholder=" Pilih Job Title Usulan"
                          onChange={this._onChangeJobTitle}
                        >
                          {optionJobTitle}
                        </Select>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Job Title Levelling Usulan{important}
                        </label>
                        <Select
                          name={"id_kelompok_pekerjaan"}
                          className={"form-input"}
                          placeholder=" Pilih Job Title Level Usulan"
                          onChange={this._handleSelect.bind(this, 'id_kelompok_pekerjaan')}
                          onBlur={handleBlur}
                        >
                          {optionJTlevel}
                        </Select>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ margin: 20 }}>
                        <label className="form-label">
                          Job Role{important}
                        </label>
                        <Select
                          name={"id_job_role"}
                          className={"form-input"}
                          placeholder=" Pilih Job Role"
                          onChange={this._handleSelect.bind(this, 'id_job_role')}
                          onBlur={handleBlur}
                        >
                          {optionJobRole}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Deskripsi Pekerjaan{important}
                    </label>
                    <TextArea
                      variant="outlined"
                      className="form-input"
                      placeholder="Contoh: Administrasi mengerjakan surat menyurat"
                      type="text"
                      name={"deskripsi_pekerjaan"}
                      rows={4}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.deskripsi_pekerjaan}
                    />
                  </div>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Ekspektasi THP{important}
                    </label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      placeholder="Contoh: Rp. 5.000,000,-"
                      type="text"
                      name={"thp"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.thp}
                    />
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
                      onChange={this._handleFilesFromDrag.bind(this, "cv")}
                      onBlur={handleBlur}
                      value={this.state.cv}
                      name={"cv"}
                    />
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
