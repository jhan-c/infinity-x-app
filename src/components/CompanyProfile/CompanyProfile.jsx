import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './CompanyProfile.module.css';

const CompanyProfile = () => {
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const token = localStorage.getItem('authToken2');
      if (!token) {
        navigate('/'); // Redirect to login if token is not found
        return;
      }

      try {
        const response = await axios.get('http://45.124.144.253:9890/api/InfinityX/CompanyProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length > 0) {
          const { entityName } = response.data[0];
          setCompanyName(entityName);
        } else {
          setError('No company profile found');
        }
      } catch (error) {
        setError('Failed to fetch company profile');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [navigate]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <h1 className={styles.companyName}>{companyName}</h1>
      )}
    </div>
  );
};

export default CompanyProfile;
