import { useSelector } from "react-redux";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import style from "./feed-order-item.module.css";
import { Link, useLocation } from "react-router-dom";
import useFeedOrders from "../../hooks/use-feedOrders";
import FeedOrderItemRow from "../feed-order-item-row/feed-order-item-row";


function FeedOrderItem({ order }) {
    const location = useLocation();
    const { feedOrderPrice, feedOrderIngredients } = useFeedOrders(order);



    return (
        <li className={style.feeditembox}>
            <Link
                className={style.link}
                to={`/feed/${order._id}`}
                state={{ locationFeed: location }}
            >
                <div className={style.feedorderinfo}>
                    <h3 className={style.feedorder_number}>#{order.number}</h3>
                    <p className={style.feedorder_date}><FormattedDate date={new Date(order.createdAt)} /></p>
                </div >
                <h2 className={style.feedorder_title}>{order.name}</h2>
                <div className={style.feedordertotal}>
                    <div className={style.feedorder_ingredientsrow}>
                        <FeedOrderItemRow ingredients={feedOrderIngredients} />
                    </div>
                    <div className={style.feedorderprice}>
                        <p className={style.feedorderpricenumber}>{feedOrderPrice}</p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </Link>
        </li>
    )


}


export default FeedOrderItem;