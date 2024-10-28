import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Retrieve username from localStorage on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) setUsername(savedUsername);
  }, []);

  // Refresh handler to send request to the backend
  const refreshhandler = () => {
    axios.post('http://127.0.0.1:5000/api/refreshTest')
      .then((response) => {
        console.log('User data refreshed:', response.data);
        setData(response.data);
        console.log(data);

        toast.success("User data refreshed successfully!");
      })
      .catch((error) => {
        console.error('Error refreshing user data:', error);
        toast.error("Failed to refresh user data");
      });
  };

  // Submit handler to navigate to the test interface
  const submithandler = (event) => {
    event.preventDefault();
    toast.success("Welcome to Test Interface");
    navigate("/testinterface");
  };

  return (
    <div className='text-4xl mx-auto flex flex-col justify-evenly h-full text-white'>
      <h1 className='text-yellow-100 text-center'>
        Welcome to the Dashboard, {username}!
      </h1>

      <div className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
        <h2>Your Previous Test Data</h2>
        <button onClick={refreshhandler}>Refresh</button>
        <p>No Test Data yet</p>
      </div>

      <div className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
        <h2>Your Previous Test Data</h2>
        <button >Refresh</button>
        <p>No Test Data yet</p>
      </div>

      <button onClick={submithandler} className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
        Create your own Test
      </button>
    </div>
  );
};

export default Dashboard;
