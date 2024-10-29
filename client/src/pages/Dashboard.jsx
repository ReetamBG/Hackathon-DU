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
        setUserTests(response.data.test_list || []);
        console.log("getting response for user tests",response.data)
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
        setAllTests(response.data.test_list || []);
        toast.success("All test data refreshed successfully!");
        console.log("this is the response from all test data:",response.data)
      })
      .catch((error) => {
        console.error('Error refreshing all test data:', error);
        toast.error("Failed to refresh all test data");
      });
  };

  // Handler to fetch test data and navigate to questionPage
  const handleTestClick = (test_id) => {
    console.log("the test id i am sending is",{test_id})
    axios.post('http://127.0.0.1:5000/api/getTestById', { test_id })
      .then((response) => {
        const filteredResponse = response.data;
        // Navigate to questionPage with testResponse as state
        navigate("/questionpage", { state: { testResponse: filteredResponse } });
      })
      .catch((error) => {
        console.error('Error fetching test data:', error);
        toast.error("Failed to load test data");
      });
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
                  <li 
                    key={index} 
                    className='py-2 border-b border-richblack-700 cursor-pointer' 
                    onClick={() => handleTestClick(test.test_id)} // Call handleTestClick with test_id
                  >
                    <p><strong>Test Name:</strong> {test.test_name || 'N/A'}</p>
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
                  <li 
                    key={index} 
                    className='py-2 border-b border-richblack-700 cursor-pointer' 
                    onClick={() => handleTestClick(test.test_id)} // Call handleTestClick with test_id
                  >
                    <p><strong>User Name:</strong> {test.user_name || 'N/A'}</p>
                    <p><strong>Test Name:</strong> {test.test_name || 'N/A'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Test Data yet</p>
            )}
          </div>
        </div>

      </div>

      <button onClick={() => navigate("/testinterface")} className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
        Create your own Test
      </button>
    </div>
  );
};

export default Dashboard;
