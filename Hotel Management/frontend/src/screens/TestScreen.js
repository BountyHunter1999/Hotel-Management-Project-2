import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import QRCode  from 'qrcode.react'

function TestScreen() {
  const [paymentMethod, setPaymentMethod] = useState("lol");
  return (
    <div>
      <Form>
      <Form.Check
        type="radio"
        label="PayPal or Credit Card"
        id="paypal"
        name="paymentMethod"
        checked="paypal"
        // value="paypal"
        // checked
        // onChange={(e) => setPaymentMethod(e.target.value)}
        onChange={(e) => console.log(e.target.id)}
      />
      <QRCode value="sX7+rUO5W0ShjCzd6qqmNH41qQkCf6FF7jSC9O2w91zhcTFeObeVSHadIP+pKv2oOK8IPNFP4QTbHrNzJ67Dg6D1DKQJcF55l7BqxGVDlQ==*RcVLhBcj3s8rh12EX7yzaA==*Cma+2pifG4H5HFtFy/T1Hg==*12W7q72cn+KxPgS0UGJrtg==" />

      </Form>

        {console.log("paymentMethod:", paymentMethod)}

    </div>
  );
}

export default TestScreen;
