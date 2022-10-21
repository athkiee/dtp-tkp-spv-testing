import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ROUTES } from "./index";
import pages from "../components/pages"

import LoginSpv from "../components/pages/Login/LoginSpv/App";
import LoginSekretaris from "../components/pages/Login/LoginSekretaris/App";
import Dashboard from "../components/pages/Dashboard/Dashboard";

function Path() {
  return (
    <Router>
      <Route exact path={ROUTES.LANDING_PAGE()} component={pages.LandingPage} />
      <Route path={ROUTES.LOGIN_SPV()}  component={LoginSpv}/>
      <Route path={ROUTES.LOGIN_SEKRETARIS()} component={LoginSekretaris} />
      <Route path={ROUTES.DASHBOARD()} component={Dashboard} />
      <Route path={ROUTES.KELOLA_EVALUASI_TKP()} component={pages.EvaluasiTKP} />
      <Route path={ROUTES.PENGAJUAN_TKP()} component={pages.MengajukanTKP} />
      <Route path={ROUTES.PENGAJUAN_TKP_FORM()} component={pages.FormPengajuanTKP} />
      <Route path={ROUTES.PENGAJUAN_TKP_DALAM_PROSES()} component={pages.DalamProsesPengajuanTKP} />
      <Route path={ROUTES.PENGAJUAN_TKP_RIWAYAT()} component={pages.RiwayatTKP} />
      <Route path={ROUTES.DETAIL_TKP()} component={pages.DetailTKP} />
      <Route path={ROUTES.PENILAIAN_TKP()} component={pages.PenilaianTKP} />
      <Route path={ROUTES.EDIT_PROFILE()} component={pages.EditProfile} />
    </Router>
  );
}
export default Path;
