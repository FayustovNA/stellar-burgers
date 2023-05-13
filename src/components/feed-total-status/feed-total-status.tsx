import style from "./feed-total-status.module.css";
import { useDispatch, useSelector } from '../../services/hooks';
import { FC } from "react";
import { useMemo } from "react";

function FeedTotalStatus() {
    const { orders, total, totalToday } = useSelector(store => store.wsocket)

    const doneOrders = useMemo(() => {
        return orders.filter((order) => order.status === 'done').slice(0, 20)
    }, [orders])

    const inProgressOrders = useMemo(() => {
        return orders.filter((order) => order.status !== 'done').slice(0, 20)
    }, [orders])

    return (
        <div className={style.mainbox}>
            <div className={style.currentstatusbox}>
                <div className={style.ordersdone}>
                    <p className={style.subtitle}>Готовы:</p>

                    <ul className={style.statusnumberbox}>
                        {doneOrders.length > 0
                            ? doneOrders.map((item) => (
                                <li key={item.number} className={style.statusnumber}>
                                    {item.number}
                                </li>
                            ))
                            : null}
                    </ul>

                </div>
                <div className={style.ordersinprogress}>
                    <p className={style.subtitle}>В работе:</p>

                    <ul className={style.statusnumberbox}>
                        {inProgressOrders.length > 0
                            ? inProgressOrders.map((item) => (
                                <li key={item.number} className={style.statusnumberprogress}>
                                    {item.number}
                                </li>
                            ))
                            : null}
                    </ul>

                </div>
            </div>
            <div className={style.total}>
                <p className={style.subtitle}>Выполнено за все время:</p>
                <p className={style.number}> {total}</p>
            </div>
            <div className={style.total}>
                <p className={style.subtitle}>Выполнено за сегодня:</p>
                <p className={style.number}> {totalToday}</p>
            </div>
        </div>
    )
}

export default FeedTotalStatus;