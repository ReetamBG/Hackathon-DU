import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("user");

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const accountData = {
            ...formData,
            accountType
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', accountData);
            
            if (response.status === 201) {
                toast.success("Account Created");
                setIsLoggedIn(true);
                navigate("/dashboard");
                console.log("sendind data in bakend")
                console.log(accountData)
            } else {
                toast.error("Failed to create account");
            }
        } catch (error) {
            console.error("Error creating account:", error);
            toast.error("Error creating account. Please try again.");
        }
    }

    return (
        <div>
            {/* Account type selection */}
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
                <button
                    className={`${accountType === "user" 
                    ? "bg-richblack-900 text-richblack-5" 
                    : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("user")}
                >
                    User
                </button>
                <button
                    className={`${accountType === "admin" 
                    ? "bg-richblack-900 text-richblack-5" 
                    : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("admin")}
                >
                    Admin
                </button>
            </div>

            <form onSubmit={submitHandler}>
                {/*  Name */}
                <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="name"
                            onChange={changeHandler}
                            placeholder="Enter Name"
                            value={formData.Name}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                </div>
                
                {/* Email */}
                <div className='mt-[20px]'>
                    <label className='w-full mt-[20px]'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            placeholder="Enter Email Address "
                            value={formData.email}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                </div>

                {/* Password and Confirm Password */}
                <div className='w-full flex gap-x-4 mt-[20px]'>
                    <label className='w-full relative'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
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

                    <label className='w-full relative'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            onChange={changeHandler}
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                        <span 
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? 
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> 
                                : 
                                <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            }
                        </span>
                    </label>
                </div>

                <button className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
