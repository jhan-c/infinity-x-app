import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/theme.css';
import '../css/bootstrap.min.css';
import TypeIt from 'typeit';
import infinityX from '../assets/infinityX.png'
import cp from '../assets/cp.png'
const LicenseValidation = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      new TypeIt(".text-description", {
        strings: ["ERP on your Fingertips."],
        speed: 50,
        waitUntilVisible: true,
      }).go();
    });

    return () => cancelAnimationFrame(handle);
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://api5.codeplayers.in/api/authentication/authenticate',
        { Username, Password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      const { token, subscriberID } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('licenseGuid', subscriberID);
      navigate('/CompanySelection');
      //history.push('/CompanySelection');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }  
  };
  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className=" d-flex flex-column min-vh-100 bg-gray p-5 h-100">
        <div className="container">
            <div className="row pt-5">
                <div className="col-xl-7 col-lg-6 col-md-12">
                    <div className="text-center pb-3">
                    <img src={infinityX} alt="Infinity X" style={{ height: '96px' }} />
                        <h1 className="text-description"></h1>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-12">
                    <div className="card shadow border-0 card-body">
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-lg" placeholder="Username"  value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control form-control-lg holder" placeholder="Password" value={Password}
                    onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {error && <div className="text-danger">{error}</div>}
                            <div className="d-grid gap-2 col-12 mx-auto">
                            <button className="btn btn-primary text-light fw-bold btn-lg border-0 btn-h-primary w-100" type="submit"disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </button>
                                <div className="text-center">
                                    <a href="#" className="text-decoration-none" onClick={handleForgotPassword}>Forgot password?</a>
                                </div>
                                <hr />
                                <div className="text-center pb-2">
                                <img src={cp} alt="CodePlayers" style={{ height: '48px' }} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="text-center pt-3" style={{ paddingLeft: '90vh' }}>
                    © 2024 - CODEPLAYERS Business System Private Limited.
                </div>
            </div>
        </div>
    </div>
);
};


export default LicenseValidation