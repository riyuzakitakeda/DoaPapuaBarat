import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../auth/auth_provider';
import { headerData } from '../data/headerCostum';
import Logo from '../assets/image/logo_refleksi.png';
import Background from '../assets/image/landing_bg_1.jpg';
import { tokens } from '../theme';
import { Card, Divider, Grid, InputAdornment } from '@mui/material';
import { AccountCircle, LockOutlined } from '@mui/icons-material';
import ShowAlert from '../scenes/global/alert';
import { useTheme } from '@mui/system';

function Copyright(props) {
    return (
        <Typography variant="body2" color="darkslategray" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://diskominfo.makassarkota.go.id/">
                Diskominfo Kota Makassar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();
const styles = {
    paperContainer: {

    }
};

const Login = () => {
    const { login } = useAuth();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [alertOption, setAlertOption] = useState({
        title: '',
        desc: '',
        type: 'info'
    });
    const [openAlert, setOpenAlert] = useState(false);
    const hadleAlert = () => {
        setOpenAlert(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetch(process.env.REACT_APP_API_URL + "api/user/login", {
            method: 'post',
            headers: headerData,
            body: JSON.stringify({
                username: data.get('username'),
                password: data.get('password')
            })
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.token) {
                    login(res);
                }
            })
            .catch(err => {
                console.log(err)
            })
    };
    return (
        <Box sx={{
            background: `linear-gradient(270deg, #CFD8DC 12.81%, rgba(207, 216, 220, 0.40) 56.41%, rgba(207, 216, 220, 0.00) 100%), url(${Background}), lightgray -34.266px -1.915px / 111.008% 110.843% no-repeat;`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <ThemeProvider theme={defaultTheme}>
                <Container sx={styles.paperContainer} component="main" maxWidth="xs">
                    <CssBaseline />
                    <ShowAlert
                        title={alertOption.title}
                        desc={alertOption.desc}
                        type={alertOption.type}
                        openAlert={openAlert}
                        onAlertClose={hadleAlert}
                    />
                    <Grid container xs={12} justifyContent="center" sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Grid xs={12} md={9} item>
                            <Card sx={{
                                paddingX: 2
                            }}>
                                <Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        paddingX: 3,
                                        marginY: 2
                                    }}>
                                        <img src={Logo} alt="karebosi" width={'250px'} />
                                    </Box>
                                    <Divider sx={{ borderBottomWidth: 3 }} />
                                    <Typography
                                        marginTop={4}
                                        marginBottom={2}
                                        fontSize={15}
                                        fontWeight={600}
                                        align='center'
                                        color={colors.blueAccent}
                                    >
                                        Masuk dengan Username dan Password
                                    </Typography>
                                    <Box component="form" onSubmit={handleSubmit} noValidate>
                                        <TextField
                                            margin="dense"
                                            required
                                            fullWidth
                                            id="username"
                                            label=""
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
                                            size='small'
                                            placeholder='Username'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            margin="dense"
                                            required
                                            fullWidth
                                            name="password"
                                            label=""
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            size='small'
                                            placeholder='Password'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockOutlined />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                mt: 1,
                                                mb: 2,
                                                bgcolor: colors.blueAccent[500],
                                                textTransform: 'none'
                                            }}
                                            size='medium'
                                        >
                                            Login
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                </Container>
            </ThemeProvider>
        </Box>
    );
}

export default Login;