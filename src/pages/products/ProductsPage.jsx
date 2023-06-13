import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardProduct from '../../components/card/CardProduct';
import { Box, Container, Pagination, Typography, Paper } from '@mui/material';

export default function ProductsPage() {
    const location = new URL(window.location.href);
    const searchParams = new URLSearchParams(location.search);

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams({
                category: searchParams.get('category'),
                keyword: searchParams.get('keyword'),
                price: searchParams.get('price'),
                page,
                size: searchParams.get('size'),
            });

            const url = `${process.env.REACT_APP_API_URL}/products/search?${queryParams.toString()}`;

            try {
                const response = await axios.get(url);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [location.search, page]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Container sx={{
            py: 5,
            minHeight: "100vh"
        }}>
            <Typography variant='body1'>Résultats de la recherche pour</Typography>
            <Typography variant='h5'>{searchParams.get("keyword") ? searchParams.get("keyword") : ""}({products.length})</Typography>
            {products.length > 0 ?
                <>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        py: 5
                    }}>
                        {products.map((p) => (
                            <CardProduct
                                key={p.id}
                                product={p}
                            />
                        ))}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Pagination count={5} page={page} onChange={handleChange} />
                    </Box>
                </>
                :
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 5
                }}>
                    <Typography variant='h3'>Désolé, aucun résultat</Typography>
                    <Typography variant='body1'>Aucun article ne correspond à ta recherche. Pourquoi ne pas essayer un autre mot-clé ou changer de filtre ?</Typography>
                </Box>
            }
        </Container>
    )
}
