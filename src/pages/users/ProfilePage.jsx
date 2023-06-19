import { Avatar, Box, Container, Divider, FormControl, IconButton, InputLabel, Link, ListItemIcon, Menu, MenuItem, Pagination, Select, Typography } from '@mui/material'
import {
    PeopleOutline as PeopleOutlineIcon,
    MoreHoriz as MoreHorizIcon,
    Flag as FlagIcon
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fDateMonth } from '../../utils/formatTime';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useFetchCategories from '../../hooks/category/useFetchCategories';
import CardProduct from '../../components/card/CardProduct';
import { stringAvatarSquare } from '../../utils/stringAvatar';

export default function ProfilePage({ user }) {
    const navigate = useNavigate();
    const location = new URL(window.location.href);
    const pathname = location.pathname.split("/")[2];

    const [userProfile, setUserProfile] = useState(null);
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(null);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState("priceASC");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuMoreClose = () => {
        setAnchorEl(null);
    };

    const { data: categoriesData } = useFetchCategories();

    useEffect(() => {
        const fetchCategories = () => {
            try {
                setCategories(categoriesData);
            } catch (error) {
                console.error(error)
            }
        };

        const fetchProfileAndProducts = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}/users/${pathname}`)
                .then(res => {
                    // console.log("userProfile", res.data)
                    setUserProfile(res.data);

                    axios.get(`${process.env.REACT_APP_API_URL}/products/user/${pathname}?category=${category}&price=${price}&page=${page}&size=12`)
                        .then(res => {
                            // console.log("products", res.data)
                            setProducts(res.data.products);
                            setTotalPages(res.data.totalPages);
                            setTotalProducts(res.data.totalProducts);
                        }).catch(err => {
                            console.error(err);
                        });

                }).catch(err => {
                    console.error(err);
                    navigate("/404");
                });
        };

        fetchCategories();
        fetchProfileAndProducts();
    }, [pathname, navigate, page, category, price, categoriesData]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Container sx={{
            py: 5,
            minHeight: "100vh"
        }}>
            {userProfile ? (
                <Box>
                    <Box sx={{
                        p: 2,
                        borderRadius: "15px",
                        boxShadow: 0,
                        border: "1px solid #DDD",
                        position: 'relative'
                    }}>
                        <Box sx={{
                            display: 'flex',
                        }}>
                            <Avatar {...stringAvatarSquare(userProfile?.pseudo)} />
                            <Typography variant='h5'>{userProfile?.pseudo}</Typography>
                        </Box>
                        <Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                my: 2,
                            }}>
                                <PeopleOutlineIcon fontSize='small' sx={{
                                    p: 1,
                                }} />
                                <Typography variant='body2'>
                                    Membre {fDateMonth(userProfile?.createdAt)}
                                </Typography>
                            </Box>
                            <Typography variant='h6' sx={{ fontWeight: 300 }}>
                                {userProfile?.biography}
                            </Typography>
                        </Box>
                        {userProfile?.pseudo !== user?.pseudo &&
                            <Box sx={{
                                position: "absolute",
                                top: "15px",
                                right: "15px"
                            }}>
                                <IconButton
                                    id="basic-button"
                                    aria-controls={open ? 'menu-more' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleMenuMoreClick}>
                                    <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    id="menu-more"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuMoreClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleMenuMoreClose}>
                                        <FlagIcon sx={{ mr: 1 }} /> Signaler un utilisateur
                                    </MenuItem>
                                </Menu>
                            </Box>
                        }
                    </Box>
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
                                <Typography variant='h5'>({totalProducts}) articles</Typography>
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
                                <Typography variant='body1'>Aucun article ne correspond à ta recherche. Pourquoi ne pas essayer un autre mot-clé ou changer de filtre ?</Typography>
                            </Box>
                        }
                    </Container>
                </Box>
            ) : (
                <Typography>User not found</Typography>
            )}
        </Container>
    )
}
