import React, { useEffect } from 'react';
import { getAllBookIssueReq, issuedReq, issuedReqDeletedByAdmin, acceptRecommendedBook } from "../actions/Issue_action"
import { addOneBook } from "../actions/book_action"
import { useDispatch, useSelector } from 'react-redux'
import { addBookToUserIssued } from "../actions/user_action"; // Add this import

const RecomBook = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.userLoginReducer);
    
    useEffect(() => {
        dispatch(getAllBookIssueReq())
    }, [dispatch])

    const { issuebooks } = useSelector(state => state.getAllIssueBookReqReducer) || {};
    const newIssuedBook = issuebooks && issuebooks.filter(item => item.isRecom)

    const handleAccept = async (book) => {
        if (currentUser.user.isAdmin) {
            try {
                await dispatch(acceptRecommendedBook(book._id));
                // Refresh the list of recommended books
                dispatch(getAllBookIssueReq());
                // Optionally, show a success message
                alert("Book recommendation accepted successfully!");
            } catch (error) {
                console.error("Error accepting book recommendation:", error);
                alert("An error occurred while accepting the book recommendation.");
            }
        } else {
            alert("You don't have permission to perform this action.");
        }
    }

    const handleDelete = (bookId) => {
        if (currentUser.user.isAdmin) {
            dispatch(issuedReqDeletedByAdmin(bookId));
        } else {
            alert("You don't have permission to perform this action.");
        }
    }

    return (
        <div className="col-md-10 m-auto">
            <p style={{fontFamily:"sans-serif",fontSize:"30px",textAlign:"center",padding:"10px"}}>Recommended By Student</p>
           
            <table className='table table-bordered table-responsive-sm'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Serial No.</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Requested Student</th>
                        <th>Student Branch</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {newIssuedBook && newIssuedBook.map((book, index) => (
                        <tr key={book._id}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.userName}</td>
                            <td>{book.userBranch}</td>
                            <td>
                                <button onClick={() => handleAccept(book)} className="btn btn-success">Accept</button>
                                <button onClick={() => handleDelete(book._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecomBook;