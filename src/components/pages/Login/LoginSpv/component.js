import React, { useState } from "react";
import { setUserSession } from "../../../../utils/Common";
import axios from "axios";
import "../styles/Login.css";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { IMAGES, API } from "../../../../configs";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import FromControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

function LoginSupervisor(props) {
  const [loading, setLoading] = useState(false);
  //  handle decode cookie
  const getCookieNik = () => {
    if (Cookies.get("rememberme") === "true") {
      const getNik = Cookies.get("KHSY");
      const bytesNik = CryptoJS.AES.decrypt(
        getNik,
        "&3498nds89347bf93fkjsf34b"
      );
      const nik = bytesNik.toString(CryptoJS.enc.Utf8);
      return nik;
    } else return Cookies.get("KHSY");
  };

  const getCookiePassword = () => {
    if (Cookies.get("rememberme") === "true") {
      const getpassword = Cookies.get("GYUS");
      const bytesPass = CryptoJS.AES.decrypt(
        getpassword,
        "83nf893bfjaksgbs=sgn3+dfhsdb"
      );
      const pass = bytesPass.toString(CryptoJS.enc.Utf8);
      return pass;
    } else {
      return Cookies.get("GYUS");
    }
  };
  const nik = useFormInput(getCookieNik);
  const password = useFormInput(getCookiePassword);
  const [error, setError] = useState(null);
  let history = useHistory();
  const [values, setValues] = useState({ password: "", showPassword: false });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post(API.loginSpv, {
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
          response.data.type
        );

        if (response.status === 200) {
          setTimeout(() => {
            history.push("/Dashboard");
          }, 1500);
        }
      })
      .catch((error, response) => {
        setLoading(false);

        setError(error.response.data.message);

        // else setError("Something went wrong. Please try again later.");
        // setError(response.data.errors[0].message);
      });
  };

  // set remember me to cookie
  const handleRememberMe = (e) => {
    const checked = e.target.checked;
    if (checked) {
      Cookies.set("rememberme", "true", { expires: 30, path: "/login/spv" });
      Cookies.set(
        "KHSY",
        CryptoJS.AES.encrypt(nik.value, "&3498nds89347bf93fkjsf34b").toString(),
        {
          expires: 30,
          path: "/login/spv",
        }
      );
      Cookies.set(
        "GYUS",
        CryptoJS.AES.encrypt(
          password.value,
          "83nf893bfjaksgbs=sgn3+dfhsdb"
        ).toString(),
        { expires: 30, path: "/login/spv" }
      );
    } else {
      Cookies.set("rememberme", "false", {
        expires: 30,
        path: "/login/spv",
        samesite: "strict",
      });
      Cookies.remove("KHSY", {
        expires: 30,
        path: "/login/spv",
        samesite: "strict",
      });
      Cookies.remove("GYUS", {
        expires: 30,
        path: "/login/spv",
        samesite: "strict",
      });
    }
  };

  return (
    <div className="form-container">
      <span className="close-btn">×</span>
      <div className="form-content-left">
        <img className="login-img" src={IMAGES.LOGIN_ILLUST} alt="" />
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
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
                <br />
              </>
            )}
          </div>
          <div className="form-inputs">
            <label className="form-label">Password</label>
            <TextField
              className="form-input"
              type={values.showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              value={values.password}
              name="password"
              placeholder="Masukkan Password Anda"
              {...password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            <Grid container>
              <Grid item md>
                <FromControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#D51100" }}
                      value="rememberme"
                      onChange={handleRememberMe}
                      defaultChecked={Cookies.get("rememberme") === "true"}
                    />
                  }
                  label="Ingat Saya"
                />
              </Grid>
              <Grid item className="mt-2" style={{ marginTop: "10px" }}>
                <Link to="/forgot-password" style={{ color: "#D51100" }}>
                  Lupa Password?
                </Link>
              </Grid>
            </Grid>
          </div>

          <button
            className="form-input-btn"
            type="submit"
            value={loading ? "Loading..." : "Login"}
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </button>
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
