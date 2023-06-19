import { Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';

import Header from './header/Header';
import Nav from './nav/Nav';
import { UserContext } from '../../utils/UserContext';


const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
    },
}));

export default function DashboardLayout() {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    return (
        <>
            <StyledRoot>
                <Header user={user} onOpenNav={() => setOpen(true)} />

                <Nav user={user} openNav={open} onCloseNav={() => setOpen(false)} />

                <Main>
                    <Outlet />
                </Main>
            </StyledRoot>
        </>
    )
}
