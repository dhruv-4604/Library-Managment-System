import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/user_action";
import { useDispatch } from 'react-redux'
import StudentImage from "../Images/student4.jpg"

const Login = () => {
    const [password, setPassword] = useState("123456");
    const [show, setShow] = useState("password");
    const [roll_no, setRoll_no] = useState("CS3150");
    const dispatch = useDispatch();

    const PostData = () => {
        const user = { password, roll_no };
        dispatch(loginUser(user));
    };

    const handleShow = () => {
        if (show === "password") {
            setShow("text");
        } else {
            setShow("password");
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100 d-flex align-items-center">
            <div className="row justify-content-center w-100">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <div className="rounded-circle bg-primary d-inline-flex justify-content-center align-items-center" style={{ width: "80px", height: "80px" }}>
                                    <h3 className="text-white m-0">LMS</h3>
                                </div>
                                <h4 className="mt-3">Welcome to Library Management System</h4>
                            </div>
                            <img src={StudentImage} alt="Student" className="rounded-circle mx-auto d-block mb-4" style={{ height: "150px", width: "150px" }} />
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-lg" placeholder="Roll Number" value={roll_no} onChange={(e) => setRoll_no(e.target.value)} />
                                </div>
                                <div className="mb-3 position-relative">
                                    <input type={show} className="form-control form-control-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <i className="fas fa-eye position-absolute top-50 end-0 translate-middle-y me-3" onClick={handleShow}></i>
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
        </div>
    );
};

export default Login;