import React from 'react';
import styles from './registration.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { registrationUsers } from '../services/action/auth';




function Registration() {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onIconClick = () => {
        alert('Icon Click Callback')
    }

    const handleChange = (e) => {
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
        dispatch(registrationUsers(state))
    }

    return (
        <div className={styles.mainbox}>
            <main className={styles.body}>
                <form className={styles.editformregister} onSubmit={(e) => handleSubmit(e)}>
                    <h2 className={styles.title}>Регистрация</h2>
                    <Input
                        placeholder="Имя"
                        onChange={handleChange}
                        value={state.name}
                        name='name'
                        error={false}
                        onIconClick={onIconClick}
                        errorText='Ошибка'
                        size='default'
                        extraClass='mt-1'
                    />
                    <EmailInput
                        onChange={handleChange}
                        value={state.email}
                        name='email'
                        placeholder="Логин"
                        isIcon={true}
                        extraClass="mb-2"
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={state.password}
                        name='password'
                        extraClass='mb-2'
                    />
                    <div className={styles.button}>
                        <Button htmlType="submit" type="primary" size="medium">
                            Зарегистрироваться
                        </Button>
                    </div>
                    <p className={styles.text}>Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link> </p>
                </form>
            </main >
        </div >
    );
}

export default Registration;