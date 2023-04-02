import style from "./history-order-modal-card.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from '../../services/hooks';
import { FC } from "react";
import useFeedOrders from "../../hooks/use-feedOrders";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import FeedOrderModalList from "../feed-order-modal-card/feed-order-modal-list/feed-order-modal-list";
import { IOrder } from "../../services/types/data";


const HistoryOrderModalCard: FC = () => {
    const { id } = useParams();
    const { orders } = useSelector(store => store.wsocketuser);
    const currentOrder: any = orders.find((item) => item._id === id);
    const { feedOrderPrice, feedOrderIngredients } = useFeedOrders(currentOrder);

    const getOrderStatus = (order: IOrder) => {
        if (order.status === "done") {
            return "Выполнен";
        } else {
            return "Готовится";
        }
    };

    const currentOrderStatus = getOrderStatus(currentOrder);

    const makeUniqFeedList = (arr: any) => {
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


export default HistoryOrderModalCard;