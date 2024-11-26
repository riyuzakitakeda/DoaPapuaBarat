import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
// import { tokens } from '../../../theme';
import TambahUser from './tambah';
import { headerData } from '../../../data/headerCostum';
import EditdataKabupaten from './edit';
import DeleteDataKabupaten from './delete';
import { shortData } from '../../global/sortData';

const columns = [
    {
        id: 'nama_kabupaten',
        label: 'Nama Kabupaten',
        minWidth: 200
    },
];


export default function DataKabupaten() {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState(null)
    let rowNumber = 0;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [copyList, setCopyList] = useState([]);

    const getDataKabupaten = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL+"api/kabupaten", {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setRows(shortData(data))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const searchText = (searched) => {
        setCopyList(rows.filter((item) =>
            item.nama_kabupaten.toUpperCase().includes(searched.toUpperCase())
        ));
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getDataKabupaten();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if(!rows){
            getDataKabupaten()
        }else{
            setCopyList(shortData(rows))
        }
    },
        [getDataKabupaten, rows]
    )

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid container sx={{
                width: '100%',
                marginX: 1,
                marginBottom: 3,
                marginTop: 2,
                fontWeight: 700
            }} display={'flex'}>
                <Typography variant='h2' fontWeight={700}  color={'#1E945A'}>
                    {'Data Kabupaten'}
                </Typography>
            </Grid>
            <Grid container xs={12} m={1} alignItems={'center'} justifyContent={'space-between'}>
                <Grid item xs={6} md={5} lg={3}>
                    <TextField
                        id="outlined-textarea"
                        label="Cari"
                        placeholder="Nama Kabupaten"
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        size='small'
                        onInput={(e) => searchText(e.target.value)}
                    />
                </Grid>
                <Grid container item xs={6} md={5} lg={3} paddingRight={'4vw'} sx={{
                    // backgroundColor: colors.blueAccent[100]
                }}
                    justifyContent={'end'}
                >
                    <TambahUser execute={getDataKabupaten}  />
                </Grid>
            </Grid>
            <TableContainer sx={{ maxHeight: '90vh' }}>
                <Table size='small' stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key={'no'}
                                align={'center'}
                                style={{ minWidth: 5 }}
                            >
                                {'No'}
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                key={'aksi'}
                                align={'center'}
                                style={{ minWidth: 10 }}
                            >
                                {'Aksi'}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {copyList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                rowNumber += 1;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell
                                            align='center'
                                            key={row.id}>
                                            {rowNumber + page * rowsPerPage}
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell
                                            align='center'
                                            key={row.id}>
                                            <EditdataKabupaten id={row.id} execute={getDataKabupaten} />
                                            <DeleteDataKabupaten id={row.id} execute={getDataKabupaten} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={copyList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}