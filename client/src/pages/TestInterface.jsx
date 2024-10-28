import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TestInterface = () => {
  const [formData, setFormData] = useState({
    testName: '',
    file: null,
  });
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // Retrieve userId from session storage on mount
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
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

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);

    const formDataToSend = new FormData();
    formDataToSend.append('testName', formData.testName);
    formDataToSend.append('file', formData.file);
    if (userId) {
      formDataToSend.append('userId', userId); // Append userId to formData
    }
    console.log(formDataToSend)

    // Ensure you use the correct URL for your Flask backend
    axios.post('http://127.0.0.1:5000/api/uploadTest', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('File uploaded successfully:', response.data);
      // Handle successful response, e.g., redirect or show a message
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      navigate("/dashboard");
      toast.error("Error uploading file data");
    });
  };


  return (
    <div className="text-white text-center mx-auto mt-2">
      <form onSubmit={handleSubmit} className='flex flex-col justify-between text-3xl gap-1'>
        <label className='flex gap-3 text-center'>
          Test Name:
          <input
            type="text"
            name="testName"
            value={formData.testName}
            onChange={handleInputChange}
            className='rounded-[8px] text-black'
          />
        </label>
        <br />
        <label className='flex gap-3'>
          Upload File:
          <input
            type="file"
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
            className='rounded-[8px]'
          />
        </label>
        <br />
        <button type="submit" className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Create Test</button>
      </form>
    </div>
  );
};

export default TestInterface;
