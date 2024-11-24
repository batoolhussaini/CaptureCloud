import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import logo from '../Assets/Logo/Logo.png';

function Login() {
    useEffect(() => {document.title = 'Log In'; });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "") {
            setError("please enter your email.");
            return;
        }

        if (password === "") {
            setError("please enter your password.");
            return;
        }

        if (email !== "janedoe@gmail.com") {
            setError("incorrect email or password.");
            return;
        }

        if (password !== "Fox245.") {
            setError("incorrect email or password.");
            return;
        }

        setError("");

        navigate('/home');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8">
            <div className="z-10 mt-[-109px]">
                <img src={logo} alt="Logo" className="w-36 sm:w-42 md:w-48 lg:w-56 xl:w-60" />
            </div>
            <div className="sm:pt-6 md:pt-8 lg:pt-10">
                <h1 className="text-4xl text-center mb-4 mt-[-10px]">LOG IN</h1>
            </div>
            <div className="bg-ccBlue p-12 rounded-3xl border border-black w-5/12 mx-auto shadow-lg flex flex-col justify-between h-[280px]">
                <form className="space-y-7" onSubmit={handleLogin} noValidate>
                    <div className="flex items-center">
                        <label htmlFor="email" className="mr-10 w-32">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Type email address"
                            className={`w-full p-2 border ${(error === "please enter your email." || error === "incorrect email or password.") ? "border-red-500" : "border-black"} rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#F5F5F5]`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center relative">
                        <label htmlFor="password" className="mr-10 w-32">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            placeholder="Type password"
                            className={`w-full p-2 border ${(error === "please enter your password." || error === "incorrect email or password.") ? "border-red-500" : "border-black"} rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#F5F5F5]`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="text-gray-500" />
                            ) : (
                                <FaEye className="text-gray-500" />
                            )}
                        </button>
                    </div>
                    <div className="flex flex-col items-center relative bottom-4 relative top-2 ">
                        <button
                            type="submit"
                            className="w-1/4 h-8 bg-zinc-100 hover:bg-zinc-200 rounded-2xl border border-black shadow-lg"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <p className="text-center relative top-4 text-sky-500 text-sm hover:text-sky-600 underline cursor-pointer">
                    <a className="text-black hover:text-black-600 underline">Forgot Password?</a>
                </p>
                {error && <p className="text-red-600 text-center mt-8 text-sm">{error}</p>}
            </div>
            <p className="mt-6 text-center">
                Don’t have an account? <a href="/signup" className="text-sky-500 hover:text-sky-600 underline">Sign up here!</a>
            </p>

            <div style={{ backgroundColor: '#F0F0F0' }} className="h-8"></div>
        </div>
    );
}

export default Login;
