// return the user data from the session storage
export const getUser = () => {
    const userStr = localStorage.getItem('nik');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the session storage
  export const getToken = () => {
    return localStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    localStorage.clear();
  }
   
  // set the token and user from the session storage
  export const setUserSession = (
    token,
    nik,
    nama_lengkap,
    id_spv,
    no_hp,
    email,
    foto_profil,
    type,
    ) => {
    localStorage.setItem('token', token);
    localStorage.setItem('nik', nik);
    localStorage.setItem('nama', nama_lengkap);
    localStorage.setItem('id_spv', id_spv);
    localStorage.setItem('no_hp', no_hp);
    localStorage.setItem('email', email);
    localStorage.setItem('foto_profil', foto_profil);
    localStorage.setItem('typeAuth', type);
  }

  export const setSekbidSession = (
    token,
    username,
    nama_lengkap,
    nik_spv,
    id_bidang,
    no_hp,
    email,
    foto_profil,
    type
    ) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('nama', nama_lengkap);
    localStorage.setItem('nik', nik_spv);
    localStorage.setItem('id_bidang', id_bidang);
    localStorage.setItem('no_hp', no_hp);
    localStorage.setItem('email', email);
    localStorage.setItem('foto_profil', foto_profil);
    localStorage.setItem('typeAuth', type);
  }