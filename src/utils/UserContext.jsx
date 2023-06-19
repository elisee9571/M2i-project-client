import { createContext, useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import SnackbarAlert from '../components/snackbar-alert/SnackbarAlert';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    const showNotification = (message, variant = 'default') => {
        try {
            setNotification({ message, variant });
            // Effacer la notification après 3000 millisecondes (3 secondes)
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        } catch (err) {
            console.error(err)
        }
    };

    // Au chargement initial, récupérer les données de l'utilisateur depuis le stockage local
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('USER');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (err) {
            console.error(err)
        }

    }, []);

    const updateUser = (userData) => {
        try {
            setUser(userData);
            localStorage.setItem('USER', JSON.stringify(userData));
        } catch (err) {
            console.error(err)
        }
    };

    const logoutUser = () => {
        try {
            setUser(null);
            localStorage.removeItem('USER');
            showNotification("Déconnecté", "success");
        } catch (err) {
            console.error(err)
        }
    };



    return (
        <UserContext.Provider value={{ user, updateUser, logoutUser, showNotification }}>
            <>
                {notification && <SnackbarAlert message={notification.message} variant={notification.variant} />}
                {children}
            </>
        </UserContext.Provider>
    );
};
