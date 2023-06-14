import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export function CheckAuth({ children }) {
    const user = JSON.parse(localStorage.getItem('USER'))

    if (user) {
        const { roles } = jwt_decode(user.token);

        if (roles === 'ROLE_ADMIN') {
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

export function IsAuth() {
    const user = JSON.parse(localStorage.getItem('USER'))

    if (user) {
        const { sub } = jwt_decode(user.token);
        return sub;
    }

    return null;
}
