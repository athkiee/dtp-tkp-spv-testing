import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';
import { Link } from "react-router-dom";

const FormLogin = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
      <div className='title'>
        <h2>
          Selamat datang di
        </h2>
        <h1>
          Pengajuan Kebutuhan
        </h1>
        <h1>
          Tenaga Kerja Penunjang
        </h1>
      </div>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Masukkan Username anda'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Masukkan Password Anda'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Login
        </button>
        <span className='form-input-login'>
          Belum punya akun?  <Link to="/RegisterSupervisor">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;
