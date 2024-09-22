import React, { useState } from "react";
import { issueABook } from "../actions/Issue_action";
import { useDispatch, useSelector } from 'react-redux';
import { Toast, Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const Recom_Book = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [publisher, setPublisher] = useState("")
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const { currentUser } = useSelector(state => state.userLoginReducer)
    const dispatch = useDispatch()

    const userId = currentUser.user._id;
    const userBranch = currentUser.user.branch;
    const userName = currentUser.user.name;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            PostData();
        }
        setValidated(true);
    };

    const PostData = () => {
        const book = { title, author, publisher, userId, userBranch, userName, isRecom: true };
        dispatch(issueABook(book));
        setShow(true);
        setAuthor("")
        setTitle("")
        setPublisher("")
        setValidated(false);
    };

    return (
        <Container className="mt-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide className="mb-3">
                        <Toast.Body className="bg-success text-white">You successfully recommended a book</Toast.Body>
                    </Toast>
                    <h1 className="text-center mb-4 display-4 fw-bold text-primary">Recommend a Book</h1>
                    <Alert variant="info" className="mb-4">
                        Once the request is accepted, the book will be automatically added to your issued books.
                    </Alert>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label className="fw-bold">Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter book title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a title.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAuthor">
                            <Form.Label className="fw-bold">Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter author's name"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide an author.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPublisher">
                            <Form.Label className="fw-bold">Publisher</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter publisher's name"
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a publisher.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
                            Send Request
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Recom_Book;