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
import useProductsHome from "../hooks/products/useProductsHome";
import CardProduct from "../components/card/CardProduct";

const pages = ['Art Visuelle', 'Photographie', 'Dessin', 'Peinture'];

export default function HomePage() {
    const queryParams = new URLSearchParams({
        category: "",
        keyword: "",
        price: 'priceASC',
        page: '0',
        size: '9',
    });

    const { data } = useProductsHome();

    return (
        <Container sx={{
            pt: 5,
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
        }}>
            <Box sx={{
                backgroundImage: "url('/assets/images/bg-register.jpg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "80vh",
                borderRadius: "20px",
                p: 1,
                mb: 5,
            }}>
                <AppBar position="static" sx={{
                    borderRadius: "15px",
                    background: "white"
                }}>
                    <Toolbar sx={{
                    }}>
                        {pages.map((page, index) => (
                            <Link component={RouterLink} to={`/products?category=${index + 1}&keyword=&price=priceASC&page=0&size=9`} underline="none">
                                <Button
                                    key={page}
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </Link>

                        ))}
                    </Toolbar>
                </AppBar>
            </Box>

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
            }}>
                <Link component={RouterLink} to={`/products?${queryParams.toString()}`} underline="none" sx={{
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
    )
}
