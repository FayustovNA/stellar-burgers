import { v4 as uuidv4 } from "uuid";
import style from "./feed-orders-list.module.css";
import FeedOrderItem from "../feed-order-item/feed-order-item";
import { FC } from "react";
import { IOrder } from "../../services/types/data";

interface IOrdersList {
    isHistory?: boolean | undefined | any;
    orders: Array<IOrder>;
}

const OrdersList: FC<IOrdersList> = ({ orders, isHistory }) => {

    return (
        <ul className={style.feedlist}>
            {orders.map((order) => {
                return (
                    <FeedOrderItem
                        key={uuidv4()}
                        order={order}
                        isHistory={isHistory}
                    />
                );
            })}
        </ul>
    );
}

export default OrdersList;