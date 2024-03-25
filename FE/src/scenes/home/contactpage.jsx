import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { Box } from '@mui/system';
import Logo from '../../assets/image/logo_title.png';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';


const ContactPage = () => {
  return (

    <Grid item container justifyContent={'center'} sx={{
      background: `linear-gradient(90deg, rgba(43, 87, 67, 1) 50%, rgba(116, 178, 149, 1));`,
      paddingY: 4
    }}>
      {/* Map */}
      <Grid item container sm={8} spacing={3} justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12} md={6}>
          {/* Replace the image URL with your actual map */}

          <iframe src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3049649237473!2d134.02863032312644!3d-0.9191254728965307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d53f58576e83a2b%3A0x57a01c2d27cac197!2sBiro%20Kesejahteraan%20Rakyat%20Setda%20Prov%20PB!5e0!3m2!1sid!2sid!4v1710214089140!5m2!1sid!2sid"}
            width={'100%'}
            height={"350"}
            style={{ border: 0, borderRadius: 10 }}
            allowfullscreen={"true"}
            loading={"lazy"}
            referrerpolicy={"no-referrer-when-downgrade"} />

        </Grid>
        {/* Contact Information */}
        <Grid item xs={12} md={6} color={'#FFFFFF'}>

          <Box>
            <img src={Logo} alt='logo' width={400} />
          </Box>
          <Typography variant="body1">
          {'Jl. F67, Katedu, Distrik Manokwari, Kabupaten Manokwari, Papua Barat 98315'}
          </Typography>
          <Typography variant="body1">
            {'Phone: +6281992102029'}
          </Typography>
          <Typography variant="body1">
            {'Email: kesra@papuabarat.go.id'}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='fullWidth' />
      <Grid container marginTop={3} paddingX={2} direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <Grid item>
          <Typography color={'#FFFFFF'} variant='caption'>
            {'© 2024 Biro Kesejahteraan Rakyat Provinsi Papua Barat'}
          </Typography>
        </Grid>
        <Grid item direction={'row'} color={'#FFFFFF'}>
            <InstagramIcon />
            <LinkedInIcon />
            <FacebookIcon />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactPage;
