import React, { useEffect, useState } from 'react';

function Navbar(props) {
    const [userTime, setUserTime] = useState("");

    useEffect( () => {
        async function fetchData() {

            try {
                const response = await fetch("http://localhost:3000/get-time")

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }   

                const data = await response.json();
                setUserTime(data.userTime)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

        const interval = setInterval(fetchData, 1000); 

        return () => clearInterval(interval);
    }, [])
    return (
        <div className='flex md:mx-5 mx-1 items-center justify-between'>
            <header className='text-xl text-[#024852] font-semibold flex justify-start md:ps-5 ps-4 py-3 md:py-5'>
                circuit:press
            </header>
            <div className='text-[#024852]'>
                {userTime ? userTime : "Loading..."}
            </div>
        </div>
    );
}

export default Navbar;