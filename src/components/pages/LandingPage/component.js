import React, { Component } from "react";
import "./styles/Landing.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../configs";
import { IMAGES } from "../../../configs";
import { Button} from "antd";
import Grid from "@material-ui/core/Grid";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="container-landing">
        <div className="form-content-left">
          <img className="landing-img" src={IMAGES.LANDING_PAGE} alt="" />
        </div>
        <div className="form-content-right">
          <form className="landing">
            <div className="form-inputs">
              <h2 style={{marginBottom:0}}>Selamat datang di</h2>
              <h1 style={{marginBottom:0}}>Pengajuan Kebutuhan</h1>
              <h1 style={{marginBottom:40}}>Tenaga Kerja Penunjang</h1>
            </div>
            <div className="form-inputs">
              <h3><b> Pilih Peran Anda </b></h3>
            </div>
            <div className="form-inputs">
              <Grid container>
                <Grid item sm 
                
                >
                    <Button style={{ color: "#D51100", fontWeight: "bold", borderRadius: 5, width: "70%"}} danger onClick={() => (window.location = ROUTES.LOGIN_SPV())}>
                      Supervisor
                    </Button>
                  
                  
                </Grid>
                <Grid item sm>

                  <Button style={{ color: "#D51100", fontWeight: "bold", borderRadius: 5, width: "70%", }} danger onClick={() => (window.location = ROUTES.LOGIN_SEKRETARIS())}>
                    Sekretaris
                  </Button>
                </Grid>
              </Grid>
          
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default LandingPage;
