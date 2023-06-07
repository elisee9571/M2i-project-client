import {
  Container,
  Box,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/logo/Logo";
// import Image from "/assets/images/bg-login.png";

const StyledImg = styled("div")(({ theme }) => ({
    top: 0,
    left: 0,
    lineHeight: 0,
    width: "100%",
    position: "absolute",
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const StyledHeader = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const StyledContent = styled("div")(({ theme }) => ({
  margin: "auto",
  minHeight: "100vh",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(0, 0),
}));

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Helmet>
        <title>Accueil</title>
      </Helmet>
      <Container>
        <StyledHeader>
          <Logo />
        </StyledHeader>

        {/* <StyledImg sx={{ backgroundImage:`url("/assets/images/bg-login.png")`}}>
            
        <Typography variant="<p>">Texte a mettre sur l'image</Typography>

        </StyledImg> */}

        <StyledImg>
          <Box
            component="img"
            src="/assets/images/bg-login.png"
            sx={{ height: 360, width: 1000, borderRadius: 2 }}
          />
          <Typography variant="<p>">Texte a mettre sur l'image</Typography>
        </StyledImg>

        <StyledContent>
          <Typography variant="h2">Fil d'actualité</Typography>
        </StyledContent>

      </Container>
    </>
  );
}
