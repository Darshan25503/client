import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const AdminOrderPanel = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/v1/products/getallorder");
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [selectedOrder]);

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setSelectedStatus("");
  };

  const handleStatusChange = async (e) => {
    await setSelectedStatus(e.target.value);
  };

  const handleSaveChanges = async () => {
    const response = await axios.put(
      `/api/v1/products/${selectedOrder?._id}/update-status`,
      { status: selectedStatus }
    );
    console.log(response.data);
    if (response?.data.success) {
      toast.success("Status Updated Successfully");
    } else {
      toast.error("Something went wrong");
    }
    console.log("Selected Order:", selectedOrder);
    console.log("Selected Status:", selectedStatus);
    handleCloseModal();
  };

  return (
    <Layout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.status}</td>
              <td>{order.payment ? "Paid" : "Unpaid"}</td>
              <td>{order.price}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <Button onClick={() => handleUpdateStatus(order)}>
                  Update Status
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for updating order status */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status {selectedOrder?._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="statusSelect">
            <Form.Label>Select Status</Form.Label>
            <Form.Control
              as="select"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">Select</option>
              <option value="Not-Processed">Not Processed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default AdminOrderPanel;
