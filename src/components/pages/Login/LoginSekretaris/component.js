import React, { useState } from "react";
import { setSekbidSession } from "../../../../utils/Common";
import axios from "axios";
import "../styles/Login.css";
import TextField from "@material-ui/core/TextField";
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

function LoginSekre(props) {
  const [loading, setLoading] = useState(false);

  //  handle decode cookie
  const getCookieUsername = () => {
    if (Cookies.get("rememberMe") === "true") {
      const getusername = Cookies.get("KXHS");
      const bytesUser = CryptoJS.AES.decrypt(
        getusername,
        "&3498nds89347bf93fkjsf34b"
      );
      const user = bytesUser.toString(CryptoJS.enc.Utf8);
      return user;
    } else return Cookies.get("KXHS");
  };

  const getCookiePassword = () => {
    if (Cookies.get("rememberMe") === "true") {
      const getpassword = Cookies.get("SHHC");
      const bytesPass = CryptoJS.AES.decrypt(
        getpassword,
        "83nf893bfjaksgbs=sgn3+dfhsdb"
      );
      const pass = bytesPass.toString(CryptoJS.enc.Utf8);
      return pass;
    } else {
      return Cookies.get("SHHC");
    }
  };

  const username = useFormInput(getCookieUsername);
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

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post(API.loginSekbid, {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setSekbidSession(
          response.data.token,
          response.data.username,
          response.data.nama_lengkap,
          response.data.nik_spv,
          response.data.id_bidang,
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

        setError("Username dan Password tidak sesuai");
      });
  };

  // set remember me to cookie
  const handleRememberMe = (e) => {
    const checked = e.target.checked;
    if (checked) {
      Cookies.set("rememberMe", "true", {
        expires: 30,
        path: "/login/sekretaris",
      });
      Cookies.set(
        "KXHS",
        CryptoJS.AES.encrypt(
          username.value,
          "&3498nds89347bf93fkjsf34b"
        ).toString(),
        { expires: 30, path: "/login/sekretaris" }
      );
      Cookies.set(
        "SHHC",
        CryptoJS.AES.encrypt(
          password.value,
          "83nf893bfjaksgbs=sgn3+dfhsdb"
        ).toString(),
        { expires: 30, path: "/login/sekretaris" }
      );
    } else {
      Cookies.set("rememberMe", "false", {
        expires: 30,
        path: "/login/sekretaris",
        samesite: "strict",
      });
      Cookies.remove("KXHS", {
        expires: 30,
        path: "/login/sekretaris",
        samesite: "strict",
      });
      Cookies.remove("SHHC", {
        expires: 30,
        path: "/login/sekretaris",
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
            <label className="form-label">Username</label>
            <TextField
              className="form-input"
              name="username"
              placeholder="Masukkan username anda"
              {...username}
            />
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
                <br />
              </>
            )}
            <br />
          </div>
          <div className="form-inputs">
            <label className="form-label">Password</label>
            <TextField
              className="form-input"
              id="password"
              type={values.showPassword ? "text" : "password"}
              {...password}
              name="password"
              placeholder="Masukkan Password Anda"
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
                      value="RememberMe"
                      onChange={handleRememberMe}
                      defaultChecked={Cookies.get("rememberMe") === "true"}
                    />
                  }
                  label="Ingat Saya"
                />
              </Grid>
              <Grid item className="mt-2" style={{ marginTop: "10px" }}>
                {/* <Link to="/forgot-password" style={{ color: "#D51100" }}>
                  Lupa Password?
                </Link> */}
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

export default LoginSekre;
