import React from 'react';
import styles from './ingredient-info.module.css';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import StellarBurgerMain from './main-page';
import { useEffect } from 'react';
import { useState } from 'react';



function IngredientInfo() {
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const [currentIngredient, setcurrentIngredient] = useState();
    const location = useLocation();
    const { id } = useParams();


    console.log(id)
    console.log(ingredients)

    useEffect(() => {
        const id_currentIngredient = ingredients.find((item) => item._id === id)
        setcurrentIngredient(id_currentIngredient)
    }, [ingredients]);


    return location.state?.from === "/" ? (
        <StellarBurgerMain />
    ) : (
        currentIngredient && (
            <>
                <div className={styles.mainbox}>
                    <main className={styles.body}>
                        <IngredientDetails currentIngredient={currentIngredient} />
                    </main >
                </div >
            </>
        )

    );
}

export default IngredientInfo;