import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const Navbar = () => {
    const { isLoggedIn, logout } = useUser(); //jesli zalogowan to wyswietli logout
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/charts" className="hover:underline">Charts</Link>
                </div>
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">Logout</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

