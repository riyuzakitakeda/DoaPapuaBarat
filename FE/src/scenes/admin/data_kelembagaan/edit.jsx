import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Button, Modal, useTheme, Typography, Grid, TextField, Divider, Fade } from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { Box } from "@mui/system";

const EditdataPendaftar = ({ id, execute }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataPendaftar, setdataPendaftar] = useState([]);
    const [data, setData] = useState({});

    const getDataPendaftar = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/pendaftar/" + id, {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data)
                setdataPendaftar(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    const sendEditData = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/pendaftar/" + id, {
            method: 'put',
            headers: headerData,
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                execute()
                getDataPendaftar()
                handleCloseModal()
            })
            .catch(err => {
                console.log(err)
            })
    }, [data, id, execute, getDataPendaftar])

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
            label: "Nama",
            placeholder: "Silahkan Masukkan Nama Anda",
            type: "text"
        },
        {
            id: "opd",
            label: "Instansi",
            placeholder: "Silahkan Masukkan Instansi Anda",
            type: "text"
        },
        {
            id: "jabatan",
            label: "Jabatan",
            placeholder: "Silahkan Masukkan Jabatan",
            type: "text"
        },
        {
            id: "no_hp",
            label: "Nomor Handphone",
            placeholder: "Silahkan Masukkan No HP",
            type: "text"
        },
        {
            id: "qr",
            label: "QR Code",
            placeholder: "Silahkan Masukkan QR Code",
            type: "text"
        },
    ]

    useEffect(() => {
        if (dataPendaftar.length === 0) {
            getDataPendaftar()
        }
    }, [getDataPendaftar, dataPendaftar])



    return (
        <div>
            <Button variant='contained' sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                ":hover": {
                    backgroundColor: colors.greenAccent[800]
                },
                marginX: 0.5
            }}
                onClick={handleOpenModal}
                size="small"
            >
                <EditNoteRoundedIcon />
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
                                Edit Data Pendaftar
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
                        <Grid container item m={1} sx={{
                            maxHeight: '50vh',
                            overflow: 'auto'
                        }}>
                            <Grid item xs={12}>
                                {
                                    field.map((item) => (
                                        <TextField
                                            id={item.id}
                                            label={item.label}
                                            placeholder={item.placeholder}
                                            variant="outlined"
                                            size="small"
                                            type={item.type}
                                            fullWidth
                                            defaultValue={dataPendaftar.length === 0 ? "" : dataPendaftar[item.id]}
                                            sx={{
                                                marginTop: "10px",
                                                ":target-text": {
                                                    borderColor: colors.greenAccent[400]
                                                }
                                            }}
                                            onInput={(e) => setData({ ...data, [item.id]: e.target.value })}
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
                            onClick={() => sendEditData()}
                        >
                            Simpan
                        </Button>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>

        </div >
    );
}

export default EditdataPendaftar;