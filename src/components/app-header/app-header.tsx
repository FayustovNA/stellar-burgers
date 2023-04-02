import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useMatch } from 'react-router-dom';
import { FC } from 'react';

const AppHeader: FC = () => {

    const isConstructor = useMatch({ path: '/' })
    const isFeedList = useMatch({ path: '/feed' })
    const isProfile = useMatch({ path: '/profile' })
    const isProfileOrder = useMatch({ path: 'profile/order-history' })
    const isProfileOrderId = useMatch({ path: 'profile/order-history/:id' })
    const isFeedListId = useMatch({ path: '/feed/:id' })

    return (
        <header className={styles.header}>
            <nav className={styles.header_navibar}>
                <ul className={styles.header_lists}>
                    <NavLink to='/' className={({ isActive }) => isActive ? styles.link_active : styles.link}
                    ><BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
                        Конструктор
                    </NavLink>

                    <NavLink to='/feed' className={({ isActive }) => isActive ? styles.link_active : styles.link}
                    ><ListIcon type={isFeedList || isFeedListId ? 'primary' : 'secondary'} />
                        Лента заказов
                    </NavLink>
                </ul>

                <ul className={styles.header_lists}>
                    <NavLink to='/profile' className={({ isActive }) => isActive || isProfileOrder ? styles.link_active : styles.link}
                    ><ProfileIcon type={isProfile || isProfileOrder || isProfileOrderId ? 'primary' : 'secondary'} />
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