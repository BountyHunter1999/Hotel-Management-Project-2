// import config from "../config/khaltiConfig";
import { publicTestKey } from "./constants/khaltiKeys";

import axios from "axios";
// import { payOrder } from "../actions/orderAction";
// import { useDispatch, useSelector } from "react-redux";

// const orderPay = useSelector((state) => state.orderPay);
// const { loading: loadingPay, success: successPay } = orderPay;

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
        amount: payload.amount,
      };
      axios
        .post(`/api/orders/khalti/pay/`, data)
        .then((response) => {
          // payOrder({id:orderId, paymentResult:payload, paymentMethod: "Khalti"})
          console.log("WOW SUCCESS", response.data);
        })
        .catch((error) => {
          console.log("UFF", error);
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

export default config;
