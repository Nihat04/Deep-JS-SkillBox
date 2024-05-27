import { useDispatch } from 'react-redux';
import styles from './EditUserModal.module.css';
import { useEffect, useState, forwardRef } from 'react';
import { UPDATE_USER } from '../../../store';
import { useLocation } from 'react-router-dom';

const CONFIG = [
    { type: 'text', placeholder: 'Имя', name: 'first_name', label: 'Имя' },
    {
        type: 'text',
        placeholder: 'Фамилия',
        name: 'last_name',
        label: 'Фамилия',
    },
    {
        type: 'text',
        placeholder: 'Ссылка на фотографию профиля',
        name: 'avatar',
        label: 'Фотография профиля',
    },
    {
        type: 'text',
        placeholder: 'example@email.ru',
        name: 'email',
        label: 'Почта',
    },
];

const EditUserModal = forwardRef(function EditUserModal(props, ref) {
    const { user, setUser } = props;

    const [userChanges, setUserChanges] = useState({ ...user });
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        setUserChanges({ ...user });
    }, [user]);

    const updateUserChages = (e) => {
        setUserChanges({
            ...userChanges,
            [e.target.name]: e.target.value,
        });
    };

    const saveChanges = (e) => {
        e.preventDefault();
        if (location.pathname.includes('/me'))
            dispatch({ type: UPDATE_USER, payload: userChanges });
        setUser(userChanges);
        closeModal(e);
    };

    const closeModal = (e) => {
        e.preventDefault();
        ref.current.close();
        setUserChanges({ ...user });
    };

    return (
        <dialog className={styles['user-edit__modal']} ref={ref}>
            <div className={styles['user-edit__modal__form']}>
                {CONFIG.map(({ type, placeholder, name, label }) => (
                    <div
                        className={
                            styles['user-edit__modal__form__input-container']
                        }
                        key={name}
                    >
                        <label>{label}</label>
                        <input
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={userChanges[name] || ''}
                            onChange={updateUserChages}
                        />
                    </div>
                ))}
                <div className={styles['user-edit__modal__form__btns']}>
                    <button
                        className={styles['user-edit__modal__form__close-btn']}
                        onClick={closeModal}
                    >
                        Закрыть
                    </button>
                    <button
                        className={
                            styles['user-edit__modal__form__confirm-btn']
                        }
                        onClick={saveChanges}
                        type="submit"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </dialog>
    );
});
export default EditUserModal;
