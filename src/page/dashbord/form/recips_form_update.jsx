import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../header/Header";

import React, { useState, useEffect } from 'react';
import { Sidebar, Topbar } from '../../../scenes';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import APIService from "../APIService";
import { useParams } from 'react-router-dom';

const Form_Recipes_update = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  const [recipe, setRecipe] = useState(null); // State to hold the fetched recipe data
  const { recipe_id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/recipes/${recipe_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        // Set the fetched recipe data to state
        setRecipe(resp);
      })
      .catch(error => console.log(error));
  }, [recipe_id]); // Fetch recipe data when recipe_id changes

  const handleFormSubmit = (values) => {
    console.log("Form values:", values);
    updateRecipe(recipe_id, values);
  };

  const updateRecipe = (recipe_id, values) => {
    APIService.UpdateRecipe(recipe_id, values)
      .then(resp => {
        console.log("Recipe updated successfully:", resp);
        // Handle success (e.g., show success message, navigate back, etc.)
      })
      .catch(error => {
        console.error("Error updating recipe:", error);
        // Handle error (e.g., show error message)
      });
  };

  // Define initial form values based on fetched recipe data
  const initialValues = {
    title: recipe ? recipe.title : "",
    instructions: recipe ? recipe.instructions : "",
    description: recipe ? recipe.description : "",
    image: null, // Assuming you don't preload images for update
  };

  // Form validation schema
  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    instructions: yup.string().required("Instructions are required"),
    description: yup.string().required("Description is required"),
    image: yup.mixed(), // Image not required for update, can be optional
  });

  if (!recipe) {
    return null; // Render nothing if recipe data is not yet fetched
  }

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
                <Header title="Update Recipe" subtitle="Update Recipe Details" />
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleFormSubmit}
                  validationSchema={checkoutSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                  }) => (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Recipes ID"
                          value={recipe_id}
                          disabled
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          name="title"
                          error={!!touched.title && !!errors.title}
                          helperText={touched.title && errors.title}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Instructions"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.instructions}
                          name="instructions"
                          error={!!touched.instructions && !!errors.instructions}
                          helperText={touched.instructions && errors.instructions}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          name="description"
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <input
                          type="file"
                          onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);
                          }}
                          name="image"
                          style={{ gridColumn: "span 4" }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                          Update Recipe
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Form_Recipes_update;
