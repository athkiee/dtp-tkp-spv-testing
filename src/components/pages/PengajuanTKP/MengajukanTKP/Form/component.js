import React from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import DragAndDrop from "../../../../element/DragAndDrop";
import { Button } from "antd";
import FileSaver from "file-saver";
import HeadBar from "../../../../constant/headBar";
import { Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Select, Input, DatePicker, AutoComplete } from "antd";

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
      nama_lengkap: null,
      no_ktp: null,
      tempat_lahir: null,
      tanggal_lahir: null,
      alamat_ktp: null,
      provinsi_ktp: null,
      kabupaten_ktp: null,
      email: null,
      no_hp: null,
      id_bank: null,
      no_rekening: null,
      id_jenjang_pendidikan: null,
      id_jurusan: null,
      id_pengalaman_kerja: null,
      akun_tmoney: null,
      akun_trello: null,
      id_bidang: null,
      id_lokasi_kerja: null,
      id_job_title: null,
      id_job_title_levelling: null,
      id_job_role: null,
      deskripsi_pekerjaan: null,
      thp: null,
      cv: null,
      foto_scanktp: null,
      file_skck: null,
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
  }

  _onChangeProvinsi = (key) => {
    axios
      .get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${key}.json`
      )
      .then((response) => {
        const kota = response.data.map((kota) => ({
          key: kota.id,
          name: kota.name,
        }));
        this.setState({
          dataKota: kota,
          provinsi_ktp: key,
        });
      });
  };

  _onChangeJobTitle = (key) => {
    axios
      .get(`http://localhost:4004/job_title_levelling/${key}`)
      .then((response) => {
        const jtLevel = response.data.map((jtLevel) => ({
          key: jtLevel.id_job_title_levelling,
          name: jtLevel.nama_job_title_levelling,
        }));
        this.setState({
          datajtLevel: jtLevel,
        });
      });
  };

  _onChangeJobTitleLevelling = (key) => {
    axios.get(`http://localhost:4004/job_role/${key}`).then((response) => {
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
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  _handleChangeSelect (e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({value: value});
  }

  _handleSubmit = (event) => {
    const {
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
      id_job_title_levelling,
      id_job_role,
      deskripsi_pekerjaan,
      thp
    } = this.state;
    const form = {
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
      id_job_title_levelling,
      id_job_role,
      deskripsi_pekerjaan,
      thp
    }
    console.log('test', form);
    alert(form);
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const {
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
      dataPendidikan
    } = this.state;
    const optionProvinsi = dataProvinsi.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionBidang = dataBidang.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionLokasi = dataLokasiKerja.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionKota = dataKota.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionBank = dataBank.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionJurusan = dataJurusan.map((d) => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const optionJobTitle = datajobTitle.map((d) => (
      <Option key={d.key}>{d.name}</Option>
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
    const nikSpv = sessionStorage.getItem("nik");
    const important = <b style={{ color:'#EE2E24' }}>*</b>;

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
            <form id="pengajuanTKP" onSubmit={this._handleSubmit.bind(this)}>
              <h2
                style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}
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
                  value={nikSpv}
                  disabled
                />
              </div>
              <h2
                style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}
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
                      name={'nama_lengkap'}
                      value={this.state.nama_lengkap}
                      onChange={this._handleChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Nomor KTP{important}</label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      placeholder="Contoh: 34673268328239232"
                      type="number"
                      name={'no_ktp'}
                      value={this.state.no_ktp}
                      onChange={this._handleChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Tempat Lahir{important}</label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      type="text"
                      name={'tempat_lahir'}
                      value={this.state.tempat_lahir}
                      onChange={this._handleChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Tanggal Lahir{important}</label>
                    <DatePicker
                      format={dateFormatList}
                      className="form-input"
                      placeholder="Pilih Tanggal"
                      name={'tanggal_lahir'}
                      value={this.state.tanggal_lahir}
                      onChange={this._handleChange}
                    />
                  </div>
                </Grid>
              </Grid>
              <div style={{ margin: 20 }}>
                <label className="form-label">Alamat Lengkap sesuai KTP{important}</label>
                <Input
                  variant="outlined"
                  className="form-input"
                  type="text"
                  name={'alamat_ktp'}
                  value={this.state.alamat_ktp}
                  onChange={this._handleChange}
                />
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Provinsi sesuai KTP{important}</label>
                    <Select
                      showSearch
                      name={'provinsi_ktp'}
                      className={"form-input"}
                      optionFilterProp="children"
                      placeholder=" Pilih Provinsi"
                      value={this.state.provinsi_ktp}
                      onChange={this._onChangeProvinsi}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                      name={'kabupaten_ktp'}
                      className={"form-input"}
                      optionFilterProp="children"
                      placeholder=" Pilih Kota/Kabupaten"
                      value={this.state.kabupaten_ktp}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                  name={'email'}
                  value={this.state.email}
                  onChange={this._handleChange}
                />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">Nomor Handphone Aktif{important}</label>
                <Input
                  variant="outlined"
                  className="form-input"
                  placeholder="Contoh: 08977788991"
                  type="number"
                  name={'no_hp'}
                  value={this.state.no_hp}
                  onChange={this._handleChange}
                />
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Nama Bank (Payroll){important}</label>
                    <Select
                      name={'id_bank'}
                      className={"form-input"}
                      placeholder=" Pilih Bank"
                    >
                      {optionBank}
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Nomor Rekening{important}</label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      type="number"
                      name={'no_rekening'}
                      value={this.state.no_rekening}
                      onChange={this._handleChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Pendidikan Terakhir{important}</label>
                    <Select
                      name={'id_jenjang_pendidikan'}
                      className={"form-input"}
                      placeholder=" Pilih Pendidikan Terakhir"
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
                      name={'id_jurusan'}
                      className={"form-input"}
                      placeholder=" Pilih Jurusan Pendidikan Terakhir"
                    >
                      {optionJurusan}
                    </Select>
                  </div>
                </Grid>
              </Grid>
              <div style={{ margin: 20 }}>
                <label className="form-label">Pengalaman Kerja{important}</label>
                <Select
                  name={'id_pengalaman_kerja'}
                  className={"form-input"}
                  placeholder=" Pilih Pengalaman Kerja"
                >
                  {optionExperience}
                </Select>
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Akun T-Money{important}</label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      type="text"
                      name={'akun_tmoney'}
                      value={this.state.akun_tmoney}
                      onChange={this._handleChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Akun Trello/Jira{important}</label>
                    <Input
                      variant="outlined"
                      className="form-input"
                      type="text"
                      name={'akun_trello'}
                      value={this.state.akun_trello}
                      onChange={this._handleChange}
                    />
                  </div>
                </Grid>
              </Grid>
              <h2
                style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}
              >
                Data Pekerjaan
              </h2>
              <Grid container>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Nama Bidang/Tribe{important}</label>
                    <Select
                      className={"form-input"}
                      placeholder=" Pilih Bidang/Tribe"
                      name={'id_bidang'}
                    >
                      {optionBidang}
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Lokasi Kerja{important}</label>
                    <Select
                      className={"form-input"}
                      placeholder=" Pilih Lokasi Kerja"
                      name={'id_lokasi_kerja'}
                    >
                      {optionLokasi}
                    </Select>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Job Title Usulan{important}</label>
                    <Select
                      name={'id_job_title'}
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
                      name={'id_kelompok_pekerjaan'}
                      className={"form-input"}
                      placeholder=" Pilih Job Title Level Usulan"
                      onChange={this._onChangeJobTitleLevelling}
                    >
                      {optionJTlevel}
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Job Role{important}</label>
                    <Select
                      name={'id_job_role'}
                      className={"form-input"}
                      placeholder=" Pilih Job Role"
                    >
                      {optionJobRole}
                    </Select>
                  </div>
                </Grid>
              </Grid>
              <div style={{ margin: 20 }}>
                <label className="form-label">Deskripsi Pekerjaan{important}</label>
                <TextArea
                  variant="outlined"
                  className="form-input"
                  placeholder="Contoh: Administrasi mengerjakan surat menyurat"
                  type="text"
                  name={'deskripsi_pekerjaan'}
                  rows={4}
                  value={this.state.deskripsi_pekerjaan}
                  onChange={this._handleChange}
                />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">Ekspektasi THP{important}</label>
                <Input
                  variant="outlined"
                  className="form-input"
                  placeholder="Contoh: Rp. 5.000,000,-"
                  type="text"
                  name={'thp'}
                  value={this.state.thp}
                  onChange={this._handleChange}
                />
              </div>
              <h2
                style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}
              >
                Dokumen Penunjang
              </h2>
              <div style={{ margin: 20 }}>
                <label className="form-label">CV{important}</label>
                <DragAndDrop
                  acceptFiles="application/pdf"
                  uploadType="Creative CV"
                  name={'cv'}
                />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">Scan KTP{important}</label>
                <DragAndDrop
                  acceptFiles=".jpg,.jpeg,.png"
                  uploadType="KTP"
                  name={'foto_scanktp'}
                />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">SKCK</label>
                <DragAndDrop
                  acceptFiles="application/pdf"
                  uploadType="SKCK"
                  name={'file_skck'}
                />
              </div>

              <input type="submit" value="Submit" />
            </form>
          </Container>
          <Container maxWidth="lg" className={classes.container}></Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(FormPengajuanTKP);
