import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const orderDetail = useSelector((state) => state.orderDetail);
  const { loading, error, order } = orderDetail;

  const dispatch = useDispatch();

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!order || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch]);

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Row className="my-5">
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>ORDER DETAILS</h3>
                <p>
                  <strong>Order ID: </strong> {order._id}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>SHIPPING</h3>
                <p>
                  <strong>Shipping Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}-{order.shippingAddress.pin},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <p className="text-success">
                    <strong>DELIVERED</strong>
                  </p>
                ) : (
                  <p className="text-warning">
                    <strong>NOT DELIVERED</strong>
                  </p>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>PAYMENT METHOD</h3>
                <p>
                  <strong>Payment Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <p className="text-success">
                    <strong>Pain on {order.paidAt}</strong>
                  </p>
                ) : (
                  <p className="text-danger">
                    <strong>NOT PAID</strong>
                  </p>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>ORDER ITEMS</h3>
                {order.orderItems.length === 0 ? (
                  <Message variant="info">You order list is empty.</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid />
                          </Col>
                          <Col md={6}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={2}>${item.price}</Col>
                          <Col md={2}>{item.qty}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="text-center">ORDER SUMMARY</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Item:</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    <Button className="btn-block">Complete Order</Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderScreen;
