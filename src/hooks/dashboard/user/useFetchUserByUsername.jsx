import { useEffect, useState } from 'react';
import axios from 'axios';
import { IsAuth } from '../../../utils/auth/CheckAuth';

const useFetchUserByUsername = () => {
    const [data, setData] = useState([]);

    const username = IsAuth();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/${username}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    return { data };
};

export default useFetchUserByUsername;