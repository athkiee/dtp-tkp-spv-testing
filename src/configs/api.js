const tokenSpv = localStorage.getItem("token");
const baseUrl = process.env.REACT_APP_BASE_URL;
const token = {
  headers: { Authorization: `Bearer ${tokenSpv}` },
};

//eslint-disable-next-line
export default {
  token,
  loginSpv: baseUrl + "spv/login",
  registrasiSpv: baseUrl + "spv/register",
  loginSekbid: baseUrl + "sekretaris/login",
  registrasiSekbid: baseUrl + "sekretaris/register",
  allBidang: baseUrl + "bidang",
  allLokasiKerja: baseUrl + "lokasi_kerja",
  allBank: baseUrl + "bank",
  allJurusan: baseUrl + "jurusan",
  allJobTitle: baseUrl + "job_title",
  allExperience: baseUrl + "pengalaman_kerja",
  allPendidikan: baseUrl + "jenjang_pendidikan",
  allJobTitleLevelling: baseUrl + "job_title_levelling/",
  allJobRoles: baseUrl + "job_role/",
  registerTkp: baseUrl + "tkp/register",
  registerFileTkp: baseUrl + "register-file-upload",
  tkpUnderSpv: baseUrl + "tkp/filter/tkp-under-spv/",
  detailTkp: baseUrl + "tkp/",
  notification_spv: baseUrl + "notifikasi_spv/",
  notification_admin: baseUrl + "notifikasi_admin/",
  getZipTKPUnderSPV: baseUrl + "tkp/get-zip/tkp-under-spv/",
  getCSVTKPUnderSPV: baseUrl + "tkp/export-csv/tkp-under-spv/",
  dataspv: baseUrl + "spv/",
  checkToken: baseUrl + "token/verify-token-spv",
  readallnotif: baseUrl + "notifikasi_spv/",
  getFormulir: baseUrl + "formulir/",
  getBidang: baseUrl + "bidang_api/",
  getZipFile: baseUrl + "tkp/get_zip_file/",
  getFile: baseUrl + "tkp/get_file/",
  uploadSKCK: baseUrl + "tkp/documents/upload-skck",
};
