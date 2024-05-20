import { useState } from 'react';
import styles from './AuthorizationPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg';

const AuthorizationPage = () => {
    const [authorizationData, setAuthorizationData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const updateAuthorizationData = (e) => {
        setAuthorizationData({
            ...authorizationData,
            [e.target.id]: e.target.value,
        });
    };

    const authorize = (e) => {
        e.preventDefault();

        const form = e.target.parentElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        axios
            .post('https://reqres.in/api/login', authorizationData)
            .then((res) => res.data)
            .then((data) => {
                localStorage.setItem('token', data.token);
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
            });
    };

    return (
        <div className={styles['container']}>
            <h2>Авторизация</h2>
            <ErrorMsg active={error}>{error}</ErrorMsg>
            <form className={styles['auth-form']}>
                <input
                    className={styles['auth-form__email-inp']}
                    type="text"
                    placeholder="email"
                    id="email"
                    onChange={updateAuthorizationData}
                    required
                />
                <input
                    className={styles['auth-form__password-inp']}
                    type="password"
                    placeholder="Пароль"
                    id="password"
                    onChange={updateAuthorizationData}
                    required
                />
                <button
                    className={styles['auth-form__authorize-btn']}
                    onClick={authorize}
                >
                    Войти
                </button>
                <Link to="/reg">Зарегистрироваться</Link>
            </form>
        </div>
    );
};

export default AuthorizationPage;
