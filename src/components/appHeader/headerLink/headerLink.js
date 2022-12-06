import React from 'react';
import styles from './headerLink.module.css';

function HeaderLink(props) {

    return (
        <div>
            <a className={`${styles.headerLink} + ${props.textClass}`} href={props.linkRef} onClick={props.onClick}>{props.linkIcon}{props.textTitle}</a>
        </div >
    )
}

export default HeaderLink;