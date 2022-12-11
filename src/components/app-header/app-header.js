import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './header-link/header-link';


function AppHeader() {

    return (
        <header className={styles.header}>
            <nav className={styles.header_navibar}>

                <ul className={styles.header_lists}>
                    <HeaderLink
                        textClass={' text_type_main-default text_color_primary'}
                        textTitle={'Конструктор'}
                        linkIcon={<BurgerIcon type={'primary'} />}
                        linkRef={'#'}
                    />
                    <HeaderLink
                        textClass={'text_type_main-default text_color_inactive'}
                        textTitle={'Лента заказов'}
                        linkIcon={<ListIcon type={'secondary'} />}
                        linkRef={'#'}
                    />
                </ul>
                <ul className={styles.header_lists}>
                    <HeaderLink
                        textClass={'text_type_main-default text_color_inactive'}
                        textTitle={'Личный кабинет'}
                        linkIcon={<ProfileIcon type={'secondary'} />}
                        linkRef={'#'}
                    />
                </ul>
                <span className={styles.header_logo}>
                    <Logo />
                </span>

            </nav>
        </header >
    );
}

export default AppHeader;