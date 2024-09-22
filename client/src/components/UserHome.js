import React, { useEffect, useState } from 'react';
import { userProfile } from "../actions/user_action";
import { getUserIssuedBook, getAllIssuedBook, filterallIssuedBook } from "../actions/Issue_action";
import { useDispatch, useSelector } from 'react-redux';
import Image from "../Images/profile2.png";
import TableDate from "../components/TableDate";

const UserHome = () => {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
        dispatch(userProfile());
        dispatch(getUserIssuedBook());
        dispatch(getAllIssuedBook());
    }, [dispatch]);

    const { currentUser } = useSelector(state => state.userProfileReducer);
    const { userIssuedBook } = useSelector(state => state.userIssuedBookReducer);
    const { all_IssuedBook } = useSelector(state => state.allIssuedBookReducer);

    const isAdmin = currentUser && currentUser[0] && currentUser[0].isAdmin;

    const fetchDataAgain = () => {
        dispatch(getAllIssuedBook());
    };

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
                             
                                {isAdmin ? (
                                    <p><strong>Admin ID:</strong> {currentUser && currentUser[0] && currentUser[0].roll_no}</p>
                                ) : (
                                    <>
                                        <p><strong>Enrollment No:</strong> {currentUser && currentUser[0] && currentUser[0].roll_no}</p>
                                        <p><strong>Branch:</strong> {currentUser && currentUser[0] && currentUser[0].branch}</p>
                                        <p><strong>Admission Year:</strong> {currentUser && currentUser[0] && currentUser[0].addmission_year}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {!isAdmin && (
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
                )}
                {isAdmin && (
                    <div className="col-md-8">
                        <div className="all-issued-books-section">
                            <h3>All Issued Books</h3>
                            <div className="col-md-8 m-auto" style={{display:"flex"}}>
                                <input 
                                    type="text"  
                                    className="form-control" 
                                    placeholder="Search book by Name"  
                                    style={{height:"50px"}}
                                    onChange={(e) => setSearchKey(e.target.value)} 
                                    value={searchKey} 
                                />
                                <button onClick={() => dispatch(filterallIssuedBook(searchKey))} className="btn btn-primary">Search</button>
                            </div>
                            <br />
                            <table className='table table-bordered table-responsive-sm'>
                                <thead className='thead-dark bg-info'>
                                    <tr>
                                        <th>Book</th>
                                        <th>Author</th>
                                        <th>Name</th>
                                        <th>Branch</th>
                                        <th>Issued Date</th>
                                        <th>Return Date</th>
                                        <th>Dues</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {all_IssuedBook && all_IssuedBook.map(book => (
                                        <TableDate key={book._id} book={book} fetchDataAgain={fetchDataAgain} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserHome;