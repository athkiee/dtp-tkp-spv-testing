import React from "react";
import Container from "@material-ui/core/Container";
import { Button, Breadcrumb } from "antd";
import HeadBar from "../../../constant/headBar";
import { ROUTES, API } from "../../../../configs";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "@material-ui/core/Link";

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  negativeCase: {
    color: "#EE2E24",
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
  appBarSpacer: theme.mixins.toolbar,
  containerTataCara: {
    maxWidth: "95.3%",
    height: 360,
    float: "center",
    marginLeft: 35,
    backgroundColor: "white",
    borderRadius: 10,
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

const _handleBreadcumbs = () => {
  window.location = ROUTES.DASHBOARD();
};

class MengajukanTKP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nama_supervisor: "",
      nik_supervisor: "",
      data: [],
    };
  }

  async componentDidMount() {
    axios
      .get(API.dataspv, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((res) => {
        const data = res.data.map((item) => ({
          nik_spv: item.nik_spv,
          nama_spv: item.nama_lengkap,
        }));
        this.setState({
          data,
        });

        console.log(res, "ini data");
      });
  }

  render() {
    const typeAuth = localStorage.getItem("typeAuth");
    const { classes } = this.props;
    const { nama_supervisor, nik_supervisor } = this.state;
    const data = this.state.data;
    const findNIK = data.find((obj) => obj.nama_spv === nama_supervisor);
    const matchesNIK = findNIK && findNIK.nik_spv;
    const matchesNama = findNIK && findNIK.nama_spv;

    const namaSpv = localStorage.getItem("nama");
    const nikSpv = localStorage.getItem("nik");


    return (

      <div className={classes.root}>
        <HeadBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <Link onClick={_handleBreadcumbs}>Beranda</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ cursor: "pointer" }}>
              <Link>Pengajuan TKP</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{
                cursor: "pointer",
                fontColor: "#DA1E20 !important",
                fontWeight: "bold",
              }}
            >
              <Link>Ajukan TKP</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 style={{ marginLeft: 35, marginTop: 35, fontSize: 20 }}>
            <strong>Ajukan TKP</strong>
          </h1>
          <p style={{ marginLeft: 35, marginBottom: 10 }}>
            Ajukan data diri TKP secara lengkap dengan mengisi kolom di bawah
            ini.
          </p>
          <Container className={classes.containerTataCara}>
            <h2
              style={{
                color: "#DA1E20",
                fontWeight: "bold",
                marginTop: 15,
                paddingTop: 15,
              }}
            >
              Data Supervisor
            </h2>
            <p>
              Silahkan mengisi Data Supervisor di bawah ini untuk membuka
              formulir TKP
            </p>

            <label className="form-label">Nama Supervisor</label>
            <div style={{ marginBottom: 20 }}>
              {
                typeAuth === "supervisor" ? (
                  <TextField
                    label={
                      namaSpv
                    }
                    id="filled-hidden-label-small"
                    disabled
                    onChange={namaSpv}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />

                ) : (<Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={data.map((option) => option.nama_spv)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="--"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      onSelect={(e) => {
                        this.setState({
                          nama_supervisor: e.target.value,
                          nik_supervisor: matchesNIK,
                        });
                        sessionStorage.setItem("nama_spv", params.inputProps.value)
                      }}
                    />
                  )
                  }
                />)
              }

            </div>
            <label className="form-label">NIK Supervisor</label>
            <div style={{ marginBottom: 20 }}>
              {
                typeAuth === "supervisor" ? (
                  <TextField
                    label={
                      nikSpv
                    }
                    id="filled-hidden-label-small"
                    disabled
                    onChange={nikSpv}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                ) : (<Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  value={nik_supervisor}
                  options={matchesNIK ? [matchesNIK] : []}
                  renderInput={(params) => 

                    (
                      <TextField
                        {...params}
                        id="filled-hidden-label-small"
                        label="--"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",

                        }}
                        disabled={
                          matchesNIK === "" ? true : false
                        }


                        onSelect={(e) => {
                          matchesNIK === ""
                            ? this.setState({
                              nik_supervisor: e.target.value,
                              // eslint-disable-next-line
                              nik_supervisor: matchesNIK,
                            })
                            : this.setState({
                              nik_supervisor: matchesNIK,
                            });
                          matchesNIK === "" ? sessionStorage.setItem("nik_spv", params.inputProps.value) : sessionStorage.setItem("nik_spv", matchesNIK)
                        }}
                      />
                    
                  )}
                />)

              }


            </div>


            <Button
              type="submit"
              onClick={() => (window.location = ROUTES.PENGAJUAN_TKP_FORM())}
              className={classes.submitForm}
              disabled={
                typeAuth === "supervisor"
                  ? false
                  : nama_supervisor === "" || nik_supervisor !== matchesNIK || nama_supervisor !== matchesNama


              }
            >
              <strong>Langkah Selanjutnya</strong>
            </Button>
          </Container>
          <Container maxWidth="lg" className={classes.container}></Container>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles)(MengajukanTKP);
