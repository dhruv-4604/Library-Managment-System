import React, { useEffect } from 'react';
import { userProfile } from "../actions/user_action";
import { getUserIssuedBook } from "../actions/Issue_action";
import { useDispatch, useSelector } from 'react-redux';
import Image from "../Images/profile2.png";

const UserHome = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userProfile());
        dispatch(getUserIssuedBook());
    }, [dispatch]);

    const { currentUser } = useSelector(state => state.userProfileReducer);
    const { userIssuedBook } = useSelector(state => state.userIssuedBookReducer);

    return (
        <div className="container mt-4" style={{boxShadow:'none'}}>
            <div className="row">
                <div className="col-md-4">
                    <div className="card profile-section">
                        <img src={Image} alt={currentUser && currentUser[0] && currentUser[0].name} className="card-img-top rounded-circle mx-auto d-block mt-3 profile-image" style={{width: "200px", height: "200px"}} />
                        <div className="card-body">
                            <h2 className="card-title text-center">{currentUser && currentUser[0] && currentUser[0].name}</h2>
                            <div className="user-details">
                                <p><strong>Email:</strong> {currentUser && currentUser[0] && currentUser[0].email}</p>
                                <p><strong>Phone:</strong> {currentUser && currentUser[0] && currentUser[0].phone_no}</p>
                                <p><strong>Enrollment No:</strong> {currentUser && currentUser[0] && currentUser[0].roll_no}</p>
                                <p><strong>Branch:</strong> {currentUser && currentUser[0] && currentUser[0].branch}</p>
                                <p><strong>Admission Year:</strong> {currentUser && currentUser[0] && currentUser[0].addmission_year}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="issued-books-section">
                        <h3>Currently Issued Books</h3>
                        {userIssuedBook && userIssuedBook.length > 0 ? (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Issue Date</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userIssuedBook.map(book => (
                                        <tr key={book._id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                                            <td>{new Date(new Date(book.createdAt).getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No books currently issued.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;