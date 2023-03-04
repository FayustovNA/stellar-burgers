import React from 'react';
import styles from './order-history.module.css';
import { wsConnectionStart, wsConnectionClosed } from '../../services/action/wsUserActionTypes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrdersList from '../../components/feed-orders-list/feed-orders-list';
import { getCookie } from '../../utils/utils';
import { wsUrlProfile } from '../../utils/check-response';



function OrderHistory() {
    const dispatch = useDispatch();
    const { orders } = useSelector(store => store.wsocketuser);

    useEffect(() => {
        const token = getCookie('token');
        dispatch(wsConnectionStart(`${wsUrlProfile}?token=${token}`));
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, []);

    return (
        < div className={styles.box} >
            <OrdersList orders={orders} isHistory={true} />
        </div >
    );
}

export default OrderHistory;