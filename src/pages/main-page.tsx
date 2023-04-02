import React from 'react';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';


function StellarBurgerMain() {

    return (
        <>
            <BurgerIngredients />
            <BurgerConstructor />
        </>
    );
}

export default StellarBurgerMain;
