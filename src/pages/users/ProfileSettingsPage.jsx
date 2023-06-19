import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/UserContext';
import { Box, Button, Container, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
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
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function ProfileSettingsPage({ user }) {
    const { updateUser, showNotification } = useContext(UserContext);
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);

    const [tabValue, setTabValue] = useState(0);

    const handleChangeTabValue = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.pseudo}`)
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

    const { register: patchUser, handleSubmit, formState: { errors } } = useForm();

    const onSubmitPatchUser = async (data, e) => {
        e.preventDefault();
        console.log("data", data);

        if (user) {
            try {
                const config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_API_URL}/users/${userProfile.id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    data: JSON.stringify(data)
                };

                const res = await axios.request(config);

                const userData = {
                    lastname: data.lastname,
                    firstname: data.firstname,
                    pseudo: data.pseudo,
                    email: data.email
                };

                updateUser(data);
                showNotification(res.data, "success");
            } catch (err) {
                console.error(err);
                showNotification(err.response.data, "error");
            }
        }
    }

    return (
        <Container sx={{
            py: 5,
            minHeight: "100vh"
        }}>
            <Typography variant='h4' sx={{
                mb: 5
            }}>Mes paramètres</Typography>
            {userProfile &&
                <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            value={tabValue}
                            onChange={handleChangeTabValue}
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
                    <TabPanel value={tabValue} index={0}>
                        <Box
                            component="form"
                            action="POST"
                            onSubmit={handleSubmit(onSubmitPatchUser)}
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
                                                value={userProfile.lastname}
                                                fullWidth
                                                {...patchUser("lastname", {
                                                    required: true,
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, lastname: e.target.value });
                                                    }
                                                })}
                                                helperText={errors.lastname && "Nom requis."}
                                                error={Boolean(errors.lastname)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="firstname"
                                                value={userProfile.firstname}
                                                fullWidth
                                                {...patchUser("firstname", {
                                                    required: true,
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, firstname: e.target.value });
                                                    }
                                                })}
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
                                                value={userProfile.pseudo}
                                                fullWidth
                                                inputProps={{ maxLength: 20 }}
                                                {...patchUser("pseudo", {
                                                    required: true,
                                                    maxLength: {
                                                        value: 20,
                                                        message: "Pseudo requis et ne peut pas dépasser 20 caractères"
                                                    },
                                                    minLength: {
                                                        value: 3,
                                                        message: "Pseudo requis et doit dépasser 3 caractères"
                                                    },
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, pseudo: e.target.value });
                                                    }
                                                })}
                                                helperText={errors.pseudo && errors.pseudo.message}
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
                                                value={userProfile.email}
                                                fullWidth
                                                {...patchUser("email", {
                                                    required: true,
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, email: e.target.value });
                                                    }
                                                })}
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
                                                value={userProfile.biography}
                                                fullWidth
                                                {...patchUser("biography", {
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, biography: e.target.value });
                                                    }
                                                })}
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
                                                type='number'
                                                id="phone"
                                                value={userProfile.phone}
                                                fullWidth
                                                {...patchUser("phone", {
                                                    required: true,
                                                    minLength: {
                                                        value: 10,
                                                        message: "Téléphone requis et doit être de 10 caractères"
                                                    },
                                                    maxLength: {
                                                        value: 10,
                                                        message: "Téléphone requis et ne doit pas dépasser 10 caractères"
                                                    },
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, phone: e.target.value.slice(0, 10) });
                                                    }
                                                })}
                                                helperText={errors.phone && errors.phone.message}
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
                                                value={userProfile.address}
                                                fullWidth
                                                {...patchUser("address", {
                                                    required: true,
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, address: e.target.value });
                                                    }
                                                })}
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
                                                value={userProfile.additionalAddress}
                                                placeholder="Appartement, étage, suite..."
                                                fullWidth
                                                {...patchUser("additionalAddress", {
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, additionalAddress: e.target.value });
                                                    }
                                                })}
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
                                                value={userProfile.city}
                                                fullWidth
                                                {...patchUser("city", {
                                                    required: true,
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, city: e.target.value });
                                                    }
                                                })}
                                                helperText={errors.city && "Ville requis."}
                                                error={Boolean(errors.city)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                type='number'
                                                id="zipCode"
                                                value={userProfile.zipCode}
                                                fullWidth
                                                {...patchUser("zipCode", {
                                                    required: true,
                                                    maxLength: {
                                                        value: 5,
                                                        message: "Code postale requis et ne peut pas dépasser 5 caractères"
                                                    },
                                                    minLength: {
                                                        value: 5,
                                                        message: "Code postale requis et doit être de 5 caractères"
                                                    },
                                                    onChange: (e) => {
                                                        setUserProfile({ ...userProfile, zipCode: e.target.value.slice(0, 5) });
                                                    }
                                                })}
                                                helperText={errors.zipCode && errors.zipCode.message}
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
                    <TabPanel value={tabValue} index={1}>
                        <Typography variant='h5'>Sécurité</Typography>

                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <Typography variant='h5'>Notifications</Typography>

                    </TabPanel>
                    <TabPanel value={tabValue} index={3}>
                        <Typography variant='h5'>Désactivation</Typography>

                    </TabPanel>
                </>
            }
        </Container >
    )
}
