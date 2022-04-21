const tokenSpv = localStorage.getItem('token');
const baseUrl = 'http://ec2-34-238-164-78.compute-1.amazonaws.com:4004/';

const token = {
    headers: { Authorization: `Bearer ${tokenSpv}`}
};

export default {
    token,
    loginSpv: baseUrl + 'spv/login',
    allBidang: baseUrl + 'bidang',
    allLokasiKerja: baseUrl + 'lokasi_kerja',
    allBank: baseUrl + 'bank',
    allJurusan: baseUrl + 'jurusan',
    allJobTitle: baseUrl + 'job_title',
    allExperience: baseUrl + 'pengalaman_kerja',
    allPendidikan: baseUrl + 'jenjang_pendidikan',
    allJobTitleLevelling: baseUrl + 'job_title_levelling/',
    allJobRoles: baseUrl + 'job_role/',
    registerTkp: baseUrl + 'tkp/register',
    registerFileTkp: baseUrl + 'register-file-upload',
    exportCsvUnderSpv: baseUrl + 'tkp/export-csv/tkp-under-spv/',
    exportFileUnderSpv: baseUrl + 'tkp/get-zip/tkp-under-spv/',
    tkpUnderSpv: baseUrl + 'tkp/filter/tkp-under-spv/',
    detailTkp: baseUrl + 'tkp/'
}