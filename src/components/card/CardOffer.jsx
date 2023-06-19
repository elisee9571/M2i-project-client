import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import { fCurrency } from '../../utils/formatNumber'
import { fToNow } from '../../utils/formatTime';


export default function CardOffer({ offer, user }) {
    const getStatusLabel = (status) => {
        switch (status) {
            case "REJECTED":
                return {
                    label: "REJETÉE",
                    bgcolor: "#ffa199",
                    color: "#aa2e25"
                };
            case "ACCEPTED":
                return {
                    label: "ACCEPTÉE",
                    bgcolor: "#d6ffa6",
                    color: "#618833"
                };
            case "PENDING":
                return {
                    label: "EN ATTENTE",
                    bgcolor: "#ffffa3",
                    color: "#b28704"
                };
            default:
                return null;
        }
    };
    return (
        <>
            {offer ? (
                <Card sx={{
                    p: 1,
                    my: 1,
                    borderRadius: "15px",
                    boxShadow: 0,
                    border: "1px solid #DDD",
                }}>
                    <CardContent sx={{
                        position: 'relative'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "start",

                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "start",
                                mb: 2

                            }}>
                                <Typography variant='h6' sx={{
                                    mr: 2
                                }}>
                                    {fCurrency(offer.amount)}
                                </Typography>
                                <Typography variant='h6'>
                                    <strike>
                                        {fCurrency(offer.product.price)}
                                    </strike>
                                </Typography>
                            </Box>
                            <Typography variant='subtitle2'>
                                {fToNow(offer.createdAt)}
                            </Typography>
                            {user.email === offer.product.user.email &&
                                <Typography variant='body1'>
                                    Bonjour ! Moi c'est <strong>{offer.user.pseudo}</strong>
                                </Typography>
                            }
                        </Box>
                        <Chip
                            label={getStatusLabel(offer.status)?.label}
                            sx={{
                                bgcolor: getStatusLabel(offer.status)?.bgcolor,
                                color: getStatusLabel(offer.status)?.color,
                                fontWeight: "bold",
                                position: 'absolute',
                                top: "10px",
                                right: "7.5px"
                            }}
                        />
                    </CardContent>
                    <CardActions>
                        {user.email === offer.product.user.email &&
                            <>
                                {offer.status === "PENDING" &&
                                    <>

                                        <Button variant="outlined"
                                            sx={{
                                                color: "black",
                                                borderColor: "black",
                                                '&:hover': {
                                                    background: "#00000010",
                                                    borderColor: "black",
                                                },
                                            }}>
                                            ACCEPTER
                                        </Button>
                                        <Button variant="solid"
                                            sx={{
                                                color: "white",
                                                background: "black",
                                                '&:hover': {
                                                    background: "#00000099",
                                                },
                                            }}>
                                            REFUSER
                                        </Button>
                                    </>
                                }
                            </>
                        }
                        {user.email === offer.user.email &&
                            <>
                                {offer.status === "REJECTED" || offer.status === "PENDING" && null}
                                {offer.status === "ACCEPTED" &&
                                    <Button variant="solid"
                                        sx={{
                                            color: "white",
                                            background: "black",
                                            '&:hover': {
                                                background: "#00000099",
                                            },
                                        }}>
                                        ACHETER
                                    </Button>
                                }
                            </>
                        }
                    </CardActions>
                </Card >
            ) : (
                null
            )
            }
        </>
    )
}
