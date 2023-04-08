import React from 'react';
import styles from './order-full-page.module.css';
import { wsConnectionStart, wsConnectionClosed } from '../../services/action/wsActionTypes';
import FeedOrderModalCard from '../../components/feed-order-modal-card/feed-order-modal-card';
import { wsUrlAll } from '../../utils/check-response';
import { getIngredients } from '../../services/action';
import { useDispatch, useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const OrderFullPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        // dispatch(getIngredients());
        dispatch(wsConnectionStart(wsUrlAll))
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, []);


    const orders = useSelector(store => store.wsocket.orders);
    console.log(orders)
    console.log(id)


    if (orders.length === 0) {
        return <h1>Loading...</h1>
    }

    return (
        <main className={styles.main}>
            <FeedOrderModalCard />
        </main>
    );
}

export default OrderFullPage;