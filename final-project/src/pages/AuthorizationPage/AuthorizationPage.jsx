import { useRef, useState } from 'react';
import styles from './AuthorizationPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMsg from '../../components/ui/ErrorMsg/ErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_TOKEN } from '../../store';

const CONFIG = [
    { type: 'email', placeholder: 'Почта', name: 'email' },
    { type: 'password', placeholder: 'Пароль', name: 'password' },
];

const AuthorizationPage = () => {
    const [authorizationData, setAuthorizationData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const formRef = useRef();

    const updateAuthorizationData = (e) => {
        setAuthorizationData({
            ...authorizationData,
            [e.target.name]: e.target.value,
        });
    };

    const authorize = (e) => {
        e.preventDefault();

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }
        if (!user) {
            setError('Пользователь не найден');
            return;
        }

        if (
            user.email == authorizationData.email &&
            user.password == authorizationData.password
        ) {
            dispatch({
                type: UPDATE_TOKEN,
                payload: 'rejhrwkioideuqwiou1',
            });
            navigate('/');
        } else {
            setError('Электронный адрес или пароль неверны');
            return;
        }
    };

    return (
        <div className={styles['container']}>
            <h2>Авторизация</h2>
            <ErrorMsg active={error}>{error}</ErrorMsg>
            <form className={styles['auth-form']} ref={formRef}>
                {CONFIG.map(({ type, placeholder, name }) => (
                    <input
                        key={name}
                        className={styles['auth-form__email-inp']}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        onChange={updateAuthorizationData}
                        required
                    />
                ))}
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
