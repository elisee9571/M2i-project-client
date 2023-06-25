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
import { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios"
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { UserContext } from "../../utils/UserContext";

export default function LoginPage() {
    const { updateUser, showNotification } = useContext(UserContext);

    const navigate = useNavigate();
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
            showNotification("Connexion réussie", 'success');
            const { roles } = jwt_decode(res.data.token);

            const userData = {
                id: res.data.user.user.id,
                lastname: res.data.user.user.lastname,
                firstname: res.data.user.user.firstname,
                pseudo: res.data.user.user.pseudo,
                email: res.data.user.user.email,
                roles,
                token: res.data.token
            }

            updateUser(userData);

            if (roles === 'ROLE_ADMIN') {
                navigate("/dashboard")
            } else {
                navigate("/");
            }

        }).catch(err => {
            showNotification(err.response.data, 'error');
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
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Box
                    sx={{
                        flex: '1',
                        backgroundImage: 'url("/assets/images/img-login.jpg")',
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
                        p: 1
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
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 4,
                                        message: "Mot de passe requis et doit être superieur à 4 caracteres"
                                    },
                                    onChange: (e) => {
                                        setPasswordValue(e.target.value);
                                    }
                                })}
                                error={Boolean(errors.password)}
                            />
                            <FormHelperText error={Boolean(errors.password)}>{errors.password && errors.password.message}</FormHelperText>
                        </FormControl>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "end",
                            pb: 2
                        }}>
                            <Link to={"/forgot-password"} component={RouterLink} variant="body2" sx={{
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
            </Box>
        </div>
    )
}
