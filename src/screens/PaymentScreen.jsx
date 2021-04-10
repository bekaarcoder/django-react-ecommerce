import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Row, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: method } = cart;

  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState(method);

  useEffect(() => {
    console.log(paymentMethod);
  }, [paymentMethod]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <Row className="my-5 justify-content-center">
      <Col md={6}>
        <CheckoutSteps step1 step2 step3 />
        <h2>PAYMENT METHOD</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Select Payment Method</Form.Label>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked={paymentMethod === "paypal"}
              value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Internet Banking"
              id="banking"
              name="paymentMethod"
              checked={paymentMethod === "banking"}
              value="banking"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Wallets"
              id="wallet"
              name="paymentMethod"
              checked={paymentMethod === "wallet"}
              value="wallet"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>
          <Button variant="dark" type="submit">
            Countinue to Place Order
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default PaymentScreen;
