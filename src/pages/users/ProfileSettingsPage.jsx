import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/UserContext';
import { Avatar, Box, Button, Container, Divider, FormControl, Grid, InputLabel, Link, OutlinedInput, Tab, Tabs, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    AccountBox as AccountBoxIcon,
    Lock as LockIcon,
    Notifications as NotificationsIcon,
    PersonOff as PersonOffIcon
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { stringAvatarSquare } from '../../utils/stringAvatar';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function ProfileSettingsPage({ user }) {
    const { showNotification } = useContext(UserContext);
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                axios.get(`${process.env.REACT_APP_API_URL}/users/${user.pseudo}`)
                    .then(res => {
                        // console.log("userProfile", res.data)
                        setUserProfile(res.data);
                    }).catch(err => {
                        console.error(err);
                        navigate("/401");
                    });
            };

            fetchProfile();
        }
    }, [user]);

    const { register: updateUser, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log("update user", data);
    }

    return (
        <Container sx={{
            py: 5,
            minHeight: "100vh"
        }}>
            <Typography variant='h4' sx={{
                mb: 5
            }}>Mes paramètres</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                        ml: {
                            xs: 0,
                            md: -5
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "black",
                        }
                    }}>
                    <Tab icon={<AccountBoxIcon />} iconPosition="start" label="Générale" {...a11yProps(0)}
                        sx={{
                            "&.Mui-selected": {
                                color: "black",
                            }
                        }} />
                    <Tab icon={<LockIcon />} iconPosition="start" label="Sécurité" {...a11yProps(1)}
                        sx={{
                            "&.Mui-selected": {
                                color: "black",
                            }
                        }} />
                    <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" {...a11yProps(2)}
                        sx={{
                            "&.Mui-selected": {
                                color: "black",
                            }
                        }} />
                    <Tab icon={<PersonOffIcon />} iconPosition="start" label="Désactivation" {...a11yProps(3)}
                        sx={{
                            "&.Mui-selected": {
                                color: "black",
                            }
                        }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box
                    component="form"
                    action="POST"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        position: "relative"
                    }}
                >
                    <Typography variant='h5' sx={{ mb: 5 }}>Générale</Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: 'end',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        gap: "15px",
                        display: { xs: "none", md: "flex" }
                    }}>
                        <Button
                            type='reset'
                            variant="outlined"
                            sx={{
                                py: 1.25,
                                px: 3,
                                color: "black",
                                borderColor: "black",
                                '&:hover': {
                                    background: "#00000010",
                                    borderColor: "black",
                                },
                            }}>
                            Annuler
                        </Button>
                        <Button
                            type='submit'
                            variant="solid"
                            sx={{
                                py: 1.25,
                                px: 3,
                                color: "white",
                                background: "black",
                                '&:hover': {
                                    background: "#00000099",
                                },
                            }}>
                            Sauvegarder
                        </Button>
                    </Box>
                    <Grid container spacing={2} rowSpacing={2}>
                        <Box
                            sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: {
                                    xs: "column",
                                    md: "row"
                                },
                                justifyContent: 'space-between',
                                px: 1,
                                py: 2,
                                borderBottom: "1px solid #DDD"
                            }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: "40%"
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: {
                                        xs: 0,
                                        md: 2
                                    },
                                    mb: {
                                        xs: 2,
                                        md: 0
                                    }
                                }}>Nom et Prénom</Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="lastname"
                                        value={userProfile?.lastname}
                                        fullWidth
                                        {...updateUser("lastname", { required: true })}
                                        helperText={errors.lastname && "Nom requis."}
                                        error={Boolean(errors.lastname)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="firstname"
                                        value={userProfile?.firstname}
                                        fullWidth
                                        {...updateUser("firstname", { required: true })}
                                        helperText={errors.firstname && "Prénom requis."}
                                        error={Boolean(errors.firstname)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: {
                                    xs: "column",
                                    md: "row"
                                },
                                justifyContent: 'space-between',
                                px: 1,
                                py: 2,
                                borderBottom: "1px solid #DDD"
                            }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: "40%"
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: {
                                        xs: 0,
                                        md: 2
                                    },
                                    mb: {
                                        xs: 2,
                                        md: 0
                                    }
                                }}>Pseudo</Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="pseudo"
                                        value={userProfile?.pseudo}
                                        fullWidth
                                        {...updateUser("pseudo", { required: true })}
                                        helperText={errors.pseudo && "Pseudo requis."}
                                        error={Boolean(errors.pseudo)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: {
                                    xs: "column",
                                    md: "row"
                                },
                                justifyContent: 'space-between',
                                px: 1,
                                py: 2,
                                borderBottom: "1px solid #DDD"
                            }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: "40%"
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: {
                                        xs: 0,
                                        md: 2
                                    },
                                    mb: {
                                        xs: 2,
                                        md: 0
                                    }
                                }}>Email</Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        value={userProfile?.email}
                                        fullWidth
                                        {...updateUser("email", { required: true })}
                                        helperText={errors.email && "Email requis."}
                                        error={Boolean(errors.email)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: {
                                    xs: "column",
                                    md: "row"
                                },
                                justifyContent: 'space-between',
                                px: 1,
                                py: 2,
                                borderBottom: "1px solid #DDD"
                            }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: "40%"
                                    },
                                    display: 'flex',
                                    alignItems: 'start',
                                    pl: {
                                        xs: 0,
                                        md: 2
                                    },
                                    mb: {
                                        xs: 2,
                                        md: 0
                                    }
                                }}>Biographie</Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="biography"
                                        multiline
                                        rows={4}
                                        value={userProfile?.biography}
                                        fullWidth
                                        {...updateUser("biography")}
                                        helperText={errors.biography && "biography requis."}
                                        error={Boolean(errors.biography)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: {
                                    xs: "column",
                                    md: "row"
                                },
                                justifyContent: 'space-between',
                                px: 1,
                                py: 2,
                                borderBottom: "1px solid #DDD"
                            }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: "40%"
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: {
                                        xs: 0,
                                        md: 2
                                    },
                                    mb: {
                                        xs: 2,
                                        md: 0
                                    }
                                }}>Téléphone</Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="phone"
                                        value={userProfile?.phone}
                                        fullWidth
                                        {...updateUser("phone", { required: true })}
                                        helperText={errors.phone && "Téléphone requis."}
                                        error={Boolean(errors.phone)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: {
                                    xs: "column",
                                    md: "row"
                                },
                                justifyContent: 'space-between',
                                px: 1,
                                py: 2,
                                borderBottom: "1px solid #DDD"
                            }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: "40%"
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: {
                                        xs: 0,
                                        md: 2
                                    },
                                    mb: {
                                        xs: 2,
                                        md: 0
                                    }
                                }}>Adresse</Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="address"
                                        value={userProfile?.address}
                                        fullWidth
                                        {...updateUser("address", { required: true })}
                                        helperText={errors.address && "Adresse requis."}
                                        error={Boolean(errors.address)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: {
                                    xs: "column",
                                    md: "row"
                                },
                                justifyContent: 'space-between',
                                px: 1,
                                py: 2,
                                borderBottom: "1px solid #DDD"
                            }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: "40%"
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: {
                                        xs: 0,
                                        md: 2
                                    },
                                    mb: {
                                        xs: 2,
                                        md: 0
                                    }
                                }}>Adresse complémentaire</Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="additionalAddress"
                                        value={userProfile?.additionalAddress}
                                        fullWidth
                                        {...updateUser("additionalAddress", { required: true })}
                                        helperText={errors.additionalAddress && "Adresse complémentaire requis."}
                                        error={Boolean(errors.additionalAddress)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: 'flex',
                                flexDirection: {
                                    xs: "column",
                                    md: "row"
                                },
                                justifyContent: 'space-between',
                                px: 1,
                                py: 2,
                            }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    width: {
                                        xs: "100%",
                                        md: "40%"
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: {
                                        xs: 0,
                                        md: 2
                                    },
                                    mb: {
                                        xs: 2,
                                        md: 0
                                    }
                                }}>Ville et code postale</Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="city"
                                        value={userProfile?.city}
                                        fullWidth
                                        {...updateUser("city", { required: true })}
                                        helperText={errors.city && "Ville requis."}
                                        error={Boolean(errors.city)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="zipCode"
                                        value={userProfile?.zipCode}
                                        fullWidth
                                        {...updateUser("zipCode", { required: true })}
                                        helperText={errors.zipCode && "Code postale requis."}
                                        error={Boolean(errors.zipCode)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Grid item xs={12} sx={{
                            display: "flex",
                            justifyContent: 'end',
                            display: { xs: "flex", md: "none" },
                            gap: "15px"
                        }}>
                            <Button
                                type='reset'
                                variant="outlined"
                                sx={{
                                    py: 1.25,
                                    px: 3,
                                    color: "black",
                                    borderColor: "black",
                                    '&:hover': {
                                        background: "#00000010",
                                        borderColor: "black",
                                    },
                                }}>
                                Annuler
                            </Button>
                            <Button
                                type='submit'
                                variant="solid"
                                sx={{
                                    py: 1.25,
                                    px: 3,
                                    color: "white",
                                    background: "black",
                                    '&:hover': {
                                        background: "#00000099",
                                    },
                                }}>
                                Sauvegarder
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </TabPanel >
            <TabPanel value={value} index={1}>
                <Typography variant='h5'>Sécurité</Typography>

            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography variant='h5'>Notifications</Typography>

            </TabPanel>
            <TabPanel value={value} index={3}>
                <Typography variant='h5'>Désactivation</Typography>

            </TabPanel>
        </Container >
    )
}
