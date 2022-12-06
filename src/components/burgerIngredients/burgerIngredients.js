import React, { useState, useEffect } from 'react';
import styles from './burgerIngredients.module.css';
import CardIngredient from '../cardsIngredients/cardsIngredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modalOverlay/modalOverlay';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import PropTypes from 'prop-types';
import dataPropTypes from '../cardsIngredients/cardsIngredients'


function BurgerIngredients({ ingredients }) {
    const [current, setCurrent] = useState('one')
    const [isOpen, setisOpen] = useState(false)
    const [fullItem, setFullItem] = useState({})

    useEffect(() => {
        const closeEsc = (e) => {
            if (e.key === 'Escape') {
                setisOpen(false)
            }
        }
        window.addEventListener('keydown', closeEsc)
        return () => window.removeEventListener('keydown', closeEsc)
    }, [])

    const dataSauce = ingredients.filter(function (ingredient) {
        return ingredient.type === 'sauce';
    })

    const dataBun = ingredients.filter(function (ingredient) {
        return ingredient.type === 'bun';
    })

    const dataMain = ingredients.filter(function (ingredient) {
        return ingredient.type === 'main';
    })

    const satTab = (tab) => {
        setCurrent(tab)
        const element = document.getElementById(tab)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
    }

    function handleOpenModal(item) {
        setFullItem(item)
        setisOpen(true)
    }

    const handleCloseModal = () => {
        setisOpen(false)
    }

    return (
        <section className={styles.maincontaineringr}>
            <Modal open={isOpen} onClose={handleCloseModal}><IngredientDetails data={fullItem} /></Modal>
            <h1 className={styles.title}>Соберите бургер</h1>
            <nav className={styles.tab}>
                <Tab value='bun' active={current === 'bun'} onClick={satTab}> Булки </Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={satTab}> Соусы </Tab>
                <Tab value='main' active={current === 'main'} onClick={satTab}> Начинки </Tab>
            </nav>
            <div className={styles.typeingr}>
                <div className={styles.listingr}>
                    <h2 className={styles.listingrtitle}> Булки</h2>
                    {dataBun.map((card, index) => <CardIngredient key={index} data={card} onClick={(card) => handleOpenModal(card)} />)}
                </div>
                <div className={styles.listingr}>
                    <h2 className={styles.listingrtitle}> Соусы</h2>
                    {dataSauce.map((card, index) => <CardIngredient key={index} data={card} onClick={(card) => handleOpenModal(card)} />)}
                </div>
                <div className={styles.listingr}>
                    <h2 className={styles.listingrtitle}> Начинки</h2>
                    {dataMain.map((card, index) => <CardIngredient key={index} data={card} onClick={(card) => handleOpenModal(card)} />)}
                </div>
            </div>
        </section >
    );
}

export default BurgerIngredients;

BurgerIngredients.prototype = {
    ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}

