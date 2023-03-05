import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './placeholder.module.css';
import img from '../images/loader.png'

function PlaceHolder({ }) {

    return (
        <section className={styles.placeholder} >
            <h2 className={styles.title}> <img className={styles.img} src={img}></img><BurgerIcon />Перетащите булку и ингредиенты для вашего бургера</h2>
        </section >
    );
}

export default PlaceHolder;