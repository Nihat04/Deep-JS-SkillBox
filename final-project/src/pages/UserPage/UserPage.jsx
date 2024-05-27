import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './UserPage.module.css';
import axios from 'axios';
import blankPhoto from '../../assets/img/blank-profile-photo.png';
import EditUserModal from './EditUserModal/EditUserModal';
import { useSelector } from 'react-redux';

const UserPage = () => {
    const { id } = useParams();
    const authUser = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const modalRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const pathHasMe = location.pathname.includes('/me');
        if (pathHasMe && authUser) {
            setUser(authUser);
            return;
        }

        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => res.data)
            .then((data) => setUser(data.data))
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        {[user.first_name, user.last_name].join(' ')}
                    </h2>
                    <a
                        className={styles['user__info__email']}
                        href={`mailto:${user.email}`}
                    >
                        {user.email}
                    </a>
                </div>
                <button
                    className={styles['user__edit-btn']}
                    onClick={() => modalRef.current.showModal()}
                >
                    Редактировать
                </button>
            </div>
            <EditUserModal user={user} setUser={setUser} ref={modalRef} />
        </div>
    );
};

export default UserPage;
