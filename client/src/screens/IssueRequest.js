import React, { useState, useEffect, useCallback } from 'react';
import { getAllBookIssueReq, issuedReq, issuedReqDeletedByAdmin } from "../actions/Issue_action"
import { useDispatch, useSelector } from 'react-redux'

const IssueRequest = () => {
    const dispatch = useDispatch();
    const [localIssuebooks, setLocalIssuebooks] = useState([]);
    
    const fetchIssueRequests = useCallback(() => {
        dispatch(getAllBookIssueReq());
    }, [dispatch]);

    useEffect(() => {
        fetchIssueRequests();
    }, [fetchIssueRequests]);
   
    const { issuebooks } = useSelector(state => state.getAllIssueBookReqReducer)

    useEffect(() => {
        if (issuebooks) {
            setLocalIssuebooks(issuebooks.filter(item => !item.isIssue && !item.isRecom));
        }
    }, [issuebooks]);

    const handleAccept = async (bookId, bookItemId) => {
        await dispatch(issuedReq(bookId, bookItemId));
        console.log('Book accepted:', bookId);
        // Update local state immediately
        setLocalIssuebooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
    }

    const handleReject = async (bookId) => {
        await dispatch(issuedReqDeletedByAdmin(bookId));
        console.log('Book rejected:', bookId);
        // Update local state immediately
        setLocalIssuebooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
    }

    console.log('Current issue requests:', localIssuebooks);

    return (
        <div className="col-md-10 m-auto">
             <p style={{fontFamily:"sans-serif",fontSize:"30px",textAlign:"center",padding:"10px"}}>Student Requested to Admin to issue these Book</p>
            <table  className='table table-bordered table-responsive-sm'>


<thead className='thead-dark'>
    <tr >
        <th>Book Name</th>
        <th>Author</th>
        <th>Student Name</th>
        <th>Student Branch</th>
        <th>Actions</th>
    </tr>
</thead>
<tbody>
    
{localIssuebooks && localIssuebooks.map(book=>{

    return <tr key={book._id} >
        <td>{book.title}</td>
        <td>
            {book.author}
        </td>
        <td>
            {book.userName}
        </td>
        <td>
            {book.userBranch}
        </td>
       
        <td>
           
             <button onClick={() => handleAccept(book._id, book.bookId)} className="btn btn-success">Accepted</button> { "  "}
             <button onClick={() => handleReject(book._id)} className="btn btn-danger">Rejected</button>
        </td>

    </tr>

})}
</tbody>

</table>
        </div>
    );
};

export default IssueRequest;