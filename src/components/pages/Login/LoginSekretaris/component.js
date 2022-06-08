import React, { useState } from "react";
import { setSekbidSession } from '../../../../utils/Common';
import axios from "axios";
import "../styles/Login.css";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { IMAGES, API } from "../../../../configs";
import  InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import FromControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Cookies from "js-cookie";
import { RememberMe } from "@mui/icons-material";



function LoginSekre(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput(Cookies.get("username") || "");
  const password = useFormInput(Cookies.get("password") || "");
  const [error, setError] = useState(null);
  let history = useHistory();
  const [values, setValues] = useState({ password:"", showPassword: false });
  const [checked, setChecked] = useState({});

  const handleCheckStyle = () => {
    setChecked(!checked);
  };

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
          response.data.type,
        );
        console.log('test', response);

        if (response.status === 200) {
          setTimeout(() => {
            history.push('/Dashboard');
          }, 1500);
        }

      })
      .catch((error, response) => {
        setLoading(false);
    
      
        setError("Username dan Password tidak sesuai");
     
      });
  };

  // set remember me expired 30 day
  // const handleRememberMe = () => {
  //   Cookies.set("username", username.value, { expires: 30 });
  //   Cookies.set("password", password.value, { expires: 30 });
  // };



// set remember me to cookie

  const handleRememberMe = (e) => {
    const checked = e.target.value;
    if (checked) {
      Cookies.set("rememberMe", true);
      Cookies.set("username", username.value);
      Cookies.set("password", password.value);
    } else {
      Cookies.set("rememberMe", false);
      Cookies.remove("username");
      Cookies.remove("password");
    }
    console.log('asda', Cookies.get("rememberMe"));
  }

  // const handleRememberMeChecked = () => {
  //   if (Cookies.get("rememberMe") === "true") {
  //     setChecked(true);
  //     username.onChange(Cookies.get("username"));
  //     password.onChange(Cookies.get("password"));
  //   } else {
  //     setChecked(false);
  //     username.onChange("");
  //     password.onChange("");
  //   }

  // }



  return (
    <div className="form-container">
      <span className="close-btn">×</span>
      <div className="form-content-left">
        <img className="login-img" src={IMAGES.LANDING} alt="" />
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
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
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
                      style={{ color: '#D51100' }}

                    checked={Cookies.get('rememberMe') || false}

                    onChange={
                      handleRememberMe
                    }
                    />
                  }
                  label="Ingat Saya"
                />
           </Grid>
            <Grid item className="mt-2" style={{marginTop:"10px"}} >
                <Link to="/forgot-password" style={{ color: '#D51100'}} >
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

export default LoginSekre;
