import { useEffect, useState } from 'react';
import axios from 'axios';
import { IsAuth } from '../../../utils/auth/CheckAuth';

const useFetchUserByUsername = () => {
    const [data, setData] = useState([]);

    const username = IsAuth();

    useEffect(() => {
        axios.get(`http://localhost:8081/api/v1/users/${username}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    return { data };
};

export default useFetchUserByUsername;