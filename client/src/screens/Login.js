import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/user_action";
import { useDispatch } from 'react-redux'
import BookHiveLogo from "../assets/book-hive-logo.png";
import LJUniversityLogo from "../assets/lj-university-logo.png";
import PersonIcon from "../assets/person-icon-square.png";

const Login = () => {
    const [password, setPassword] = useState("");
    const [roll_no, setRoll_no] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const PostData = async () => {
        const user = { password, roll_no };
        try {
            const response = await dispatch(loginUser(user));
            // Assuming loginUser action returns a promise that resolves on success
            // and rejects on failure. Adjust this based on your actual implementation.
            if (response.error) {
                setError("Invalid ID or password. Please try again.");
            } else {
                setError(""); // Clear any previous errors on successful login
            }
        } catch (err) {
            setError("Invalid ID or password. Please try again.");
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100 d-flex flex-column">
            <header className="d-flex justify-content-between align-items-center p-4">
                <Link to="/">
                    <img src={BookHiveLogo} alt="BookHive Logo" height="50" />
                </Link>
                <img src={LJUniversityLogo} alt="LJ University Logo" height="50" />
            </header>
            <div className="row justify-content-center align-items-center flex-grow-1">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <img src={PersonIcon} alt="Person Icon" className="mb-3" style={{ width: "100px", height: "100px" }} />
                                <h4>Welcome to Library Management System</h4>
                            </div>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Roll Number" 
                                        value={roll_no} 
                                        onChange={(e) => setRoll_no(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        className="form-control form-control-lg" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3 text-end">
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="showPasswordCheckbox" 
                                            checked={showPassword}
                                            onChange={() => setShowPassword(!showPassword)}
                                        />
                                        <label className="form-check-label" htmlFor="showPasswordCheckbox">
                                            Show Password
                                        </label>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary btn-lg w-100 mb-3" onClick={PostData}>
                                    Login
                                </button>
                                <div className="text-center">
                                    <Link to="/register" className="text-decoration-none">Don't have an account? Register here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="text-center p-3 text-muted">
                <small>If you encounter any issues, please feel free to contact our library administrator at <span style={{color:"#7687FC"}}>library.admin@ljiet.in.</span></small>
            </footer>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Link to="/" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-arrow-left me-2"></i>Back
                </Link>
            </div>
        </div>
    );
};

export default Login;