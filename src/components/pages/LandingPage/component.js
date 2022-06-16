import React from "react";
import "./styles/Landing.css";
import { ROUTES } from "../../../configs";
import { IMAGES } from "../../../configs";
import { Button} from "antd";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="container-landing">
        <div className="form-content-left">
          <img className="landing-img" src={IMAGES.LANDING} alt="" />
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
              <Button danger  onClick={() => (window.location = ROUTES.LOGIN_SPV())}>
              Supervisor
            </Button>
              <Button danger onClick={() => (window.location = ROUTES.LOGIN_SEKRETARIS()) }>
              Sekretaris
            </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default LandingPage;
