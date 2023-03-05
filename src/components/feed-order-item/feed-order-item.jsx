import { useSelector } from "react-redux";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import style from "./feed-order-item.module.css";
import { Link, useLocation } from "react-router-dom";
import FeedOrderItemRow from "../feed-order-item-row/feed-order-item-row";


function FeedOrderItem({ order, isHistory }) {
    const location = useLocation();
    const ingredients = useSelector(store => store.ingredients.ingredients)
    // const { feedOrderPrice, feedOrderIngredients } = useFeedOrders(order)

    //Сбор информации о ингредиетах заказа из стора ингредиентов
    const feedOrderIngredienrs = () => {
        const Ingredientslist = [];
        order.ingredients.forEach((item) => {
            ingredients.forEach((ingredient) => {
                if (ingredient._id === item) {
                    Ingredientslist.push(ingredient);
                }
            });
        });

        return Ingredientslist;
    };

    //Ингредиенты заказа
    const feedOrderIngredients = feedOrderIngredienrs();

    //Цена заказа
    const feedOrderPrice = feedOrderIngredients.reduce((count, item) => {
        return count + item.price;
    }, 0);

    const getOrderStatus = (order) => {
        if (order.status === "done") {
            return "Выполнен";
        } else {
            return "Готовится";
        }
    };

    const currentOrderStatus = getOrderStatus(order);

    return (
        <li className={style.feeditembox}>
            <Link
                className={style.link}
                to={isHistory ? `/profile/order-history/${order._id}` : `/feed/${order._id}`}
                state={isHistory ? { locationOrderHistory: location } : { locationFeed: location }}
            >
                <div className={style.feedorderinfo}>
                    <h3 className={style.feedorder_number}>#{order.number}</h3>
                    <p className={style.feedorder_date}><FormattedDate date={new Date(order.createdAt)} /></p>
                </div >
                <h2 className={style.feedorder_title}>{order.name}</h2>
                {isHistory && <p className={style.status}>{currentOrderStatus}</p>}
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
        </li >
    )


}


export default FeedOrderItem;