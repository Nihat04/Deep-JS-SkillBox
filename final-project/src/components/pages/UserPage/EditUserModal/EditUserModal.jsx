import axios from 'axios';
import styles from './EditUserModal.module.css';
import { createRef, useEffect, useState } from 'react';

const EditUserModal = (props) => {
    const { user, setUser, modalRef } = props;

    const [userChanges, setUserChanges] = useState({ ...user });

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
        axios
            .put(`https://reqres.in/api/users/${user.id}`, userChanges)
            .then((res) => res.data)
            .then((data) => setUser(data));
        closeModal(e);
    };

    const closeModal = (e) => {
        e.preventDefault();

        modalRef.current.close();
        setUserChanges({ ...user });
    };

    return (
        <dialog className={styles['user-edit__modal']} ref={modalRef}>
            <form className={styles['user-edit__modal__form']}>
                <div className="user-edit__modal__form__input-container">
                    <label>Имя</label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Имя"
                        value={userChanges.first_name || ''}
                        onChange={updateUserChages}
                    />
                </div>
                <div className="user-edit__modal__form__input-container">
                    <label>Фамилия</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Фамилия"
                        value={userChanges.last_name || ''}
                        onChange={updateUserChages}
                    />
                </div>
                <div className="user-edit__modal__form__input-container">
                    <label>Почта</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={userChanges.email || ''}
                        onChange={updateUserChages}
                    />
                </div>
                <div className="user-edit__modal__form__btns">
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
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </dialog>
    );
};

export default EditUserModal;
