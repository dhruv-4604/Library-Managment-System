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
        } else {
            alert("book not available")
        }
        setTimeout(() => {
            setShow(false)
        }, 5000)
    }

    return (
        <div>
            <div className="col-md-10 m-auto" >
                <h3 className='text-center bg-info p-2' style={{ fontFamily: "sans-serif", }}>ALL AVAILABLE BOOKS IN LIBRARY</h3>
                <br />
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body style={{ backgroundColor: "green", color: "white", fontSize: "18px" }}>You successfully send issue request for {bootTitle}  </Toast.Body>
                </Toast>
            </div>

            {error && <div className="alert alert-danger"> You have already requested this book </div>}

            <div className="col-md-8 m-auto" style={{ display: "flex" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search book by Name or Author"
                    style={{ height: "50px" }}
                    onChange={(e) => setSearchKey(e.target.value)}
                    value={searchKey}
                />
            </div>

            {loading ? (
                <div style={{ marginLeft: "40%", marginTop: "5%" }}>
                    <Spinner animation="border" variant="danger" />
                </div>
            ) : (
                <div className="col-md-10 m-auto">
                    <table className='table table-bordered table-responsive-sm' style={{ marginTop: "20px" }}>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Serial No.</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Copies</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No Books are available in the library.</td>
                                </tr>
                            ) : filteredBooks.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No books available matching your search.</td>
                                </tr>
                            ) : (
                                filteredBooks.map((book, index) => (
                                    <tr key={book._id}>
                                        <td>{index + 1}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.copies}</td>
                                        <td>{book.copies > 0 ? "AVAILABLE" : "NOT AVAILABLE"}</td>
                                        <td>
                                            {currentUser.user.isAdmin && (
                                                <i className='fa fa-trash m-1' onClick={() => dispatch(deleteBook(book._id))}></i>
                                            )}
                                            {!currentUser.user.isAdmin && (
                                                <button onClick={() => postData(book)} className={`btn btn-success`}>Issue</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllBook;