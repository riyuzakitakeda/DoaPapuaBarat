import React from 'react';
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


const Login = () => {
    const { login } = useAuth();

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
        <Box>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box>
                            <img src={Logo} alt="karebosi" width={'250px'} />
                        </Box>
                        <Typography>
                            Sign in Dahsboard Absensi
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                size='small'
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                size='small'
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                size='small'
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </Box>
    );
}

export default Login;