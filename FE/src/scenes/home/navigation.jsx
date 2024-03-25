import React, { useCallback, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Logo from '../../../src/assets/image/logo_refleksi.png';
import HeaderContent from './header';
import { Link } from 'react-router-dom';
import TentangKami from './tentangKami';
import Pimpinan from './pimpinan';
import LembagaKeagamaan from './lembagaKeagamaan';
import PengurusKeagamaan from './pengurusKeagamaan';
import ContactPage from './contactpage';

const drawerWidth = 240;



function Navigation(props) {


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const myRef = useRef([]);


  // const handleClickHeader = () => {
  //   myRef[0].scrollIntoView({ behavior: 'smooth' });
  // }

  const handleClickTentangKami = () => {
    myRef[1].scrollIntoView({ behavior: 'smooth' });
  }

  const handleClickJajaran = () => {
    myRef[2].scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickLembaga = () => {
    myRef[3].scrollIntoView({ behavior: 'smooth' });
  }

  const handleClickPengurus = () => {
    myRef[4].scrollIntoView({ behavior: 'smooth' });
  }

  const handleClickKontak = () => {
    myRef[5].scrollIntoView({ behavior: 'smooth' });
  }

  const navItems = [
    {
      name: 'Tentang Kami',
      action: handleClickTentangKami
    },
    {
      name: 'Pimpinan',
      action: handleClickJajaran
    },
    {
      name: 'Lembaga Keagamaan',
      action: handleClickLembaga
    },
    {
      name: 'Pengurus Keagamaan',
      action: handleClickPengurus
    },
    {
      name: 'Kontak',
      action: handleClickKontak
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Box
          component={'img'}
          alt='Karebosi Apps'
          src={Logo}
          sx={{
            width: '100%',
            padding: 1
          }}
        />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => {
          return (<ListItem key={item.name} disablePadding>
            <ListItemButton onClick={item.action} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>)
        })
        }
        <Link to='login'>
          <Button variant='contained' to='login' sx={{
            textTransform: 'capitalize',
            backgroundColor: '#3B8045'
          }}>Masuk E-Data</Button>
        </Link>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{
        background: 'rgba(255, 255, 255, 0.7)',
        paddingX: '5vw'
      }} component="nav">
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box component={'div'}
            sx={{
              flexGrow: 1,
            }}
          >
            <Box
              component={'img'}
              alt='Karebosi Apps'
              src={Logo}
              sx={{
                height: 50,
                display: { xs: 'none', sm: 'block' }
              }}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => {
              return (
                <Button onClick={item.action} key={item.name} sx={{ color: '#3B8045', textTransform: 'capitalize' }}>
                  {item.name}
                </Button>
              )
            })}
            <Link to='login'>
              <Button variant='contained' to='login' sx={{
                textTransform: 'capitalize',
                backgroundColor: '#3B8045'
              }}>Masuk E-Data</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
        <Grid sx={12}>
          <div ref={(ref) => { myRef[0] = ref }}>
            <HeaderContent />
          </div>
          <div ref={(ref) => { myRef[1] = ref }}>
            <TentangKami />
          </div>
          <div ref={(ref) => { myRef[2] = ref }}>
            <Pimpinan />
          </div>
          <div ref={(ref) => { myRef[3] = ref }}>
            <LembagaKeagamaan />
          </div>
          <div ref={(ref) => { myRef[4] = ref }}>
            <PengurusKeagamaan />
          </div>
          <div ref={(ref) => { myRef[5] = ref }}>
            <ContactPage />
          </div>
        </Grid>
      </Box>
    </Box>
  );
}

export default Navigation;