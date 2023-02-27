import React from 'react';
import styles from './order-details.module.css';
import orderDoneImg from '../../images/done.svg';
import { useSelector } from 'react-redux';




function OrderDetails() {
    const { orderNumber } = useSelector((store) => store.order)

    return (
        <section className={styles.orderdetails}>
            <h2 className={styles.numberorder}>{orderNumber.number}</h2>
            <p className={styles.idordersubtitle}>идентификатор заказа</p>
            <img src={orderDoneImg} className={styles.imgorderdone} alt='order done'></img>
            <p className={styles.statusorder}>Ваш заказ начали готовить</p>
            <p className={styles.infoorder}>Дождитесь готовности на орбитальной станции</p>
        </section >
    )
}

export default OrderDetails;