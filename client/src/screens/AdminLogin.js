import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/user_action";
import { useDispatch } from 'react-redux'
import BookHiveLogo from "../assets/book-hive-logo.png";
import LJUniversityLogo from "../assets/lj-university-logo.png";
import PersonIcon from "../assets/person-icon-square.png";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [roll_no, setRoll_no] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const PostData = async () => {
        const user = { password, roll_no };
        setError(""); // Clear any previous errors before attempting login
        try {
            const response = await dispatch(loginUser(user));
            if (response.success) {
                // Instead of immediately redirecting, we'll set a small timeout
                setTimeout(() => {
                    window.location.href = '/admin-dashboard'; // Use window.location for redirection
                }, 1000); // Small delay to prevent error flash
            }
             else {
                setError("Invalid Employee ID or password. Please try again.");
            }
        } catch (err) {
            setTimeout(()=>{setError("An error occurred. Please try again.")},400)
            
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
                                <img src={PersonIcon} alt="Admin Icon" className="mb-3" style={{ width: "100px", height: "100px" }} />
                                <h4>Admin Login</h4>
                            </div>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Employee ID" 
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="text-center p-3 text-muted">
                <small>If you encounter any issues, please contact the system administrator.</small>
            </footer>
            <div className="position-fixed bottom-0 end-0 p-3">
                <Link to="/" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-arrow-left me-2"></i>Back
                </Link>
            </div>
        </div>
    );
};

export default AdminLogin;