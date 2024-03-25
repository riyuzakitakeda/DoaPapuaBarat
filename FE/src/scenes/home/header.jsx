import React from 'react';
import { AppBar, Container, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import header_image from '../../../src/assets/image/landing_1.png';
import header_bg from '../../../src/assets/image/landing_bg_1.jpg';
import logo from '../../assets/image/logoPemprov.png';
import { Link } from 'react-router-dom';

const HeaderContent = () => {
  return (
    <Grid>
      <Grid container direction={'row'} sx={{
        width: '98.7vw',
        background: `linear-gradient(90deg, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.7)), url(${header_bg}), no-repeat;`
      }}>
        <Grid container item sm={6}
          direction={'column'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Grid marginY={1} item>
            <img
              alt='logo pemprov'
              src={logo}
              width={80}
            />
          </Grid>
          <Grid marginY={1} item>
            <Typography color={'rgba(25, 135, 84, 1)'} fontWeight={700} variant='h2'>
              {'Data Organisasi'}
            </Typography>
          </Grid>
          <Grid marginY={1} item>
            <Typography color={'rgba(59, 128, 69, 1)'} textTransform={'uppercase'} fontWeight={700} variant='h1'>
              {'Keagamaan'}
            </Typography>
          </Grid>
          <Grid marginY={1} item>
            <Typography color={'rgba(71, 84, 103, 1)'} variant='body1'>
              {'Dinaungi oleh Biro Kesejahteraan Rakyat Pemerintah Provinsi Papua Barat.'}
            </Typography>
          </Grid>
          <Grid item marginY={1}>
            <Link to='login'>
              <Button variant='contained' to='login' sx={{
                textTransform: 'capitalize',
                backgroundColor: '#3B8045'
              }}>Masuk E-Data</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          {/* Outdoor Scene */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            {/* Insert your outdoor scene image here */}
            <img src={header_image} alt="Outdoor Scene" style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderContent;
