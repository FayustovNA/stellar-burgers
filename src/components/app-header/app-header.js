import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useMatch } from 'react-router-dom';


function AppHeader() {

    const isConstructor = useMatch({ path: '/', exact: true })
    const isFeedList = useMatch({ path: '/feed' })
    const isProfile = useMatch({ path: '/profile' })
    const isProfileOrder = useMatch({ path: 'profile/order-history' })

    return (
        <header className={styles.header}>
            <nav className={styles.header_navibar}>
                <ul className={styles.header_lists}>
                    <NavLink to='/' className={({ isActive }) => isActive ? styles.link_active : styles.link}
                    ><BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
                        Конструктор
                    </NavLink>

                    <NavLink to='/feed' className={({ isActive }) => isActive ? styles.link_active : styles.link}
                    ><ListIcon type={isFeedList ? 'primary' : 'secondary'} />
                        Лента заказов
                    </NavLink>
                </ul>

                <ul className={styles.header_lists}>
                    <NavLink to='/profile' className={({ isActive }) => isActive || isProfileOrder ? styles.link_active : styles.link}
                    ><ProfileIcon type={isProfile || isProfileOrder ? 'primary' : 'secondary'} />
                        Личный кабинет
                    </NavLink>
                </ul>
                <span className={styles.header_logo}>
                    <Logo />
                </span>
            </nav>
        </header >
    );
}

export default AppHeader;