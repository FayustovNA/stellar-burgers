import React, { useState, useMemo, useRef, useEffect, useCallback, FC } from 'react';
import styles from './cards-ingredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { IIngredient } from '../../services/types/data';

interface ICardIngredient {
    data: IIngredient
    counts: number
    onClick: (data: any) => void
}


const CardIngredient: FC<ICardIngredient> = ({ data, onClick, counts }) => {
    const image = (
        <img src={data.image} alt={data.name} />
    );


    const [{ opacity }, drag] = useDrag(() => ({
        type: 'ingredients',
        item: { data },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    }))

    return (
        <section className={styles.maincontainer} onClick={() => onClick(data)} draggable={true} style={{ opacity }} ref={drag}>
            <span className={styles.counter}>{counts ? <Counter count={counts} /> : null}</span>
            <div className={styles.image}>{image}</div>
            <p className={styles.price}>{data.price} <CurrencyIcon type="primary" /></p>
            <h2 className={styles.title}>{data.name}</h2>
        </section >
    );
}

export default CardIngredient;
