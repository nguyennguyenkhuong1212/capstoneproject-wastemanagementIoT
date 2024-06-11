import React, { useState } from "react";
import "./card.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FiCheck  } from "react-icons/fi";
import axios from "axios";
function Card({ name, address, trashPercentage, onConfirmPickup }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const backendURL = process.env.REACT_APP_BACKEND_URL
  const handleConfirm = () => {

    onConfirmPickup();
    handleClose();
  };

  if (!trashPercentage) {
    trashPercentage = 0;
    console.log(trashPercentage);
  }

  return (
    <div className="split-box">
      <div>
        <h5>{name}</h5>
        <p className="address">{address}</p>
        <div className="bar">
          <ProgressBar
            now={trashPercentage}
            variant={trashPercentage < 80 ? "success" : "danger"}
            style={{ height: "10px" }}
          />
        </div>
      </div>
      <div className="bottom-bar">
        <p>{trashPercentage}% Full</p>
        <button className="check-button" onClick={handleShow}>
              <FiCheck />{" "}
        </button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Pickup</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure the bin has been picked up?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Card;
