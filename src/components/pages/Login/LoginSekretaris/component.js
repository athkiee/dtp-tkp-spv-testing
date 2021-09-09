import React from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import "../styles/Login.css";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

const LoginSekre = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );
  
  return (
    <div className="form-container">
      <span className="close-btn">×</span>
      <div className="form-content-left">
        <img className="login-img" src="static/landing/login.png" alt="" />
      </div>
      <div className="form-content-right">
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-inputs">
            <h2 style={{ marginBottom: 0 }}>Selamat datang di</h2>
            <h1 style={{ marginBottom: 0 }}>Pengajuan Kebutuhan</h1>
            <h1 style={{ marginBottom: 40 }}>Tenaga Kerja Penunjang</h1>
          </div>
          <div className="form-inputs">
            <label className="form-label">NIK - Supervisor</label>
            <TextField
              className="form-input"
              type="number"
              name="nik"
              placeholder="Masukkan NIK anda"
              value={values.nik}
              onChange={handleChange}
            />
            {errors.nik && <p>{errors.nik}</p>}
          </div>
          <div className="form-inputs">
            <label className="form-label">Password</label>
            <TextField
              className="form-input"
              type="password"
              name="password"
              placeholder="Masukkan Password Anda"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button className="form-input-btn" type="submit">
            Login
          </button>
          <span className="form-input-login">
            Belum punya akun? <Link to="/supervisor/register">Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginSekre;
