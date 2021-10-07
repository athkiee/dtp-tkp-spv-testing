import React, { useState } from "react";
import { setUserSession } from '../../../../utils/Common';
import axios from "axios";
import "../styles/Login.css";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function LoginSupervisor(props) {
  const [loading, setLoading] = useState(false);
  const nik = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  let history = useHistory();

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:4004/spv/login", {
        nik: nik.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(
          response.data.token,
          response.data.nik,
          response.data.nama_lengkap,
          response.data.id_spv,
          response.data.no_hp,
          response.data.email,
          response.data.foto_profil,
        );
        console.log('test', response);

        if (response.status === 200) {
          history.push("/Dashboard");
        }

      })
      .catch((error, response) => {
        setLoading(false);
        alert('NIK atau Password salah');


        // else setError("Something went wrong. Please try again later.");
        // setError(response.data.errors[0].message);
      });
  };

  return (
    <div className="form-container">
      <span className="close-btn">×</span>
      <div className="form-content-left">
        <img className="login-img" src="static/landing/login.png" alt="" />
      </div>
      <div className="form-content-right">
        <form className="login-form" noValidate>
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
              {...nik}
            />
          </div>
          <div className="form-inputs">
            <label className="form-label">Password</label>
            <TextField
              className="form-input"
              type="password"
              name="password"
              placeholder="Masukkan Password Anda"
              {...password}
            />
          </div>
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <button
            className="form-input-btn"
            type="submit"
            value={loading ? "Loading..." : "Login"}
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </button>
          <span className="form-input-login">
            Belum punya akun? <Link to="/supervisor/register">Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default LoginSupervisor;
