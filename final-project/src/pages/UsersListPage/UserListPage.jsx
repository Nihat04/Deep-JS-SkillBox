import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import UserListItem from './UserListItem/UserListItem';
import styles from './UserListPage.module.css';
import Paginator from './Paginator/Paginator';
import Filters from './Filters/Filters';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import blankPhoto from '../../assets/img/blank-profile-photo.png';

const PER_PAGE_USERS = 10;

const UserListPage = () => {
    const authUser = useSelector((state) => state.user);
    const [usersList, setUsersList] = useState([]);
    const [pageData, setPageData] = useState({
        currentPage: 1,
        filter: {
            activeId: null,
            reverse: false,
        },
    });

    const filteredUsers = useMemo(() => {
        if (
            (pageData.search || pageData.filter.activeId) &&
            pageData.totalUsers
        ) {
            return usersList.filter(({ first_name, last_name, email }) =>
                [first_name, last_name, email].some((el) =>
                    el.toLowerCase().includes(pageData.search.toLowerCase())
                )
            );
        } else {
            return usersList;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersList, pageData.search, pageData.filter]);

    useEffect(() => {
        axios
            .get(
                `https://reqres.in/api/users?per_page=${PER_PAGE_USERS}&page=${pageData.currentPage}`
            )
            .then((res) => res.data)
            .then((data) => {
                setUsersList(data.data);
                setPageData({
                    ...pageData,
                    totalPages: data.total_pages,
                    totalUsers: data.total,
                });
            })
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageData.currentPage]);

    return (
        <>
            <div className={styles['my-profile__container']}>
                <img
                    className={styles['my-profile__img']}
                    src={authUser.avatar || blankPhoto}
                    alt=""
                />
                <Link className={styles['my-profile__name']} to="./user/me">
                    {[authUser.first_name, authUser.last_name].join(' ')}
                </Link>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        location.reload();
                    }}
                >
                    Выйти
                </button>
            </div>
            <input
                className={styles['user-search-inp']}
                type="text"
                onChange={(e) =>
                    setPageData({ ...pageData, search: e.target.value })
                }
                placeholder="Поиск..."
            />
            <Filters
                usersList={usersList}
                setUsersList={setUsersList}
                pageData={pageData}
                setPageData={setPageData}
            />
            <ul className={styles['users-list']}>
                {filteredUsers.map((user) => (
                    <UserListItem key={user.id} user={user} />
                ))}
            </ul>
            {pageData.totalPages > 1 && (
                <Paginator pageData={pageData} setPageData={setPageData} />
            )}
        </>
    );
};

export default UserListPage;
