import { useState, useEffect } from 'react';
import axios from 'axios';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    nama_lengkap: '',
    email: '',
    password: '',
    nik: '',
    no_hp: '',
    id_bidang: 1,
    id_status_spv: 1
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  async function registerSpv(props) {
    await axios.post('http://localhost:4004/spv_api/register', {
      values
    }).then(res => {
      console.log('Registrasi telah berhasil!');
      window.location = "/supervisor/login";
    })
      .catch(error => {
        console.log(error + 'Registrasi Gagal!')
      });
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        registerSpv();
        callback();
      }
    },
    [errors]
  );
  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
