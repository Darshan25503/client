import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "./CSS/DemoCart.css";
import { useCart } from "../context/cart";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const DemoCart = () => {
  const [cart, setCart] = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      const response = await axios.get("/api/v1/products/braintree-token");
      setClientToken(response?.data?.response?.clientToken);
      console.log("Client token:", response?.data?.response?.clientToken);
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };

  useEffect(() => {
    getToken();
    const combinedItems = cart.reduce((acc, item) => {
      if (acc[item._id]) {
        acc[item._id].quantity += 1;
      } else {
        acc[item._id] = { ...item, quantity: 1 };
      }
      return acc;
    }, {});

    const initialCartItems = Object.values(combinedItems);
    setCartItems(initialCartItems);
  }, [cart]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayment = async () => {
    if (!instance) return;

    try {
      const token = localStorage.getItem("auth");
      const t = JSON.parse(token);
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const total = getTotalPrice();
      console.log(total);

      const response = await axios.post(
        "/api/v1/products/braintree-payment",
        {
          nonce,
          cart,
          total,
        },
        {
          headers: {
            authtoken: t.token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment response:", response.data);
      // setCart(null);
      setLoading(false);
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  if (!auth?.token) {
    navigate("/login");
    return "Redirecting to login...";
  }

  return (
    <Layout>
      <div className="container">
        <h1 className="my-4">Shopping Cart</h1>

        <Row>
          <Col md={9}>
            <Row>
              {cartItems.map((item) => (
                <Col md={4} key={item._id}>
                  <Card className="mb-4 cart-card">
                    <Card.Img variant="top" src={item.photo} />

                    <Card.Body>
                      <Card.Title className="cardTitle">{item.name}</Card.Title>
                      <Card.Text className="cardTitle">
                        Price: &#8377; {item.price}
                        <br />
                        Subtotal: &#8377; {item.price * item.quantity}
                      </Card.Text>

                      <div className="quantity-buttons">
                        <Button
                          variant="outline-secondary"
                          className="btn-sm"
                          onClick={() =>
                            handleQuantityChange(
                              item._id,
                              Math.max(item.quantity - 1, 1)
                            )
                          }
                        >
                          -
                        </Button>
                        <Form.Control
                          className="quantity-input form-control-sm"
                          type="text"
                          value={item.quantity}
                          disabled
                        />
                        <Button
                          variant="outline-secondary"
                          className="btn-sm"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="m-2 btn-sm text-center"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={3}>
            <div className="border p-3">
              <h3>Order Summary</h3>
              <p>Total Items: {cartItems.length}</p>
              <p>Total Price: &#8377; {getTotalPrice()}</p>
              <Button
                variant="outline-success"
                className="mt-3"
                block
                onClick={() => setShowModal(true)}
                disabled={!clientToken || loading}
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </Button>
            </div>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Complete Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {clientToken && (
              <DropIn
                options={{ authorization: clientToken }}
                onInstance={(instance) => setInstance(instance)}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handlePayment}
              disabled={loading || !instance}
            >
              {loading ? "Processing..." : `Pay Now (₹${getTotalPrice()})`}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default DemoCart;
