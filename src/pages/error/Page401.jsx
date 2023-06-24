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

export default function Page401() {
    return (
        <>
            <Helmet>
                <title>401</title>
            </Helmet>

            <Container>
                <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" paragraph>
                        Désolé, non autorisé !
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', }}>
                        Vous n'êtes pas autorisé à accéder à cette page. Veuillez vous connecter avec un compte ayant les autorisations appropriées.
                    </Typography>

                    <Box sx={{ mx: 'auto', my: { xs: 5, sm: 10 } }}>
                        <Typography variant="h1" paragraph>
                            401
                        </Typography>
                    </Box>

                    <Button to="/" size="large" variant="contained" component={RouterLink}>
                        Aller à la page d'accueil
                    </Button>
                </StyledContent>
            </Container>
        </>
    )
}
