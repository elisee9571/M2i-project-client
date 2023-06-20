import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../utils/UserContext';
import { useContext } from 'react';

export default function ForgotPasswordPage() {
    const { showNotification } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/users/forgotPassword`, {
            email: data.email
        })
            .then(res => {
                localStorage.setItem('dataToken', res.data.dataToken);
                showNotification(res.data.message, 'success');
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
                    <Typography variant="h4" align="center" sx={{ mb: 2 }}>MOT DE PASSE OUBLIÉ</Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                        Veuillez saisir votre adresse e-mail ci-dessous.<br />
                        Nous vous enverrons un email pour réinitialiser votre mot de passe.
                    </Typography>
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
