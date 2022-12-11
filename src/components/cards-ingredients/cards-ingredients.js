import React from 'react';
import styles from './cards-ingredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/type.js';

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

CardIngredient.propTypes = {
    data: dataPropTypes.isRequired,
    onClick: PropTypes.func
}