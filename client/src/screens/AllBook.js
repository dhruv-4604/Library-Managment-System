import React, { useState, useEffect } from 'react';
import { getAllBook } from "../actions/book_action"
import { issueABook, getAllIssuedBook } from "../actions/Issue_action"
import { useDispatch, useSelector } from 'react-redux'
import { Toast, Spinner } from "react-bootstrap"
import { deleteBook } from "../actions/book_action";

const AllBook = () => {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState("")
    const [show, setShow] = useState(false);
    const [bootTitle, setBookTitle] = useState(null)
    const [error, setError] = useState(false)
    const [filteredBooks, setFilteredBooks] = useState([])
    const [requestedBooks, setRequestedBooks] = useState([])

    useEffect(() => {
        dispatch(getAllBook())
        dispatch(getAllIssuedBook())
    }, [dispatch])

    const { books, loading } = useSelector(state => state.getAllBookReducer)
    const { all_IssuedBook } = useSelector(state => state.allIssuedBookReducer)
    const { currentUser } = useSelector(state => state.userLoginReducer)
    const userId = currentUser.user._id;
    const userBranch = currentUser.user.branch;
    const userName = currentUser.user.name;

    let filterBook22 = all_IssuedBook && all_IssuedBook.filter(book => book.userId === userId);
    let newBooksId = filterBook22 && filterBook22.map(book => book.bookId)

    useEffect(() => {
        if (books) {
            setFilteredBooks(books)
        }
    }, [books])

    useEffect(() => {
        if (books) {
            const filtered = books.filter(book =>
                book.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                book.author.toLowerCase().includes(searchKey.toLowerCase())
            )
            setFilteredBooks(filtered)
        }
    }, [searchKey, books])

    const postData = (book) => {
        if (newBooksId && newBooksId.includes(book._id)) {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000)
            return;
        }

        if (book.copies < 1) {
            return;
        }
        const { title, author, publisher, year, _id, copies } = book;

        const issueUser = {
            title, author, publisher, year, userId, bookId: _id, userBranch, userName, copies
        }
        if (book.copies) {
            dispatch(issueABook(issueUser))
            setBookTitle(title)
            setShow(true);
            dispatch(getAllBook())
            setRequestedBooks([...requestedBooks, _id]); // Add the book ID to requestedBooks
        } else {
            alert("book not available")
        }
        setTimeout(() => {
            setShow(false)
        }, 5000)
    }

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h1 className="text-center mb-4">Library Book Catalog</h1>
                    
                    {/* Toast notification */}
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide className="position-fixed top-0 end-0 m-3">
                        <Toast.Body className="bg-success text-white">You successfully sent an issue request for {bootTitle}</Toast.Body>
                    </Toast>

                    {/* Error message */}
                    {error && <div className="alert alert-danger mb-3">You have already requested this book</div>}

                    {/* Search input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search book by Name or Author"
                            onChange={(e) => setSearchKey(e.target.value)}
                            value={searchKey}
                        />
                    </div>

                    {/* Book table */}
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
                                                <th className="fw-semibold py-3">Copies</th>
                                                <th className="fw-semibold py-3">Status</th>
                                                <th className="fw-semibold py-3">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        <Spinner animation="border" variant="primary" />
                                                    </td>
                                                </tr>
                                            ) : filteredBooks.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        {searchKey ? "No books available matching your search." : "No books are available in the library."}
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredBooks.map((book, index) => (
                                                    <tr key={book._id} >
                                                        <td style={{paddingTop:'17px',paddingBottom:'17px'}} className="align-middle">{index + 1}</td>
                                                        <td className="align-middle">{book.title}</td>
                                                        <td className="align-middle">{book.author}</td>
                                                        <td className="align-middle">{book.copies}</td>
                                                        <td className="align-middle">
                                                            <span className={`badge ${book.copies > 0 ? 'bg-success' : 'bg-danger'} fw-normal`}>
                                                                {book.copies > 0 ? "AVAILABLE" : "NOT AVAILABLE"}
                                                            </span>
                                                        </td>
                                                        <td className="align-middle">
                                                            {currentUser.user.isAdmin ? (
                                                                <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteBook(book._id))}>
                                                                    <i className='fa fa-trash'></i> Delete
                                                                </button>
                                                            ) : requestedBooks.includes(book._id) ? (
                                                                <button className="btn btn-secondary btn-sm" disabled>
                                                                    Requested
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => postData(book)} className="btn btn-primary btn-sm" disabled={book.copies === 0}>
                                                                    Issue
                                                                </button>
                                                            )}
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
                </div>
            </div>
        </div>
    );
};

export default AllBook;