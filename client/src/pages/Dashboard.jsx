import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    function submithandler(event) {
        event.preventDefault();
        toast.success("Welcome to Test Interface");
        navigate("/testinterface");
    }

    return (
        <div className='text-4xl mx-auto flex flex-col justify-evenly h-full text-white'>
            <h1 className='text-yellow-100 text-center'>
                Welcome to the Dashboard, {username}!
            </h1>
            
            <div className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                <h2>Your Previous Test Data</h2>
                <p>No Test Data yet</p>
            </div>
            <div className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                <h2>Others Test data</h2>
                <p>No Test Data yet</p>
            </div>
            
            <button onClick={submithandler} className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                Create your own Test
            </button>
        </div>
    );
};

export default Dashboard;
