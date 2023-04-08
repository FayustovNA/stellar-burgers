import React from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { FC } from "react";
import { IIngredient } from '../../services/types/data';




const IngredientDetails = () => {
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const { id } = useParams();
    const currentIngredient: any = ingredients.find((item) => item._id === id);


    if (ingredients.length === 0) {
        return <h1>Loading...</h1>
    }

    const image = (
        <img src={currentIngredient.image_large!} alt={currentIngredient.name} />
    );

    return (
        <section className={styles.ingredientdetails}>
            <h2 className={styles.title}>Детали ингредиента</h2>
            <div className={styles.image}>{image}</div>
            <p className={styles.ingredientname}>{currentIngredient.name}</p>
            <div className={styles.contentlist}>
                <li className={styles.contentitem}>
                    <p>Калории, ккал</p>
                    <span className={styles.textdescr}>{currentIngredient.calories}</span>
                </li>

                <li className={styles.contentitem}>
                    <p>Белки, г</p>
                    <span className={styles.textdescr}>{currentIngredient.proteins}</span>
                </li>
                <li className={styles.contentitem}>
                    <p>Жиры, г</p>
                    <span className={styles.textdescr}>{currentIngredient.fat}</span>
                </li>

                <li className={styles.contentitem}>
                    <p>Углеводы, г</p>
                    <span className={styles.textdescr}>{currentIngredient.carbohydrates}</span>
                </li>
            </div>
        </section >
    )
}

export default IngredientDetails;
