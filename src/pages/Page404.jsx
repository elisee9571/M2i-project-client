import { Container, Typography, Box, Button } from "@mui/material"
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(0, 0),
}));

export default function Page404() {
    return (
        <>
            <Helmet>
                <title> 404 Page Not Found | Minimal UI </title>
            </Helmet>

            <Container>
                <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" paragraph>
                        Sorry, page not found!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', }}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
                        spelling.
                    </Typography>

                    <Box
                        component="img"
                        src="/assets/illustrations/illustration_404.svg"
                        sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                    />

                    <Button to="/" size="large" variant="contained" component={RouterLink}>
                        Go to Home
                    </Button>
                </StyledContent>
            </Container>
        </>
    )
}
