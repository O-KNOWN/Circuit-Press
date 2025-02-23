import React from 'react';

function footer(props) {
    return (
        <div className='items'>
            <footer className="w-full bg-gray-900 text-gray-400 text-center py-4">
                &copy; {new Date().getFullYear()} OKNOWN. All rights reserved.
            </footer>
        </div>
    );
}

export default footer;