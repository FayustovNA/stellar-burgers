import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './placeholder.module.css';

function PlaceHolder({ }) {

    return (
        <section className={styles.placeholder} >
            <h2 className={styles.title}> <BurgerIcon />Перетащите ингредиенты для вашего бургера</h2>
        </section >
    );
}

export default PlaceHolder;