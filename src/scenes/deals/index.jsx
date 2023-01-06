import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Deals = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "org_name",
      headerName: "Company",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "expected_close_date",
      headerName: "ECD",
      flex: 1,
      type: 'date',
      //dateFormat: "MM/DD/YYYY",
      //correctFormat: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Deal Size",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.formatted_value}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  // GET request using axios
  useEffect(() => {
    axios
      .get(
        "https://seth-sandbox.pipedrive.com/api/v1/deals?limit=500&api_token=e6d1040d9ba7eb8b746909b1ce0e4f11f176e9aa"
      )
      .then((response) => {
        setRows(response.data.data);
        console.log( response.data.data );
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="My Deals" subtitle="" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};
export default Deals;