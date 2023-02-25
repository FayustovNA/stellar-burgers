import React, { useState } from 'react';
import styles from './login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/action/auth';
import { useDispatch } from 'react-redux';


function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');

    const onChange = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPassword({ password, token }, () => navigate('/login')))
        console.log(password, token)
    }

    return (
        <div className={styles.mainbox}>
            <main className={styles.body}>
                <form className={styles.editformregister} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Восстановление пароля</h2>
                    <PasswordInput
                        placeholder="Введите новый пароль"
                        onChange={onChange}
                        value={password}
                        name='password' />
                    <Input
                        placeholder="Введите код из письма"
                        onChange={(e) => setToken(e.target.value)}
                        value={token}
                        name='token' />
                    <div className={styles.button}>
                        <Button htmlType='submit' type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
                <p className={styles.text}>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link> </p>
            </main >
        </div >
    );
}

export default ResetPassword;