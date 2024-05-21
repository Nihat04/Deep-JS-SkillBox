import axios from 'axios';
import styles from './EditUserModal.module.css';
import { useState } from 'react';

const EditUserModal = (props) => {
    const { user } = props;

    const { userChanges, setUserChanges } = useState({});

    const updateUserChages = (e) => {
        // setUserChanges({
        //     ...userChanges,
        //     [e.target.name]: e.target.value,
        // });
        console.log(userChanges);
    };

    const saveChanges = () => {
        // axios.post(`https://reqres.in/users/${user.id}`, {});
        console.log(userChanges);
    };

    return (
        <dialog className={styles['user-edit__modal']} open>
            <form className={styles['user-edit__modal__form']}>
                <input
                    type="text"
                    name="first_name"
                    placeholder="Имя"
                    value={user.first_name}
                    onChange={updateUserChages}
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Фамилия"
                    value={user.last_name}
                    onChange={updateUserChages}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={user.email}
                    onChange={updateUserChages}
                />
                <button
                    className={styles['user-edit__modal__form__confirm-btn']}
                    onClick={saveChanges}
                >
                    Сохранить
                </button>
            </form>
        </dialog>
    );
};

export default EditUserModal;
