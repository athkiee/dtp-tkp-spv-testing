const routes = {
  LANDING_PAGE() {
    return `/`;
  },
  LOGIN_SPV() {
    return `/login/spv`;
  },
  LOGIN_SEKRETARIS() {
    return `/login/sekretaris`;
  },
  DASHBOARD() {
    return `/dashboard`;
  },
  PENGAJUAN_TKP() {
    return `/pengajuan-tkp/supervisor`;
  },
  PENGAJUAN_TKP_FORM() {
    return `/pengajuan-tkp/form`;
  },
  PENGAJUAN_TKP_DALAM_PROSES() {
    return `/pengajuan-tkp/dalam-proses`;
  },
  PENGAJUAN_TKP_RIWAYAT() {
    return `/pengajuan-tkp/riwayat`;
  },
  KELOLA_EVALUASI_TKP() {
    return `/kelola-evaluasi-tkp`;
  },
  DETAIL_TKP() {
    return `/detail-tkp/`;
  },
  RIWAYAT_TKP() {
    return `/riwayat-tkp/`;
  },
  PENILAIAN_TKP() {
    return `/penilaian-tkp`;
  },
};

export default routes;
