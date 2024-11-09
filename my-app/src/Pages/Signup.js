import React, { useState } from 'react';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validEmail = (email) => {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailFormat.test(email);
    }

    const handleCreateAccount = (e) => {
        e.preventDefault();

        if(!validEmail(email)) {
            setError("invalid email address.")
            return;
        }

        if (password1 !== password2) {
            setError("passwords don't match.")
            return;
        }

        if (password1 == "") {
            setError("")
            return;
        }

        if (name == "") {
            setError("")
            return;
        }

        setError("");

        navigate('/home')
    }

    return (
        <div className="bg-loginPage-bg h-screen flex flex-col items-center justify-center">     
            <div className="absolute top-10">
                <img src={logo} alt="Logo" className="w-56 mb-16" />
            </div>
            <h1 className="text-4xl text-center mb-6">CREAT ACCOUNT</h1>    
            <div className="bg-ccBlue p-16 rounded-3xl border border-black w-2/5 mx-auto shadow-lg">
            <form className="space-y-7" onSubmit={handleCreateAccount} noValidate>
                    <div className="flex items-center">
                        <label htmlFor="full name" className="mr-10  w-32">
                            Full Name
                        </label>
                        <input type="full name" id="full name" placeholder="Type full name"
                            className="w-full p-2 border border-gray-300 rounded-2xl shadow-lg text-xs focus:outline-none  focus:ring-black focus:border-black" 
                            value = {name} onChange={(e) => setName(e.target.value)} />

                    </div>

                    <div className="flex items-center">
                        <label htmlFor="email" className="mr-10  w-32">
                            Email
                        </label>
                        <input type="email" id="email" placeholder="Type email address"
                            className="w-full p-2 border border-gray-300 rounded-2xl shadow-lg text-xs focus:outline-none  focus:ring-black focus:border-black" 
                            value = {email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="password" className="mr-10 w-32">
                            Password
                        </label>
                        <input type="password" id="password" placeholder="Type password"
                            className="w-full p-2 border border-gray-300 rounded-2xl shadow-lg text-xs focus:outline-none  focus:ring-black focus:border-black" 
                            value = {password1} onChange={(e) => setPassword1(e.target.value)} />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="password" className="mr-10 w-32">
                            Password
                        </label>
                        <input type="password" id="password" placeholder="Re-type password"
                            className="w-full p-2 border border-gray-300 rounded-2xl shadow-lg text-xs focus:outline-none  focus:ring-black focus:border-black" 
                            value = {password2} onChange={(e) => setPassword2(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-center space-y-4"> 
                        <button type="submit"
                                className="w-1/3 h-8 bg-zinc-100 hover:bg-zinc-200 rounded-2xl border border-black shadow-lg">
                            Create Account
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-600 text-center mt-4 text-sm">{error}</p>}
            </div>
            <p className="mt-6 text-center">
                Already have an account? <a href="/login" className="text-sky-500 hover:text-sky-600 underline">Login here!</a>    
            </p>
        </div>
  );
}
  
  export default Signup;