import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Button, Modal, useTheme, Typography, Grid, TextField, Divider, Fade, MenuItem, Select, FormControl, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { Box } from "@mui/system";
import MapDialog from "./map";

const center = {
    lat: -5.160543,
    lng: 119.436077,
}


const EditdataKelembagaan = ({ id, execute }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataKelembagaan, setdataKelembagaan] = useState([]);
    const [data, setData] = useState({});

    const [dialogMapOpen, setDialogMapOpen] = useState(false);
    const [position, setPosition] = useState(center)

    const [datakabupaten, setDataKabupaten] = useState(null);
    const [dataDistrik, setDataDistrik] = useState(null);
    const [dataKampung, setDataKampung] = useState(null);


    const getDataKelembagaan = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/Kelembagaan/" + id, {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data)
                setdataKelembagaan(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    const sendEditData = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/kelembagaan/" + id, {
            method: 'put',
            headers: headerData,
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                execute()
                getDataKelembagaan()
                handleCloseModal()
            })
            .catch(err => {
                console.log(err)
            })
    }, [data, id, execute, getDataKelembagaan])

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


    const kegiatan = [
        {
            id: 'id_kegiatan',
            nama: 'nama kegiatan 1'
        },
        {
            id: 'id_kegiatan1',
            nama: 'nama kegiatan 2'
        },
        {
            id: 'id_kegiatan2',
            nama: 'nama kegiatan 3'
        },
        {
            id: 'id_kegiatan3',
            nama: 'nama kegiatan 4'
        }
    ];

    const field = [
        {
            id: "nama_tempat_ibadah",
            label: "Nama Tempat Ibadah",
            placeholder: "Silahkan Masukkan Nama Tempat Ibadah",
            type: "text",
            format: null
        },
        {
            id: "tanggal_didirikan",
            label: "Tanggal Di Dirikan",
            placeholder: "Silahkan Masukkan Tanggal Pendirian",
            type: "date",
            format: null
        },
        {
            id: "nama_ketua",
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
            id: "jumlah_kk",
            label: "Jumlah Kepala Keluarga",
            placeholder: "Masukkan Jumlah Kepala Keluarga",
            type: "text",
            format: null
        },
        {
            id: "jumlah_laki",
            label: "Jumlah Pria",
            placeholder: "Masukkan Jumlah Penduduk Pria",
            type: "text",
            format: null
        },
        {
            id: "jumlah_perempuan",
            label: "Jumlah Wanita",
            placeholder: "Masukkan Jumlah Penduduk Wanita",
            type: "text",
            format: null
        },
        {
            id: "jumlah_pns",
            label: "Jumlah PNS",
            placeholder: "Masukkan Jumlah Penduduk PNS",
            type: "text",
            format: null
        },
        {
            id: "jumlah_petani_nelayan",
            label: "Jumlah Petani / Nelayan",
            placeholder: "Masukkan Jumlah Pekerja Petani atau Nelayan",
            type: "text",
            format: null
        },
        {
            id: "jumlah_swasta",
            label: "Jumlah Swasta",
            placeholder: "Masukkan Jumlah Pekerja Swasta",
            type: "text",
            format: null
        },
        {
            id: "alamat",
            label: "Alamat Lengkap",
            placeholder: "Masukkan Alamat Lengkap",
            type: "text",
            format: null
        },
    ]

    const getDataKabupaten = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/kabupaten", {
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

    const getDataDistrik = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/distrik", {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setDataDistrik(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const getDataKampung = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/desa", {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setDataKampung(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (dataKelembagaan.length === 0) {
            getDataKelembagaan()
        }
        if (!datakabupaten) {
            getDataKabupaten();
        }
        if(!dataDistrik){
            getDataDistrik();
        }
        if(!dataKampung){
            getDataKampung();
        }
    }, [getDataKelembagaan, dataKelembagaan])



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
                                Edit Data Kelembagaan
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
                                <Grid container direction={'row'}>
                                    <FormControl sx={{
                                        marginTop: 2,
                                        marginBottom: 2,
                                    }} fullWidth>
                                        <Typography>
                                            {'Nama Kabupaten'}
                                        </Typography>
                                        {/* <InputLabel size="small" id="select-type-user">Kabupaten</InputLabel> */}
                                        <Select
                                            labelId="select-type-user"
                                            id="type-user"
                                            value={data.nama_kabupaten ? data.nama_kabupaten : ''}
                                            label=""
                                            placeholder="Pilih Nama Kabupaten"
                                            size="small"
                                            onChange={(e) => setData({ ...data, 'nama_kabupaten': e.target.value })}
                                        >
                                            {
                                                datakabupaten
                                                    ? datakabupaten.map((item) => (
                                                        <MenuItem value={item.nama_kabupaten}>{item.nama_kabupaten}</MenuItem>
                                                    ))
                                                    : <></>
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container direction={'row'}>
                                    <FormControl sx={{
                                        marginBottom: 2,
                                    }} fullWidth>
                                        <Typography>
                                            {'Nama Kegiatan'}
                                        </Typography>
                                        {/* <InputLabel size="small" id="select-type-user">Kabupaten</InputLabel> */}
                                        <Select
                                            labelId="select-type-user"
                                            id="type-user"
                                            value={data.nama_kegiatan ? data.nama_kegiatan : ''}
                                            label=""
                                            placeholder="Pilih Nama Kegiatan"
                                            size="small"
                                            onChange={(e) => setData({ ...data, 'nama_kegiatan': e.target.value })}
                                        >
                                            {
                                                kegiatan
                                                    ? kegiatan.map((item) => (
                                                        <MenuItem value={item.id}>{item.nama}</MenuItem>
                                                    ))
                                                    : <></>
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container direction={'row'}>
                                    <FormControl sx={{
                                        // marginTop: 2,
                                        marginBottom: 2,
                                    }} fullWidth>
                                        <Typography>
                                            {'Nama Distrik'}
                                        </Typography>
                                        <Select
                                            labelId="select-type-user"
                                            id="type-user"
                                            value={data.distrik ? data.distrik : ''}
                                            placeholder="Pilih Nama Distrik"
                                            label=""
                                            size="small"
                                            onChange={(e) => setData({ ...data, 'distrik': e.target.value })}
                                        >
                                            {
                                                dataDistrik
                                                    ? dataDistrik.map((item) => (
                                                        <MenuItem value={item.nama_distrik}>{item.nama_distrik}</MenuItem>
                                                    ))
                                                    : <></>
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container direction={'row'}>
                                    <FormControl sx={{
                                        // marginTop: 2,
                                        marginBottom: 2,
                                    }} fullWidth>
                                        <Typography>
                                            {'Nama Kampung'}
                                        </Typography>
                                        {/* <InputLabel size="small" id="select-type-user">Kabupaten</InputLabel> */}
                                        <Select
                                            labelId="select-type-user"
                                            id="type-user"
                                            value={data.desa ? data.desa : ''}
                                            label=""
                                            placeholder="Pilih Nama Kampung"
                                            size="small"
                                            onChange={(e) => setData({ ...data, 'desa': e.target.value })}
                                        >
                                            {
                                                dataKampung
                                                    ? dataKampung.map((item) => (
                                                        <MenuItem value={item.nama_desa}>{item.nama_desa}</MenuItem>
                                                    ))
                                                    : <></>
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
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
                                <Button onClick={() => setDialogMapOpen(true)}>Pilih Titik Lokasi</Button>
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

export default EditdataKelembagaan;