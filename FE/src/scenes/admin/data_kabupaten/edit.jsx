import React from "react";
import { useState, useCallback, useEffect } from "react";
import {
    Button, Modal,
    useTheme, Typography,
    Grid, TextField,
    Divider, Fade,
    MenuItem, Select,
    InputLabel, FormControl,
    Checkbox, FormControlLabel
} from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import ShowAlert from "../../global/alert";

const EditdataKabupaten = ({ id, execute }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataKabupaten, setdataKabupaten] = useState([]);
    const [alertOption, setAlertOption] = useState({
        title: '',
        desc: '',
        type: 'info'
    });
    const [openAlert, setOpenAlert] = useState(false);
    const hadleAlert = () => {
        setOpenAlert(false);
    };
    const getDataKabupaten = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/kabupaten/" + id, {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setdataKabupaten(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [dataKabupaten, id])

    const sendEditData = useCallback(() => {
        console.log(dataKabupaten)
        fetch(process.env.REACT_APP_API_URL + "api/kabupaten/" + id, {
            method: 'put',
            headers: headerData,
            body: JSON.stringify(dataKabupaten)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                execute()
                if (data.code === 500) {
                    setAlertOption(
                        {
                            title: 'Gagal',
                            desc: data.message,
                            type: 'error'
                        }
                    );
                } else if (data.code === 200) {
                    setAlertOption(
                        {
                            title: 'Sukses',
                            desc: data.message,
                            type: 'success'
                        }
                    );
                    handleCloseModal()
                }
                setOpenAlert(true);
                getDataKabupaten();
                setTimeout(hadleAlert, 4000);
            })
            .catch(err => {
                console.log(err)
            })
    }, [id, execute, getDataKabupaten, dataKabupaten])

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


    useEffect(() => {
        if (dataKabupaten.length === 0) {
            getDataKabupaten()
        }
    }, [getDataKabupaten, dataKabupaten, setdataKabupaten])

    return (
        <div>
            <ShowAlert
                desc={alertOption.desc}
                title={alertOption.title}
                onAlertClose={hadleAlert}
                openAlert={openAlert}
                type={alertOption.type}
            />
            <Button variant='contained' sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                ":hover": {
                    backgroundColor: colors.greenAccent[800]
                }
            }}
                onClick={handleOpenModal}
                size="small"
            >
                Edit
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
                                Edit Data Kabupaten
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
                                <TextField
                                    id={'nama_kabupaten'}
                                    value={dataKabupaten.nama_kabupaten}
                                    label={'Nama Kabupaten'}
                                    placeholder={'Silahkan masukkan Nama Kabupaten'}
                                    variant="outlined"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    sx={{
                                        marginTop: "10px",
                                        ":target-text": {
                                            borderColor: colors.greenAccent[400]
                                        }
                                    }}
                                    onInput={(e) => setdataKabupaten({ ...dataKabupaten, nama_kabupaten: e.target.value })}
                                />
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

        </div>
    );
}

export default EditdataKabupaten;