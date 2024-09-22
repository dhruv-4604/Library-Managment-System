import React, { useEffect, useState, useMemo } from 'react';
import { getUserIssuedBook, singleissueABook, issueABookReturn, returnReqAction } from "../actions/Issue_action"
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Spinner } from "react-bootstrap"
import Moment from 'react-moment';
import moment from 'moment';

const UserIssuedBook = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(null);
    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
        dispatch(getUserIssuedBook())
    }, [dispatch])

    const { userIssuedBook, loading } = useSelector(state => state.userIssuedBookReducer)
    const { singleIsBook } = useSelector(state => state.singleIssuedBookReducer)

    const issuedBooks = userIssuedBook && userIssuedBook.filter(item => item.isIssue);

    const filteredBooks = useMemo(() => {
        if (!issuedBooks) return [];
        return issuedBooks.filter(book =>
            book.title.toLowerCase().includes(searchKey.toLowerCase()) ||
            book.author.toLowerCase().includes(searchKey.toLowerCase())
        );
    }, [searchKey, issuedBooks]);

    const handleSearchChange = (e) => {
        setSearchKey(e.target.value);
    };

    const handleClose = () => setShow(false);

    const handleModal = (postId, cDate) => {
        setDate(cDate);
        setShow(true);
        dispatch(singleissueABook(postId));
    }

    const handleReqAndReturn = (book) => {
        dispatch(issueABookReturn(book.bookId));
        dispatch(returnReqAction(book));
    }

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h1 className="text-center mb-4">My Issued Books</h1>

                    {!issuedBooks || issuedBooks.length === 0 ? (
                        <div className="alert alert-info text-center">
                            <h4>You haven't issued any books yet.</h4>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Search book by Name or Author"
                                    onChange={handleSearchChange}
                                    value={searchKey}
                                />
                            </div>

                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" variant="primary" />
                                </div>
                            ) : (
                                <div className="card">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className='table table-hover table-striped mb-0'>
                                                <thead className='table-dark'>
                                                    <tr>
                                                        <th className="fw-semibold py-3">#</th>
                                                        <th className="fw-semibold py-3">Title</th>
                                                        <th className="fw-semibold py-3">Author</th>
                                                        <th className="fw-semibold py-3">Publisher</th>
                                                        <th className="fw-semibold py-3">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredBooks.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="5" className="text-center">
                                                                {searchKey ? "No books available matching your search." : "You have no issued books."}
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        filteredBooks.map((book, index) => (
                                                            <tr key={book._id}>
                                                                <td style={{paddingTop:'17px',paddingBottom:'17px'}} className="align-middle">{index + 1}</td>
                                                                <td className="align-middle">{book.title}</td>
                                                                <td className="align-middle">{book.author}</td>
                                                                <td className="align-middle">{book.publisher}</td>
                                                                <td className="align-middle">
                                                                    <button onClick={() => handleReqAndReturn(book)} className="btn btn-danger btn-sm me-2">
                                                                        Return
                                                                    </button>
                                                                    <button onClick={() => handleModal(book.bookId, book.createdAt)} className="btn btn-success btn-sm">
                                                                        Details
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Book Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3><b>Book Name: </b>{singleIsBook && singleIsBook.title}</h3>
                            <p><b>Author: </b>{singleIsBook && singleIsBook.author}</p>
                            <p><b>Publisher: </b>{singleIsBook && singleIsBook.publisher}</p>
                            <p><b>Originally published: </b>{singleIsBook && singleIsBook.year}</p>
                            <p><b>Issued Date: </b>{date && <Moment format="YYYY-MM-DD">{date}</Moment>}</p>
                            <p><b>Return Date: </b>{date && <Moment format="YYYY-MM-DD" add={{ days: 7 }}>{date}</Moment>}</p>
                            {(() => {
                                const now = moment();
                                const returnDate = moment(date).add(7, 'days');
                                const dayDiff = now.diff(returnDate, 'days');
                                const fine = Math.max(0, dayDiff * 15);
                                return (
                                    <>
                                        <p><b>Days Overdue: </b>{Math.max(0, dayDiff)}</p>
                                        <h3><b>Fine: </b>₹{fine}</h3>
                                    </>
                                );
                            })()}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default UserIssuedBook;
