import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    InputBase,
    Box,
    ListItemIcon,
    IconButton,
    MenuItem,
    Menu,
    Badge,
    Divider,
    Button,
    Link,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography
} from '@mui/material';

import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Settings as SettingsIcon, Logout as LogoutIcon, AccountCircle as AccountCircleIcon, Inbox as InboxIcon } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import Logo from '../../components/logo/Logo';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.10),
    },
    color: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width')
    },
}));


export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
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
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <AccountCircleIcon fontSize="medium" />
                </ListItemIcon>
                Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <SettingsIcon fontSize="medium" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

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
                    md: '25vw'
                }
            }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box>
                <Link component={RouterLink} to="/register" underline="none" fullWidth sx={{
                    m: 1,
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
                    m: 1,
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
            </Box>
            <Divider />
            <Box sx={{
                m: 1,
                display: 'flex',
                justifyContent: 'center',
                display: { xs: 'flex', sm: 'none' }
            }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        fullWidth
                        placeholder="Rechercher..."
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{
                            width: "72vw",
                        }}
                    />
                </Search>
            </Box>
            <Divider />
            <Typography variant='body1' sx={{
                pt: 2,
                ml: 2
            }}>
                Parcourir
            </Typography>

            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={toggleDrawer(anchor, false)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

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
                        display: { xs: 'none', sm: 'flex' }
                    }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Rechercher..."
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{
                                    width: '40vw'
                                }}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
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
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
