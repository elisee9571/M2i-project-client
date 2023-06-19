import { Box, Container, Divider, Pagination, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CardUser from '../../components/card/CardUser';

export default function UsersPage({ user }) {
    const location = new URL(window.location.href);
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams({
                keyword: searchParams.get('keyword'),
                page: page,
                size: searchParams.get('size'),
            });

            const url = `${process.env.REACT_APP_API_URL}/users/search?${queryParams.toString()}`;

            try {
                const res = await axios.get(url);
                // console.log("users", res.data.users);
                setUsers(res.data.users);
                setTotalPages(res.data.totalPages);
                setTotalUsers(res.data.totalUsers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [location.search, page]);

    const handleChangePage = (event, value) => {
        setPage(value);
        const queryParams = new URLSearchParams({
            keyword: searchParams.get('keyword'),
            page: value,
            size: searchParams.get('size'),
        });
        const newUrl = `/users/search?${queryParams.toString()}`;
        navigate(newUrl);
    };

    return (
        <Container sx={{
            py: 5,
            minHeight: "100vh"
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box sx={{
                    py: 2
                }}>
                    <Typography variant='body1'>Résultats de la recherche par utilisateur pour</Typography>
                    <Typography variant='h5'>{searchParams.get("keyword") ? searchParams.get("keyword") : ""}({totalUsers})</Typography>
                </Box>

            </Box>
            {users.length > 0 ?
                <>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        py: 5
                    }}>
                        {users.map((u) => (
                            <CardUser
                                key={u.id}
                                user={u}
                            />
                        ))}
                    </Box>
                    {totalPages > 1 &&
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Pagination count={totalPages} page={page} onChange={handleChangePage} />
                        </Box>
                    }
                </>
                :
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 5
                }}>
                    <Typography variant='h3'>Désolé, aucun résultat</Typography>
                    <Typography variant='body1'>Aucun utilisateurs ne correspond à ta recherche. Pourquoi ne pas essayer un autre mot-clé ?</Typography>
                </Box>
            }
        </Container>
    )
}
