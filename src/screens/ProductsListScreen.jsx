import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
    createProduct,
    deleteProduct,
    listProducts,
    resetCreateProductState,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductsListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    const user = useSelector((state) => state.user);
    const { userInfo } = user;

    useEffect(() => {
        dispatch(resetCreateProductState());

        if (userInfo && !userInfo.is_admin) {
            history.push("/login");
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts());
        }
    }, [
        dispatch,
        history,
        userInfo,
        successCreate,
        createdProduct,
        successDelete,
    ]);

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteProduct(id));
        }
    };

    const handleCreateProduct = () => {
        dispatch(createProduct());
    };

    return (
        <Row>
            <Col md={12}>
                <Row className="align-items-center">
                    <Col>
                        <h2 className="my-4">Products</h2>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="dark" onClick={handleCreateProduct}>
                            Create Product
                        </Button>
                    </Col>
                </Row>

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
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.map((product) => (
                                    <tr>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer
                                                to={`/admin/product/${product._id}/edit`}
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
                                                onClick={() =>
                                                    handleDeleteProduct(
                                                        product._id
                                                    )
                                                }
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

export default ProductsListScreen;
