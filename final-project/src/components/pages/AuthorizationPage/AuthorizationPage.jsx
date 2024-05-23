import { useState } from 'react';
import styles from './AuthorizationPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg';

const AuthorizationPage = () => {
    const [authorizationData, setAuthorizationData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const updateAuthorizationData = (e) => {
        setAuthorizationData({
            ...authorizationData,
            [e.target.name]: e.target.value,
        });
    };

    const authorize = (e) => {
        e.preventDefault();

        const form = e.target.parentElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));

        if (user == null) setError('Пользователь не найден');

        if (
            user.email == authorizationData.email &&
            user.password == authorizationData.password
        ) {
            localStorage.setItem('token', 'rejhrwkioideuqwiou1');
            navigate('/');
        } else {
            setError('Электронный адрес или пароль неверны');
        }
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
                    name="email"
                    onChange={updateAuthorizationData}
                    required
                />
                <input
                    className={styles['auth-form__password-inp']}
                    type="password"
                    placeholder="Пароль"
                    name="password"
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
