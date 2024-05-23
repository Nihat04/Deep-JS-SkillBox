import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg';

const RegistrationPage = () => {
    const [registrationData, setRegistrationData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const updateRegData = (e) => {
        setRegistrationData({
            ...registrationData,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        const form = e.target.parentElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        localStorage.setItem('user', JSON.stringify(registrationData));
        localStorage.setItem('token', 'rejhrwkioideuqwiou1');
        navigate('/');
    };

    return (
        <div className={styles['container']}>
            <h2>Регистрация</h2>
            <ErrorMsg active={error}>{error}</ErrorMsg>
            <form action="#" className={styles['reg-form']}>
                <div className={styles['reg-form__inp-container']}>
                    <label>Имя*</label>
                    <input
                        className={styles['reg-form__inp']}
                        type="text"
                        placeholder="Алёша"
                        name="first_name"
                        onChange={updateRegData}
                        required
                    />
                </div>
                <div className={styles['reg-form__inp-container']}>
                    <label>Фамилия</label>
                    <input
                        className={styles['reg-form__inp']}
                        type="text"
                        placeholder="Иванович"
                        name="last_name"
                        onChange={updateRegData}
                    />
                </div>
                <div className={styles['reg-form__inp-container']}>
                    <label>Ссылка фотографии профиля</label>
                    <input
                        className={styles['reg-form__inp']}
                        type="text"
                        placeholder="ссылка фотографии"
                        name="avatar"
                        onChange={updateRegData}
                    />
                </div>
                <div className={styles['reg-form__inp-container']}>
                    <label>Электронная почта*</label>
                    <input
                        className={styles['reg-form__inp']}
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={updateRegData}
                        required
                    />
                </div>
                <div className={styles['reg-form__inp-container']}>
                    <label>Пароль*</label>
                    <input
                        className={styles['reg-form__inp']}
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={updateRegData}
                        required
                    />
                </div>
                <button
                    className={styles['reg-form__reg-btn']}
                    onClick={register}
                >
                    Зарегистрироваться
                </button>
                <Link to="/auth">Уже есть аккаунт?</Link>
            </form>
        </div>
    );
};

export default RegistrationPage;
