import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import axios from 'axios';
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg';

const RegistrationPage = () => {
    const [registrationData, setRegistrationData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const updateRegData = (e) => {
        setRegistrationData({
            ...registrationData,
            [e.target.id]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        const form = e.target.parentElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        axios
            .post('https://reqres.in/api/register', registrationData)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                localStorage.setItem('id', data.id);
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
            <h2>Регистрация</h2>
            <ErrorMsg active={error}>{error}</ErrorMsg>
            <form action="#" className={styles['reg-form']}>
                <div className="reg-form__inp-container">
                    <label>Имя</label>
                    <input
                        className={styles['reg-form__email-inp']}
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={updateRegData}
                        required
                    />
                </div>
                <div className="reg-form__inp-container">
                    <label>Фамилия</label>
                    <input
                        className={styles['reg-form__email-inp']}
                        type="text"
                        placeholder="Иванович"
                        id="email"
                        onChange={updateRegData}
                        required
                    />
                </div>
                <div className="reg-form__inp-container">
                    <label>Электронная почта</label>
                    <input
                        className={styles['reg-form__email-inp']}
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={updateRegData}
                        required
                    />
                </div>
                <div className="reg-form__inp-container">
                    <label>Пароль</label>
                    <input
                        className={styles['reg-form__password-inp']}
                        type="password"
                        placeholder="Password"
                        id="password"
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
