import { useState, useContext, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    InputBase,
    Box,
    ListItemIcon,
    IconButton,
    MenuItem,
    Menu,
    Divider,
    Button,
    Link,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';

import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    AccountCircle as AccountCircleIcon,
    PersonOutlineOutlined as PersonOutlineOutlinedIcon,
    BookmarkBorder as BookmarkBorderIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';

import axios from 'axios';

import Logo from '../../components/logo/Logo';
import { UserContext } from '../../utils/UserContext';
import useFetchCategories from '../../hooks/category/useFetchCategories';
import {
    ColorLens as ColorLensIcon,
    PhotoSizeSelectActual as PhotoSizeSelectActualIcon,
    Draw as DrawIcon,
    Sell as SellIcon
} from '@mui/icons-material';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.10),
    },
    color: theme.palette.common.black,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    top: 0,
    [theme.breakpoints.up('xs')]: {
        left: 95
    },
    [theme.breakpoints.up('md')]: {
        left: 130,
    },
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(3.5)})`,
        transition: theme.transitions.create('width')
    },
}));


export default function Navbar({ user }) {
    const { logoutUser } = useContext(UserContext);
    const { data } = useFetchCategories();

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);

    const [typeSearch, setTypeSearch] = useState("products");

    const [state, setState] = useState({
        right: false,
    });

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    // dropdown profile
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link component={RouterLink} to={`/profile/${user?.pseudo}`} underline="none" sx={{
                textDecoration: "none",
                color: "black"
            }}>
                <MenuItem
                    sx={{ m: 1 }}
                    onClick={handleMenuClose}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="medium" />
                    </ListItemIcon>
                    Profil
                </MenuItem>
            </Link>
            <Divider />
            {user?.roles === "ROLE_ADMIN" &&
                <Box>
                    <Link component={RouterLink} to={`/dashboard`} underline="none" sx={{
                        textDecoration: "none",
                        color: "black"
                    }}>
                        <MenuItem
                            sx={{ m: 1 }}
                            onClick={handleMenuClose}>
                            <ListItemIcon>
                                <AssessmentIcon fontSize="medium" />
                            </ListItemIcon>
                            Dashboard
                        </MenuItem>
                    </Link>
                    <Divider />
                </Box>
            }
            <Link component={RouterLink} to={`/profile/settings`} underline="none" sx={{
                textDecoration: "none",
                color: "black"
            }}>
                <MenuItem
                    sx={{ m: 1 }}
                    onClick={handleMenuClose}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="medium" />
                    </ListItemIcon>
                    Paramètres
                </MenuItem>
            </Link>
            <MenuItem
                sx={{ m: 1 }}
                onClick={() => {
                    handleMenuClose();
                    logout();
                }}>
                <ListItemIcon>
                    <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    // menu list
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: {
                    xs: '75vw',
                    sm: '50vw',
                    md: '350px'
                }
            }}
            role="presentation"
        >
            <Box>
                {!user &&
                    <>
                        <Typography variant='body1' sx={{
                            p: 3
                        }}>
                            Découvrez un monde de créations en devenant membre dès maintenant. Rejoignez-nous pour explorer, inspirer et être inspiré par des œuvres uniques.
                        </Typography>
                        <Link component={RouterLink} to="/register" underline="none" sx={{
                            my: 1,
                            mx: 3,
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button variant="outlined"
                                sx={{
                                    width: "100%",
                                    color: "black",
                                    borderColor: "black",
                                    '&:hover': {
                                        background: "#00000010",
                                        borderColor: "black",
                                    },
                                }}>
                                S'inscrire
                            </Button>
                        </Link>
                        <Link component={RouterLink} to="/login" underline="none" sx={{
                            my: 1,
                            mx: 3,
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button variant="solid"
                                sx={{
                                    width: "100%",
                                    color: "white",
                                    background: "black",
                                    '&:hover': {
                                        background: "#00000099",
                                    },
                                }}>
                                Se connecter
                            </Button>
                        </Link>
                    </>
                }
                <Link component={RouterLink} to="/products/add" underline="none" sx={{
                    my: 1,
                    mx: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    display: { xs: 'flex', md: 'none' }
                }}>
                    <Button variant="solid"
                        sx={{
                            width: "100%",
                            color: "white",
                            background: "black",
                            '&:hover': {
                                background: "#00000099",
                            },
                        }}>
                        Publier un article
                    </Button>
                </Link>
            </Box>
            <Divider />
            <Box sx={{
                m: 1,
                display: 'flex',
                justifyContent: 'center',
                display: { xs: 'flex', md: 'none' }
            }}>
                <form onSubmit={handleSearch}>
                    <Search>
                        <FormControl size="small" sx={{ width: 100 }}>
                            <Select
                                id="select-trie"
                                value={typeSearch}
                                onChange={handleChangeTypeSearch}
                            >
                                <MenuItem value="products">Articles</MenuItem>
                                <MenuItem value="users">Utilisateurs</MenuItem>
                            </Select>
                        </FormControl>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Rechercher..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchText}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            sx={{
                                width: "30vw"
                            }}
                        />
                    </Search>
                </form>
            </Box>
            <Divider />
            <Typography variant='body1' sx={{
                pt: 3,
                mx: 3
            }}>
                Parcourir
            </Typography>
            <List sx={{
                mx: 2
            }}>
                {categories.map((category) => (
                    <Link key={category.id} component={RouterLink} to={`/products?category=${category.id}&keyword=&sort=&page=1&size=9`} underline="none">
                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleDrawer(anchor, false)}>
                                <ListItemIcon>{icon({ category })}</ListItemIcon>
                                <ListItemText primary={category.title} sx={{ color: 'black' }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))
                }
            </List>
        </Box>
    );

    const icon = (category) => {
        switch (category.category.title) {
            case 'Photographie':
                return <PhotoSizeSelectActualIcon />;
            case 'Dessin':
                return <DrawIcon />;
            case 'Peinture':
                return <ColorLensIcon />;

            default:
                return <SellIcon />;
        }
    }

    //query params for favorites
    const queryParamsFavorites = new URLSearchParams({
        category: '0',
        sort: '',
        page: '1',
        size: '12',
    });

    //search
    const [searchText, setSearchText] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const handleChangeTypeSearch = (e) => {
        setTypeSearch(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (typeSearch === "products") {
            const queryParams = new URLSearchParams({
                category: '0',
                keyword: searchText,
                sort: '',
                page: '1',
                size: '12',
            });

            const url = `${process.env.REACT_APP_API_URL}/products/search?${queryParams.toString()}`;

            axios
                .get(url)
                .then((res) => {
                    const searchUrl = `/products/search?${queryParams.toString()}`;
                    navigate(searchUrl);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            const queryParams = new URLSearchParams({
                keyword: searchText,
                page: '1',
                size: '25',
            });

            const url = `${process.env.REACT_APP_API_URL}/users/search?${queryParams.toString()}`;

            axios
                .get(url)
                .then((res) => {
                    const searchUrl = `/users/search?${queryParams.toString()}`;
                    navigate(searchUrl);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const logout = () => {
        logoutUser()
        navigate("/");
    }

    useEffect(() => {
        const fetchCategories = () => {
            try {
                setCategories(data);
            } catch (error) {
                console.error(error)
            }
        };
        fetchCategories();
    }, [data])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: "white", boxShadow: 0 }}>
                <Toolbar>
                    <Box>
                        <Logo />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{
                        m: 1,
                        display: { xs: 'none', md: 'flex' }
                    }}>
                        <form onSubmit={handleSearch}>
                            <Search>
                                <FormControl size="small" sx={{ width: 135 }}>
                                    <Select
                                        id="select-trie"
                                        value={typeSearch}
                                        onChange={handleChangeTypeSearch}
                                    >
                                        <MenuItem value="products">Articles</MenuItem>
                                        <MenuItem value="users">Utilisateurs</MenuItem>
                                    </Select>
                                </FormControl>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Rechercher..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchText}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    sx={{
                                        width: '30vw',
                                    }}
                                />
                            </Search>
                        </form>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {!user &&
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Link component={RouterLink} to="/register" underline="none" sx={{
                                m: 1
                            }}>
                                <Button variant="outlined"
                                    sx={{
                                        color: "black",
                                        borderColor: "black",
                                        '&:hover': {
                                            background: "#00000010",
                                            borderColor: "black",
                                        },
                                    }}>
                                    S'inscrire
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/login" underline="none" sx={{
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
                                    Se connecter
                                </Button>
                            </Link>
                        </Box>
                    }
                    {user &&
                        <>
                            <Link component={RouterLink} to="/products/add" underline="none" sx={{
                                p: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                display: { xs: 'none', md: 'flex' }
                            }}>
                                <Button variant="solid"
                                    sx={{
                                        width: "100%",
                                        color: "white",
                                        background: "black",
                                        '&:hover': {
                                            background: "#00000099",
                                        },
                                    }}>
                                    Publier un article
                                </Button>
                            </Link>
                            <Box>
                                <Link component={RouterLink} to={`/favorites?${queryParamsFavorites.toString()}`} underline="none">
                                    <IconButton
                                        size="large"
                                        aria-label="favorite list of current user"
                                        color="black"
                                    >
                                        <BookmarkBorderIcon />
                                    </IconButton>
                                </Link>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="black"
                                >
                                    <PersonOutlineOutlinedIcon />
                                </IconButton>
                            </Box>
                        </>
                    }
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            color="black"
                            aria-label="show more"
                            onClick={toggleDrawer('right', true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={state.right}
                            onClose={toggleDrawer('right', false)}
                        >
                            {list('right')}
                        </Drawer>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box >
    );
}
