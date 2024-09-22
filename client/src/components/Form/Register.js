import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { registerUser } from "../../actions/user_action";
import BookHiveLogo from "../../assets/book-hive-logo.png";
import LJUniversityLogo from "../../assets/lj-university-logo.png";
import PersonIcon from "../../assets/person-icon-square.png";

const signInSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name is too short - should be 3 chars minimum")
    .max(50, "Name is too long - should be 50 chars maximum"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars minimum"),
  branch: Yup.string().required("Branch is required"),
  roll_no: Yup.number()
    .typeError("Roll No must be a number")
    .required("Roll No is required")
    .positive("Roll No must be positive")
    .integer("Roll No must be an integer")
    .min(1, "Roll No must be at least 1"),
  year: Yup.number()
    .required("Admission Year is required")
    .integer("Year must be an integer")
    .min(2020, "Year must be 2020 or later")
    .max(3000, "Year must be 3000 or earlier")
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  branch: "",
  roll_no: "",
  year: ""
};

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");

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
                <h4>Register for Library Management System</h4>
              </div>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <Formik
                initialValues={initialValues}
                validationSchema={signInSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const response = await dispatch(registerUser(values));
                    if (response && response.status === 200) {
                      setError(""); // Clear any previous errors
                      resetForm();
                      history.push('/login'); // Redirect to Login page on successful registration
                    } else {
                      // Handle unexpected response
                      setError("Registration failed. Please try again.");
                    }
                  } catch (err) {
                    console.error("Registration error:", err);
                    setError("An unexpected error occurred. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <Field type="text" name="name" className="form-control form-control-lg" placeholder="Name" />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="password" name="password" className="form-control form-control-lg" placeholder="Password" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="text" name="branch" className="form-control form-control-lg" placeholder="Branch" />
                      <ErrorMessage name="branch" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="text" name="roll_no" className="form-control form-control-lg" placeholder="Roll No" />
                      <ErrorMessage name="roll_no" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="number" name="year" className="form-control form-control-lg" placeholder="Admission Year" />
                      <ErrorMessage name="year" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-100 mb-3" disabled={isSubmitting}>
                      Register
                    </button>
                    <div className="text-center">
                      <Link to="/login" className="text-decoration-none">Already have an account? Login here</Link>
                    </div>
                  </Form>
                )}
              </Formik>
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

export default Register;
