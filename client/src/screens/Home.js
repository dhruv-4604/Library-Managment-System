import React from 'react';
import { Link } from "react-router-dom";
import BookHiveLogo from "../assets/book-hive-logo.png";
import LJUniversityLogo from "../assets/lj-university-logo.png";
import StudentAdminIllustration from "../assets/student-admin-illustration.png";
import StudentIcon from "../assets/student-icon.svg";
import AdminIcon from "../assets/admin-icon.svg";

const Home = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <header className="d-flex justify-content-between align-items-center p-4">
                <img src={BookHiveLogo} alt="BookHive Logo" height="50" />
                <img src={LJUniversityLogo} alt="LJ University Logo" height="50" />
            </header>
            
            <main className="flex-grow-1 d-flex align-items-center">
                <div className="container"  style={{boxShadow:'none'}}>
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-center">
                            <h1 className="text-primary mb-4" style={{fontSize: '2.5rem'}}>Welcome to LJ University Library Portal!</h1>
                            <p className="mb-4">Please select your role from the options below:</p>
                            
                            <div className="d-flex justify-content-center gap-5 mt-5">
                                <Link to="/login" className="text-decoration-none text-center">
                                    <img src={StudentIcon} alt="Student" width="140" height="140" />
                                </Link>
                                
                                <Link to="/adminLogin" className="text-decoration-none text-center" >
                                    <img src={AdminIcon} alt="Admin" width="140" height="140" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={StudentAdminIllustration} alt="Library Illustration" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </main>
            
            <footer className="text-center p-3 text-muted">
                <small>If you encounter any issues, please feel free to contact our library administrator at <span style={{color:"#7687FC"}}>library.admin@ljiet.in.</span></small>
            </footer>
        </div>
    );
};

export default Home;