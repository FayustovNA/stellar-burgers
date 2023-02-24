import React from 'react';
import styles from './order-history.module.css';
import OrderHistoryItem from '../components/order-history-item/order-history-item';




function OrderHistory() {
    return (
        <div className={styles.box}>
            <OrderHistoryItem></OrderHistoryItem>
            <OrderHistoryItem></OrderHistoryItem>
            <OrderHistoryItem></OrderHistoryItem>
            <OrderHistoryItem></OrderHistoryItem>
            <OrderHistoryItem></OrderHistoryItem>
        </div >
    );
}

export default OrderHistory;