import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { frFR } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// routes
import Router from './routes';
import { UserProvider } from './utils/UserContext';

export default function App() {
  const lang = createTheme(frFR);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={lang}>
          <UserProvider>
            <Router />
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}