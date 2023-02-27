import { useSelector } from "react-redux";
import style from "./feed-order-item-row.module.css";
import { Link, useLocation } from "react-router-dom";
import useFeedOrders from "../../hooks/use-feedOrders";
import RowComponent from "./row-component/row-component";


function FeedOrderItemRow({ ingredients }) {

    const allIngredients = ingredients;
    const lengthRow = allIngredients.length;
    const rowIngredients = ingredients.slice(0, 6);

    return (
        <div className={style.row}>
            {rowIngredients.map((item, index) =>
                <RowComponent ingredient={item} key={index} index={index} length={lengthRow} />
            )}
        </div >
    )
}


export default FeedOrderItemRow;