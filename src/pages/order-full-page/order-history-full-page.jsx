import React from 'react';
import styles from './order-full-page.module.css';
import { wsConnectionStart, wsConnectionClosed } from '../../services/action/wsUserActionTypes';
import { wsUrlProfile, wsUrlAll } from '../../utils/check-response';
import { getIngredients } from '../../services/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from '../../utils/utils';
import HistoryOrderModalCard from '../../components/history-order-modal-card/history-order-modal-card';

function OrderHistoryFullPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { email } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getIngredients());
        const token = getCookie('token');
        dispatch(wsConnectionStart(`${wsUrlProfile}?token=${token}`));
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, []);


    const orders = useSelector(store => store.wsocketuser.orders);

    console.log(orders)
    console.log(id)


    if (orders.length === 0) {
        return <h1>Loading...</h1 >
    }

    return (
        <main className={styles.main}>
            <HistoryOrderModalCard />
        </main>
    );
}

export default OrderHistoryFullPage;