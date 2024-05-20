import styles from './UserListItem.module.css';
import blankPhoto from '../../../../assets/img/blank-profile-photo.png';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
    const { user } = props;

    return (
        <li className={styles['user-list-item']}>
            <img
                className={styles['user-list-item__img']}
                src={user.avatar || blankPhoto}
                alt="profile img"
            />
            <div>
                <Link
                    to={`user/${user.id}`}
                    className={styles['user-list-item__name']}
                >
                    {user.first_name} {user.last_name}
                </Link>
                <p>{user.email}</p>
            </div>
        </li>
    );
};

export default UserListItem;
