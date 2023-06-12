import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export function CheckAuth({ children }) {
    const token = localStorage.getItem('TOKEN');

    if (token) {
        const { roles } = jwt_decode(token);

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
    const token = localStorage.getItem('TOKEN');

    if (token) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
}

export function IsAuth() {
    const token = localStorage.getItem('TOKEN');

    if (token) {
        const { sub } = jwt_decode(token);
        return sub;
    }

    return null;
}
