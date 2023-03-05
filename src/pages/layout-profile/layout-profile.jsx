import React from 'react';
import styles from './layout-profile.module.css';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../services/action/auth';



function LayOut() {

    const dispatch = useDispatch();

    const isProfile = useMatch({ path: '/profile' });
    const isOrderHistory = useMatch({ path: '/profile/order-history' });

    const handleLogOut = () => {
        dispatch(logOutUser())
    }

    return (
        <div className={styles.mainbox}>
            <main className={styles.body}>
                <div className={styles.navigation}>
                    <NavLink className={isProfile ? styles.link_active : styles.link} to='/profile'>Профиль</NavLink>
                    <NavLink className={isOrderHistory ? styles.link_active : styles.link} to='/profile/order-history'>История заказов</NavLink>
                    <a className={styles.link} onClick={handleLogOut}>Выход</a>
                    {isProfile ? <p className={styles.text}>В этом разделе вы можете
                        изменить свои персональные данные</p> : <p className={styles.text}>В этом разделе вы можете просмотреть свою историю заказов</p>}
                </div>
                <div className={styles.editinfo}>
                    <Outlet />
                </div>

            </main >
        </div >
    );
}

export default LayOut;