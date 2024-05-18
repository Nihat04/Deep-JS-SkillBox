import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PER_PAGE_USERS = 10;

const UserListPage = () => {
    const [pageSettings, setPageSettings] = useState({
        currentPage: 1,
        totalPages: 1,
        searchValue: '',
    });
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users?per_page=${PER_PAGE_USERS}`)
            .then((res) => res.data.data)
            .then((data) => setUsersList(data))
            .catch((err) => console.error(err));
    }, [pageSettings]);

    return (
        <>
            <ul>
                {usersList.map((user) => (
                    <li key={user.id}>
                        <h2>{user.first_name}</h2>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default UserListPage;
