export default function validateInfo(values) {
  let errors = {};

 // if (!values.namaLengkap.trim()) {
//    errors.namaLengkap = 'Pastikan Nama Lengkap sesuai KTP';
 // }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }
  if (!values.username) {
    errors.username = 'Pastikan Username anda terisi';
  }

  if (!values.password) {
    errors.password = 'Pastikan Password anda telah terisi';
  }

  return errors;
}
