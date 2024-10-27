import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const[username,setusername]=useState();
  const navigate=useNavigate()
  function submithandler(event){
    event.preventDefault();
    toast.success("Welcome to Test Interface")
    navigate("/testinterface")

  }

  return (
      <div className='text-4xl mx-auto flex flex-col justify-evenly h-full'>
        <h1 className='text-yellow-100 text-center'>Welcome to the Dashboard!!,{username}</h1>
        {/*interface for prevtest  */}
        <div className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[4px] border border-richblack-700 h-[20rem] w-[50rem] text-center '>
          <h2 className='text-2xl'>Your Previous Test Data</h2>
          <p className='mt-6'>NO Test Data yet</p>

          
        </div>
        {/* navigate button*/}
          <button className=' bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 'onClick={submithandler}>
            Create your own Test
          </button>
      </div>
   
  );
};

export default Dashboard;
