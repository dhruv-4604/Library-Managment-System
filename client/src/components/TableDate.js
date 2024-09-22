import React from 'react';
import moment from 'moment';

const TableDate = ({ book, clearIssuedBook }) => {
    return (
        <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.studentName}</td>
            <td>{book.branch}</td>
            <td>{moment(book.issuedDate).format('DD-MM-YYYY')}</td>
            <td>{moment(book.returnDate).format('DD-MM-YYYY')}</td>
            <td>₹{book.fine}</td>
            <td>
                <button onClick={() => clearIssuedBook(book._id)} className="btn btn-danger">Clear</button>
            </td>
        </tr>
    )
}

export default TableDate;