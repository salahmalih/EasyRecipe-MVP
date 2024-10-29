import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { tokens } from "../../../theme";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Header from "../header/Header";
import StatBox from "../../../components/dashbord_c/StatBox";
import axios from "axios";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Sidebar, Topbar } from '../../../scenes';

const Dashboard = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  // State to hold the data from the backend
  const [stats, setStats] = useState({
    userCount: 0,
    recipeCount: 0,
    ingredientCount: 0,
    favoriteCount: 0,
  });

  // Fetch data from the backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats", {
          withCredentials: true, // Include credentials with the request if necessary
        });
        setStats({
          userCount: response.data.users,
          recipeCount: response.data.recipes,
          ingredientCount: response.data.ingredients,
          favoriteCount: response.data.favorites,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar isSidebar={isSidebar} />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Topbar setIsSidebar={setIsSidebar} />
          <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.userCount} // Populate from backend
            subtitle="Users Number"
            progress={(stats.userCount / 1000).toString()} // Example progress calculation
            increase="+14%"
            icon={
              <PeopleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.recipeCount} // Populate from backend 
            subtitle="Recipes Number"
            progress={(stats.recipeCount / 1000).toString()} // Example progress calculation
            increase="+21%"
            icon={
              <LunchDiningIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.ingredientCount} // Populate from backend
            subtitle="Ingredients Number"
            progress={(stats.ingredientCount / 1000).toString()} // Example progress calculation
            increase="+5%"
            icon={
              <KebabDiningIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.favoriteCount} // Populate from backend
            subtitle="Favorite Number"
            progress={(stats.favoriteCount / 1000).toString()} // Example progress calculation
            increase="+43%"
            icon={
              <FavoriteIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
    </Box>
    </Box>
      </Box>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;
