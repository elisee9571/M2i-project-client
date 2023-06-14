import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Au chargement initial, récupérer les données de l'utilisateur depuis le stockage local
    useEffect(() => {
        const storedUser = localStorage.getItem('USER');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('USER', JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('USER');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
