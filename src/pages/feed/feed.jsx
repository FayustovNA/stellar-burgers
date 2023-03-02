import React from 'react';
import styles from './feed.module.css';
import { wsConnectionStart, wsConnectionClosed } from '../../services/action/wsActionTypes';
import { wsUrlAll } from '../../utils/check-response';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrdersList from '../../components/feed-orders-list/feed-orders-list';
import FeedTotalStatus from '../../components/feed-total-status/feed-total-status';



function FeedOrders() {
    const { orders } = useSelector(store => store.wsocket)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart(wsUrlAll));
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch]);

    if (orders.length === 0) {
        return <h1>Данные загружаются</h1>
    }

    return (
        <main className={styles.mainbox}>
            <h2 className={styles.title}>Лента заказов</h2>
            <div className={styles.feedcontainer}>
                <OrdersList orders={orders} />
                <FeedTotalStatus />
            </div>
        </main >
    );
}

export default FeedOrders;