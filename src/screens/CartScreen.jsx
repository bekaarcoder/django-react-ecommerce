import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  Col,
  Image,
  ListGroup,
  Row,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const CartScreen = ({ match, history, location }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log("Removing Product", id);
    dispatch(removeFromCart(id));
  };

  return (
    <Row className="my-5">
      <Col md={8}>
        <h2 className="mb-3">SHOPPING CART</h2>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty. <Link to="/">Click here</Link> to continue
            shopping.
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={4}>
                    <h6>{item.name}</h6>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash text-danger"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <h2>CART TOTAL</h2>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>
                  <strong>Items:</strong>{" "}
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>
                  <strong>Price:</strong> $
                  {cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )}
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="dark" block disabled={cartItems.length === 0}>
                  PROCEED TO CHECKOUT
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
