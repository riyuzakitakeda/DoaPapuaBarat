import React from 'react';
import { useState, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet, useLocation, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Avatar, Menu, MenuItem, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { tokens, ColorModeContext } from '../../theme';
import Logo from '../../assets/image/logo_refleksi.png';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { useAuth } from '../../auth/auth_provider';


const drawerWidth = 250;
const iconMenuSize = 20;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const DrawerMini = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Item = ({ title, to, icon, selected, setSelected, isOpen }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <ListItem key={title.replace(/\W+/g, '_').toLowerCase()} disablePadding sx={{
            display: 'block',
        }}>
            <ListItemButton
                sx={{
                    minHeight: 35,
                    justifyContent: isOpen ? 'flex-start' : 'center',
                    alignContent: isOpen ? 'center' : 'center',
                    px: 2.5,
                    border: 1,
                    color: '#3B8045',
                    // backgroundColor: (selected === to) ? colors.blueAccent[400] : colors.primary[400],
                    borderRadius: 3,
                    marginX: isOpen ? 2 : 0.5,
                    marginY: 1,
                    ":hover": {
                        backgroundColor: colors.blueAccent[400]
                    },
                    background:
                        (selected === to)
                            ? 'linear-gradient(90deg, #2B5743 -5.66%, #74B295 104.17%, #74B295 104.18%)'
                            : '#FFFFFF'
                }}
                component={Link}
                to={to}
                onClick={() => setSelected(title)}
            >
                <Grid container>
                    <Grid item xs={4}>
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                display: 'flex',
                                color: (selected === to) ? colors.primary[400] : colors.grey[900],
                            }}
                        >
                            <Box >
                                {icon}
                            </Box>
                        </ListItemIcon>
                    </Grid>
                    <Grid item xs={8}>
                        <ListItemText primary={title}
                            sx={{
                                opacity: isOpen ? 1 : 0,
                                color: (selected !== to) ? '#3B8045' : '#FFFFFF',
                                textAlign: 'left',
                                display: isOpen ? 'visible' : 'none',
                            }}
                            primaryTypographyProps={{ fontSize: '12px' }}
                        />
                    </Grid>
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};

const SideMenu = (props) => {
    let location = useLocation();
    const { user, logout } = useAuth();
    const [userType, setUserType] = useState(null);
    // Give us meaningful document titles for popping back/forward more than 1 entry
    const [selected, setSelected] = useState("Dashboard");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        document.title = location.pathname.slice(7);
        setSelected(location.pathname.slice(7));
        if (userType == null) {
            setUserType(user.user.type);
        }
    }, [location, setSelected]);

    const { window } = props;

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const contain = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <Box
            sx={{
                // borderRight: '1px solid var(--black-10, rgba(0, 0, 0, 0.10))',
                backgroundColor: '#A4CFC1',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <DrawerHeader>
                <Grid sx={{ flexGrow: 1, margin: 2 }} component={"div"} container justifyContent='center'>
                    {open ? <img src={Logo} alt="refleksi" width={'180px'} /> : <></>}
                </Grid>
            </DrawerHeader>
            <Divider />
            <List>
                <Item
                    title="Dashboard"
                    to="dashboard"
                    icon={<GridViewRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                    selected={selected}
                    setSelected={setSelected}
                    isOpen={open}
                />
                {
                    user.user.type === 'admin'
                        ?
                        <Item
                            title="Data Kabupaten"
                            to="datakabupaten"
                            icon={<GridViewRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                            selected={selected}
                            setSelected={setSelected}
                            isOpen={open}
                        />
                        : <></>
                }
                {
                    user.user.type === 'admin_kabupaten'
                        ? <Item
                            title="Data Distrik"
                            to="datadistrik"
                            icon={<GridViewRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                            selected={selected}
                            setSelected={setSelected}
                            isOpen={open}
                        />
                        : <></>
                }
                {
                    user.user.type === 'admin_distrik'
                        ?
                        <Item
                            title="Data Kampung"
                            to="datadesa"
                            icon={<GridViewRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                            selected={selected}
                            setSelected={setSelected}
                            isOpen={open}
                        />
                        : <></>
                }
                {
                    user.user.type === 'admin'
                        ? <Item
                            title="Admin Kabupaten"
                            to="adminkabupaten"
                            icon={<GridViewRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                            selected={selected}
                            setSelected={setSelected}
                            isOpen={open}
                        />
                        : <></>
                }
                {
                    user.user.type === 'admin_kabupaten'
                        ? <Item
                            title="Admin Distrik"
                            to="admindistrik"
                            icon={<GridViewRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                            selected={selected}
                            setSelected={setSelected}
                            isOpen={open}
                        />
                        : <></>
                }
                {/* {
                    user.user.type === 'admin_distrik'
                        ? <Item
                            title="Admin Desa"
                            to="admindesa"
                            icon={<GridViewRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                            selected={selected}
                            setSelected={setSelected}
                            isOpen={open}
                        />
                        : <></>
                } */}
                {
                user.user.type === 'admin_distrik' || user.user.type === 'admin'
                ? <><Item
                    title="Data Kelembagaan"
                    to="kelembagaan"
                    icon={<PeopleAltRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                    selected={selected}
                    setSelected={setSelected}
                    isOpen={open}
                />
                <Item
                    title="Jumlah Dedominasi"
                    to="dedominasi"
                    icon={<PeopleAltRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                    selected={selected}
                    setSelected={setSelected}
                    isOpen={open}
                />
                <Item
                    title="Table Rekapan Data"
                    to="rekapandata"
                    icon={<PeopleAltRoundedIcon sx={{ fontSize: iconMenuSize }} />}
                    selected={selected}
                    setSelected={setSelected}
                    isOpen={open}
                />
                </>
                : <></>}
            </List>
            <Divider />
        </Box>
    );

    const matches = useMediaQuery(theme.breakpoints.up('sm'));


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar elevation={1} position="fixed" open={open} >
                <Toolbar style={{
                    borderBottom: '1px solid #F1D088',
                    background: `#A4CFC1`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                }}>
                    <Grid container justifyContent={"space-between"} alignItems={'center'} width={"100%"}>
                        <Grid item container alignItems={'center'}>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        marginRight: 5,
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerClose}
                                    edge="start"
                                    sx={{
                                        marginRight: 3,
                                        ...(!open && { display: 'none' }),
                                    }}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography>
                                {user.user.type}
                            </Typography>
                        </Grid>
                        <Grid item container alignItems={'center'}>
                            <Grid item container py={2}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClickMenu}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={openMenu ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openMenu ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 30, height: 30 }}>
                                            <img src={Logo} alt="avatar" width={'100%'} />
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={openMenu}
                                    onClose={handleCloseMenu}
                                    onClick={handleCloseMenu}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={colorMode.toggleColorMode}>
                                        <ListItemIcon>
                                            {theme.palette.mode === "dark" ? (
                                                <DarkModeOutlinedIcon />
                                            ) : (
                                                <LightModeOutlinedIcon />
                                            )}
                                        </ListItemIcon>
                                        Ganti Warna
                                    </MenuItem>
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                            {/* <IconButton sx={{
                                                backgroundColor: colors.redAccent[500],
                                                ":hover": {
                                                    backgroundColor: colors.redAccent[700]
                                                }
                                            }} onClick={logout}> */}
                                            <LogoutRoundedIcon sx={{
                                                color: colors.grey[100]
                                            }} />
                                            {/* </IconButton> */}
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                container={contain}
                variant="temporary"
                open={!matches ? open : false}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                    overflow: "auto",

                }}
            >
                {/* <Box sx={{
                    height: '100vh'
                }}> */}
                {drawer}
                {/* </Box> */}
            </Drawer>
            <DrawerMini
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                }}
                open={open}>
                {drawer}
            </DrawerMini>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%", maxHeight: '100vh', overflow: 'auto' }} >
                <DrawerHeader />
                <Grid>
                    <Outlet />
                </Grid>
            </Box>
        </Box>
    );
}

export default SideMenu;