import React, { useState, useMemo, useRef, useEffect, useCallback, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { v4 as uuidv4 } from 'uuid';
import styles from './burger-ingredients.module.css';
import CardIngredient from '../cards-ingredients/cards-ingredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { MODALWINDOW_OPEN_ING, MODALWINDOW_CLOSE_ING } from '../../services/constans/modal-window';
import { UNSET_INGREDIENTS, SET_INGREDIENTS } from '../../services/constans/burger-ingredients';
import { Link, useLocation } from 'react-router-dom';


const BurgerIngredients: FC = ({ }) => {
    //Базовые 
    const dispatch = useDispatch();
    const [current, setCurrent] = useState<string>('bun')


    //Забираем данные из стора
    const ingredients = useSelector(store => store.ingredients.ingredients)
    // console.log(ingredients);
    const { bun, otherIngredients } = useSelector(store => store.maker);
    // const isOpenIng = useSelector(store => store.modal.isOpenIng)
    // const currentIngredient = useSelector(store => store.current.currentIngredient)

    //Рефы для скролла
    const sauceRef = useRef<HTMLDivElement | null>(null);
    const mainRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);
    const bunRef = useRef<HTMLDivElement | null>(null);

    //Фильтр ингридиентов
    const dataSauce = useMemo(() => {
        return ingredients.filter((ingredient) => ingredient.type === 'sauce')
    }, [ingredients])

    const dataBun = useMemo(() => {
        return ingredients.filter((ingredient) => ingredient.type === 'bun')
    }, [ingredients])

    const dataMain = useMemo(() => {
        return ingredients.filter((ingredient) => ingredient.type === 'main')
    }, [ingredients])


    // Закрытие и открытие модальных окон
    function handleOpenModal(item: any) {
        dispatch({
            type: SET_INGREDIENTS,
            item: item
        })
        dispatch({
            type: MODALWINDOW_OPEN_ING
        })
    }

    // const handleCloseModal = () => {
    //     dispatch({
    //         type: UNSET_INGREDIENTS,
    //     })
    //     dispatch({
    //         type: MODALWINDOW_CLOSE_ING
    //     })
    // }

    //Реализация счетчика
    const allIngredients = useMemo(() => {
        return [...otherIngredients, ...bun ? bun : 0]
    }, [otherIngredients, bun])

    let countIngredients = new Map()
    useMemo(() => {
        return allIngredients[0] !== null
            ? allIngredients.reduce(
                (acc, e) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
                countIngredients
            )
            : 0
    }, [allIngredients, countIngredients])

    //Реализация скоролла ингридиентов и табов 
    const scrollList = () => {
        if (
            listRef &&
            listRef.current &&
            bunRef &&
            bunRef.current &&
            sauceRef &&
            sauceRef.current &&
            mainRef &&
            mainRef.current
        ) {
            const toBun = Math.abs(listRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
            const toSauce = Math.abs(listRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
            const toMain = Math.abs(listRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
            const minValue = Math.min(toBun, toSauce, toMain)
            const closestTab = minValue === toBun ? 'bun' : minValue === toSauce ? 'sauce' : 'main'
            setCurrent((prevState) => {
                if (closestTab === prevState) {
                    return prevState
                }
                return closestTab
            })
        }
    }

    const satTab = (tab: string) => {
        setCurrent(tab)
        const element = document.getElementById(tab)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
    }


    const location = useLocation();

    return (
        <section className={styles.maincontaineringr}>
            {/* {isOpenIng && (<Modal onClose={handleCloseModal}><IngredientDetails data={currentIngredient} /></Modal>)} */}
            <h1 className={styles.title}>Соберите бургер</h1>

            <nav className={styles.tab}>
                <Tab value='bun' active={current === 'bun'} onClick={satTab}> Булки </Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={satTab}> Соусы </Tab>
                <Tab value='main' active={current === 'main'} onClick={satTab}> Начинки </Tab>
            </nav>

            <div className={styles.typeingr} id='ingredientslist' ref={listRef} onScroll={scrollList}>
                <div className={styles.listingr} ref={bunRef}>
                    <h2 className={styles.listingrtitle} id='bun'> Булки</h2>
                    {dataBun.map((card, index) =>
                        <Link className={styles.link}
                            key={card._id}
                            to={`/ingredients/${card._id}`}
                            state={{ locationIngredient: location }}>
                            <CardIngredient key={uuidv4()} counts={countIngredients.get(card._id)} data={card} onClick={(card) => handleOpenModal(card)} />
                        </Link>)}
                </div>
                <div className={styles.listingr} ref={sauceRef}>
                    <h2 className={styles.listingrtitle} id='sauce'> Соусы</h2>
                    {dataSauce.map((card, index) =>
                        <Link className={styles.link}
                            key={card._id}
                            to={`/ingredients/${card._id}`}
                            state={{ locationIngredient: location }}>
                            <CardIngredient key={uuidv4()} counts={countIngredients.get(card._id)} data={card} onClick={(card) => handleOpenModal(card)} />
                        </Link>)}
                </div>
                <div className={styles.listingr} ref={mainRef}>
                    <h2 className={styles.listingrtitle} id='main'> Начинки</h2>
                    {dataMain.map((card, index) =>
                        <Link className={styles.link}
                            key={card._id}
                            to={`/ingredients/${card._id}`}
                            state={{ locationIngredient: location }}>
                            <CardIngredient key={uuidv4()} counts={countIngredients.get(card._id)} data={card} onClick={(card) => handleOpenModal(card)} />
                        </Link>)}
                </div>

            </div>
        </section >
    );
}

export default BurgerIngredients;