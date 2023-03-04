import React from 'react';
import styles from '../registration/registration.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/action/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




function ForgotPassword() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const visited = true;
        dispatch(forgotPassword({ email }, () => navigate('/reset-password')))
    }

    return (
        <div className={styles.mainbox}>
            <main className={styles.body}>
                <form className={styles.editformregister} onSubmit={(e) => handleSubmit(e)}>
                    <h2 className={styles.title}>Восстановление пароля</h2>
                    <EmailInput
                        placeholder="Укажите e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name='email'
                    />
                    <div className={styles.button}>
                        <Button htmlType="submit" type="primary" size="medium" >
                            Восстановить
                        </Button>
                    </div>
                    <p className={styles.text}>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link> </p>
                </form>
            </main >
        </div >
    );
}

export default ForgotPassword;