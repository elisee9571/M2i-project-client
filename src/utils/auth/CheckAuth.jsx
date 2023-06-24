import { Navigate } from 'react-router-dom';

export function CheckAuth({ children }) {
    const user = JSON.parse(localStorage.getItem('USER'))

    if (user) {
        if (user.roles === 'ROLE_ADMIN') {
            return children;
        } else {
            return <Navigate to="/401" />;
        }
    } else {
        return <Navigate to="/login" />;
    }
}

export function IsAlreadyAuth({ children }) {
    const user = JSON.parse(localStorage.getItem('USER'))

    if (user) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
}

export function RequiredAuth({ children }) {
    const user = JSON.parse(localStorage.getItem('USER'))

    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}