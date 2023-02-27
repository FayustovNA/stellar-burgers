
import style from "./feed-order-modal-list.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';



function FeedOrderModalList({ feedingredients, counterArray }) {

    //Число одинаковых ингредиентов
    const counterSameIngr = (ingredient) => {
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
                        <div className={style.item_totlal}> <p className={style.item_price}>{counterSameIngr(item)}x {item.price} <CurrencyIcon /></p></div>
                    </div>
                </div>
            ))
            }
        </div >
    )

}


export default FeedOrderModalList;