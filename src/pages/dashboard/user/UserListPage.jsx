import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import {
    Box,
    Table,
    Stack,
    Avatar,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Container,
    Breadcrumbs,
    Link
} from '@mui/material';
import {
    DeleteOutline as DeleteIcon,
    MoreVert as MoreIcon,
    Edit as EditIcon,
    Person as PersonIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';

import useFetchUsers from '../../../hooks/dashboard/user/useFetchUsers';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'firstName',
        disablePadding: true,
        label: 'Nom',
    },
    {
        id: 'email',
        disablePadding: false,
        label: 'Email',
    },
    {
        id: "",
        disablePadding: false,
        label: ""
    }

];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (newOrderBy) => (event) => {
        onRequestSort(event, newOrderBy);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all users',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props) {
    const { numSelected, handleOpenDialog } = props;

    return (
        <Toolbar
            sx={{
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selectionné(s)
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Utilisateurs
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Supprimer">
                    <IconButton onClick={handleOpenDialog}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : ""}
        </Toolbar>
    );
}

export default function UserListPage() {
    const { data } = useFetchUsers();

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
        setOpen(false);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <Container>
            <Stack sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                mb: 5
            }}>
                <Stack sx={{
                    width: "100%"
                }}>
                    <Typography variant="h4" gutterBottom>
                        Liste d'utilisateur
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
                            Dashboard
                        </Link>
                        <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard/user/list">
                            Utilisateur
                        </Link>
                        <Typography color="text.primary">Liste</Typography>
                    </Breadcrumbs>
                </Stack>
                <Stack sx={{
                    mt: { xs: 5, sm: 0 }
                }}>
                    <Button variant="contained" to={"/dashboard/user/new"} component={RouterLink} sx={{
                        py: 1.25,
                        px: 3,
                        borderRadius: 2,
                        fontWeight: 700,
                    }}>
                        <AddIcon sx={{
                            color: '#fff',
                            mr: 1
                        }} />
                        utilisateur
                    </Button>
                </Stack>
            </Stack>

            <Box sx={{ width: "100%" }}>
                <Paper sx={{
                    width: '100%',
                    mb: 2,
                    overflow: "hidden",
                    borderRadius: 4,
                    boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;"
                }}>
                    <EnhancedTableToolbar numSelected={selected.length}
                        handleOpenDialog={handleOpenDialog}
                    />
                    <TableContainer>
                        <Table
                            sx={{
                                minWidth: 750,
                                '& .MuiTableHead-root': {
                                    background: "#f4f6f8",
                                },
                            }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {stableSort(data, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => {
                                        const isItemSelected = isSelected(user.id);
                                        const labelId = `enhanced-table-checkbox-${user.id}`;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={user.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, user.id)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={user.name} src={user.avatar} />
                                                        <Box>
                                                            <Typography variant="subtitle1">
                                                                {user.firstName} {user.lastName}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                                @{user.pseudo}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={handleOpen}>
                                                        <MoreIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>

                    <Menu
                        open={open}
                        anchorEl={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        PaperProps={{
                            sx: {
                                ml: -2,
                                width: 180,
                                borderRadius: 2,
                                '& .MuiMenuItem-root': {
                                    typography: 'body2',
                                    borderRadius: 1,
                                    p: 1,
                                    mx: 1
                                },
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonIcon sx={{
                                    color: "#000000DE"
                                }} />
                            </ListItemIcon>
                            Profil
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <EditIcon sx={{
                                    color: "#000000DE"
                                }} />
                            </ListItemIcon>
                            Modifier
                        </MenuItem>

                        <MenuItem onClick={handleOpenDialog}>
                            <ListItemIcon>
                                <DeleteIcon sx={{
                                    color: '#ff4842'
                                }} />
                            </ListItemIcon>
                            <Typography variant="subtitle1" sx={{
                                color: '#ff4842'
                            }}>
                                Supprimer
                            </Typography>
                        </MenuItem>
                    </Menu>

                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        PaperProps={{
                            sx: {
                                width: 500,
                                borderRadius: 3,
                                p: 2
                            }
                        }}
                    >
                        <DialogTitle id="alert-dialog-title" variant='h5'>
                            Supprimer
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Voulez-vous vraiment supprimer ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} variant='contained' sx={{
                                background: '#ff4842',
                                borderRadius: 2,
                                py: 1.5,
                                px: 3,
                                fontWeight: 700,
                                boxShadow: 0,
                                textTransform: "capitalize",
                                "&:hover": {
                                    background: "#b71d18",
                                    boxShadow: 0,
                                }
                            }}>
                                Supprimer
                            </Button>
                            <Button onClick={handleCloseDialog} variant='outlined' sx={{
                                borderRadius: 2,
                                borderColor: "#212b3650",
                                color: "#000000DE",
                                py: 1.5,
                                px: 3,
                                fontWeight: 700,
                                textTransform: "capitalize",
                                "&:hover": {
                                    borderColor: "#212b36"
                                }
                            }}>
                                Annuler
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Box>
        </Container>
    );

}    