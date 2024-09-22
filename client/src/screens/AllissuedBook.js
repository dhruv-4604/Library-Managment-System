import React, { useEffect, useState, useMemo } from 'react';
import { getAllIssuedBook, issuedReqDeletedByAdmin } from "../actions/Issue_action"
import { useDispatch, useSelector } from 'react-redux'
import TableDate from "../components/TableDate"
import { Spinner } from "react-bootstrap"

const AllIssuedBook = () => {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState("")
    const { all_IssuedBook, loading } = useSelector(state => state.allIssuedBookReducer)

    useEffect(() => {
        dispatch(getAllIssuedBook())
    }, [dispatch])

    const fetchDataAgain = () => {
        dispatch(getAllIssuedBook())
    }

    const handleSearchChange = (e) => {
        setSearchKey(e.target.value);
    }

    const clearIssuedBook = (bookId) => {
        dispatch(issuedReqDeletedByAdmin(bookId))
        fetchDataAgain()
    }

    const filteredBooks = useMemo(() => {
        if (!all_IssuedBook) return [];
        return all_IssuedBook.filter(book =>
            (book.title && book.title.toLowerCase().includes(searchKey.toLowerCase())) ||
            (book.author && book.author.toLowerCase().includes(searchKey.toLowerCase())) ||
            (book.studentName && book.studentName.toLowerCase().includes(searchKey.toLowerCase()))
        );
    }, [searchKey, all_IssuedBook]);

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h1 className="text-center mb-4">Issued Books</h1>

                    {/* Search input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search book by Name, Author, or Student Name"
                            onChange={handleSearchChange}
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
                                                <th className="fw-semibold py-3">Book</th>
                                                <th className="fw-semibold py-3">Author</th>
                                                <th className="fw-semibold py-3">Name</th>
                                                <th className="fw-semibold py-3">Branch</th>
                                                <th className="fw-semibold py-3">Issued Date</th>
                                                <th className="fw-semibold py-3">Return Date</th>
                                                <th className="fw-semibold py-3">Dues</th>
                                                <th className="fw-semibold py-3">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBooks.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center">
                                                        {searchKey ? "No books available matching your search." : "No issued books found."}
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredBooks.map(book => (
                                                    <TableDate key={book._id} book={book} clearIssuedBook={clearIssuedBook} />
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

export default AllIssuedBook;
