import React, { Component } from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    marginBottom: 24,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


class FormLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render(){
  return (
    <div className='form-content-right'>
      <form  className='form' noValidate>
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
          <h3> Pilih Peran Anda </h3>
      </div>
        <Link className='form-input-btn' to="/LoginSupervisor">
        <button>
          Supervisor
        </button>
        </Link>
        <button className='form-input-btn' type='submit'>
          Sekretaris
        </button>
      </form>
    </div>
  );
};
}
export default FormLanding;
