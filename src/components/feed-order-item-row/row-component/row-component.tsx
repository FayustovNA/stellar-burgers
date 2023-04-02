import style from "./row-component.module.css";
import { FC } from "react";
import { IIngredient } from "../../../services/types/data";

const shift = 50;

interface IRowComponent {
    ingredient: IIngredient;
    index: number
    length: number
}


const RowComponent: FC<IRowComponent> = ({ ingredient, index, length }) => {
    const counter = length - 6;

    return (
        <div className={style.imgcontainer} style={{ left: `${shift * index}px`, zIndex: 6 - index }}>
            <img
                className={style.img}
                src={ingredient.image_mobile}
                alt={ingredient.name} />
            {length > 6 && index === 5 ?
                <p className={style.counter}>
                    +{counter}
                </p> : null}
        </div>
    )
}

export default RowComponent;