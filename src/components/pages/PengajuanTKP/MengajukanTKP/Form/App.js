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

class FormMengajukanTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dataLokasiKerja: [
        {
          key: "1",
          name: "Tono",
        },
      ],
      dataProvinsi: [
        {
          key: "1",
          name: "Tono",
        },
      ],
      dataBidang: [
        {
          key: "1",
          name: "Pilih Bidang/Tribe",
          code: "Pilih Bidang/Tribe",
        },
      ],
      dataKota: [
        {
          key: "1",
          name: "Pilih Kota/Kabupaten",
        },
      ],
      dataBank: [
        {
          key: "1",
          name: "Pilih Bank",
        },
      ],
      dataJurusan: [
        {
          key: "1",
          name: "Pilih Jurusan Pendidikan Terakhir",
        },
      ],
      datajobTitle: [
        {
          key: "1",
          name: "Pilih Job Title Usulan",
        },
      ],
      datajtLevel: [
        {
          key: "1",
          name: "Pilih Job Title Level Usulan",
        },
      ],
      datajobRole: [
        {
          key: "1",
          name: "Pilih Job Role",
        },
      ],
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
  }

  _onChangeProvinsi = (key) => {
    axios
      .get(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${key}.json`)
      .then((response) => {
        const kota = response.data.map((kota) => ({
          key: kota.id,
          name: kota.name,
        }));
        this.setState({
          dataKota: kota,
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
    axios
      .get(`http://localhost:4004/job_role/${key}`)
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

  render() {
    const { classes } = this.props;
    const { dataProvinsi, dataBidang, dataLokasiKerja, dataKota, dataBank, dataJurusan,
    datajobTitle, datajtLevel, datajobRole } = this.state;
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
    const namaSpv = sessionStorage.getItem("nama");
    const nikSpv = sessionStorage.getItem("nik");

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
            <form id="pengajuanTKP">
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
                  name="nik"
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
                      Nama Lengkap sesuai TKP
                    </label>
                    <Input
                      id="outlined-basic"
                      variant="outlined"
                      className="form-input"
                      placeholder="Contoh: John Doe"
                      type="text"
                      name="name"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Nomor KTP</label>
                    <Input
                      id="outlined-basic"
                      variant="outlined"
                      className="form-input"
                      placeholder="Contoh: 34673268328239232"
                      type="number"
                      name="nik"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Tempat Lahir</label>
                    <Input
                      id="outlined-basic"
                      variant="outlined"
                      className="form-input"
                      type="text"
                      name="nik"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Tanggal Lahir</label>
                    <DatePicker
                      format={dateFormatList}
                      className="form-input"
                      placeholder="Pilih Tanggal"
                    />
                  </div>
                </Grid>
              </Grid>
              <div style={{ margin: 20 }}>
                <label className="form-label">Alamat Lengkap sesuai KTP</label>
                <Input
                  id="outlined-basic"
                  variant="outlined"
                  className="form-input"
                  type="text"
                  name="nik"
                />
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Provinsi sesuai TKP</label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Provinsi"
                      onChange={this._onChangeProvinsi}
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionProvinsi}
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Kota/Kabupaten sesuai KTP
                    </label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Kota/Kabupaten"
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionKota}
                    </Select>
                  </div>
                </Grid>
              </Grid>
              <div style={{ margin: 20 }}>
                <label className="form-label">Email Aktif</label>
                <Input
                  id="outlined-basic"
                  variant="outlined"
                  className="form-input"
                  placeholder="Contoh: johndoe@gmail.com"
                  type="email"
                  name="nik"
                />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">Nomor Handphone Aktif</label>
                <Input
                  id="outlined-basic"
                  variant="outlined"
                  className="form-input"
                  placeholder="Contoh: 08977788991"
                  type="number"
                  name="nik"
                />
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Nama Bank (Payroll)</label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Bank"
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionBank}
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Nomor Rekening</label>
                    <Input
                      id="outlined-basic"
                      variant="outlined"
                      className="form-input"
                      type="number"
                      name="nik"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Pendidikan Terakhir</label>
                    <Select
                      id="outlined-basic"
                      variant="outlined"
                      className="form-input"
                      placeholder="Pilih Pendidikan Terakhir"
                      type="text"
                      name="name"
                    >
                      <Option value="SMA/SMK">SMA/SMK</Option>
                      <Option value="D3">D3</Option>
                      <Option value="D4/S1">D4/S1</Option>
                      <Option value="S2">S2</Option>
                      <Option value="S3">S3</Option>
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Jurusan Pendidikan Terakhir
                    </label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Jurusan Pendidikan Terakhir"
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionJurusan}
                    </Select>
                  </div>
                </Grid>
              </Grid>
              <div style={{ margin: 20 }}>
                <label className="form-label">Pengalaman Kerja</label>
                <Input
                  id="outlined-basic"
                  variant="outlined"
                  className="form-input"
                  type="text"
                  name="experiences"
                />
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Akun T-Money</label>
                    <Input
                      id="outlined-basic"
                      variant="outlined"
                      className="form-input"
                      type="text"
                      name="tmoney_account"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Akun Trello/Jira</label>
                    <Input
                      id="outlined-basic"
                      variant="outlined"
                      className="form-input"
                      type="text"
                      name="nik"
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
                    <label className="form-label">Nama Bidang/Tribe</label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Bidang/Tribe"
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionBidang}
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Lokasi Kerja</label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Lokasi Kerja"
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionLokasi}
                    </Select>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Job Title Usulan</label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Job Title Usulan"
                      onChange={this._onChangeJobTitle}
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionJobTitle}
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">
                      Job Title Levelling Usulan
                    </label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Job Title Level Usulan"
                      onChange={this._onChangeJobTitleLevelling}
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionJTlevel}
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ margin: 20 }}>
                    <label className="form-label">Job Role</label>
                    <Select
                      showSearch
                      className={"form-input"}
                      placeholder=" Pilih Job Role"
                      filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionJobRole}
                    </Select>
                  </div>
                </Grid>
              </Grid>
              <div style={{ margin: 20 }}>
                <label className="form-label">Deskripsi Pekerjaan</label>
                <TextArea
                  id="outlined-basic"
                  variant="outlined"
                  className="form-input"
                  placeholder="Contoh: Administrasi mengerjakan surat menyurat"
                  type="text"
                  name="desc_job"
                  rows={4}
                />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">Ekspektasi THP</label>
                <Input
                  id="outlined-basic"
                  variant="outlined"
                  className="form-input"
                  placeholder="Contoh: Rp. 5.000,000,-"
                  type="text"
                  name="thp"
                />
              </div>
              <h2
                style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}
              >
                Dokumen Penunjang
              </h2>
              <div style={{ margin: 20 }}>
                <label className="form-label">CV</label>
                <DragAndDrop
                  acceptFiles="application/pdf"
                  uploadType="Creative CV"
                />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">Scan KTP</label>
                <DragAndDrop acceptFiles=".jpg,.jpeg,.png" uploadType="KTP" />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">SKCK</label>
                <DragAndDrop acceptFiles="application/pdf" uploadType="SKCK" />
              </div>

              <Button type="primary" className={classes.submitForm}>
                <strong>SUBMIT</strong>
              </Button>
            </form>
          </Container>
          <Container maxWidth="lg" className={classes.container}></Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(FormMengajukanTKP);
