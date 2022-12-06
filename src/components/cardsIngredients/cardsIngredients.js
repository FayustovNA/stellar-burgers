import React from 'react';
import styles from './cardsIngredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});


function CardIngredient({ data, onClick }) {
    const image = (
        <img src={data.image} alt={data.name} />
    );

    return (
        <section className={styles.maincontainer} onClick={() => onClick(data)}>
            <span className={styles.counter}><Counter /></span>
            <div className={styles.image}>{image}</div>
            <p className={styles.price}>{data.price} <CurrencyIcon type="primary" /></p>
            <h2 className={styles.title}>{data.name}</h2>
        </section >
    );
}

export default CardIngredient;

CardIngredient.prototype = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}