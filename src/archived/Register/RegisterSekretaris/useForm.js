import { useState, useEffect } from 'react';
import axios from 'axios';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    nama_lengkap: '',
    email: '',
    password: '',
    username: '',
    no_hp: '',
    id_bidang: 1,
    id_spv: 1,
    id_status_sekretaris: 1
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

  async function registerSekretaris(props) {
    await axios.post('http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/sekretaris/register', {
      values
    }).then(res => {
      console.log('Registrasi telah berhasil!');
      window.location = "/sekretaris/login";
    })
      .catch(error => {
        console.log(error + 'Registrasi Gagal!')
      });
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        registerSekretaris();
        callback();
      }
    },
    [errors]
  );
  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
