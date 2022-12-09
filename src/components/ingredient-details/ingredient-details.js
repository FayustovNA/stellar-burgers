import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/type';



function IngredientDetails({ data }) {
    const image = (
        <img src={data.image_large} alt={data.name} />
    );

    return (
        <section className={styles.ingredientdetails}>
            <h2 className={styles.title}>Детали ингредиента</h2>
            <div className={styles.image}>{image}</div>
            <p className={styles.ingredientname}>{data.name}</p>
            <div className={styles.contentlist}>
                <li className={styles.contentitem}>
                    <p>Калории, ккал</p>
                    <span className={styles.textdescr}>{data.calories}</span>
                </li>

                <li className={styles.contentitem}>
                    <p>Белки, г</p>
                    <span className={styles.textdescr}>{data.proteins}</span>
                </li>
                <li className={styles.contentitem}>
                    <p>Жиры, г</p>
                    <span className={styles.textdescr}>{data.fat}</span>
                </li>

                <li className={styles.contentitem}>
                    <p>Углеводы, г</p>
                    <span className={styles.textdescr}>{data.carbohydrates}</span>
                </li>
            </div>
        </section >
    )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
    data: PropTypes.objectOf(dataPropTypes.isRequired).isRequired
}