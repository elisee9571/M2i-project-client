import {
    Container,
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    FormHelperText
} from "@mui/material";
import {
    VisibilityOff,
    Visibility
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();

        axios.post(`http://localhost:8081/api/v1/auth/login`, {
            email: data.email,
            password: data.password
        }).then(res => {
            console.log(res)
            if (res.status === 202) {
                localStorage.setItem('TOKEN', res.data);

                const { roles } = jwt_decode(res.data)

                if (roles === 'ROLE_ADMIN') {
                    navigate("/dashboard/app")
                } else {
                    navigate("/");
                }

            } else {
                navigate("/login");
            }

        }).catch(err => console.error(err))
    };

    return (
        <>
            <Helmet>
                <title>Connexion</title>
            </Helmet>
            <Container>
                <Grid item xs={12} md={7} component={"form"} action='post' onSubmit={handleSubmit(onSubmit)}>
                    <Paper sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        p: 5,
                        borderRadius: 4,
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;"
                    }}>
                        <Grid container spacing={2} rowSpacing={2}>
                            <TextField
                                id="email"
                                label="Email*"
                                type='email'
                                fullWidth
                                {...register("email", { required: true })}
                                helperText={errors.email && "Email requis."}
                                error={Boolean(errors.email)}
                            />
                            <Grid item xs={12}>
                                <FormControl fullWidth>
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
                            </Grid>
                            <Grid item xs={12} sx={{
                                display: "flex",
                                justifyContent: "end"
                            }}>
                                <Button variant="outlined" type='submit' sx={{
                                    py: 1.25,
                                    px: 3,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                }}>Créer</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}
