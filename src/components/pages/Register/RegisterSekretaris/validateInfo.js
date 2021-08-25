export default function validateInfo(values) {
  let errors = {};

 // if (!values.namaLengkap.trim()) {
//    errors.namaLengkap = 'Pastikan Nama Lengkap sesuai KTP';
 // }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }
  if (!values.nik) {
    errors.nik = 'Pastikan NIK anda terisi';
  } else if (values.nik.length < 6) {
    errors.nik = 'Pastikan NIK anda valid';
  }

  if (!values.no_hp) {
    errors.no_hp = 'Pastikan nomor WhatsApp anda terisi';
  } else if (values.no_hp.length < 10) {
    errors.no_hp = 'Pastikan nomor WhatsApp anda lebih dari 10 digit';
  }

  if (!values.email) {
    errors.email = 'Pastikan Email anda telah terisi';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Format Email tidak valid';
  }

  if (!values.password) {
    errors.password = 'Pastikan Password anda telah terisi';
  } else if (values.password.length < 8) {
    errors.password = 'Password Min. 8 Karakter dan terdapat kombinasi huruf kecil, huruf besar, dan angka';
  }

  return errors;
}
