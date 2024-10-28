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
        <div className='text-4xl mx-auto flex flex-col justify-evenly h-full'>
            <h1 className='text-yellow-100 text-center'>
                Welcome to the Dashboard, {username}!
            </h1>
            
            <div>
                <h2>Your Previous Test Data</h2>
                <p>No Test Data yet</p>
            </div>
            
            <button onClick={submithandler}>
                Create your own Test
            </button>
        </div>
    );
};

export default Dashboard;
