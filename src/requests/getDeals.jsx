import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function GetDeals({ style }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [deals, setDeals] = useState(null);

  // GET request using axios
  useEffect(() => {
    axios
      .get(
        "https://seth-sandbox.pipedrive.com/api/v1/deals?limit=500&api_token=e6d1040d9ba7eb8b746909b1ce0e4f11f176e9aa"
      )
      .then((response) => {
        setDeals(response.data.data);
        console.log({response})
      });
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Current Deals
        </Typography>
      </Box>
      {deals &&
        deals.map((deal, i) => (
          <Box
            key={`${deal.id}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                {deal.title}
              </Typography>
              <Typography color={colors.grey[100]}>{deal.status}</Typography>
            </Box>
            <Box color={colors.grey[100]}>{deal.expected_close_date}</Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              {deal.formatted_value}
            </Box>
          </Box>
        ))}
    </>
  );
}
