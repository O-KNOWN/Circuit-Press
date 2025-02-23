import React, { useState } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { VscArrowRight } from 'react-icons/vsc';
import Navbar from '../Components/Navbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Default(props) {
    const [email, setEmail] = useState("");

    const Subscribe = async(e) => {
        e.preventDefault()

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setEmail("")
        toast.success("Thank you for subscribing!");

        try {
            const response = await fetch("http://localhost:3000/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email
                }),
                credentials: 'include'
            })

            if(response.ok){
                console.log("User successfully subscribed for CircuitPress")
            }else{
                console.log("Something went wrong")
            }
        } catch (error) {
            
        }

    }
    return (
        <div className='h-[100vh]'>
            <Navbar/>
            {/* */}
            <div className='sm:flex py-5 sm:py-20 items-end justify-around'>
                <div>
                    <h2 className='-tracking-tight font-stretch-expanded font-semibold lg:text-7xl text-3xl md:ps-0 ps-4 md:py-0 py-2 md:text-5xl text-[#024852]'>Newsletter<br/> Signup</h2>
                </div>
                <form onSubmit={Subscribe}>
                    <div className='flex items-center md:mx-0 mx-4 md:mt-0 mt-3 md:mb-0 mb-2 md:gap-5 justify-between'>
                        <div>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none p-1 md:w-[100%] w-[220px] lg:w-[400px] md:text-2xl border-b-2 border-b-gray-800' type='email' placeholder='Type Your Email...'/>
                        </div>    
                        <button className="relative overflow-hidden border px-5 py-1 border-gray-800 hover:text-white text-gray-800 font-medium group" type='submit'>

                            {/* subscribe icon */}
                            <VscArrowRight width={50} size={30} className=' bg-transparent transform transition-transform duration-300 ease-in-out md:w-[30px] w-[24px]'/>
                            <span className="absolute top-0 left-0 w-full h-full bg-[#024852] scale-0 -z-10 group-hover:scale-120 transition-transform duration-500 ease-out origin-top-left"></span>


                        </button>
                    </div>
                </form>
            </div>
            <div className='md:flex text-[#024852] md:justify-between md:mx-9 lg:justify-around lg:mx-10  mx-3 '> 
                <div className='lg:w-[600px] md:mt-0 mt-3 md:mx-0 mx-2 md:mb-0 mb-3 md:w-[50%]'>
                    <p className="m-0"><code><b>CircuitPress</b></code> decodes the most exciting shifts in <code><b>{"Africa's Tech Ecosystem"}</b></code>, spotlighting the hottest conversations from 9ja Tech Twitter, deep dives into <code><b>emerging innovations</b></code>, and exclusive updates before they go public. Making the <code><b>unknown, known—one</b></code> story at a time.</p>
                </div>
                <div className="lg:flex ">
                    <div className='md:w-50'>

                        <ul>
                            <li>
                                <p className="m-0">
                                    <b>Abuja, Nigeria</b>
                                </p>
                            </li>
                            <li>
                                <p className="m-0">
                                    <code>(234) 814 529 0171</code>
                                </p>
                            </li>
                            <li>
                                <a href='https://wa.me/2348145290171' className="m-0 underline">
                                    <kbd>contact us for more information</kbd>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className='lg:my-0 md:my-2'>
                                <p className="m-0">
                                    Every weekend
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}

export default Default;