import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import UserListPage from './components/pages/UsersListPage/UserListPage';
import UserPage from './components/pages/UserPage/UserPage';
import AuthorizationPage from './components/pages/AuthorizationPage/AuthorizationPage';
import RegistrationPage from './components/pages/RegistrationPage/RegistrationPage';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/auth');
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="/user/:id/" element={<UserPage />} />
            <Route path="/auth" element={<AuthorizationPage />} />
            <Route path="/reg" element={<RegistrationPage />} />
            <Route path="*" replace element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
