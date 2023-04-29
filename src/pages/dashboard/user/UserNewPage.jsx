import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import { Link as RouterLink } from 'react-router-dom';
import {
    Container, Stack, Typography, Breadcrumbs, Link, Box, Paper, Grid, FormControl,
    InputLabel,
    TextField,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    FormHelperText
} from "@mui/material"
import {
    AddAPhoto as AddAPhotoIcon,
    VisibilityOff,
    Visibility
} from '@mui/icons-material';
import axios from 'axios';

function Previews(props) {
    const { register } = props
    const [file, setFile] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: {
            'image/*': [],
        },
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            register("url", { value: file })
            setFile({ preview: URL.createObjectURL(file) })
        },
    });

    const preview = (
        <Box key={file.name}>
            <div >
                <img style={{
                    display: 'block',
                    height: 175,
                    width: 175,
                    objectFit: "cover",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
                    alt={file.name}
                    src={file.preview}
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </Box>
    )

    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px dashed #eaeaea",
                height: 175,
                width: 175,
                cursor: "pointer",
                borderRadius: "50%",
                p: 0.75,
            }}>
                <Box {...getRootProps({ className: 'dropzone' })} sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#eaeaea75",
                    height: 150,
                    width: 150,
                    cursor: "pointer",
                    borderRadius: "50%",
                    p: 1,
                    position: "relative",
                    overflow: "hidden",
                }}>

                    <input {...getInputProps()} />
                    <AddAPhotoIcon sx={{
                        mb: 2,
                        color: (theme) => theme.palette.text.secondary
                    }} />
                    <Typography variant='body2' sx={{
                        fontSize: 12,
                        color: (theme) => theme.palette.text.secondary
                    }}>Importer une image</Typography>
                    {preview}
                </Box>
            </Box>
            <Typography mt={2} width={300} textAlign={"center"} color={"text.secondary"} sx={{
                fontSize: 12
            }}>
                Cliquez pour importer ou faites glisser et déposez JPEG, JPG, PNG, SVG ou GIF.
            </Typography>
        </Container>
    );
}

export default function UserNewPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data, e) => {
        e.preventDefault();

        axios.post(`http://localhost:8081/users`, {
            avatar: data.url.name,
            firstName: data.firstname,
            lastName: data.lastname,
            pseudo: data.pseudo,
            email: data.email,
            phone: data.phone,
            password: data.password
        }).then(res => {
            console.log(res)
            navigate("/dashboard/user/list")

        }).catch(err => console.error(err))
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Container>
            <Stack sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                mb: 5
            }}>
                <Stack sx={{
                    width: "100%"
                }}>
                    <Typography variant="h4" gutterBottom>
                        Crée un utilisateur
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" component={RouterLink} to="/">
                            Dashboard
                        </Link>
                        <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard/user/list">
                            Utilisateur
                        </Link>
                        <Typography color="text.primary">Créer</Typography>
                    </Breadcrumbs>
                </Stack>
            </Stack>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 3 }} component={"form"} action='post' onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12} md={5}>
                    <Paper sx={{
                        p: 5,
                        borderRadius: 4,
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;"
                    }}>
                        <Previews register={register} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Paper sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        p: 5,
                        borderRadius: 4,
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;"
                    }}>
                        <Grid container spacing={2} rowSpacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="lastname"
                                    label="Nom*"
                                    fullWidth
                                    {...register("lastname", { required: true })}
                                    helperText={errors.lastname && "Nom requis."}
                                    error={Boolean(errors.lastname)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="firstname"
                                    label="Prénom*"
                                    fullWidth
                                    {...register("firstname", { required: true })}
                                    helperText={errors.firstname && "Prénom requis."}
                                    error={Boolean(errors.firstname)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="pseudo"
                                    label="Pseudo*"
                                    fullWidth
                                    {...register("pseudo", { required: true })}
                                    helperText={errors.pseudo && "Pseudo requis."}
                                    error={Boolean(errors.pseudo)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email*"
                                    type='email'
                                    fullWidth
                                    {...register("email", { required: true })}
                                    helperText={errors.email && "Email requis."}
                                    error={Boolean(errors.email)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="phone"
                                    label="Téléphone*"
                                    type='tel'
                                    fullWidth
                                    {...register("phone")}
                                    helperText={errors.phone && "Téléphone requis."}
                                    error={Boolean(errors.phone)}
                                />
                            </Grid>
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
            </Grid>
        </Container >
    )
}
