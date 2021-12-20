import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import Khalti from "../components/Khalti";
import KhaltiCheckout from "khalti-checkout-web";
import { publicTestKey } from "../constants/khaltiKeys";

import config from "../khaltiConfig";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderAction";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

function OrderScreen({ match, history }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [rates, setRates] = useState(null);
  const conversionFunction = async () => {
    const { data } = await axios.get(
      "https://free.currconv.com/api/v7/convert?q=NPR_USD&compact=ultra&apiKey=128a3826d9c329b50b1d"
    );
    setRates(data.NPR_USD);
  };

  // console.log(convRate)

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // for this page only
  const [secretKey, setSecretKey] = useState("");
  const [encrypted, setEncrypted] = useState("");

  useEffect(() => {
    const qrCode = "FUCK";
  }, [secretKey]);

  useEffect(() => {
    conversionFunction();
  }, []);

  // FOR KHALTI
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
            console.log("BEFORE KHALTI DISPATCH");
            dispatch(
              payOrder({
                id: orderId,
                paymentResult: payload,
                paymentMethod: "Khalti",
              })
            );
            console.log("AFTER KHALTI DISPATCH");
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
  let checkout = new KhaltiCheckout(config);

  // FOR PAYPAL
  // For this page only no update to the store
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  // Client ID: AS8HkhhtjNiXMDiiHOrN4EpWlMw07dLQ2miACwfiBYJEnen3XznfnolFQcm_VzV-JIkLkSRGohG4WL1W
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AS8HkhhtjNiXMDiiHOrN4EpWlMw07dLQ2miACwfiBYJEnen3XznfnolFQcm_VzV-JIkLkSRGohG4WL1W";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  //  upon success the result
  const successPaymentHandler = (paymentResult) => {
    dispatch(
      payOrder({
        id: orderId,
        paymentResult: paymentResult,
        paymentMethod: order.paymentMethod,
      })
    );
  };

  //  upon success the result
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const getQrCodeSubmit = async (e) => {
    e.preventDefault();
    console.log("secretKey is", secretKey);
    const data = {
      order_id: order._id,
      user_key: secretKey,
    };

    setEncrypted(await axios.post(`/api/orders/encrypt/`, data));
    console.log("encrypted is:", encrypted);
  };
  console.log("encrupted is outside", encrypted.data);
  /// import the qrcode
  // tyo lai tala tyo condition ma halna
  // container bhitra lol

  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    console.log(canvas)
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "yourQrCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}{" "}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>{" "}
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Fulfilled on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Fulfilled</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info"> Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            style={{ textDecoration: "none " }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={6}>
                          {item.qty} X Rs.{item.price} = Rs.
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Item:</Col>
                <Col>Rs.{order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping Price:</Col>
                <Col>Rs.{order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Discount:</Col>
                <Col>Rs.{order.discountPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>Rs.{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {order.isPaid && userInfo.username &&order.user.email === userInfo.username && (
              <ListGroup.Item>
                {!encrypted && !order.deliveredAt &&  (
                  <Form onSubmit={getQrCodeSubmit}>
                    <Message variant="info">
                      {" "}
                      Enter A Text Phrase, This will help us remember it's u{" "}
                    </Message>
                    {/* <img src="" alt="QR CODE HERE LOL">  </img> */}
                    <Form.Group>
                      {/* <Form.Label>Secret Key</Form.Label> */}
                      <Form.Control
                        type="name"
                        placeholder="Enter Secret Key"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    <Message variant="warning">
                      Please Remember this text phrase and be careful no to
                      share this.
                    </Message>
                  </Form>
                )}
              </ListGroup.Item>
            )}
            {encrypted && !order.deliveredAt && (
              <ListGroup.Item>
                <QRCode
                  value={encrypted.data}
                  id="123456"
                  size={300}
                  level={"H"}
                  includeMargin={true}
                />
                <Button  style={{ marginLeft: "60px", marginTop: "0px" }} onClick={downloadQR}>Download QR</Button>
                {/* <h1>encrypted </h1> */}
              </ListGroup.Item>
            )}

            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}

                {order.paymentMethod === "Khalti" ? (
                  // console.log("WE ARE LIVE KHALTI")
                  // <Khalti />
                  <Button
                    onClick={() =>
                      checkout.show({ amount: order.totalPrice * 100 })
                    }
                  >
                    {" "}
                    Pay With Khalti
                  </Button>
                ) : // <h1>LOL</h1>
                // console.log("WE ARE LIVE PAYPAL")
                !sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={Number(order.totalPrice * rates).toFixed(2)}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block w-100"
                    onClick={deliverHandler}
                  >
                    Mark As Fulfilled
                  </Button>
                </ListGroup.Item>
              )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
