import React, { useState } from "react";
import { Typography, Button, useTheme } from "@mui/material";
import { tokens } from '../../../theme';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { headerData } from "../../../data/headerCostum";

const fields = [
  { label: "Nama Kabupaten", key: "nama_kabupaten", fieldType: { type: "input" }, example: "Kabupaten A", validations: [{ rule: "required", errorMessage: "Nama Kabupaten harus diisi." }] },
  { label: "Nama Distrik", key: "distrik", fieldType: { type: "input" }, example: "Distrik A", validations: [{ rule: "required", errorMessage: "Nama Distrik harus diisi." }] },
  { label: "Nama Desa", key: "desa", fieldType: { type: "input" }, example: "Desa A", validations: [{ rule: "required", errorMessage: "Nama Desa harus diisi." }] },
  { label: "Nama Tempat Ibadah", key: "nama_tempat_ibadah", fieldType: { type: "input" }, validations: [{ rule: "required", errorMessage: "Nama Tempat Ibadah harus diisi." }] },
  { label: "Tanggal Didirikan", key: "tanggal_didirikan", fieldType: { type: "input" }, example: "2023-01-01" },
  { label: "Nama Ketua", key: "nama_ketua", fieldType: { type: "input" }, example: "John Doe" },
  { label: "Jumlah Jiwa", key: "jumlah_jiwa", fieldType: { type: "input" }, example: "200" },
  { label: "Jumlah KK", key: "jumlah_kk", fieldType: { type: "input" }, example: "50" },
  { label: "Jumlah Laki-laki", key: "jumlah_laki", fieldType: { type: "input" }, example: "100" },
  { label: "Jumlah Perempuan", key: "jumlah_perempuan", fieldType: { type: "input" }, example: "100" },
  { label: "Jumlah PNS", key: "jumlah_pns", fieldType: { type: "input" }, example: "20" },
  { label: "Jumlah Petani/Nelayan", key: "jumlah_petani_nelayan", fieldType: { type: "input" }, example: "30" },
  { label: "Jumlah Swasta", key: "jumlah_swasta", fieldType: { type: "input" }, example: "50" },
  { label: "Alamat", key: "alamat", fieldType: { type: "input" }, example: "Jl. Raya No. 123, Kota A" },
  { label: "Latitude", key: "cor_lat", fieldType: { type: "input" }, example: "-2.548926" },
  { label: "Longitude", key: "cor_long", fieldType: { type: "input" }, example: "138.601290" },
];

const ImportData = ({ execute }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [importOpen, setImportOpen] = useState(false);

  const onSubmit = (data, file) => {
    fetch(process.env.REACT_APP_API_URL + "api/kelembagaan/bulk", {
      method: 'post',
      headers: headerData,
      body: JSON.stringify(data)
  })
      .then(res => {
          return res.json()
      })
      .then(data => {
          alert("data berhasil ditambahkan");
          execute()
      })
      .catch(err => {
          console.log(err)
      });
  };

  const onClose = () => {
    setImportOpen(false);
  };

  return (
    <>
      <ReactSpreadsheetImport isOpen={importOpen} onClose={onClose} onSubmit={onSubmit} fields={fields} />
      <Button
        variant="contained"
        sx={{
          backgroundColor: colors.blueAccent[600],
          color: colors.grey[100],
          ":hover": { backgroundColor: colors.blueAccent[800] },
        }}
        onClick={() => setImportOpen(true)}
      >
        <Typography sx={{ display: { xs: "none", sm: "block" } }}>Import Excel</Typography>
        <DownloadRoundedIcon sx={{ display: { xs: "block", sm: "none" } }} />
      </Button>
    </>
  );
};

export default ImportData;
