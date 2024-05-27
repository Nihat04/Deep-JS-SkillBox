import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import { useDispatch } from 'react-redux';
import { UPDATE } from '../../store';

const CONFIG = [
    {
        type: 'text',
        placeholder: 'Алёша',
        name: 'first_name',
        label: 'Имя',
        required: true,
    },
    {
        type: 'text',
        placeholder: 'Иванович',
        name: 'last_name',
        label: 'Фамилия',
        required: true,
    },
    {
        type: 'text',
        placeholder: 'ссылка фотографии',
        name: 'avatar',
        label: 'Ссылка фотографии профиля',
        required: false,
    },
    {
        type: 'email',
        placeholder: 'Почта',
        name: 'email',
        label: 'Электронная почта',
        required: false,
    },
    {
        type: 'password',
        placeholder: 'Пароль',
        name: 'password',
        label: 'Пароль',
        required: true,
    },
];

const RegistrationPage = () => {
    const [registrationData, setRegistrationData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formRef = useRef();

    const updateRegData = (e) => {
        setRegistrationData({
            ...registrationData,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        dispatch({
            type: UPDATE,
            payload: {
                user: registrationData,
                token: 'rejhrwkioideuqwiou1',
            },
        });
        navigate('/');
    };

    return (
        <div className={styles['container']}>
            <h2>Регистрация</h2>
            <form action="#" className={styles['reg-form']} ref={formRef}>
                {CONFIG.map(({ type, placeholder, name, label, required }) => (
                    <div
                        className={styles['reg-form__inp-container']}
                        key={name}
                    >
                        <label>{label + (required ? '*' : '')}</label>
                        <input
                            className={styles['reg-form__inp']}
                            type={type}
                            placeholder={placeholder}
                            name={name}
                            onChange={updateRegData}
                            required={required}
                        />
                    </div>
                ))}
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
