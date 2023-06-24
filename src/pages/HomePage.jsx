import { Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    Link,
    AppBar,
    Toolbar,
} from "@mui/material";
import useProductsHome from "../hooks/product/useProductsHome";
import CardProduct from "../components/card/CardProduct";
import useFetchCategories from '../hooks/category/useFetchCategories';
import { useEffect, useState } from 'react';

export default function HomePage({ user }) {
    const { data } = useProductsHome();
    const { data: dataCategory } = useFetchCategories();
    const [categories, setCategories] = useState([])

    const queryParams = new URLSearchParams({
        category: "0",
        keyword: "",
        sort: '',
        page: '1',
        size: '12',
    });

    useEffect(() => {
        const fetchCategories = () => {
            try {
                setCategories(dataCategory);
            } catch (error) {
                console.error(error)
            }
        };

        fetchCategories();
    }, [dataCategory])

    return (
        <Container maxWidth="xl" sx={{
            pt: {
                xs: 0,
                md: 1
            },
            px: {
                xs: 0,
                md: 3
            },
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
        }}>
            <Box sx={{
                backgroundImage: "url('/assets/images/hero.jpg')",
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "85vh",
                borderRadius: {
                    xs: "0px",
                    md: "15px"
                },
                p: {
                    xs: 0,
                    md: 1
                },
                mb: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: {
                    xs: "center",
                    md: "space-between"
                },
                alignItems: {
                    xs: "center",
                    md: "start"
                }
            }}>
                <AppBar position="static" sx={{
                    borderRadius: "15px",
                    background: "white",
                    display: { xs: 'none', md: 'flex' }
                }}>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {categories.map((category) => (
                            <Link key={category.id} component={RouterLink} to={`/products/search?category=${category.id}&keyword=&sort=&page=1&size=12`} underline="none">
                                <Button
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {category.title}
                                </Button>
                            </Link>
                        ))
                        }
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    width: {
                        xs: "90%",
                        md: "65%"
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "space-between",
                    gap: "25px",
                    m: {
                        xs: 0,
                        md: 5
                    }
                }}>
                    <Typography variant='h5' color={"white"} sx={{ textShadow: "#000 0 0 15px" }}>
                        Un espace dédié à l'expression artistique et à la découverte
                    </Typography>
                    <Typography variant='h4' color={"white"} sx={{ textShadow: "#000 0 0 15px" }}>
                        Explorez, achetez et soutenez des créateurs indépendants sans intermédiaire
                    </Typography>
                    <Typography variant='h6' color={"white"} sx={{ textShadow: "#000 0 0 15px" }}>
                        Découvrez et d'achetez une variété de créations uniques,
                        allant des œuvres d'art aux produits faits main, en passant par des produits
                        numériques et bien d'autres.
                    </Typography>
                </Box>
            </Box>
            <Container sx={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: "start",
            }}>
                <Typography variant="h4">Fil d'actualité</Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    py: 5
                }}>
                    {data.map((p) => (
                        <CardProduct
                            key={p.id}
                            product={p}
                        />
                    ))}
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%"
                }}>
                    <Link component={RouterLink} to={`/products/search?${queryParams.toString()}`} underline="none" sx={{
                        m: 1
                    }}>
                        <Button variant="solid"
                            sx={{
                                color: "white",
                                background: "black",
                                '&:hover': {
                                    background: "#00000099",
                                },
                            }}>
                            Voir plus
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Container >
    )
}
