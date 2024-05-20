import axios from 'axios';
import { useEffect, useState } from 'react';
import UserListItem from './UserListItem/UserListItem';
import styles from './UserListPage.module.css';
import Paginator from './Paginator/Paginator';
import Filters from './Filters/Filters';

const PER_PAGE_USERS = 10;

const UserListPage = () => {
    const [usersList, setUsersList] = useState([]);
    const [pageData, setPageData] = useState({
        currentPage: 1,
        filter: {
            activeId: null,
            reverse: false,
        },
    });

    useEffect(() => {
        if (pageData.search && pageData.totalUsers) {
            axios
                .get(
                    `https://reqres.in/api/users?per_page=${pageData.totalUsers}&page=${1}`
                )
                .then((res) => res.data)
                .then((data) => {
                    setUsersList(
                        data.data.filter(
                            (user) =>
                                user.first_name
                                    .toLowerCase()
                                    .includes(pageData.search.toLowerCase()) ||
                                user.last_name
                                    .toLowerCase()
                                    .includes(pageData.search.toLowerCase()) ||
                                user.email
                                    .toLowerCase()
                                    .includes(pageData.search.toLowerCase())
                        )
                    );
                })
                .catch((err) => console.error(err));

            setPageData({
                ...pageData,
                totalPages: Math.ceil(usersList.length / PER_PAGE_USERS),
            });

            return;
        }

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
    }, [pageData.currentPage, pageData.search]);

    return (
        <>
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
                {usersList.map((user) => (
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
