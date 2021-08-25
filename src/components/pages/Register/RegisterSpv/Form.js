import React, { useState } from 'react';
import './Register.css';
import FormRegister from './FormRegister';
import FormSuccess from './FormSuccess';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          <img className='form-img' src='static/landing/register.svg' alt='' />
        </div>
        {!isSubmitted ? (
          <FormRegister submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;
