import React, { FormEvent, ChangeEvent } from 'react';
import styles from './registration.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { useState } from 'react';
import { registrationUsers } from '../../services/action/auth';
import { useNavigate } from 'react-router-dom';




const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onIconClick = () => {
        alert('Icon Click Callback')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        const name = target.name
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registrationUsers(state, () => navigate("/login")));
    }

    return (
        <div className={styles.mainbox}>
            <main className={styles.body}>
                <form className={styles.editformregister} onSubmit={handleSubmit}>
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
                    <Input
                        onChange={handleChange}
                        value={state.email}
                        name='email'
                        placeholder="E-mail"
                        extraClass="mb-2"
                        type="email"
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