import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useProductsHome() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products?page=1&size=12`)
            .then(res => setData(res.data.products))
            .catch(err => console.error(err));
    }, []);

    return { data };
}