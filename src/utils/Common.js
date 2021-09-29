// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('nik');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nik');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (
    token,
    nik,
    nama_lengkap,
    id_spv,
    no_hp,
    email,
    foto_profil
    ) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('nik', nik);
    sessionStorage.setItem('nama', nama_lengkap);
    sessionStorage.setItem('id_spv', id_spv);
    sessionStorage.setItem('no_hp', no_hp);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('foto_profil', foto_profil);
  }