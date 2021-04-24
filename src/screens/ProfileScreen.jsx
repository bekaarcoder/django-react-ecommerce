import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
    getUserDetails,
    getUserOrders,
    resetUserUpdateDetails,
    updateUserDetails,
} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.user);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userOrders = useSelector((state) => state.userOrders);
    const { loading: loadingOrders, error: errorOrders, orders } = userOrders;

    const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
    const { success } = userUpdateDetails;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch(resetUserUpdateDetails());
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
            dispatch(getUserOrders());
        }
    }, [userInfo, user, dispatch, history, success]);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match.");
        } else {
            dispatch(
                updateUserDetails({
                    id: user._id,
                    name: name,
                    email: email,
                    password: password,
                })
            );
        }
    };

    return (
        <>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            <Row>
                <Col md={4}>
                    <h2>MY PROFILE</h2>
                    <Form onSubmit={handleProfileUpdate}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password again"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={8}>
                    <h2>MY ORDERS</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : (
                        <table className="table table-striped align-middle">
                            <thead>
                                <tr>
                                    <th>ORDER ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DETAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr className="align-middle">
                                        <td>{order._id}</td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt
                                            ) : (
                                                <i className="fas fa-times text-danger"></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`/order/${order._id}`}
                                            >
                                                {order.isPaid ? (
                                                    <Button variant="info">
                                                        View Details
                                                    </Button>
                                                ) : (
                                                    <Button variant="warning">
                                                        Complete Order
                                                    </Button>
                                                )}
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default ProfileScreen;
