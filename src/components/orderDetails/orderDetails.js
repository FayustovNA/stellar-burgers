import React from 'react';
import styles from './orderDetails.module.css';
import orderDoneImg from '../../images/done.png';



function OrderDetails() {

    return (
        <section className={styles.orderdetails}>
            <h2 className={styles.numberorder}>034536</h2>
            <p className={styles.idordersubtitle}>идентификатор заказа</p>
            <img src={orderDoneImg} className={styles.imgorderdone} alt='order done'></img>
            <p className={styles.statusorder}>Ваш заказ начали готовить</p>
            <p className={styles.infoorder}>Дождитесь готовности на орбитальной станции</p>
        </section >
    )
}

export default OrderDetails;