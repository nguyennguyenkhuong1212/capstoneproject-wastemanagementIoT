import React, { useState } from "react";
import "./card.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
function Card({ bID, name, address, trashPercentage }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const backendURL = process.env.REACT_APP_BACKEND_URL

  const setFullnessLevel = async (fullness, id) => {
    console.log(id)
    const payload = {
      id,
      newInfo: {
        fullness
      }
    }
    const response = await axios.put(
      `${backendURL}/api/bin/updateBin`,
      payload
    );
    window.location.reload()
    return response
  }

  const onConfirmPickup = async (id) => {
    const response = await setFullnessLevel(0, id);
    return response
  }
  const handleConfirm = (id) => {
    onConfirmPickup(id)
    handleClose()
    alert("Bin was reloaded")
    window.location.reload()
  };

  if (!trashPercentage) {
    trashPercentage = 0;
    console.log(trashPercentage);
  }

  return (
    <div className="split-box">
      <div>
        <h5 className="name">{name}</h5>
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
        {trashPercentage >= 80 ?
          <svg onClick={handleShow} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="check-button bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
          </svg>
        : 
        <div onClick={() => {setFullnessLevel(Math.floor(Math.random() * 21) + 80, bID);}}>Set full</div>
        }
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Pickup</Modal.Title>
          <button type="button_confrim" class="close_button" data-dismiss="modal" onClick={handleClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>Are you sure the bin has been picked up?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirm(bID)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Card;
