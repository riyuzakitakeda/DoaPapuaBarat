import React, { useState, useCallback, useEffect } from "react";
import {
    Button,
    Modal,
    useTheme,
    Typography,
    Grid,
    TextField,
    Divider,
    Fade,
    MenuItem,
    Select,
    FormControl,
    Dialog,
    DialogTitle,
    DialogActions,
} from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { Box } from "@mui/system";
import MapDialog from "./map";

const center = { lat: -5.160543, lng: 119.436077 };

const EditdataKelembagaan = ({ id, execute }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataKelembagaan, setdataKelembagaan] = useState([]);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [datakabupaten, setDataKabupaten] = useState(null);
    const [dataDistrik, setDataDistrik] = useState(null);
    const [dataKampung, setDataKampung] = useState(null);

    const getDataKelembagaan = useCallback(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}api/Kelembagaan/${id}`, {
            method: "get",
            headers: headerData,
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setdataKelembagaan(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch data.");
                setLoading(false);
            });
    }, [id]);

    const sendEditData = useCallback(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}api/kelembagaan/${id}`, {
            method: "put",
            headers: headerData,
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(() => {
                execute();
                getDataKelembagaan();
                handleCloseModal();
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to save changes.");
                setLoading(false);
            });
    }, [data, id, execute, getDataKelembagaan]);

    useEffect(() => {
        if (!dataKelembagaan.length) getDataKelembagaan();
        if (!datakabupaten) fetchKabupatenData();
        if (!dataDistrik) fetchDistrikData();
        if (!dataKampung) fetchKampungData();
    }, [getDataKelembagaan, datakabupaten, dataDistrik, dataKampung]);

    const fetchKabupatenData = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_URL}api/kabupaten`, { method: "get", headers: headerData })
            .then((res) => res.json())
            .then(setDataKabupaten)
            .catch(console.error);
    }, []);

    const fetchDistrikData = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_URL}api/distrik`, { method: "get", headers: headerData })
            .then((res) => res.json())
            .then(setDataDistrik)
            .catch(console.error);
    }, []);

    const fetchKampungData = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_URL}api/desa`, { method: "get", headers: headerData })
            .then((res) => res.json())
            .then(setDataKampung)
            .catch(console.error);
    }, []);

    return (
        <div>
            {error && <Typography color="error">{error}</Typography>}
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.greenAccent[600],
                    color: colors.grey[100],
                    ":hover": { backgroundColor: colors.greenAccent[800] },
                    mx: 0.5,
                }}
                onClick={handleOpenModal}
                size="small"
            >
                <EditNoteRoundedIcon />
            </Button>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Fade in={openModal}>
                    <Grid container xs={11} md={7} lg={5} sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: colors.primary[400],
                        p: 3,
                        borderRadius: 2,
                    }}>
                        <Grid item container justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">Edit Data Kelembagaan</Typography>
                            <Button onClick={handleCloseModal} sx={{ color: colors.redAccent[400] }}>
                                X
                            </Button>
                        </Grid>
                        <Divider />
                        {loading ? (
                            <Typography>Loading...</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {[
                                    { id: "nama_kabupaten", label: "Nama Kabupaten", data: datakabupaten },
                                    { id: "distrik", label: "Nama Distrik", data: dataDistrik },
                                    { id: "desa", label: "Nama Kampung", data: dataKampung },
                                ].map((item) => (
                                    <Grid key={item.id} item xs={12}>
                                        <FormControl fullWidth>
                                            <Typography>{item.label}</Typography>
                                            <Select
                                                value={data[item.id] || ""}
                                                onChange={(e) =>
                                                    setData({ ...data, [item.id]: e.target.value })
                                                }
                                            >
                                                {item.data?.map((option) => (
                                                    <MenuItem key={option.nama} value={option.nama}>
                                                        {option.nama}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                ))}
                                {/* Other fields */}
                                <Grid item xs={12}>
                                    <Button onClick={sendEditData}>Save Changes</Button>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Fade>
            </Modal>
        </div>
    );
};

export default EditdataKelembagaan;
