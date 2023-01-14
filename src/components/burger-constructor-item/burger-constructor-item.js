import React, { useRef } from 'react';
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css'
import { useDrag, useDrop } from 'react-dnd';


function BurgerConstructorItem({ ingredient, handleDelete, index, moveIngredient }) {
    const id = ingredient._id
    const itemRef = useRef(null)


    const [{ handlerId }, drop] = useDrop({
        accept: 'item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!itemRef.current) {
                return
            }

            const startIndex = item.index
            const endIndex = index

            if (startIndex === endIndex) {
                return
            }

            const hoverBoundingRect = itemRef.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (startIndex < endIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (startIndex > endIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveIngredient(startIndex, endIndex)

            item.index = endIndex
        },
    })


    const [{ isDrag }, drag] = useDrag({
        type: 'item',
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })


    const opacity = isDrag ? 0.5 : 1
    drag(drop(itemRef))

    return (
        <li
            // key={ingredient.key}
            className={styles.constructor_item}
            ref={itemRef}
            style={{ opacity }}
            data-handler-id={handlerId}
        >
            <span className={styles.cursor}>
                <DragIcon type='primary' draggable />
            </span>
            <ConstructorElement
                //key={ingredient.key}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={handleDelete}
            />
        </li >
    )
}


export default BurgerConstructorItem