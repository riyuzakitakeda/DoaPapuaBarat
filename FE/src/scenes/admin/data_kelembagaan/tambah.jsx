import React from "react";
import { useState } from "react";
import { Button, Modal, useTheme, Typography, Grid, TextField, Divider, Fade, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MapDialog from "./map";
import { Box } from "@mui/system";

const center = {
    lat: -5.160543,
    lng: 119.436077,
}

const TambahAnak = ({ execute }) => {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState({})
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [dialogMapOpen, setDialogMapOpen] = useState(false);
    const [position, setPosition] = useState(center)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #000',
        boxShadow: 24,
        bgcolor: colors.primary[400],
        p: 3,
        borderRadius: 2
    };

    const field = [
        {
            id: "nama",
            label: "Nama Tempat Ibadah",
            placeholder: "Silahkan Masukkan Nama Tempat Ibadah",
            type: "text",
            format: null
        },
        {
            id: "nama",
            label: "Tanggal Di Dirikan",
            placeholder: "Silahkan Masukkan Tanggal Pendirian",
            type: "text",
            format: null
        },
        {
            id: "nama",
            label: "Nama Ketua",
            placeholder: "Silahkan Masukkan Nama Ketua",
            type: "text",
            format: null
        },
        {
            id: "jumlah_jiwa",
            label: "Jumlah Jiwa",
            placeholder: "Silahkan Masukkan Jumlah Jiwa",
            type: "text",
            format: null
        },
        {
            id: "nama",
            label: "Jumlah Kepala Keluarga",
            placeholder: "Masukkan Jumlah Kepala Keluarga",
            type: "text",
            format: null
        },
        {
            id: "nama",
            label: "Jumlah Pria",
            placeholder: "Masukkan Jumlah Penduduk Pria",
            type: "text",
            format: null
        },
        {
            id: "nama",
            label: "Jumlah Wanita",
            placeholder: "Masukkan Jumlah Penduduk Wanita",
            type: "text",
            format: null
        },
        {
            id: "nama",
            label: "Jumlah PNS",
            placeholder: "Masukkan Jumlah Penduduk PNS",
            type: "text",
            format: null
        },
        {
            id: "nama",
            label: "Jumlah Petani / Nelayan",
            placeholder: "Masukkan Jumlah Pekerja Petani atau Nelayan",
            type: "text",
            format: null
        },
        {
            id: "nama",
            label: "Jumlah Swasta",
            placeholder: "Masukkan Jumlah Pekerja Swasta",
            type: "text",
            format: null
        },
    ]

    const sendData = () => {
        console.log(data)
        fetch(process.env.REACT_APP_API_URL + "api/anak", {
            method: 'post',
            headers: headerData,
            body: JSON.stringify(data)
        })
            .then(res => {
                execute()
                handleCloseModal()
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    };



    return (
        <div>
            <Dialog onClose={() => setDialogMapOpen(false)} open={dialogMapOpen} fullWidth>
                <DialogTitle>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        textTransform={'capitalize'}
                    >
                        {'Pilih Point Alamat'}
                    </Typography>
                </DialogTitle>
                <Box height={'60vh'} width={'100%'} sx={{ paddingX: 2 }}>
                    <MapDialog pos={position} execute={setPosition} />
                </Box>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                        }}
                        onClick={() => setDialogMapOpen(false)}
                    >
                        {'Tutup'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant='contained' sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                ":hover": {
                    backgroundColor: colors.greenAccent[800]
                }
            }}
                onClick={handleOpenModal}
            >
                <Typography sx={{
                    display: { xs: 'none', sm: 'block' },
                }}>
                    Tambah
                </Typography>
                <AddRoundedIcon sx={{
                    display: { xs: 'block', sm: 'none' },
                }} />
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={openModal}>
                    <Grid container xs={11} md={7} lg={5} sx={style}>
                        <Grid item container justifyContent={"space-between"} alignItems={"end"}>
                            <Typography variant="h4">
                                {'Tambah Data Kelembagaan'}
                            </Typography>
                            <Button
                                variant="text"
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minWidth: 25
                                }}
                                onClick={handleCloseModal}
                            >
                                <Typography variant="button" color={colors.redAccent[400]}>
                                    x
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} paddingTop={2}>
                            <Divider />
                        </Grid>
                        <Grid container height={500} overflow={'scroll'} item m={1}>
                            <Grid item xs={12}>
                                {
                                    field.map((item) => (
                                        <Grid container direction={'row'}>
                                            <Typography>
                                                {item.label}
                                            </Typography>
                                            <TextField
                                                id={item.id}
                                                label={''}
                                                placeholder={item.placeholder}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    marginBottom: "10px",
                                                    ":target-text": {
                                                        borderColor: colors.greenAccent[400]
                                                    }
                                                }}
                                                onInput={(e) => setData({ ...data, [item.id]: e.target.value })}
                                            />
                                        </Grid>
                                    ))
                                }
                                <Button onClick={() => setDialogMapOpen(true)}>Pilih Alamat</Button>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} m={1} justifyContent={"end"}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: colors.greenAccent[500]
                                }}
                                onClick={sendData}
                            >
                                Simpan
                            </Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>

        </div>
    );
}

export default TambahAnak;