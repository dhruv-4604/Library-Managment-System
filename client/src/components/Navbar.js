import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { currentUser } = useSelector(state => state.userLoginReducer);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white " style={{borderBottom:'0.6px solid #CBCBCB' }}>
            <div className="container-fluid"style={{fontWeight:500, fontFamily:'Poppins',paddingTop:'5px',paddingBottom:'5px'}}>
                <Link className="navbar-brand" to="/dashboard" >
                    <img style={{paddingLeft:"15px"}} src={logo} alt="BookHive" height="30" className="d-inline-block align-text-top me-2" />
                    BookHive
                </Link>
                <div className="ms-auto">
                    {currentUser ? (
                        <button className="btn btn-primary">
                            <i className="fas fa-user me-2"></i>
                            {currentUser.user.name}
                        </button>
                    ) : (
                        <button className="btn btn-primary">
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;