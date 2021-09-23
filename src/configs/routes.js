import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';

import Landing from '../components/pages/LandingPage/App';
import LoginSpv from '../components/pages/Login/LoginSpv/App';
import RegisterSpv from '../components/pages/Register/RegisterSpv/App';
import LoginSekretaris from '../components/pages/Login/LoginSekretaris/App';
import RegisterSekretaris from '../components/pages/Register/RegisterSekretaris/App';
import Dashboard from '../components/pages/Dashboard/Dashboard';
import EvaluasiTKP from '../components/pages/EvaluasiTKP/App';


function routes() {
    return(
        <Router>
                <Route exact path="/" component={Landing} />
                <Route path="/supervisor/login" component={LoginSpv} />
                <Route path="/sekretaris/login" component={LoginSekretaris} />
                <Route path="/supervisor/register" component={RegisterSpv} />
                <Route path="/sekretaris/register" component={RegisterSekretaris} />
                <PrivateRoute path="/Dashboard" component={Dashboard} />
                <Route path="/EvaluasiTKP" component={EvaluasiTKP} />
        </Router>
    );
}
export default routes;