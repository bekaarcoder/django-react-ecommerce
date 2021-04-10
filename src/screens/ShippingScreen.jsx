import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Row, Button } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [country, setCountry] = useState(shippingAddress.country);
  const [pincode, setPincode] = useState(shippingAddress.pincode);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address: address,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
      })
    );
    history.push("/payment");
  };

  return (
    <Row className="my-5 justify-content-center">
      <Col md={6}>
        <h2 className="my-3">SHIPPING</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter street address"
              value={address ? address : ""}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter city"
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter state"
              value={state ? state : ""}
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter country"
              value={country ? country : ""}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PinCode</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter pincode"
              value={pincode ? pincode : ""}
              onChange={(e) => setPincode(e.target.value)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Save Address
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
