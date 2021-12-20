import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  // const [paymentMethod, setPaymentMethod] = useState("PayPal"); Previous
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler} style={{ paddingBottom: '4px'}}>
      {/* <Form > */}
        <div>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column >
              Select Payment Method
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="PayPal"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value='PayPal'
                // onChange={(e) => console.log(e.target.value)}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Khalti"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                value='Khalti'
                // defaultChecked
                // onChange={(e) => console.log(e.target.value)}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>
        </div>
        
        {/* <Form.Group style={{ paddingBottom: '4px'}}>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="select"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              // checked
              onChange={(e) => setPaymentMethod(e.target.id)}
            ></Form.Check>
            <Form.Check
              type="select"
              label="Khalti"
              id="khalti"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.id)}
            ></Form.Check>
          </Col>
          {console.log("PayMent METHOD", paymentMethod)}
        </Form.Group> */}

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
