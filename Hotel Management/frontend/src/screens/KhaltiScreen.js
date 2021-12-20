import React from "react";
// import config from "../config/khaltiConfig";
import { Form, Button, Col } from "react-bootstrap";
import KhaltiCheckout from "khalti-checkout-web";
import  Khalti  from '../components/Khalti'

function KhaltiScreen() {

  return (<div>
      <Khalti amount={25} />
  </div>
  )
}

export default KhaltiScreen;
