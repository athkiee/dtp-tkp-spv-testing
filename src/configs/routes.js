import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from '../components/pages/LandingPage/App';
import LoginSpv from '../components/pages/Login/LoginSpv/App';
import RegisterSpv from '../components/pages/Register/RegisterSpv/App';
import LoginSekretaris from '../components/pages/Login/LoginSekretaris/App';
import RegisterSekretaris from '../components/pages/Register/RegisterSekretaris/App';


function routes() {
    return(
        <Router>
                <Route exact path="/" component={Landing} />
                <Route path="/LoginSupervisor" component={LoginSpv} />
                <Route path="/LoginSekretaris" component={LoginSekretaris} />
                <Route path="/RegisterSupervisor" component={RegisterSpv} />
                <Route path="/RegisterSekretaris" component={RegisterSekretaris} />
        </Router>
    );
}
export default routes;