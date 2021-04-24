import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    getUserDetails,
    resetUserDetails,
    resetUserUpdate,
    updateUser,
} from "../actions/userActions";
import Message from "../components/Message";

const UserEditScreen = ({ history, match }) => {
    const userId = match.params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate;

    useEffect(() => {
        if (success) {
            dispatch(resetUserUpdate());
            dispatch(resetUserDetails());
            history.push("/admin/users");
        } else {
            if (!user || !user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.is_admin);
            }
        }
    }, [dispatch, user, userId, history, success]);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                _id: user._id,
                name: name,
                email: email,
                isAdmin: isAdmin,
            })
        );
    };

    return (
        <>
            <Link to="/admin/users">
                <Button variant="secondary">Go Back</Button>
            </Link>
            <Row className="justify-content-center">
                <Col md={6} xs={12}>
                    <h1 className="my-4">Update User</h1>
                    <Form onSubmit={handleUpdateUser}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="isAdmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </Form.Group>
                        <Button
                            variant="dark"
                            type="submit"
                            disabled={loadingUpdate}
                        >
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
            {error && <Message variant="danger">{error}</Message>}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        </>
    );
};

export default UserEditScreen;
