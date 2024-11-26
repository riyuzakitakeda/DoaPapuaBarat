import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {
    Button, Modal,
    useTheme, Typography,
    Grid, TextField,
    Divider, Fade,
    MenuItem, Select,
    FormControl, InputLabel, Checkbox,
    FormControlLabel
} from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import ShowAlert from "../../global/alert";

const TambahData = ({ execute }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [openPassword, setopenPassword] = useState(false);
    const [dataKabupetn, setDataKabupaten] = useState(null);
    const handleOpenPassword = () => setopenPassword(!openPassword);
    const [alertOption, setAlertOption] = useState({
        title: '',
        desc: '',
        type: 'info'
    });
    const [openAlert, setOpenAlert] = useState(false);
    const hadleAlert = () => {
        setOpenAlert(false);
    };


    const [dataUser, setDataUser] = useState({
        nama: '',
        username: '',
        password: '',
        lokasi: '',
        type: 'admin_kabupaten',
    })



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

    const getDataKabupaten = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL+"api/kabupaten", {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setDataKabupaten(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const sendData = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/user/", {
            method: 'post',
            headers: headerData,
            body: JSON.stringify(dataUser)
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
                } else if (data.code === 201) {
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
                setTimeout(hadleAlert, 4000);
            })
            .catch(err => {
                console.log(err)
            })
    }, [dataUser, execute]);

    useEffect(() => {
        if(dataKabupetn === null){
            getDataKabupaten();
        }
    }, [dataKabupetn, getDataKabupaten])


    return (
        <div>
            <ShowAlert
                title={alertOption.title}
                desc={alertOption.desc}
                type={alertOption.type}
                openAlert={openAlert}
                onAlertClose={hadleAlert}
            />
            <Button variant='contained' sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                ":hover": {
                    backgroundColor: colors.greenAccent[800]
                }
            }}
                onClick={handleOpenModal}
            >
                <Typography>
                    Tambah
                </Typography>
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
                                Tambah User
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
                                <FormControl sx={{
                                    marginTop: 2
                                }} fullWidth>
                                    <InputLabel size="small" id="select-type-user">Kabupaten</InputLabel>
                                    <Select
                                        labelId="select-type-user"
                                        id="type-user"
                                        value={dataUser.lokasi}
                                        label=""
                                        size="small"
                                        onChange={(e) => setDataUser({ ...dataUser, lokasi: e.target.value })}
                                    >
                                        {
                                            dataKabupetn
                                            ? dataKabupetn.map((item) => (
                                                <MenuItem value={item.nama_kabupaten}>{item.nama_kabupaten}</MenuItem>
                                            ))
                                            : <></>
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    id={'nama'}
                                    value={dataUser.nama}
                                    label={'Nama Admin'}
                                    placeholder={'Silahkan masukkan Nama Admin'}
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
                                    onInput={(e) => setDataUser({ ...dataUser, nama: e.target.value })}
                                />
                                <TextField
                                    id={'username'}
                                    value={dataUser.username}
                                    label={'User Name'}
                                    placeholder={'Silahkan masukkan username anda'}
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
                                    onInput={(e) => setDataUser({ ...dataUser, username: e.target.value.replace(/\s/g, '') })}
                                />
                                <TextField
                                    id={'password'}
                                    label={'Password'}
                                    value={dataUser.password}
                                    placeholder={'Silahkan masukkan password anda'}
                                    variant="outlined"
                                    type={openPassword ? 'text' : 'password'}
                                    size="small"
                                    fullWidth
                                    sx={{
                                        marginTop: "10px",
                                        ":target-text": {
                                            borderColor: colors.greenAccent[400]
                                        }
                                    }}
                                    onInput={(e) => setDataUser({ ...dataUser, password: e.target.value })}
                                />
                                <FormControlLabel control={<Checkbox onChange={handleOpenPassword} />} label="Show Password" />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} m={1} justifyContent={"end"}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: colors.greenAccent[500]
                                }}
                                onClick={() => sendData()}
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

export default TambahData;