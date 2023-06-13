import React from 'react'
// import AspectRatio from '@mui/material/AspectRatio';
import Button from '@mui/material/Button';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import { Box } from '@mui/material';
import { BookmarkAdd as BookmarkAddIcon } from '@mui/icons-material';


export default function cardProduct(props) {
    const { product } = props
    return (
        <Card sx={{
            width: 320,
            height: 400,
            borderRadius: "15px",
            border: "1px solid #CCC",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 0
        }}>
            <CardContent sx={{
                height: "40%",
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="body1">
                        {product.user.pseudo}
                    </Typography>
                    <IconButton>
                        <BookmarkAddIcon />
                    </IconButton>
                </Box>
                <div>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant="body2">
                            {product.title}
                        </Typography>
                        <Typography variant="body2">
                            {fCurrency(product.price)}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant="body2">
                            {product.category.title}
                        </Typography>
                        <Typography variant="body2">
                            {fDate(product.createdAt)}
                        </Typography>
                    </Box>
                </div>
            </CardContent>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                m: 1,
                borderRadius: "15px",
                overflow: 'hidden',
            }}>
                <CardMedia
                    component="img"
                    alt={product.title}
                    image="/assets/images/bg-register.jpg"
                    sx={{
                        pr: .5,
                        width: "50%"
                    }}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center"

                }}>
                    <CardMedia
                        component="img"
                        alt={product.title}
                        image="/assets/images/bg-register.jpg"
                        sx={{
                            pb: .5,
                            width: "100%"
                        }}
                    />
                    <CardMedia
                        component="img"
                        alt={product.title}
                        image="/assets/images/bg-register.jpg"
                        sx={{
                            width: "100%"
                        }}
                    />
                </Box>
            </Box>
        </Card>
    )
}
