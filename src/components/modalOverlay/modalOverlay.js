import React from 'react';
import styles from './modalOverlay.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';






export default function Modal({ open, children, onClose }) {
    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.modalwindow}>
                <span className={styles.closeicon}>
                    <CloseIcon onClick={onClose} />
                </span>
                <div className='modal__content'>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}