import React from 'react';
import styles from './profile.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../services/action/auth';


function Profile() {
    const currentUserName = useSelector(store => store.auth.name)
    const currentUserEmail = useSelector(store => store.auth.email)
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        nameChange: false,
        emailChange: false,
        passwordChange: false,
    })

    useEffect(() => {
        setState({
            ...state,
            name: currentUserName,
            email: currentUserEmail,
        })
    }, [currentUserName, currentUserEmail])

    const cancelChange = () => {
        setState({
            ...state,
            name: currentUserName,
            email: currentUserEmail,
        })
    }

    let changeName = state.nameEdit ? 'CloseIcon' : 'EditIcon'
    let changeEmail = state.emailEdit ? 'CloseIcon' : 'EditIcon'
    let changePassword = state.passwordEdit ? 'CloseIcon' : 'EditIcon'

    const onChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUserInfo(state))
    }


    return (
        <form className={styles.editform} onSubmit={handleSubmit}>
            < Input
                icon={changeName}
                name='name'
                placeholder={'Имя'}
                value={state.name}
                onChange={onChange} />

            < Input
                icon={changeEmail}
                name='email'
                placeholder={'Логин'}
                value={state.email}
                onChange={onChange} />
            <PasswordInput
                icon={changePassword}
                name='password'
                value={state.password}
            />
            <div className={styles.button}>
                <a className={styles.cancel} onClick={cancelChange}>Отмена</a>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </form>
    );
}

export default Profile;