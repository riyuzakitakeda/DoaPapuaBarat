import React, { useState } from "react";
import { useCallback } from "react";
import { CsvBuilder } from 'filefy';
import { Typography, Button, useTheme } from "@mui/material";
import { tokens } from '../../../theme';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

const fields = [
    {
      // Visible in table header and when matching columns.
      label: "Name",
      // This is the key used for this field when we call onSubmit.
      key: "name",
      // Allows for better automatic column matching. Optional.
      alternateMatches: ["first name", "first"],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: "Stephanie",
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
  ]


const ImportData = ({columns, rows, filename}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [importOpen, setImportOpen] = useState(false)
    const onSubmit = (data, file) => {
        console.log(data)
        console.log(file)
    }
    const onClose = () => {
        setImportOpen(false)
    }

    return (
        <>
        <ReactSpreadsheetImport isOpen={importOpen} onClose={onClose} onSubmit={onSubmit} fields={fields} />
        <Button variant='contained' sx={{
            backgroundColor: colors.blueAccent[600],
            color: colors.grey[100],
            ":hover": {
                backgroundColor: colors.blueAccent[800]
            }
        }}
            onClick={() => setImportOpen(true)}
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
        </>
    );

}

export default ImportData;