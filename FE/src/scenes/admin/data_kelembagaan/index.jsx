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
import {
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import TambahAnak from './tambah';
import EditDataAnak from './edit';
import DeleteAnak from './delete';
import DownloadTable from './download';


import { headerData } from '../../../data/headerCostum';
import ImportData from './importdata';

const columns = [
    {
        id: 'nama_kabupaten',
        label: 'Nama Kabupaten',
        minWidth: 150
    },
    {
        id: 'distrik',
        label: 'Nama Distrik',
        minWidth: 150
    },
    {
        id: 'desa',
        label: 'Nama Kampung',
        minWidth: 150
    },
    {
        id: 'nama_tempat_ibadah',
        label: 'Nama Tempat Ibadah',
        minWidth: 150
    },
    {
        id: 'nama_ketua',
        label: 'Nama Ketua',
        minWidth: 150
    },
];


export default function Kelembagaan() {
    const [rows, setRows] = useState(null)

    //Page Number
    let rowNumber = 0;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    //End of Page Number

    const [copyList, setCopyList] = useState([]);

    //Filter
    const [opdValue, setopdValue] = useState('');
    const [opdData, setKabupatenData] = useState([]);
    //End of Filter

    const getDataKelembagaan = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL + "api/kelembagaan", {
            method: 'get',
            headers: headerData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setRows(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const searchText = (searched) => {
        setCopyList(rows.filter((item) =>
            (isNaN(+searched))
                ? item.nama.toUpperCase().includes(searched.toUpperCase())
                : item.opd.toUpperCase().includes(searched.toUpperCase())))
    }

    //Page handle
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //End of page Handle

    //Filter Hanlde
    const getKabupatenData = useCallback(() => {
        let kabupaten = [];
        if(rows){
            rows.map((items) => {
                if (kabupaten.includes(items.nama_kabupaten)) {
                    return
                } else {
                    kabupaten.push(items.nama_kabupaten);
                }
            })
        }
        setKabupatenData(kabupaten);
    }, [rows, setKabupatenData])


    const opdHandle = useCallback((e) => {
        const data = rows.filter((item) =>
            item.opd.toUpperCase().trim().includes(e.toUpperCase().trim())
        )
        setCopyList(data);
        setopdValue(e);
    }, [setCopyList, setopdValue, rows]);

    //End Of Filter handle

    useEffect(() => {
        if (!rows) {
            getDataKelembagaan()
        } else {
            setCopyList(rows)
            getKabupatenData()
        }
    },
        [getDataKelembagaan, rows, getKabupatenData]
    )

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid container sx={{
                width: '100%',
                marginX: 1,
                marginBottom: 3,
                marginTop: 2,
                fontWeight: 700,
            }} display={'flex'}>
                <Typography variant='h2' fontWeight={700}  color={'#1E945A'}>
                    {'Data Kelembagaan'}
                </Typography>
            </Grid>
            <Grid container m={1} alignItems={'center'} justifyContent={'space-between'}>
                <Grid item xs={6} md={5} lg={3}>
                    <TextField
                        id="outlined-textarea"
                        label="Cari"
                        placeholder="Nama atau opd"
                        sx={{
                            width: '100%'
                        }}
                        size='small'
                        onInput={(e) => searchText(e.target.value)}
                    />
                </Grid>
                <Grid container item xs={6} md={5} lg={3} sx={{
                    paddingRight: 0.5
                }}
                    justifyContent={'end'}
                >   
                    <Box sx={{ marginX: 0.5 }}>
                        <ImportData columns={columns} rows={copyList} filename={'data_Kelembagaan.csv'} />
                    </Box>
                    <Box sx={{ marginX: 0.5 }} >
                        <TambahAnak execute={getDataKelembagaan} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container xs={12} m={1} alignItems={'center'}>
                {/* <Grid item xs={6} md={4} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel size='small' id="opd-select-label">Kabupaten</InputLabel>
                        <Select
                            labelId="opd-select-label"
                            id="opd-select"
                            value={opdValue}
                            label="Kabupaten"
                            onChange={(e) => opdHandle(e.target.value)}
                            size='small'
                        >
                            {
                                opdData.map((items) => {
                                    return <MenuItem value={items}>{items}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel size='small' id="opd-select-label">Distrik</InputLabel>
                        <Select
                            labelId="opd-select-label"
                            id="opd-select"
                            value={opdValue}
                            label="Kabupaten"
                            onChange={(e) => opdHandle(e.target.value)}
                            size='small'
                        >
                            {
                                opdData.map((items) => {
                                    return <MenuItem value={items}>{items}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel size='small' id="opd-select-label">Kampung</InputLabel>
                        <Select
                            labelId="opd-select-label"
                            id="opd-select"
                            value={opdValue}
                            label="Kampung"
                            onChange={(e) => opdHandle(e.target.value)}
                            size='small'
                        >
                            {
                                opdData.map((items) => {
                                    return <MenuItem value={items}>{items}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid> */}
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
                                style={{ minWidth: 180 }}
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
                                            key={'no'}>
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
                                            key={'aksi'}
                                        >
                                            <Grid container item>
                                                <EditDataAnak id={row.id} execute={getDataKelembagaan} />
                                                <DeleteAnak id={row.id} execute={getDataKelembagaan} />
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
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