import {
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Box,
    FormHelperText,
    Link,
    Typography
} from "@mui/material";

import {
    VisibilityOff,
    Visibility
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SnackbarAlert from "../../components/snackbar-alert/SnackbarAlert";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [snackbarProps, setSnackbarProps] = useState({
        message: "",
        type: "",
        isOpen: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data, e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
            firstName: data.firstname,
            lastName: data.lastname,
            pseudo: data.pseudo,
            email: data.email,
            password: data.password
        }).then(res => {
            setSnackbarProps({ message: res.data, type: 'success' });

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        }).catch(err => {
            setSnackbarProps({ message: err.response.data, type: 'error' });
        })
    };

    return (
        <div style={{
            margin: 0,
            padding: 0
        }}>
            <Helmet>
                <title>Inscription</title>
            </Helmet>
            {snackbarProps.message !== "" && <SnackbarAlert message={snackbarProps.message} type={snackbarProps.type} />}
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Box
                    sx={{
                        flex: '1',
                        backgroundImage: 'url("/assets/images/bg-register.jpg")',
                        backgroundSize: 'cover',
                        display: { xs: 'none', md: 'block' }
                    }}
                />
                <Box
                    sx={{
                        flex: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 5
                    }}
                    component="form"
                    action="POST"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Box sx={{ width: '100%', maxWidth: '90%' }}>
                        <Typography variant="h3" align="center" sx={{ mb: 3 }}>Inscription</Typography>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridGap: "1rem"
                        }}>
                            <TextField
                                id="firstname"
                                label="Prénom*"
                                type='text'
                                fullWidth
                                {...register("firstname", { required: true })}
                                helperText={errors.firstname && "Prénom requis."}
                                error={Boolean(errors.firstname)}
                                sx={{
                                    pb: 2
                                }}
                            />
                            <TextField
                                id="lastname"
                                label="Nom*"
                                type='text'
                                fullWidth
                                {...register("lastname", { required: true })}
                                helperText={errors.lastname && "Nom requis."}
                                error={Boolean(errors.lastname)}
                                sx={{
                                    pb: 2
                                }}
                            />
                        </Box>

                        <TextField
                            id="pseudo"
                            label="Pseudo*"
                            type='text'
                            fullWidth
                            {...register("pseudo", { required: true })}
                            helperText={errors.pseudo && "Pseudo requis."}
                            error={Boolean(errors.pseudo)}
                            sx={{
                                pb: 2
                            }}
                        />

                        <TextField
                            id="email"
                            label="Email*"
                            type='email'
                            fullWidth
                            {...register("email", { required: true })}
                            helperText={errors.email && "Email requis."}
                            error={Boolean(errors.email)}
                            sx={{
                                pb: 2
                            }}
                        />

                        <FormControl fullWidth sx={{
                            pb: 2
                        }}>
                            <InputLabel htmlFor="password" error={Boolean(errors.password)}>Mot de passe*</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Mot de passe*"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ?
                                                <Visibility color={errors.password && "error"} /> :
                                                <VisibilityOff color={errors.password && "error"} />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...register("password", { required: true })}
                                onChange={e => setPasswordValue(e.target.value)}
                                error={Boolean(errors.password)}
                            />
                            <FormHelperText error={Boolean(errors.password)}>{(errors.password && "Mot de passe requis et doit être superieur à 4 caracteres.") || (passwordValue.length > 1 && "Ne partagez votre mot de passe avec personne.")}</FormHelperText>
                        </FormControl>
                        <Button fullWidth type='submit' sx={{
                            py: 1.5,
                            borderRadius: 1.5,
                            fontWeight: 700,
                            background: "black",
                            color: "white",
                            '&:hover': {
                                background: "#00000099"
                            }
                        }}>S'inscrire</Button>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 3
                        }}>
                            <Link to={"/login"} component={RouterLink} variant="body2" sx={{
                                color: "grey",
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}>Vous avez déjà un compte ? Se connecter</Link>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </div >
    )
}
