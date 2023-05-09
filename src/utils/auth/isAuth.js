import jwt_decode from 'jwt-decode';

export default function isAuth() {
    const token = localStorage.getItem('TOKEN');

    if (token) {
        const { sub } = jwt_decode(token);
        return sub;
    }

    return null;
}
