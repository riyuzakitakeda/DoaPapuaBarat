import React from "react";
import { useState } from "react";
import { Button, Modal, useTheme, Typography, Grid, TextField, Divider, Fade } from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import AddRoundedIcon from '@mui/icons-material/AddRounded';


const TambahDesa = ({execute}) => {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState({})
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
            id: "nama_kabupaten",
            label: "Nama Kabupaten",
            placeholder: "Silahkan Masukkan Nama Kabupaten",
            disabled: true
        },
        {
            id: "nama_distrik",
            label: "Nama Distrik",
            placeholder: "Silahkan Masukkan Nama Distrik",
            disabled: true
        },
        {
            id: "nama_desa",
            label: "Nama Desa",
            placeholder: "Silahkan Masukkan Nama Desa",
            disabled: false
        },
    ]

    const sendData = () => {
        console.log(data)
        fetch(process.env.REACT_APP_API_URL + "api/desa", {
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
                                Tambah Desa
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
                        <Grid container item m={1}>
                            <Grid item xs={12}>
                                {
                                    field.map((item) => (
                                        <TextField
                                            id={item.id}
                                            label={item.label}
                                            placeholder={item.placeholder}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            sx={{
                                                marginTop: "10px",
                                                ":target-text": {
                                                    borderColor: colors.greenAccent[400]
                                                }
                                            }}
                                            onInput={(e) => setData({...data, [item.id]: e.target.value})}
                                        />
                                    ))
                                }
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

export default TambahDesa;