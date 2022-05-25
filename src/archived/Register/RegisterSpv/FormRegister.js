import validate from './validateInfo';
import useForm from './useForm';
import './Register.css';
import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

const handleGetDATA = async () => {
  try {
    const resp = await axios.get('http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/bidang_api/');
    console.log(resp.data);
} catch (err) {
    // Handle Error Here
    console.error(err);
}
}

const bidang = [
 { id_bidang: "DEV" },
 { id_bidang: "COBA" }
]

const FormRegister = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h2>
          Register
        </h2>
        <div className='form-inputs'>
          <label className='form-label'>Nama Lengkap</label>
          <TextField
            className='form-input'
            type='text'
            name='nama_lengkap'
            placeholder='Masukkan Nama Lengkap anda'
            value={values.nama_lengkap}
            onChange={handleChange}
          />
          {errors.namaLengkap && <p>{errors.nama_lengkap}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>NIK</label>
          <TextField
            className='form-input'
            type='number'
            name='nik'
            placeholder='Masukkan NIK anda'
            value={values.nik}
            onChange={handleChange}
          />
          {errors.nik && <p>{errors.nik}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Tribe/Bidang/Chapter</label>
          <Autocomplete
          id="combo-box-demo"
          options={bidang}
          onLoad={handleGetDATA()}
          getOptionLabel={(option) => option.id_bidang}
          renderInput={(params) => <TextField {...params} />}
          />
          {errors.id_bidang && <p>{errors.id_bidang}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>No. WhatsApp Aktif</label>
          <TextField
            className='form-input'
            type='number'
            name='no_hp'
            placeholder='Masukkan No. WhatsApp anda'
            value={values.no_hp}
            onChange={handleChange}
          />
          {errors.no_hp && <p>{errors.no_hp}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <TextField
            className='form-input'
            type='email'
            name='email'
            placeholder='Masukkan Email Anda'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <TextField
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
          Register
        </button>
        <span className='form-input-login'>
          Already have an account? <Link to="/supervisor/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default FormRegister;
