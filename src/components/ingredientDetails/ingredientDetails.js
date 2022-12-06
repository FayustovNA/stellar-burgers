import React from 'react';
import styles from './ingredientDetails.module.css';



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
                    <span className='text_type_digits-default text_color_inactive'>{data.calories}</span>
                </li>

                <li className={styles.contentitem}>
                    <p>Белки, г</p>
                    <span className='text_type_digits-default text_color_inactive'>{data.proteins}</span>
                </li>
                <li className={styles.contentitem}>
                    <p>Жиры, г</p>
                    <span className='text_type_digits-default text_color_inactive'>{data.fat}</span>
                </li>

                <li className={styles.contentitem}>
                    <p>Углеводы, г</p>
                    <span className='text_type_digits-default text_color_inactive'>{data.carbohydrates}</span>
                </li>



            </div>
        </section >
    )
}

export default IngredientDetails;