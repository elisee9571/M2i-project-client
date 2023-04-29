import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchProducts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/products')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    return { data };
};

export default useFetchProducts;