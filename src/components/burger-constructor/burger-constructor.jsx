import React, { useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { MODALWINDOW_OPEN_ORD, MODALWINDOW_CLOSE_ORD } from '../../services/action/modal-window';
import { ADD_OTHER_INGREDIENTS, DELETE_OTHER_INGREDIENTS, ADD_BUN, UPDATE_OTHER_INGREDIENTS } from '../../services/action/burger-constructor';
import PlaceHolder from '../../utils/placeholder';
import { getOrderDetails } from '../../services/action/order-details';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';


function BurgerConstructor() {
    const { bun, otherIngredients, totalSumm } = useSelector(store => store.maker);
    const isOpenOrd = useSelector(store => store.modal.isOpenOrd);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useAuth();

    //---------------------------------------------------------------
    //Закрытие и открытие модальных окон + отправка заказа
    function handleOpenModal() {
        const bunDetails = [bun[0]._id]
        const ingredientsDetais = bunDetails.concat(
            otherIngredients.map((ingredient) => ingredient._id),
            bunDetails
        )
        if (email) {
            dispatch((
                getOrderDetails(ingredientsDetais)
            ))
            dispatch({
                type: MODALWINDOW_OPEN_ORD
            })
        } else {
            navigate('/login')
        }
    }

    const handleCloseModal = () => {
        dispatch({
            type: MODALWINDOW_CLOSE_ORD
        })
    }

    //---------------------------------------------------------------
    //Реализация DnD
    const [{ isOverBun }, dropTargetBun] = useDrop(() => ({
        accept: 'ingredients',
        drop: (item) => addBun(item.data),
        collect: (monitor) => ({
            isOver: monitor.isOver() ? 0.5 : 1,
        }),
    }))

    const [{ isOver }, dropTarget] = useDrop(() => ({
        accept: 'ingredients',
        drop: (item) => addOtherIngredients(item.data),
        collect: (monitor) => ({
            isOver: monitor.isOver() ? 0.5 : 1,
        }),
    }))

    const addBun = (item) => {
        if (item.type === 'bun') {
            dispatch({
                type: ADD_BUN,
                item: item,
                _id: item._id,
            })
        }
    };

    const addOtherIngredients = (item) => {
        if (item.type !== 'bun') {
            dispatch({
                type: ADD_OTHER_INGREDIENTS,
                item: item,
                key: uuidv4(),
            })
        }
    };

    const moveIngredient = useCallback(
        (dragIngredientIndex, hoverIngredientIndex) => {
            dispatch({
                type: UPDATE_OTHER_INGREDIENTS,
                toIndex: hoverIngredientIndex,
                fromIndex: dragIngredientIndex,
            })
        },
        [dispatch]
    )

    //---------------------------------------------------------------

    return (
        <section className={styles.maincontainerconstr} ref={dropTargetBun}>

            <div className={styles.burgercomponents}>
                <li className={styles.constructor_item} style={{ isOverBun }}>
                    {bun.length > 0 ? (<ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun[0].name} (верх)`}
                        price={bun[0].price}
                        thumbnail={bun[0].image}
                        key={bun[0]._id}
                    />) : null}
                </li>

                <div className={styles.burgercomponentslist} ref={dropTarget} style={{ isOver }}>
                    {otherIngredients.length > 0 ? otherIngredients.map((ingredient, index) => {
                        ingredient['key'] = uuidv4();
                        const deleteIngredient = () => {
                            dispatch({
                                type: DELETE_OTHER_INGREDIENTS,
                                item: ingredient,
                                key: ingredient.key,
                            })
                        }
                        return (
                            < BurgerConstructorItem
                                key={ingredient.key}
                                ingredient={ingredient}
                                handleDelete={deleteIngredient}
                                index={index}
                                moveIngredient={moveIngredient}
                            />)
                    }) : <PlaceHolder />}
                </div>

                <li className={styles.constructor_item} ref={dropTargetBun}>
                    {bun.length > 0 ? <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun[0].name} (низ)`}
                        price={bun[0].price}
                        thumbnail={bun[0].image}
                        key={bun[0]._id}
                    /> : null}
                </li>
            </div >

            <div className={styles.infoconstrictor}>
                <p className={styles.textsumm}>{totalSumm}
                    < span className={styles.img}>
                        <CurrencyIcon type="primary" />
                    </span>
                </p>
                <Button htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleOpenModal}
                    disabled={!bun[0]}>
                    Оформить заказ
                </Button>

                {isOpenOrd && (<Modal onClose={handleCloseModal}><OrderDetails /></Modal>)}
            </div>

        </section >
    )
}

export default BurgerConstructor;