import React from 'react';
import { useSelector } from '../../services/hooks';
import styles from './order-details.module.css';
import { ReactComponent as OrderDoneImg } from '../../images/done.svg';


const OrderDetails = () => {
    const { orderNumber } = useSelector((store) => store.order)

    return (
        <section className={styles.orderdetails}>
            <h2 className={styles.numberorder}>{orderNumber.number}</h2>
            <p className={styles.idordersubtitle}>идентификатор заказа</p>
            <OrderDoneImg
                className={styles.imgorderdone}
                alt='order done'
                id='image' />
            <p className={styles.statusorder}>Ваш заказ начали готовить</p>
            <p className={styles.infoorder}>Дождитесь готовности на орбитальной станции</p>
        </section >
    )
}

export default OrderDetails;