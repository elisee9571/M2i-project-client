import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardProduct from '../../components/card/CardProduct';
import {
    Box, Container, Pagination, Typography,
    FormControl, InputLabel, Select, MenuItem, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
    const location = new URL(window.location.href);
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0);
    const [category, setCategory] = useState(searchParams.get('category'));
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(searchParams.get('price'));

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/categories`)
            .then(res => {
                setCategories(res.data);
                console.log(res.data)
            });

        const fetchData = async () => {
            const queryParams = new URLSearchParams({
                category: category,
                keyword: searchParams.get('keyword'),
                price: price,
                page: page,
                size: searchParams.get('size'),
            });

            const url = `${process.env.REACT_APP_API_URL}/products/search?${queryParams.toString()}`;

            try {
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [location.search, page, category, price]);

    const handleChangePage = (event, value) => {
        setPage(value);
        const queryParams = new URLSearchParams({
            category: category,
            keyword: searchParams.get('keyword'),
            price: price,
            page: value,
            size: searchParams.get('size'),
        });
        const newUrl = `/products?${queryParams.toString()}`;
        navigate(newUrl);
    };

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
        const queryParams = new URLSearchParams({
            category: category,
            keyword: searchParams.get('keyword'),
            price: event.target.value,
            page: page,
            size: searchParams.get('size'),
        });
        const newUrl = `/products?${queryParams.toString()}`;
        navigate(newUrl);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
        const queryParams = new URLSearchParams({
            category: event.target.value,
            keyword: searchParams.get('keyword'),
            price: price,
            page: page,
            size: searchParams.get('size'),
        });
        const newUrl = `/products?${queryParams.toString()}`;
        navigate(newUrl);
    };

    return (
        <Container sx={{
            py: 5,
            minHeight: "100vh"
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box sx={{
                    py: 2
                }}>
                    <Typography variant='body1'>Résultats de la recherche pour</Typography>
                    <Typography variant='h5'>{searchParams.get("keyword") ? searchParams.get("keyword") : ""}({products.length})</Typography>
                </Box>
                <Divider />
                <Box sx={{
                    display: 'flex',
                    flexWrap: "wrap",
                    justifyContent: 'start',
                    gap: '20px',
                    py: 2
                }}>
                    <FormControl sx={{
                        minWidth: 150
                    }}>
                        <InputLabel htmlFor="select-category">Catégorie</InputLabel>
                        <Select
                            native
                            defaultValue=""
                            id="select-category"
                            value={category}
                            label="Catégorie"
                            onChange={handleChangeCategory}
                        >
                            <option aria-label="None" value="" />
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        minWidth: 150
                    }}>
                        <InputLabel id="select-label-trie">Trier par</InputLabel>
                        <Select
                            labelId="select-label-trie"
                            id="select-trie"
                            value={price}
                            label="Trier par"
                            onChange={handleChangePrice}
                        >
                            <MenuItem value={"priceDESC"}>Prix décroissant</MenuItem>
                            <MenuItem value={"priceASC"}>Prix croissant</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
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
                        <Pagination count={5} page={page} onChange={handleChangePage} />
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
