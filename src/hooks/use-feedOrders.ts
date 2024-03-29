import { useSelector } from '../services/hooks';
import { IIngredient, IOrder } from '../services/types/data';


export default function useFeedOrders(order: IOrder | undefined) {

    const ingredients = useSelector(store => store.ingredients.ingredients)

    //Сбор информации о ингредиетах заказа из стора ингредиентов
    const feedOrderIngredienrs = () => {
        const Ingredientslist: Array<IIngredient> = [];
        order?.ingredients.forEach((item) => {
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

    return { feedOrderIngredients, feedOrderPrice };
}