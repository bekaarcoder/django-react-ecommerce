import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getUserList } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UsersScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const user = useSelector((state) => state.user);
    const { userInfo } = user;

    useEffect(() => {
        if (userInfo && userInfo.is_admin) {
            dispatch(getUserList());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);

    return (
        <Row>
            <Col md={12}>
                <h2 className="my-4">Users</h2>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Is Admin</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((user) => (
                                    <tr>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.is_admin ? (
                                                <i className="fas fa-check text-success"></i>
                                            ) : (
                                                <i className="fas fa-times text-danger"></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`/admin/user/${user._id}`}
                                            >
                                                <Button
                                                    variant="secondary"
                                                    className="btn-sm"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant="danger"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </Col>
        </Row>
    );
};

export default UsersScreen;
