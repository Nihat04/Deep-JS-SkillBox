import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserListPage from './pages/UsersListPage/UserListPage';
import UserPage from './pages/UserPage/UserPage';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const privateRoutes = {
    routes: [
        { path: '/auth', page: AuthorizationPage },
        { path: '/reg', page: RegistrationPage },
    ],
    redirectAddress: '/auth',
};

const publicRoutes = {
    routes: [
        { path: '/', page: UserListPage },
        { path: '/user/:id/', page: UserPage },
        { path: '/user/me/', page: UserPage },
    ],
    redirectAddress: '/',
};

function App() {
    const token = useSelector((state) => state.token);

    const availableRoutes = useMemo(() => {
        if (token) return publicRoutes;
        return privateRoutes;
    }, [token]);

    return (
        <Routes>
            {availableRoutes.routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={React.createElement(route.page)}
                />
            ))}
            <Route
                path="*"
                replace
                element={<Navigate to={availableRoutes.redirectAddress} />}
            />
        </Routes>
    );
}

export default App;
