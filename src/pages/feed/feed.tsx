import React from 'react';
import styles from './feed.module.css';
import { wsConnectionStart, wsConnectionClosed } from '../../services/action/wsActionTypes';
import { wsUrlAll } from '../../utils/check-response';
import { useEffect } from 'react';
import OrdersList from '../../components/feed-orders-list/feed-orders-list';
import FeedTotalStatus from '../../components/feed-total-status/feed-total-status';
import { useDispatch, useSelector } from '../../services/hooks';

function FeedOrders() {
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.wsocket);

    useEffect(() => {
        dispatch(wsConnectionStart(wsUrlAll));
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, []);

    const { orders } = useSelector(store => store.wsocket);

    if (loading) {
        return <h1>Loading...</h1>
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