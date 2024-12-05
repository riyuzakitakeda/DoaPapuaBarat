import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from '../../assets/image/logo_refleksi.png';

const SplashScreen = () => {
    return (
        <Box sx={{
            background: '#D1E5F4',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Grid container justifyContent="center" sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Grid xs={12} md={9} item>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingX: 3,
                            marginY: 2
                        }}>
                            <img src={Logo} alt="edata" width={'350px'} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                paddingX: 3,
                                marginY: 4
                            }}
                        >
                            <CircularProgress sx={{
                                color: "#2B5743",
                            }}
                                size={50}
                                thickness={7}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyItems: 'center',
                            justifyContent: 'center',
                            paddingX: 3,
                            marginY: 1
                        }}>
                            {/* <img src={LogoKes} alt="karebosi" width={'60px'} /> */}
                            {/* <img src={LogoKot} alt="karebosi" width={'60px'} /> */}
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingX: 3,
                            marginY: 1,
                            color: '#2B5743',
                        }}>
                            <Typography fontWeight={700}>
                                SISTEM PENDATAAN DATA ORGANISASI KEAGAMAAN (SIPENDOA)
                            </Typography>
                            <Typography fontWeight={700}>
                                PADA BIRO KESEJAHTERAAN RAKYAT SETDA PAPUA BARAT
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SplashScreen;