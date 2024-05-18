import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserListPage from './components/pages/UsersListPage/UserListPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="*" replace element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
