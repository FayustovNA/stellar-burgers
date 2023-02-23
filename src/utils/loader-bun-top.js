import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './loader-bun-top.module.css';


function LoaderBunTop({ type }) {

    return (
        <section className={styles.loader}>
            <h2 className={styles.title}> <BurgerIcon />Перетащите булку для вашего бургера</h2>
        </section >
    );
}

export default LoaderBunTop;