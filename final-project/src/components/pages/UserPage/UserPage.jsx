import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './UserPage.module.css';
import axios from 'axios';
import blankPhoto from '../../../assets/img/blank-profile-photo.png';
import EditUserModal from './EditUserModal/EditUserModal';

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => res.data)
            .then((data) => setUser(data.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={styles['container']}>
            <button className={styles['back-btn']} onClick={() => navigate(-1)}>
                Назад
            </button>
            <div className={styles['user']}>
                <img
                    className={styles['user__img']}
                    src={user.avatar || blankPhoto}
                    alt="user profile picture"
                />
                <div className="user__info">
                    <h2 className={styles['user__info__name']}>
                        {user.first_name} {user.last_name}
                    </h2>
                    <a
                        className={styles['user__info__email']}
                        href={`mailto:${user.email}`}
                    >
                        {user.email}
                    </a>
                </div>
                <button className={styles['user__edit-btn']}>
                    Редактировать
                </button>
            </div>
            <EditUserModal user={user} />
        </div>
    );
};

export default UserPage;
