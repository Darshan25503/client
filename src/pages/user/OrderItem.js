// OrderItem.jsx
import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "../CSS/orderUser.css";

const OrderItem = ({ order }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card>
        <Card.Header className="bg-secondary text-white">
          Order ID: {order._id}
        </Card.Header>
        <Card.Body>
          <Card.Title>Status: {order.status}</Card.Title>
          <Card.Text>
            <strong>Payment:</strong>{" "}
            {order.payment ? "Completed" : "Completed"}
          </Card.Text>
          <Card.Text>
            <strong>Created At:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </Card.Text>
          <Button variant="outline-secondary" onClick={handleShow}>
            View Details
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="product-container">
            {order.products.map((product) => (
              <div key={product._id} className="product-details">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h5>{product.name}</h5>
                <p>Price: Rs. {product.price}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderItem;
