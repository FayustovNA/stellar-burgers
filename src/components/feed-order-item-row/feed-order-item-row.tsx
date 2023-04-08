import style from "./feed-order-item-row.module.css";
import RowComponent from "./row-component/row-component";
import { useDispatch, useSelector } from '../../services/hooks';
import { FC } from "react";
import { IOrder } from "../../services/types/data";
import { IIngredient } from "../../services/types/data";

interface IFeedOrderItemRow {
    ingredients: Array<IOrder> | Array<IIngredient>;
}

const FeedOrderItemRow: FC<IFeedOrderItemRow> = ({ ingredients }) => {

    const allIngredients = ingredients;
    const lengthRow = allIngredients.length;
    const rowIngredients = ingredients.slice(0, 6);

    return (
        <div className={style.row}>
            {rowIngredients.map((item: any, index) =>
                <RowComponent ingredient={item} key={index} index={index} length={lengthRow} />
            )}
        </div >
    )
}


export default FeedOrderItemRow;