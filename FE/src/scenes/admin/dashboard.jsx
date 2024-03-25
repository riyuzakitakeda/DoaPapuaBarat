import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import  dashboard_image  from '../../assets/image/dashboard_image.png';

const Dashboard = () => {
    return (
        <Grid container spacing={2}>
            <Grid container sx={{
                width: '100%',
                marginX: 2,
                marginBottom: 2,
                marginTop: 3,
            }} display={'flex'}>
                <Typography variant='h2' fontWeight={700} color={'#1E945A'}>
                    {'Dashboard'}
                </Typography>
            </Grid>
            {/* Left Column */}
            <Grid item xs={6}>
                <Paper style={{
                    backgroundColor: '#4CAF50',
                    padding: '16px',
                    background: 'linear-gradient(90deg, #2B5743 -5.66%, #74B295 104.17%, #74B295 104.18%)'
                }}>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        Total Kabupaten
                    </Typography>
                    <Typography variant="h1" fontSize={50} fontWeight={700} style={{ color: 'white' }}>
                        12
                    </Typography>
                </Paper>
                <Paper style={{
                    backgroundColor: '#FFFFFF',
                    padding: '16px',
                    marginTop: '16px'
                }}>
                    <Typography variant="h6" style={{ color: 'black' }}>
                        Total Desa
                    </Typography>
                    <Typography variant="h4" fontWeight={700} style={{ color: 'black' }}>
                        200
                    </Typography>
                </Paper>
                <Paper style={{ backgroundColor: '#FFFFFF', padding: '16px', marginTop: '16px' }}>
                    <Typography variant="h6" style={{ color: 'black' }}>
                        Total Tempat Ibadah
                    </Typography>
                    <Typography variant="h4" fontWeight={700} style={{ color: 'black' }}>
                        1000
                    </Typography>
                </Paper>
                <Paper style={{ backgroundColor: '#FFFFFF', padding: '16px', marginTop: '16px' }}>
                    <Typography variant="h6" style={{ color: 'black' }}>
                        Total Ketua Terdaftar
                    </Typography>
                    <Typography variant="h4" fontWeight={700} style={{ color: 'black' }}>
                        2500
                    </Typography>
                </Paper>
            </Grid>
            {/* Right Column */}
            <Grid item xs={6}>
                <Paper style={{
                    backgroundColor: '#2196F3', padding: '16px',
                    background: 'linear-gradient(90deg, #487A95 -5.66%, #74A0B2 104.17%, #74A0B2 104.18%)'
                }}>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        Total Distrik
                    </Typography>
                    <Typography variant="h1" fontSize={50} fontWeight={700} style={{ color: 'white' }}>
                        12
                    </Typography>
                </Paper>
                {/* Insert your image here */}
                <img
                    src={dashboard_image}
                    alt="Dashboard Image"
                    style={{ width: '100%', height: 'auto', marginTop: '16px' }}
                />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
