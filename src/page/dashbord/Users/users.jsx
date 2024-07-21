import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../header/Header";
import React, { useState, useEffect } from 'react';
import { Sidebar, Topbar } from '../../../scenes';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";


const Users = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/users', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setUsers(resp))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (user_id) => {
    fetch(`http://127.0.0.1:5000/users/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => {
        if (resp.status === 200) {
          setUsers(users.filter(user => user.user_id !== user_id));
        } else {
          console.error("Failed to delete the ingredient");
        }
      })
      .catch(error => console.log(error));
  };


  const columns = [
    { field: "user_id", headerName: "ID User" },
    {
      field: "fullname",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "roles",
      headerName: "Access Level",
      flex: 1,
      justifyContent:"center",
      renderCell: ({ row: { roles } }) => {
        return (
          <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
            backgroundColor={
              roles === "admin"
                ? colors.greenAccent[600]
                : roles === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
            margin="10px"
          >
            {roles === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {roles === "manager" && <SecurityOutlinedIcon />}
            {roles === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" , }}>
              {roles}
            </Typography>
          </Box> 
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex:1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.ingredient_id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

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
                <Header title="Ingredients" subtitle="List of Ingredients" />
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
                  <DataGrid
                    rows={users}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row.user_id}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Users;
