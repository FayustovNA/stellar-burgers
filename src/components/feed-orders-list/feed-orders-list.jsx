import { v4 as uuidv4 } from "uuid";
import style from "./feed-orders-list.module.css";
import { useSelector } from "react-redux";
import FeedOrderItem from "../feed-order-item/feed-order-item";

export default function OrdersList({ orders }) {

    return (
        <ul className={style.feedlist}>
            {orders.map((order) => {
                return (
                    <FeedOrderItem
                        key={uuidv4()}
                        order={order}
                    />
                );
            })}
        </ul>
    );
}