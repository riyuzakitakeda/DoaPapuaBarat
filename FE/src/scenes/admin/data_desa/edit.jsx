import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Button, Modal, useTheme, Typography, Grid, TextField, Divider, Fade } from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { Box } from "@mui/system";

const EditDataDesa = ({ id, execute }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataDesa, setDataDesa] = useState([]);
    const [data, setData] = useState({});

    const getDataDesa = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/desa/" + id, {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data)
                setDataDesa(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    const sendEditData = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/desa/" + id, {
            method: 'put',
            headers: headerData,
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                execute()
                getDataDesa()
                handleCloseModal()
            })
            .catch(err => {
                console.log(err)
            })
    }, [data, id, execute, getDataDesa])

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
            type: "text",
            ind: "index_kabupaten"
        },
        {
            id: "nama_distrik",
            label: "Nama Distrik",
            placeholder: "Silahkan Masukkan Nama Distrik",
            type: "text",
            ind: "index_distrik"
        },
        {
            id: "nama_desa",
            label: "Nama Desa",
            placeholder: "Silahkan Masukkan Nama Desa",
            type: "text",
            ind: "index_desa"
        },
    ]

    useEffect(() => {
        if (dataDesa.length === 0) {
            getDataDesa()
        }
    }, [getDataDesa, dataDesa.length])



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
                    <Grid container item xs={11} md={7} lg={5} sx={style}>
                        <Grid item container justifyContent={"space-between"} alignItems={"end"}>
                            <Typography variant="h4">
                                Edit Data Desa
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
                                            key={item.ind}
                                            label={item.label}
                                            placeholder={item.placeholder}
                                            variant="outlined"
                                            size="small"
                                            type={item.type}
                                            fullWidth
                                            defaultValue={dataDesa.length === 0 ? "" : dataDesa[item.id]}
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

export default EditDataDesa;