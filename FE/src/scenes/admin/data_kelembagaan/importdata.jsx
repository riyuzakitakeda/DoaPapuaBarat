import React from "react";
import { useCallback } from "react";
import { CsvBuilder } from 'filefy';
import { Typography, Button, useTheme } from "@mui/material";
import { tokens } from '../../../theme';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const ImportData = ({columns, rows, filename}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const builder = new CsvBuilder(filename)
    const downloadData = useCallback(() => {
        let column = [];
        let list = [];
        columns.forEach(element => {
            column.push(element.label);
        });
        rows.forEach(element => {
            let rowss = []
            {
                columns.forEach((col) => {
                    rowss.push(element[col.id]);

                })
            }
            list.push(rowss)
        });

        builder
            .setDelimeter(',')
            .setColumns(column)
            .addRows(list)
            .exportFile();
    }, [rows]);

    return (
        <Button variant='contained' sx={{
            backgroundColor: colors.blueAccent[600],
            color: colors.grey[100],
            ":hover": {
                backgroundColor: colors.blueAccent[800]
            }
        }}
            onClick={downloadData}
        >
            <Typography sx={{
                    display: { xs: 'none', sm: 'block' },
                }}>
                Import Data
            </Typography>
            <DownloadRoundedIcon sx={{
                    display: { xs: 'block', sm: 'none' },
                }} />
        </Button>
    );

}

export default ImportData;