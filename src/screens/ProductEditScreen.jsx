import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import {
    fetchProductDetails,
    updateProduct,
    resetUpdateProductState,
} from "../actions/productActions";
import Loader from "../components/Loader";

const ProductEditScreen = ({ history, match }) => {
    const productId = match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            history.push("/admin/products");
            dispatch(resetUpdateProductState());
        } else {
            if (
                !product ||
                !product.name ||
                product._id !== Number(productId)
            ) {
                dispatch(fetchProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setBrand(product.brand);
                setCategory(product.category);
                setImage(product.image);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, product, productId, history, successUpdate]);

    const handleEditProduct = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                brand,
                category,
                image,
                countInStock,
                description,
            })
        );
    };

    const handleImageUpload = async (e) => {
        console.log("Image Uploading...");
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("product_id", productId);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };
            const { data } = await axios.post(
                "/api/products/upload",
                formData,
                config
            );
            setImage(data);
            setUploading(false);
        } catch (error) {
            setUploading(false);
        }
    };

    return (
        <>
            <Link to="/admin/products">
                <Button variant="secondary">Go Back</Button>
            </Link>
            {loading ? (
                <Loader />
            ) : (
                <Row className="justify-content-center">
                    <Col md={6} xs={12}>
                        <h1 className="my-4">Edit Product</h1>
                        <Form onSubmit={handleEditProduct}>
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
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter brand name"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Image"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <Form.File
                                    id="image-file"
                                    label="Choose File"
                                    custom
                                    onChange={handleImageUpload}
                                ></Form.File>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter stock count"
                                    value={countInStock}
                                    onChange={(e) =>
                                        setCountInStock(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button
                                variant="dark"
                                type="submit"
                                disabled={loadingUpdate}
                            >
                                Save Product
                            </Button>
                        </Form>
                    </Col>
                </Row>
            )}
            {error && <Message variant="danger">{error}</Message>}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        </>
    );
};

export default ProductEditScreen;
