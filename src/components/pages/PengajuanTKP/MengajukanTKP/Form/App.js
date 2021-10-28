import React, { Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SideMenu from "../../../../constant/sideMenu";
import { DownloadOutlined } from "@ant-design/icons";
import ActiveLastBreadcrumb from "./Breadcumbs";
import { Button } from "antd";
import FileSaver from "file-saver";
import TextField from "@material-ui/core/TextField";
import HeadBar from "../../../../constant/headBar";
import { Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#E5E5E5",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
          name: "Tono",
          code: "YES",
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
        code: tribe.kode_bidang,
        name: tribe.nama_bidang,
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
  }

  render() {
    const { classes } = this.props;
    const { dataProvinsi, dataBidang, dataLokasiKerja } = this.state;
    const download = () => {
      FileSaver.saveAs(
        "https://drive.google.com/u/0/uc?id=1kpX-YeopvB90bjc8VuhdTqawMkeJNDax&export=download",
        "test.pdf"
      );
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
            <h2 style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}>
              Data Supervisor
            </h2>
            <div style={{ marginBottom: 40 }}>
              <label className="form-label">Nama Supervisor</label>
              <TextField
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
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="form-input"
                type="number"
                name="nik"
                value={nikSpv}
                disabled
              />
            </div>
            <h2 style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}>
              Data Diri Calon TKP
            </h2>
            <Grid container>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Nama Lengkap sesuai TKP</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="text"
                    name="name"
                    value={namaSpv}
                    disabled
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Nomor KTP</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="number"
                    name="nik"
                    value={nikSpv}
                    disabled
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Tempat Lahir</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="number"
                    name="nik"
                    value={nikSpv}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Tanggal Lahir</label>
                  <Fragment>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        className="form-input"
                        clearable
                        // value={selectedDate}
                        inputVariant="outlined"
                        placeholder="10/10/2018"
                        // onChange={(date) => handleDateChange(date)}
                        format="MM/dd/yyyy"
                      />
                    </MuiPickersUtilsProvider>
                  </Fragment>
                </div>
              </Grid>
            </Grid>
            <div style={{ margin: 20 }}>
              <label className="form-label">Alamat Lengkap sesuai KTP</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="form-input"
                type="number"
                name="nik"
                value={nikSpv}
                disabled
              />
            </div>
            <Grid container>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Provinsi sesuai TKP</label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={dataProvinsi}
                    getOptionLabel={(provinsi) => provinsi.name}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        placeholder=" Pilih Provinsi"
                        className="form-input"
                        value="provinsi.key"
                        {...params}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">
                    Kota/Kabupaten sesuai KTP
                  </label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={dataProvinsi}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        placeholder=" Pilih Kota/Kabupaten"
                        className="form-input"
                        {...params}
                      />
                    )}
                  />
                </div>
              </Grid>
            </Grid>
            <div style={{ margin: 20 }}>
              <label className="form-label">Email Aktif</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="form-input"
                type="number"
                name="nik"
                value={nikSpv}
                disabled
              />
            </div>
            <div style={{ margin: 20 }}>
              <label className="form-label">Nomor Handphone Aktif</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="form-input"
                type="number"
                name="nik"
                value={nikSpv}
                disabled
              />
            </div>
            <Grid container>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Nama Bank (Payroll)</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="text"
                    name="name"
                    value={namaSpv}
                    disabled
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Nomor Rekening</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="number"
                    name="nik"
                    value={nikSpv}
                    disabled
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Pendidikan Terakhir</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="text"
                    name="name"
                    value={namaSpv}
                    disabled
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">
                    Jurusan Pendidikan Terakhir
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="number"
                    name="nik"
                    value={nikSpv}
                    disabled
                  />
                </div>
              </Grid>
            </Grid>
            <div style={{ margin: 20 }}>
              <label className="form-label">Pengalaman Kerja</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="form-input"
                type="number"
                name="nik"
                value={nikSpv}
                disabled
              />
            </div>
            <Grid container>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Akun T-Money</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="text"
                    name="name"
                    value={namaSpv}
                    disabled
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Akun Trello/Jira</label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    className="form-input"
                    type="number"
                    name="nik"
                    value={nikSpv}
                    disabled
                  />
                </div>
              </Grid>
            </Grid>
            <h2 style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}>
              Data Pekerjaan
            </h2>
            <Grid container>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Nama Bidang/Tribe</label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={dataBidang}
                    getOptionLabel={(option) => option.code}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        placeholder=" Pilih Bidang/Tribe"
                        className="form-input"
                        {...params}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Lokasi Kerja</label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={dataLokasiKerja}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        placeholder=" Pilih Lokasi Kerja"
                        className="form-input"
                        {...params}
                      />
                    )}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Job Title Usulan</label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={dataBidang}
                    getOptionLabel={(option) => option.code}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        placeholder=" Pilih Job Title Usulan"
                        className="form-input"
                        {...params}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">
                    Job Title Levelling Usulan
                  </label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={dataBidang}
                    getOptionLabel={(option) => option.code}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        placeholder=" Pilih Title Levelling Usulan"
                        className="form-input"
                        {...params}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ margin: 20 }}>
                  <label className="form-label">Job Role</label>
                  <Autocomplete
                    id="combo-box-demo"
                    options={dataBidang}
                    getOptionLabel={(option) => option.code}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        placeholder=" Pilih Job Role"
                        className="form-input"
                        {...params}
                      />
                    )}
                  />
                </div>
              </Grid>
            </Grid>
            <div style={{ margin: 20 }}>
              <label className="form-label">Deskripsi Pekerjaan</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="form-input"
                type="number"
                name="nik"
                value={nikSpv}
                disabled
              />
            </div>
            <div style={{ margin: 20 }}>
              <label className="form-label">Ekspetasi TKP</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="form-input"
                type="number"
                name="nik"
                value={nikSpv}
                disabled
              />
            </div>
            <h2 style={{ color: "#DA1E20", fontWeight: "bold", marginTop: 15 }}>
              Dokumen Penunjang
            </h2>
            <div style={{ margin: 20 }}>
              <label className="form-label">CV</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="form-input"
                type="number"
                name="nik"
                value={nikSpv}
                disabled
              />
            </div>

            <Button
              type="primary"
              onClick={download}
              className={classes.submitForm}
            >
              <strong>SUBMIT</strong>
            </Button>
          </Container>
          <Container maxWidth="lg" className={classes.container}></Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(FormMengajukanTKP);
