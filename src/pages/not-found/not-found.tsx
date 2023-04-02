import React from 'react';
import styles from './not-found.module.css';
import imgNotFound from '../../images/not-found.png';


function NotFound() {
    return (
        <div className={styles.mainbox}>
            <img src={imgNotFound} alt='not-found'></img>
        </div >
    );
}

export default NotFound;