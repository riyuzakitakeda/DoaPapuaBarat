import React from 'react';
import { AppBar, Container, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import logo from '../../../src/assets/image/logo_refleksi.png';
import header_image from '../../../src/assets/image/landing_1.png';
import header_bg from '../../../src/assets/image/landing_bg_1.jpg';
import Navigation from './navigation';

const Home = () => {
    return (
        <div>
            <Navigation />
        </div>
    );
};

export default Home;
