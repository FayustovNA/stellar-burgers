import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onClick }) {

    return (
        <div className={styles.overlay} onClick={onClick} />
    );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}