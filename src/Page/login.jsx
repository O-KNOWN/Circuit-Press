import React, { useState } from 'react';
import Footer from '../Components/footer';
import Navbar from '../Components/Navbar';
function login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);
        setError(null);
        
        try {
            const response =  await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email, password
                }),
                credentials: 'include'
            })
            const data = await response.json();
    
            localStorage.setItem("token", data.token);
    
            alert("Login successful!");
            setLoading(false);
        } catch (error) {
            setError(error.message);
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar/>
            <form className='h-[90vh]' onSubmit={handleLogin}>
                <div className='bg-[#024852]'>
                    <p className="m-0 text-white md:p-8 p-7 md:text-xl text-[20px]">Login</p>
                </div>
                <div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-1 md:mx-5 mx-3 md:my-3 my-2">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                    </div>
                    <div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>        
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </div>
            </form>
            <div className=''>
                <Footer/>
            </div>
        </div>
    );
}

export default login;