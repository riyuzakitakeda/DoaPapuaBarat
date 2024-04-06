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

const EditdataUser = ({ id, execute }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataUser, setdataUser] = useState([]);
    const [passwordValue, setPasswordvalue] = useState('');
    const [openPassword, setopenPassword] = useState(false);
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

    const [userType, setuserType] = useState('');

    const getDataUser = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/user/" + id, {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setdataUser(data)
                setuserType(data.type)
            })
            .then(() => {
                setdataUser({
                    ...dataUser,
                    password: ''
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [dataUser, id])

    const sendEditData = useCallback(() => {
        console.log(dataUser)
        fetch(process.env.REACT_APP_API_URL + "api/user/" + id, {
            method: 'put',
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
                getDataUser();
                setTimeout(hadleAlert, 4000);
            })
            .catch(err => {
                console.log(err)
            })
    }, [id, execute, getDataUser, dataUser])

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

    const handleInputuserType = useCallback((event) => {
        setuserType(event.target.value);
        switch (event.target.value) {
            case 'superadmin':
                setdataUser({ ...dataUser, authority: '[full, masteraccount, useraccount]', type: event.target.value })
                break;
            case 'admin':
                setdataUser({ ...dataUser, authority: '[full, useraccount]', type: event.target.value })
                break;
            case 'user':
                setdataUser({ ...dataUser, authority: '[dashboard, peta, intervensi]', type: event.target.value })
                break;
            default:

                break;

        }
    }, [dataUser, setdataUser]);

    useEffect(() => {
        if (dataUser.length === 0) {
            getDataUser()
        }
    }, [getDataUser, dataUser, setdataUser])



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
                                Edit Data User
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
                                    onInput={(e) => setdataUser({ ...dataUser, username: e.target.value })}
                                />
                                <TextField
                                    id={'password'}
                                    label={'Password'}
                                    value={passwordValue}
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
                                    onInput={(e) => {
                                        setdataUser({ ...dataUser, password: e.target.value })
                                        setPasswordvalue(e.target.value)
                                    }}
                                />
                                <FormControlLabel control={<Checkbox onChange={handleOpenPassword} />} label="Show Password" />
                                <FormControl sx={{
                                    marginTop: 2
                                }} fullWidth>
                                    <InputLabel size="small" id="select-type-user">Tipe Akun</InputLabel>
                                    <Select
                                        labelId="select-type-user"
                                        id="type-user"
                                        value={userType}
                                        label="Tipe Akun"
                                        size="small"
                                        onChange={(e) => handleInputuserType(e)}
                                    >
                                        <MenuItem value={'superadmin'}>Superadmin</MenuItem>
                                        <MenuItem value={'admin'}>Admin</MenuItem>
                                        <MenuItem value={'user'}>User</MenuItem>
                                    </Select>
                                </FormControl>
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

export default EditdataUser;