import React from 'react';
import styles from './feed.module.css';
import { wsConnectionStart, wsConnectionClosed } from '../../services/action/wsActionTypes';
import { wsUrlAll } from '../../utils/check-response';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function FeedOrders() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart(wsUrlAll));
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch]);


    return (
        <div className={styles.mainbox}>
            Страница ленты заказов
        </div >
    );
}

export default FeedOrders;