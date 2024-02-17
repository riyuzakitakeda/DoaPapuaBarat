import React from "react";
import { useState, useCallback } from "react";
import { Button, Dialog, useTheme, Typography, Fade } from "@mui/material";
import { tokens } from "../../../theme";
import { headerData } from "../../../data/headerCostum";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const DeleteAnak = ({ id, execute }) => {
    const [open, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleConfirmation = () => deleteDataAnak(id);

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

    const deleteDataAnak = useCallback((keyid) => {
        fetch(process.env.REACT_APP_API_URL + "api/anak/" + keyid, {
            method: 'delete',
            headers: headerData
        })
            .then(res => {
                execute();
                setOpenDialog(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [execute])

    return (
        <div>
            <Button variant='contained' sx={{
                backgroundColor: colors.redAccent[600],
                color: colors.grey[100],
                ":hover": {
                    backgroundColor: colors.redAccent[800]
                },
                marginX: 0.5
            }}
                size="small"
                onClick={() => { handleOpenDialog() }}
            >
                {/* <Typography fontSize={9}>
                    Delete
                </Typography> */}
                <DeleteForeverRoundedIcon />
            </Button>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
               
                    <DialogTitle id="alert-dialog-title">
                        {"Hapus Data"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Apakah anda yakin ingin menghapus data Pendaftar dengan id: ({id}) ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" size="small" color="error" onClick={handleConfirmation}>Ya</Button>
                        <Button variant="contained" size="small" color="success" onClick={handleCloseDialog} autoFocus>
                            Tidak
                        </Button>
                    </DialogActions>
             
            </Dialog>

        </div>
    );
}

export default DeleteAnak;