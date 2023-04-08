import React, { FormEvent, useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { logInUser } from '../../services/action/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import { useAuth } from '../../hooks/use-auth';

type TCb = (
    e: SyntheticEvent,
) => any

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';


    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        const name = target.name
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = useCallback<TCb>(
        (e) => {
            e.preventDefault();
            dispatch(logInUser(state));
        }, [state])

    const { email } = useAuth();

    useEffect(
        () => {
            if (email) {
                return (
                    navigate(fromPage, { replace: true })
                );
            }
        },
        [email]
    );


    return (
        <div className={styles.mainbox}>
            <main className={styles.body}>
                <form className={styles.editformregister} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Вход</h2>
                    <Input
                        type="email"
                        onChange={handleChange}
                        value={state.email}
                        name='email'
                        placeholder="E-mail"
                        extraClass="mb-2"
                    />
                    <PasswordInput
                        name={'password'}
                        value={state.password}
                        onChange={handleChange} />
                    <div className={styles.button}>
                        <Button htmlType="submit" type="primary" size="medium">
                            Войти
                        </Button>
                    </div>
                </form>
                <p className={styles.text}>Вы — новый пользователь?<Link className={styles.link} to='/register'>  Зарегистрироваться</Link></p>
                <p className={styles.text}>Забыли пароль?<Link className={styles.link} to='/forgot-password'>  Восстановить пароль</Link></p>
            </main >
        </div >
    );
}

export default LogIn;