import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DiningIcon from "@mui/icons-material/Dining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SetMealIcon from '@mui/icons-material/SetMeal';
import KebabDiningIcon from '@mui/icons-material/KebabDining';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <MenuItem
        active={selected === title}
        style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  // Get current location using useLocation hook
  const location = useLocation();

  useEffect(() => {
    // Update selected menu item based on current location path
    switch (location.pathname) {
      case "/dashboard":
        setSelected("Dashboard");
        break;
      case "/users":
        setSelected("Manage Team");
        break;
      case "/recipes_a":
        setSelected("List Recipes");
        break;
      case "/invoices":
        setSelected("Invoices Balances");
        break;
      case "/Create_Recipes":
        setSelected("Create Recipes");
        break;
      case "/calendar":
        setSelected("Calendar");
        break;
      case "/ingredients_list":
        setSelected("List ingredients");
        break;
    case "/Create_ingredients":
        setSelected("Create ingredients");
        break;
      default:
        setSelected(""); // Set default state here
    }
  }, [location.pathname]);

  const fullname = localStorage.getItem("fullname");
  const image = localStorage.getItem("image");
  const role = localStorage.getItem("role");

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
          background:"none !important",
        },
        "& .ps-menu-button.ps-active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "15px 0 25px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN Page
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`data:image/png;base64,${image}` || "../../assets/user.png"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {fullname}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "20px 0 10px 25px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="List Recipes"
              to="/recipes_a"
              icon={<DiningIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List ingredients"
              to="/ingredients_list"
              icon={<KebabDiningIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "20px 0 10px 25px" }}
            >
              Pages
            </Typography>
            <Item
              title="Create Recipes"
              to="/Create_Recipes"
              icon={<LunchDiningIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Create ingredients"
              to="/Create_ingredients"
              icon={<SetMealIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
          

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "20px 0 10px 25px" }}
            >
              
            </Typography>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
