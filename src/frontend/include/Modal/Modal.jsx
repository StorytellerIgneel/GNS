import ReactDom from "react-dom";
import React from "react";
import { IoClose } from "react-icons/io5";
import PaymentStatusModal from "../../pages/PaymentStatusModal";
import "./modal.css";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  const showCloseButton = React.Children.toArray(children).every(
    (child) => child.type !== PaymentStatusModal,
  );
  return ReactDom.createPortal(
    <div>
      <div className="overlay-style"></div>
      <div className="modal-style">
        {showCloseButton && (
          <button onClick={onClose}>
            <IoClose className="modal-close-button" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("portal"),
  );
}
