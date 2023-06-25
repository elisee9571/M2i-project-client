import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import {
    AddAPhoto as AddAPhotoIcon
} from '@mui/icons-material';
import useFetchCategories from '../../hooks/category/useFetchCategories';
import axios from 'axios';
import { UserContext } from '../../utils/UserContext';
import { useNavigate } from 'react-router-dom';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


function Previews({ patchProduct, errors, setProduct, product }) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            const updatedFiles = acceptedFiles.map(file => ({
                ...file,
                preview: URL.createObjectURL(file)
            }));

            setFiles(updatedFiles);
            setProduct({ ...product, fileUploads: acceptedFiles });

            patchProduct("fileUploads", {
                value: updatedFiles
            });
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    return (
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
                }}>Images</Typography>
            <Grid container spacing={2} rowSpacing={2}>
                <Grid item xs={12}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px dashed #eaeaea",
                        borderColor: errors.fileUploads ? "#d3302f" : "#eaeaea",
                        height: 175,
                        width: "100%",
                        cursor: "pointer",
                        mb: 2
                    }}>
                        <Box {...getRootProps({ className: 'dropzone' })}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                background: errors.fileUploads ? "#f2aeae75" : "#eaeaea75",
                                height: "90%",
                                width: "98%",
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden",
                            }}>
                            <input {...getInputProps()}
                            />
                            <AddAPhotoIcon sx={{
                                mb: 2,
                                color: errors.fileUploads ? "#d3302f" : "#757575"
                            }} />
                            <Typography variant='body2' sx={{
                                fontSize: 12,
                                color: errors.fileUploads ? "#d3302f" : "#757575"
                            }}>Importer vos images</Typography>
                        </Box>
                    </Box>
                    <FormHelperText
                        sx={{
                            color: "#d3302f"
                        }}>{errors.fileUploads && "Veuillez selectionner des images."}</FormHelperText>
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                </Grid>
            </Grid>
        </Box >
    );
}


export default function ProductAddPage({ user }) {
    const { showNotification } = useContext(UserContext);
    const { data: dataCategory } = useFetchCategories();

    const location = new URL(window.location.href);
    const searchParams = new URLSearchParams(location.search);

    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    // const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);

    const { register: patchProduct, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        const fetchCategories = () => {
            try {
                setCategories(dataCategory);
            } catch (error) {
                console.error(error);
            }
        };
        if (searchParams.get("product")) {
            const fetchProduct = async () => {
                try {
                    const config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `${process.env.REACT_APP_API_URL}/products/${searchParams.get('product')}`
                    };

                    await axios.request(config)
                        .then(res => {
                            // console.log("product", res.data)
                            setProduct(res.data);
                        })

                } catch (err) {
                    console.error(err);
                    navigate("/404");
                }
            }

            fetchProduct();
        }
        fetchCategories();
    }, [dataCategory, searchParams.get('product')])

    const onSubmitPatchProduct = async (data, e) => {
        e.preventDefault();

        let dataForm = new FormData();
        for (let i = 0; i < product.fileUploads.length; i++) {
            const filePath = product.fileUploads[i];
            dataForm.append('fileUploads', filePath);
        }

        dataForm.append('title', product.title);
        dataForm.append('content', product.content);
        dataForm.append('price', product.price);
        dataForm.append('category', product.category);

        if (!searchParams.get("product")) {
            if (user) {
                try {
                    const config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: `${process.env.REACT_APP_API_URL}/products`,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${user.token}`
                        },
                        data: dataForm
                    };

                    const res = await axios.request(config);

                    showNotification(res.data, "success");
                    reset();
                    navigate(`/profile/${user.pseudo}`);
                } catch (err) {
                    console.error(err);
                    showNotification(err.response.data, "error");
                }
            }
        } else {
            try {
                const config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_API_URL}/products/${product.id}`,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${user.token}`
                    },
                    data: dataForm
                };

                const res = await axios.request(config);

                showNotification(res.data, "success");
                reset();
                navigate(`/profile/${user.pseudo}`);
            } catch (err) {
                console.error(err);
                showNotification(err.response.data, "error");
            }
        }
    }


    const onSubmitPatchProductStatusDraft = async (data, e) => {
        e.preventDefault();

        let dataForm = new FormData();
        for (let i = 0; i < product.fileUploads.length; i++) {
            const filePath = product.fileUploads[i];
            dataForm.append('fileUploads', filePath);
        }

        dataForm.append('title', product.title);
        dataForm.append('content', product.content);
        dataForm.append('price', product.price);
        dataForm.append('category', product.category);

        if (user) {
            try {
                const config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_API_URL}/products/draft`,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${user.token}`
                    },
                    data: dataForm
                };

                const res = await axios.request(config);

                showNotification(res.data, "success");
                reset();
                navigate(`/profile/${user.pseudo}`);
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
            <Typography variant='h4'>Ajouter un article</Typography>
            <Box
                component="form"
                action="POST"
                sx={{
                    position: "relative",
                    pt: 5
                }}
            >
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
                        type='submit'
                        onClick={handleSubmit(onSubmitPatchProductStatusDraft)}
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
                        Brouillon
                    </Button>
                    <Button
                        type='submit'
                        onClick={handleSubmit(onSubmitPatchProduct)}
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
                        {searchParams.get("product") ? "Modifier" : "Ajouter"}
                    </Button>
                </Box>
                <Grid container spacing={2} rowSpacing={2} sx={{ mt: 3 }}>
                    <Previews patchProduct={patchProduct} errors={errors} setProduct={setProduct} product={product} />
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
                            }}>Titre</Typography>
                        <Grid container spacing={2} rowSpacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="title"
                                    value={product?.title}
                                    placeholder="Titre de l'article"
                                    fullWidth
                                    {...patchProduct("title", {
                                        required: true,
                                        minLength: {
                                            value: 5,
                                            message: "Titre requis et doit dépasser 5 caractères"
                                        },
                                        onChange: (e) => {
                                            setProduct({ ...product, title: e.target.value });
                                        }
                                    })}
                                    helperText={errors.title && errors.title.message}
                                    error={Boolean(errors.title)}
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
                            }}>Catégorie</Typography>
                        <Grid container spacing={2} rowSpacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={errors.category && "error"}>
                                    <InputLabel id="select-label-category">Catégorie</InputLabel>
                                    <Select
                                        labelId='select-label-category'
                                        id="select-category"
                                        value={product?.category.id}
                                        label="Catégorie"
                                        {...patchProduct("category", {
                                            required: true,
                                            onChange: (e) => {
                                                setProduct({ ...product, category: e.target.value });
                                            }
                                        })}
                                        error={Boolean(errors.category)}
                                    >
                                        {categories.map(category => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.category && "Veuillez selectionner une catégorie."}</FormHelperText>
                                </FormControl>
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
                            }}>Description</Typography>
                        <Grid container spacing={2} rowSpacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="content"
                                    placeholder="Description de l'article"
                                    multiline
                                    rows={4}
                                    value={product?.content}
                                    fullWidth
                                    {...patchProduct("content", {
                                        required: true,
                                        onChange: (e) => {
                                            setProduct({ ...product, content: e.target.value });
                                        }
                                    })}
                                    helperText={errors.content && "Description requise."}
                                    error={Boolean(errors.content)}
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
                            }}>Prix</Typography>
                        <Grid container spacing={2} rowSpacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="price"
                                    type='number'
                                    value={product?.price}
                                    placeholder="Prix de l'article"
                                    fullWidth
                                    {...patchProduct("price", {
                                        required: true,
                                        onChange: (e) => {
                                            setProduct({ ...product, price: e.target.value });
                                        }
                                    })}
                                    helperText={errors.price && "Prix requis."}
                                    error={Boolean(errors.price)}
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
                            type='submit'
                            onClick={handleSubmit(onSubmitPatchProductStatusDraft)}
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
                            Brouillon
                        </Button>
                        <Button
                            type='submit'
                            onClick={handleSubmit(onSubmitPatchProduct)}
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
                            {searchParams.get("product") ? "Modifier" : "Ajouter"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    )
}
