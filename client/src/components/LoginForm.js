import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [submitData, setSubmitData] = useState(null); // State to trigger useEffect

    // Change handler for input fields
    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    // Effect to handle login on form submission
    useEffect(() => {
        const loginUser = async () => {
            if (!submitData) return; // Exit if no submitData

            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', submitData);
                
                if (response.status === 200) {
                    toast.success("Login Successful");
                    setIsLoggedIn(true);
                    // Optionally save user data or token in localStorage
                    localStorage.setItem("token", response.data.token); // Store token if received
                    navigate("/dashboard");
                }
                else if(response.status==402){
                    toast.error("user not found")
                }
                else {
                    toast.error("Login failed. Please check your credentials.");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                toast.error("Either email or password incorrect");
            }
        };

        loginUser(); // Call the loginUser function
    }, [submitData]); // Runs effect when submitData changes

    // Submit handler for the form
    const submitHandler = (event) => {
        event.preventDefault();
        setSubmitData(formData); // Trigger useEffect by updating submitData
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                {/* Email */}
                <div className='mt-5'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            placeholder="Enter Email Address"
                            value={formData.email}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                </div>

                {/* Password */}
                <div className='w-full relative mt-5'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            value={formData.password}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer' 
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? 
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> 
                                : 
                                <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            }
                        </span>
                    </label>
                </div>

                <button className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
