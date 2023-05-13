
import style from "./feed-order-modal-list.module.css";
import React, { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from "../../../services/types/data";

interface IFeedOrderModalList {
    feedingredients: Array<IIngredient>
    counterArray: Array<IIngredient>
}


const FeedOrderModalList: FC<IFeedOrderModalList> = ({ feedingredients, counterArray }) => {

    //Число одинаковых ингредиентов
    const counterSameIngr = (ingredient: IIngredient) => {
        let counter = 0;
        counterArray.forEach((item) => {
            if (item._id === ingredient._id) {
                counter += 1;
            }
        });
        return counter;
    }


    return (
        <div className={style.box}>
            {feedingredients.map((item, index) => (
                <div
                    className={style.item}
                    key={index}
                >
                    <div className={style.boximg}>
                        <img
                            className={style.img}
                            src={item.image} alt='' />
                    </div>
                    <div className={style.item_info}>
                        <p className={style.item_name}>{item.name}</p>
                        <div className={style.item_totlal}> <p className={style.item_price}>{counterSameIngr(item)} x {item.price} <CurrencyIcon type={'primary'} /></p></div>
                    </div>
                </div>
            ))
            }
        </div >
    )

}


export default FeedOrderModalList;