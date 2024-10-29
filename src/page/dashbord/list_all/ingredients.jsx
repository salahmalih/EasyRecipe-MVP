import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../header/Header";
import React, { useState, useEffect } from 'react';
import { Sidebar, Topbar } from '../../../scenes';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import { Link } from 'react-router-dom';

const Ingredients = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [ingredients, setIngredients] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/ingredients', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setIngredients(resp))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (ingredient_id) => {
    fetch(`http://127.0.0.1:5000/ingredients/${ingredient_id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => {
        if (resp.status === 200) {
          setIngredients(ingredients.filter(ingredient => ingredient.ingredient_id !== ingredient_id));
        } else {
          console.error("Failed to delete the ingredient");
        }
      })
      .catch(error => console.log(error));
  };


  const columns = [
    { field: "ingredient_id", headerName: "ingredients ID", type: "text", headerAlign: "left", align: "left" },
    {
      field: "name",
      headerName: "name",
      flex: 1,
      type: "text",
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "category",
      flex: 1,
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
            color="primary"
            component={Link}
            to={{
              pathname: `/update_recipe/${params.row.ingredient_id}`,
              state: { recipe_id: params.row.ingredient_id }
            }}
            sx={{ marginRight: "10px" }}
          >
            Update
          </Button>
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: `${colors.grey[100]} !important`,
                    },
                  }}
                >
                  <DataGrid
                    rows={ingredients}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row.ingredient_id}
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

export default Ingredients;
