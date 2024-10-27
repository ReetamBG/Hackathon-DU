import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // State for form data and username
  const [formData, setFormData] = useState({
    testName: '',
    file: null,
  });
  const [username, setUsername] = useState('');

  // Fetch username from the backend when the component mounts
  useEffect(() => {
    axios.get('/api/getUsername') // Adjust API endpoint as needed
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error('Error fetching username:', error);
      });
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      file: event.target.files[0],
    }));
  };

  // Send data to backend when formData changes
  useEffect(() => {
    if (formData.file && formData.testName) {
      const formDataToSend = new FormData();
      formDataToSend.append('testName', formData.testName);
      formDataToSend.append('file', formData.file);

      axios.post('/api/uploadTest', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
    }
  }, [formData]);

  return (
    <div className="dashboard">
      <h1>Welcome, {username}!</h1>
      <label>
        Test Name:
        <input
          type="text"
          name="testName"
          value={formData.testName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Upload File:
        <input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx,.xls,.csv"
        />
      </label>
    </div>
  );
};

export default Dashboard;
