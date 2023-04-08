import style from "./feed-order-modal-card.module.css";
import { useParams } from "react-router-dom";
import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import useFeedOrders from "../../hooks/use-feedOrders";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import FeedOrderModalList from "./feed-order-modal-list/feed-order-modal-list";
import { TOrder } from "../../services/types/data";
import { IOrder } from "../../services/types/data";
import { IIngredient } from "../../services/types/data";


const FeedOrderModalCard = () => {
    const { id } = useParams();
    const orders = useSelector(store => store.wsocket.orders);
    console.log(orders)
    const currentOrder: any = orders.find((item) => item._id === id);
    console.log(currentOrder)
    const { feedOrderPrice, feedOrderIngredients } = useFeedOrders(currentOrder);

    const getOrderStatus = (order: TOrder) => {
        if (order.status === "done") {
            return "Выполнен";
        } else {
            return "Готовится";
        }
    };

    const currentOrderStatus = getOrderStatus(currentOrder);

    const makeUniqFeedList = (arr: Array<IIngredient>) => {
        const uniqSet: any = new Set(arr);
        return [...uniqSet];
    }

    const UniqFeedList = makeUniqFeedList(feedOrderIngredients);

    return (
        <div className={style.box}>
            <h3 className={style.number}>#{currentOrder.number}</h3>
            <h2 className={style.title}>{currentOrder.name}</h2>
            <p className={style.status}>{currentOrderStatus}</p>
            <div className={style.ingredients}>
                <h2 className={style.subtitle}>Состав:</h2>
                <FeedOrderModalList feedingredients={UniqFeedList} counterArray={feedOrderIngredients} />
            </div>
            <div className={style.infobill}>
                <p className={style.date}>{<FormattedDate date={new Date(currentOrder.createdAt)} />}</p>
                <p className={style.price}>{feedOrderPrice}<CurrencyIcon type={'primary'} /></p>
            </div>
        </div>
    )

}


export default FeedOrderModalCard;