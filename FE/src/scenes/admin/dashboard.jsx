import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { headerData } from "../../data/headerCostum";



const Dashboard = () => {
    const [dataCountLog, setDataCount] = useState(null);
    return (
        <Box>
            <Grid container direction={"row"}>
                Dashboard
            </Grid>
        </Box >
    );
}

export default Dashboard;