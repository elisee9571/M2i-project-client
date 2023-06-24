import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import {
    Box, Container, Pagination, Typography,
    FormControl, InputLabel, Select, MenuItem, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardProduct from '../../components/card/CardProduct';
import useFetchCategories from '../../hooks/category/useFetchCategories';
import { UserContext } from '../../utils/UserContext';

export default function FavoritesPage() {
    const { user } = useContext(UserContext);

    const location = new URL(window.location.href);
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const pathname = location.pathname;

    const [favorites, setFavorites] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [category, setCategory] = useState(searchParams.get('category'));
    const [categories, setCategories] = useState([]);
    const [sort, setSort] = useState(searchParams.get('sort'));

    const { data } = useFetchCategories();

    useEffect(() => {
        const fetchCategories = () => {
            try {
                setCategories(data);
            } catch (error) {
                console.error(error)
            }
        };

        const fetchData = async () => {
            if (user) {
                const queryParams = new URLSearchParams({
                    category: category,
                    sort: sort,
                    page: page,
                    size: searchParams.get('size'),
                });

                const url = `${process.env.REACT_APP_API_URL}/favorites?${queryParams.toString()}`;

                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: url,
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                };

                try {
                    const res = await axios.request(config);
                    setFavorites(res.data.favorites);
                    setTotalPages(res.data.totalPages);
                    setTotalProducts(res.data.totalProducts);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchCategories();
        fetchData();
    }, [location.search, page, category, sort, data, favorites]);

    const handleChangePage = (event, value) => {
        setPage(value);
        const queryParams = new URLSearchParams({
            category: category,
            sort: sort,
            page: value,
            size: searchParams.get('size'),
        });
        const newUrl = `/favorites?${queryParams.toString()}`;
        navigate(newUrl);
    };

    const handleChangeSort = (event) => {
        setSort(event.target.value);
        const queryParams = new URLSearchParams({
            category: category,
            sort: event.target.value,
            page: page,
            size: searchParams.get('size'),
        });
        const newUrl = `/favorites?${queryParams.toString()}`;
        navigate(newUrl);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
        const queryParams = new URLSearchParams({
            category: event.target.value,
            sort: sort,
            page: page,
            size: searchParams.get('size'),
        });
        const newUrl = `/favorites?${queryParams.toString()}`;
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
                    <Typography variant='h5'>Favoris ({totalProducts})</Typography>
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
                        <InputLabel id="select-label-category">Catégorie</InputLabel>
                        <Select
                            labelId='select-label-category'
                            id="select-category"
                            value={category}
                            label="Catégorie"
                            onChange={handleChangeCategory}
                        >
                            <MenuItem value={0}>Tout</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.title}
                                </MenuItem>
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
                            value={sort}
                            label="Trier par"
                            onChange={handleChangeSort}
                        >
                            <MenuItem value={"createdAtDESC"}>Plus récents</MenuItem>
                            <MenuItem value={"createdAtASC"}>Plus anciens</MenuItem>
                            <MenuItem value={"priceDESC"}>Prix décroissants</MenuItem>
                            <MenuItem value={"priceASC"}>Prix croissants</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            {favorites.length > 0 ?
                <>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        py: 5
                    }}>
                        {favorites.map((p) => (
                            <CardProduct
                                key={p.product.id}
                                product={p.product}
                            />
                        ))}
                    </Box>
                    {totalPages > 1 &&
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Pagination count={totalPages} page={page} onChange={handleChangePage} />
                        </Box>
                    }
                </>
                :
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 5
                }}>
                    <Typography variant='h3'>Désolé, aucun résultat</Typography>
                    <Typography variant='body1'>Aucun article en favoris ne correspond à ta recherche. Pourquoi ne pas essayer un autre mot-clé ou changer de filtre ?</Typography>
                </Box>
            }
        </Container>
    )
}
