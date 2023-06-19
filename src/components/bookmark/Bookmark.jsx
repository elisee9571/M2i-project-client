import { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon } from '@mui/icons-material';
import axios from 'axios';
import { UserContext } from '../../utils/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Bookmark({ product }) {
    const { user, showNotification } = useContext(UserContext);
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(product.favoritesCount);

    useEffect(() => {
        const checkBookmarkStatus = async () => {
            if (user) {
                try {
                    const config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `${process.env.REACT_APP_API_URL}/favorites/check`,
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    };

                    const res = await axios.request(config);
                    const favorites = res.data;

                    // Vérifier si le produit est présent dans les favoris
                    const isProductBookmarked = favorites.some((favorite) => favorite.product.id === product.id);

                    setIsBookmarked(isProductBookmarked);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        checkBookmarkStatus();
    }, [user, product]);

    const handleBookmark = async () => {
        if (!user) {
            // Rediriger vers la page de connexion
            navigate('/login');
            return;
        }
        // Effectuez une requête API pour ajouter ou supprimer le produit de la liste de favoris
        try {
            if (isBookmarked) {
                let config = {
                    method: 'delete',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_API_URL}/favorites/${product.id}`,
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                };
                await axios.request(config)
                    .then(res => {
                        setIsBookmarked(false);
                        setLikeCount(prevCount => prevCount - 1);
                    })
                    .catch(err => {
                        console.error(err);
                        showNotification(err.response.data, "error");
                    });
            } else {
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_API_URL}/favorites/${product.id}`,
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                };
                // Ajoutez le produit à la liste de favoris
                await axios.request(config)
                    .then(res => {
                        setIsBookmarked(true);
                        setLikeCount(prevCount => prevCount + 1);
                        showNotification(res.data, "success");
                    })
                    .catch(err => {
                        console.error(err)
                        showNotification(err.response.data, "error");
                    });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{
            position: 'absolute',
            top: "10px",
            right: "7.5px",
            zIndex: 100,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
        }}>
            <Typography variant='body1'>{likeCount}</Typography>

            <IconButton onClick={handleBookmark}>
                {isBookmarked ? (
                    <BookmarkIcon sx={{ color: "black" }} />
                ) : (
                    <BookmarkBorderIcon sx={{ color: "black" }} />
                )}
            </IconButton>
        </Box>
    )
}
