import {
    Grid,
    Typography,
    Paper,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination
} from '@mui/material';
import { useState } from 'react';

const columns = [
    {
        id: 'nama_kabupaten',
        label: 'Nama Tempat Ibadah',
        minWidth: 150
    },
    {
        id: 'distrik',
        label: 'Jumlah Jamaat',
        minWidth: 150
    },
];


const JumlahDenominasi = () => {
    const [rows, setRows] = useState(null)

    //Page Number
    let rowNumber = 0;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //End of Page Number

    const [copyList, setCopyList] = useState([]);

    const searchText = (searched) => {
        setCopyList(rows.filter((item) =>
            item.nama.toUpperCase().includes(searched.toUpperCase())
        ))
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

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid container sx={{
                width: '100%',
                marginX: 1,
                marginBottom: 3,
                marginTop: 2,
                fontWeight: 700,
            }} display={'flex'}>
                <Typography variant='h2' fontWeight={700} color={'#1E945A'}>
                    {'Jumlah Denominasi Gereja'}
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
    )
}

export default JumlahDenominasi;