import { Avatar, Box, Card, CardActionArea, CardContent, Skeleton, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { stringAvatar } from '../../utils/stringAvatar';

export default function CardUser({ user }) {
    return (
        <>
            {user ? (
                <Card sx={{
                    width: 250,
                    height: 100,
                    borderRadius: "15px",
                    boxShadow: 0,
                    border: "1px solid #CCC",
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <CardActionArea sx={{
                        height: "100%"
                    }}
                        to={`/profile/${user.pseudo}`} component={RouterLink}>
                        <CardContent sx={{
                            position: 'relative'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "start",
                            }}>
                                <Avatar {...stringAvatar(user.pseudo)} />
                                <Typography variant='h6' sx={{
                                    ml: 2
                                }}>
                                    {user.pseudo}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card >
            ) : (
                <Stack spacing={1} sx={{
                    width: 250,
                    height: 100,
                    mt: 2
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={"70%"} height={"100%"} />
                    </Box>
                </Stack>
            )}
        </>
    )
}
