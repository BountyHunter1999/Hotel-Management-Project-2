import React, { useState, useEffect } from "react";
// import config from "../config/khaltiConfig";
import { publicTestKey } from "../constants/khaltiKeys";
import { Form, Button, Col } from "react-bootstrap";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import {
  payOrder,
} from "../actions/orderAction";


function Khalti({ orderId, amount }) {
  const config = {
    // replace this key with yours
    publicKey: publicTestKey,
    productIdentity: "69420",
    productName: "Hotel Ahjin",
    productUrl: "http://localhost:8000/",
    eventHandler: {
      onSuccess(payload) {
        const data = {
          token: payload.token,
          amount: payload.amount
        }
        axios
          .post(`/api/orders/khalti/pay/`, data)
          .then((response) => {
            payOrder({id:orderId, paymentResult:payload, paymentMethod: "Khalti"})
            console.log("WOW SUCCESS",response.data);
          })
          .catch((error) => {
            console.log("UFF",error);
          });
      },

      // onError handler is optional
      onError(error) {
        // handle errors
        console.log("KHALTI ERROR", error);
      },
      onClose() {
        console.log("CLOSING FROM KHALTI CONFIG", "widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);
  console.log(checkout)

  return (
    <Button onClick={() => checkout.show({ amount: amount * 100 })}>
      {" "}
      Pay With Khalti
    </Button>
  );
}

export default Khalti;
