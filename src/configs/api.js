
const tokenSpv = localStorage.getItem("token");
const baseUrl = "http://ec2-54-179-167-74.ap-southeast-1.compute.amazonaws.com:4004/";


const token = {
  headers: { Authorization: `Bearer ${tokenSpv}` },
};

//eslint-disable-next-line
export default {
  token,
  loginSpv: baseUrl + "spv/login",
  loginSekbid: baseUrl + "sekretaris/login",
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
  dataspv: baseUrl + 'spv/',
  checkToken: baseUrl + 'token/verify-token-spv',
  readallnotif: baseUrl + 'notifikasi_spv/',
  getFormulir: baseUrl + 'formulir/'
};

