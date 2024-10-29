import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../header/Header";
import React, { useState, useEffect } from 'react';
import { Sidebar, Topbar } from '../../../scenes';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import { Link } from 'react-router-dom';

const Recipes_admin = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [recipes, setRecipes] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch('http://127.0.0.1:5000/recipes', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        const formattedRecipes = resp.map(recipe => ({
          ...recipe,
          date: new Date(recipe.date) // Convert date string to Date object
        }));
        setRecipes(formattedRecipes);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);

  const handleDelete = (recipe_id) => {
    fetch(`http://127.0.0.1:5000/recipes/${recipe_id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => {
        if (resp.status === 200) {
          setRecipes(recipes.filter(recipe => recipe.recipe_id !== recipe_id));
        } else {
          console.error("Failed to delete the recipe");
        }
      })
      .catch(error => console.log(error));
  };

  const columns = [
    { field: "recipe_id", headerName: "Recipes ID", type: "text", headerAlign: "left", align: "left" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      type: "text",
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      type: "text",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(), // Format date
    },
    {
      field: "instructions",
      headerName: "Instructions",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "image_filename",
      headerName: "Image Filename",
      type: "text",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={{
              pathname: `/update_recipe/${params.row.recipe_id}`,
              state: { recipe_id: params.row.recipe_id }
            }}
            sx={{ marginRight: "10px" }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.recipe_id)}
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
                <Header title="Recipes" subtitle="List of Recipes" />
                {isLoading ? ( // Show loading spinner while fetching
                  <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
                    <CircularProgress />
                  </Box>
                ) : (
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
                      rows={recipes}
                      columns={columns}
                      components={{ Toolbar: GridToolbar }}
                      getRowId={(row) => row.recipe_id}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Recipes_admin;
