import style from "./feed-order-modal-card.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFeedOrders from "../../hooks/use-feedOrders";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import FeedOrderModalList from "./feed-order-modal-list/feed-order-modal-list";



function FeedOrderModalCard() {
    const { id } = useParams();
    const orders = useSelector(store => store.wsocket.orders);
    const currentOrder = orders.find((item) => item._id === id);
    const { feedOrderPrice, feedOrderIngredients } = useFeedOrders(currentOrder);

    const getOrderStatus = (order) => {
        if (order.status === "done") {
            return "Выполнен";
        } else {
            return "Готовится";
        }
    };

    const currentOrderStatus = getOrderStatus(currentOrder);

    const makeUniqFeedList = (arr) => {
        const uniqSet = new Set(arr);
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
                <p className={style.price}>{feedOrderPrice}<CurrencyIcon /></p>
            </div>
        </div>
    )

}


export default FeedOrderModalCard;