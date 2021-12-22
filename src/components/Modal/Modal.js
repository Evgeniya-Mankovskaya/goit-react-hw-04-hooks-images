import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, src, tags }) {
  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal}>
        <img src={src} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  tags: PropTypes.string,
};
export default Modal;
