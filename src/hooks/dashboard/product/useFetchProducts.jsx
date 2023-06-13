import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchProducts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products?page=0&size=1000`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    return { data };
};

export default useFetchProducts;