import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [userTests, setUserTests] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Retrieve username and userId from localStorage on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedUserId = localStorage.getItem("userId");
    if (savedUsername) setUsername(savedUsername);
    if (savedUserId) setUserId(savedUserId);
  }, []);

  // Refresh handler for "Your Test Data" panel
  const refreshUserTests = () => {
    axios.post('http://127.0.0.1:5000/api/refreshTest', { userId })
      .then((response) => {
        console.log('User data refreshed:', response.data);
        setUserTests(response.data.test_list || []);  // Update only userTests
        toast.success("User data refreshed successfully!");
      })
      .catch((error) => {
        console.error('Error refreshing user data:', error);
        toast.error("Failed to refresh user data");
      });
  };

  // Refresh handler for "All Test Data" panel
  const refreshAllTests = () => {
    axios.post('http://127.0.0.1:5000/api/refreshTestAll')
      .then((response) => {
        console.log('All test data refreshed:', response.data);
        setAllTests(response.data.test_list || []);  // Update only allTests
        toast.success("All test data refreshed successfully!");
      })
      .catch((error) => {
        console.error('Error refreshing all test data:', error);
        toast.error("Failed to refresh all test data");
      });
  };

  // Submit handler to navigate to the test interface
  const submitHandler = (event) => {
    event.preventDefault();
    toast.success("Welcome to Test Interface");
    navigate("/testinterface");
  };

  return (
    <div className='text-4xl mx-auto flex flex-col justify-evenly h-full text-white'>
      <h1 className='text-yellow-100 text-center'>
        Welcome to the Dashboard, {username}!
      </h1>
      <div className='flex gap-[5rem] justify-evenly'>
        
        {/* Your Previous Test Data Panel */}
        <div className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
          <h2>Your Previous Test Data</h2>
          <button onClick={refreshUserTests} className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Refresh</button>
          
          <div className='mt-4 max-h-64 overflow-y-auto'> {/* Scrollable area */}
            {userTests.length > 0 ? (
              <ul>
                {userTests.map((test, index) => (
                  <li key={index} className='py-2 border-b border-richblack-700'>
                    <p><strong>Test Name:</strong> {test.test_name || 'N/A'}</p>
                    <p><strong>User Name:</strong> {test.user_name || 'N/A'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Test Data yet</p>
            )}
          </div>
        </div>

        {/* All Test Data Panel */}
        <div className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
          <h2>All Test Data</h2>
          <button onClick={refreshAllTests} className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Refresh</button>
          
          <div className='mt-4 max-h-64 overflow-y-auto'> {/* Scrollable area */}
            {allTests.length > 0 ? (
              <ul>
                {allTests.map((test, index) => (
                  <li key={index} className='py-2 border-b border-richblack-700'>
                    <p><strong>Test Name:</strong> {test.test_name || 'N/A'}</p>
                    <p><strong>User Name:</strong> {test.user_name || 'N/A'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Test Data yet</p>
            )}
          </div>
        </div>

      </div>

      <button onClick={submitHandler} className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
        Create your own Test
      </button>
    </div>
  );
};

export default Dashboard;
