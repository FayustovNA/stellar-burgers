import React from 'react';
import { useEffect } from 'react';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


export default function Modal({ open, children, onClose }) {


    const onModalClose = () => {
        onClose()
    }

    useEffect(() => {
        const closeEsc = (e) => {
            if (e.key === 'Escape') {
                onModalClose()
            }
        }
        window.addEventListener('keydown', closeEsc)
        return () => window.removeEventListener('keydown', closeEsc)
    }, [])

    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onModalClose} />
            <div className={styles.modalwindow}>
                <span className={styles.closeicon}>
                    <CloseIcon onClick={onModalClose} />
                </span>
                <div className={styles.modal_content}>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

Modal.propTypes = {
    onClose: PropTypes.func
}