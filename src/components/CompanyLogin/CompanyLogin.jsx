import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/theme.css';
import '../css/bootstrap.min.css';
import TypeIt from 'typeit';
import infinityX from '../assets/infinityX.png';
import client from '../assets/client.png';

const CompanyLogin = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [CompanyPeriod, setCompanyPeriod] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const CompanyCode = 'SUNILFIVE'; // Directly assigning the company code

  useEffect(() => {
    // Fetch the company period from the local storage
    const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany')) || {};
    setCompanyPeriod(selectedCompany.companyPeriod || '01-Apr-2024 to 31-Mar-2025');
  }, []);
  
    useEffect(() => {
      const handle = requestAnimationFrame(() => {
        const typeItInstance = new TypeIt(".text-description", {
          strings: ["ERP on your Fingertips."],
          speed: 50,
          waitUntilVisible: true,
        }).go();
    
        return () => {
          typeItInstance.destroy();
        };
      });
    
      return () => cancelAnimationFrame(handle);
  }, []);

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataExchangeURL = 'http://45.124.144.253:9890/api/Authentication/Authenticate';
      const response = await axios.post(dataExchangeURL, {
        userName: Username,
        password: Password,
        companyCode: CompanyCode,
      });
      // Save the token to localStorage
      localStorage.setItem('authToken2', response.data.token);
      // Redirect to the CompanyProfile page after successful login
      navigate('/CompanyProfile');
    } catch (error) {
      setError('Invalid email, password, or company code');
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray">
      <div className=" h-100">
        <div className="container h-100">
          <div className="row pt-5 h-100">
            <div className="col-xl-7 col-lg-6 col-md-12">
              <div className="text-center pb-3">
                {/* <h1 className="text-primary facebook">facebook</h1> */}
                {/* <img src="infinityx.png" style={{ height: '96px' }} alt="InfinityX Logo" /> */}
                {/* <h1 className="text-description"></h1> */}
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12">
              <div className="card shadow border-0 card-body">
                <div className="text-center pt-3">
                  <img
                    src={client}
                    style={{ height: '48px' }}
                    alt="CODEPLAYERS"
                    onError={(e) => { e.target.src = 'cp.png'; }}
                    className="center"
                  />
                  <br />
                  <br />
                  <p style={{ fontSize: '18px' }}>
                    <strong>Sunil Sponge And Power Private Limited</strong>
                    <br />{CompanyPeriod}
                    <br />Company Code: {CompanyCode}
                  </p>
                  <hr />
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      placeholder="Email or phone number" 
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="password" 
                      className="form-control form-control-lg holder" 
                      placeholder="Password" 
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="btn btn-primary text-light fw-bold btn-lg border-0 btn-h-primary" type="submit" disabled={loading}>
                      {loading ? 'Logging in...' : 'Log In'}
                    </button>
                    <div className="text-center">
                      <a href="#" className="text-decoration-none" onClick={handleForgotPassword}>Forgot password?</a>
                    </div>
                    <hr />
                    <div className="text-center pb-2">
                      <img src={infinityX} style={{ height: '64px' }} alt="InfinityX Logo" />
                      <h1 className="text-description"></h1>
                    </div>
                  </div>
                </form>
                {error && <p className="text-danger text-center mt-3">{error}</p>}
              </div>
            </div>
            <div className="text-center pt-3">
              <div className="d-none d-lg-block" style={{ paddingLeft: '90vh' }}>
                © 2024 - CODEPLAYERS Business System Private Limited.
              </div>
              <div className="d-lg-none" style={{ paddingLeft: '0' }}>
                © 2024 - CODEPLAYERS Business System Private Limited.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyLogin;
