import React from "react";
import Container from "@material-ui/core/Container";
import HeadBar from "../../../constant/headBar";
import { withStyles } from "@material-ui/core/styles";
import { Input, Breadcrumb, Button } from "antd";
import { ROUTES, } from "../../../../configs";
import TableRow from "./TableRow";


const drawerWidth = 240;
const mockData = [
  {
    id: 0,
    name: "YA",
  },
  {
    id: 1,
    name: "TIDAK",
  }
];

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
    marginBottom: 20,
    cursor: "pointer",
    "&:hover": {
      color: "#DA1E20",
      backgroundColor: "white",
      borderColor: "#DA1E20",
    },
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
    borderRadius: 5,
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

class PenilaianTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      selectedId: 0
    };
  }

  componentDidMount() {

  }

  _handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  changeHandler = id => {
    console.log("IdComp: ", id);
    this.setState({
      selectedId: id
    });
  };

  _handleBreadcumbs = () => {
    window.location = ROUTES.DASHBOARD();
  };

  _handleBreadcumbs2 = () => {
    window.location = ROUTES.KELOLA_EVALUASI_TKP();
  };

  _handleFilesFromDrag = (name, file) => {
    this.setState({ [name]: file });
  };


  render() {
    const { classes } = this.props;
    const important = <b style={{ color: "#EE2E24" }}>*</b>;
    const { selectedId } = this.state;
    console.log("selectedId: ", selectedId);

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
              <a a onClick={this._handleBreadcumbs2}>Evaluasi TKP</a>
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
            <h4>
              Nama Supervisor  : Winter ilana
            </h4>
            <h4>
              NIK Supervisor  : 123456
            </h4>
            <h4>
              Email  : wwinter@gmail.com
            </h4>
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
            <h4>
              Nama Bidang/Tribe  : Developer
            </h4>
            <h4>
              Nama Lengkap Sesuai KTP  : Winter ilana
            </h4>
            <Container className={classes.container2}>
              <h2 style={{
                fontWeight: "bold",
                marginTop: 20
              }}>
                Tahap 1 dan 2
              </h2>
              <div style={{ margin: 20 }}>
                <label className="form-label">
                  Total Nilai Evaluasi Kerja{important}
                </label>
                <Input
                  variant="outlined"
                  className={classes.inputForm}
                  type="text"
                  placeholder="Contoh: 200"
                  onChange={this._handleChange}
                />
              </div>
              <div style={{ margin: 20 }}>
                <label className="form-label">
                  Apakah Kontak TKP di Perpanjang{important}
                </label>
                <div>
                  <table>
                    <tbody>
                      {mockData.map(rowData => (
                        <TableRow
                          key={rowData.id}
                          selectedId={this.state.selectedId}
                          rowData={rowData}
                          onSelect={this.changeHandler}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <Button
                  type="primary"
                  className={classes.submitForm}
                  onClick={selectedId === 1 ? () => (window.location = ROUTES.TKP_TIDAK_PERPANJANG()) : () => (window.location = ROUTES.TKP_PERPANJANG())}
                >
                  <strong>Berikutnya</strong>
                </Button>
              </div>
            </Container>
          </Container>
          <Container maxWidth="lg" className={classes.container}></Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PenilaianTKP);
