import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../utils/UserContext';
import { useContext, useState } from 'react';
import {
    VisibilityOff,
    Visibility
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
    const location = new URL(window.location.href);
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const { showNotification } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data, e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams({
            resetToken: searchParams.get('token'),
            dataToken: localStorage.getItem('dataToken'),
            userId: searchParams.get('userId'),
            newPassword: data.newPassword,
        });
        console.log(queryParams.toString())

        axios.patch(`${process.env.REACT_APP_API_URL}/users/resetPassword?${queryParams.toString()}`)
            .then(res => {
                localStorage.removeItem('dataToken');
                showNotification(res.data, 'success');
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }).catch(err => {
                showNotification(err.response.data, 'error');
            })
    };

    return (
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
                    <Typography variant="h4" align="center" sx={{ mb: 2 }}>RÉINITIALISER VOTRE MOT DE PASSE</Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                        Veuillez saisir votre nouveau mot de passe ci-dessous.<br />
                        Puis rendez-vous sur la page de connexion pour vous connecter apres avoir modifier votre mot de passe.
                    </Typography>
                    <FormControl fullWidth sx={{
                        pb: 2
                    }}>
                        <InputLabel htmlFor="password" error={Boolean(errors.newPassword)}>Nouveau mot de passe*</InputLabel>
                        <OutlinedInput
                            id="newPassword"
                            label="Nouveau mot de passe*"
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
                            {...register("newPassword", {
                                required: true,
                                minLength: {
                                    value: 4,
                                    message: "Mot de passe requis et doit être superieur à 4 caracteres"
                                },
                                onChange: (e) => {
                                    setPasswordValue(e.target.value);
                                }
                            })}
                            error={Boolean(errors.newPassword)}
                        />
                        <FormHelperText error={Boolean(errors.newPassword)}>
                            {errors.newPassword && errors.newPassword.message}
                        </FormHelperText>
                    </FormControl>
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
                    >Envoyer</Button>
                </Box>
            </Box >
        </Box >
    )
}
