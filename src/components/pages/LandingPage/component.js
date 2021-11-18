import React, { Component } from "react";
import "./styles/Landing.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../configs"

class LandingPage extends React.Component {
  render() {
    return (
      <div className="container-landing">
        <div className="form-content-left">
          <img className="landing-img" src="static/landing/login.png" alt="" />
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
            <Link className="button-landing" role="button" to={ROUTES.LOGIN_SPV()}>
              Supervisor
            </Link>
            <Link className="button-landing" role="button" to={ROUTES.LOGIN_SEKRETARIS()}>
              Sekretaris
            </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default LandingPage;
