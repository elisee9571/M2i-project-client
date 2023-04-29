import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchUsers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:8081/users').then(res => {
                setData(res.data);
            }).catch(err => console.error(err));
        } catch (error) {
            console.error(error)
        }
    }, []);

    return { data };
};

export default useFetchUsers;