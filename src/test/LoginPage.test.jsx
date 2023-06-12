import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import LoginPage from '../pages/auth/LoginPage';

describe('LoginPage', () => {
    test('soumission du formulaire de connexion', async () => {
        render(<LoginPage />);

        // Saisir les informations de connexion dans les champs
        fireEvent.change(screen.getByLabelText('Email*'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Mot de passe*'), { target: { value: 'password123' } });

        // Cliquez sur le bouton de connexion
        fireEvent.click(screen.getByText('Se connecter'));


    });
});
