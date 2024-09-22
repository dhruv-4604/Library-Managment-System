import React from 'react';
import { Link } from "react-router-dom";
import StudentImage from "../Images/student4.jpg";
import AdminImage from "../Images/admin2.jpg";

const Home = () => {
    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
            <div className="bg-white p-5 rounded shadow-lg d-flex">
                <div className="text-center mx-4">
                    <img 
                        src={AdminImage} 
                        alt="Admin" 
                        className="rounded-circle mb-4 shadow-sm"
                        style={{width: '256px', height: '256px', objectFit: 'cover'}}
                    />
                    <Link 
                        to="/adminLogin" 
                        className="h4 text-primary text-decoration-none"
                    >
                        Sign in as Admin
                    </Link>
                </div>
                <div className="text-center mx-4">
                    <img 
                        src={StudentImage} 
                        alt="Student" 
                        className="rounded-circle mb-4 shadow-sm"
                        style={{width: '256px', height: '256px', objectFit: 'cover'}}
                    />
                    <Link 
                        to="/login" 
                        className="h4 text-success text-decoration-none"
                    >
                        Sign in as Student
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;