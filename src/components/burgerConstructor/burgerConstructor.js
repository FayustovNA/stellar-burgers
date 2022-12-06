import React, { useState, useEffect } from 'react';
import styles from './burgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modalOverlay/modalOverlay';
import OrderDetails from '../orderDetails/orderDetails';
import PropTypes from 'prop-types';
import dataPropTypes from '../cardsIngredients/cardsIngredients'



function BurgerConstructor({ ingredients }) {

    const [isOpen, setisOpen] = useState(false)


    function handleOpenModal() {
        setisOpen(true)
    }

    const handleCloseModal = () => {
        setisOpen(false)
    }

    const dataBun = ingredients.find(bun => bun.type === 'bun')

    const dataMainSauce = ingredients.filter(function (data) {
        return data.type !== 'bun';
    })

    useEffect(() => {
        const closeEsc = (e) => {
            if (e.key === 'Escape') {
                setisOpen(false)
            }
        }
        window.addEventListener('keydown', closeEsc)
        return () => window.removeEventListener('keydown', closeEsc)
    }, [])

    return (
        <section className={styles.maincontainerconstr}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={styles.burgercomponents}>
                <li className={styles.constructor_item}>
                    {dataBun ? (<ConstructorElement
                        type="top"
                        isLocked={true}
                        text={dataBun.name}
                        price={dataBun.price}
                        thumbnail={dataBun.image}
                        key={dataBun._id}
                    />) : null}

                </li>
                <div className={styles.burgercomponentslist}>
                    {dataMainSauce.map((cards, index) => <li className={styles.constructor_item} key={index}> <DragIcon /><ConstructorElement
                        text={cards.name}
                        price={cards.price}
                        thumbnail={cards.image}
                        key={cards._id}
                    /></li>)}
                </div>
                <li className={styles.constructor_item}>
                    {dataBun ? <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={dataBun.name}
                        price={dataBun.price}
                        thumbnail={dataBun.image}
                        key={dataBun._id}
                    /> : null}

                </li>
            </div>
            <div className={styles.infoconstrictor}>
                <p className={styles.textsumm}>610
                    <span className={styles.img}>
                        <CurrencyIcon type="primary" />

                    </span>
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}> Оформить заказ</Button>
                <Modal open={isOpen} onClose={handleCloseModal}><OrderDetails /></Modal>
            </div>
        </section >
    )
}

export default BurgerConstructor;

BurgerConstructor.prototype = {
    ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}