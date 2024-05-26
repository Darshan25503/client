// src/components/CartPage.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "./CSS/DemoCart.css";
import { MdDelete } from "react-icons/md";
import { useCart } from "../context/cart";
import Layout from "../components/layout/Layout";

const DemoCart = () => {
  const [cart, setCart] = useCart();
  const [cartItems, setCartItems] = useState([]);

  // Combine items with the same _id and sum their quantities
  useEffect(() => {
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
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

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
                          Delete
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
              <Button variant="outline-success" className="mt-3" block>
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default DemoCart;
