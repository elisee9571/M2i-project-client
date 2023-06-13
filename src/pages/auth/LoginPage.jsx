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
import axios from "axios"
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import SnackbarAlert from "../../components/snackbar-alert/SnackbarAlert";

export default function LoginPage() {
    const navigate = useNavigate();
    const [snackbarProps, setSnackbarProps] = useState({
        message: "",
        type: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data, e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            email: data.email,
            password: data.password
        }).then(res => {
            localStorage.setItem('TOKEN', res.data);

            const { roles } = jwt_decode(res.data)

            if (roles === 'ROLE_ADMIN') {
                navigate("/dashboard/app")
            } else {
                navigate("/");
            }

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
                <title>Connexion</title>
            </Helmet>
            {snackbarProps.message !== "" && <SnackbarAlert message={snackbarProps.message} type={snackbarProps.type} />}
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Box
                    sx={{
                        flex: '1',
                        backgroundImage: 'url("/assets/images/bg-login.jpg")',
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
                        <Typography variant="h3" align="center" sx={{ mb: 3 }}>Connexion</Typography>

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
                            <FormHelperText error={Boolean(errors.password)}>{(errors.password && "Mot de passe requis et doit être superieur à 4 caracteres.") || (passwordValue.length > 4 && "Ne partagez votre mot de passe avec personne.")}</FormHelperText>
                        </FormControl>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "end",
                            pb: 2
                        }}>
                            <Link to={"/"} component={RouterLink} variant="body2" sx={{
                                color: "grey",
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}>Mot de passe oublié ?</Link>
                        </Box>
                        <Button
                            fullWidth
                            type='submit'
                            sx={{
                                py: 1.5,
                                borderRadius: 1.5,
                                fontWeight: 700,
                                background: "black",
                                color: "white",
                                '&:hover': {
                                    background: "#00000099"
                                },
                                '&:disabled': {
                                    background: "grey",
                                    color: "#fff"
                                }
                            }}
                        >Se connecter</Button>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 3
                        }}>
                            <Link to={"/register"} component={RouterLink} variant="body2" sx={{
                                color: "grey",
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}>Vous n'avez pas de compte ? S’incrire</Link>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </div>
    )
}
