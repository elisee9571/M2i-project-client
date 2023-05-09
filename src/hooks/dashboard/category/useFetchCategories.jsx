import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchCategories = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/categories')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    return { data };
};

export default useFetchCategories;