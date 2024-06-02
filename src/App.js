import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LicenseValidation from './components/LicenseValidation/LicenseValidation';
import CompanySelection from './components/CompanySelection/CompanySelection';
import CompanyLogin from './components/CompanyLogin/CompanyLogin';
import BlankPage from './components/CompanyProfile/CompanyProfile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LicenseValidation />} />
                <Route path="/CompanySelection" element={<CompanySelection />} />
                <Route path="/CompanyLogin" element={<CompanyLogin />} />
                <Route path="/CompanyProfile" element={<BlankPage />} />
            </Routes>
        </Router>
    );
}

export default App;
