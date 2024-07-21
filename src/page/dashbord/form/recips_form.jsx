import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../header/Header";
import { Sidebar, Topbar } from "../../../scenes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import APIService from "../APIService";

const Form_Recipes = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/ingredients", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setIngredients(resp))
      .catch((error) => console.log(error));
  }, []);

  const handleFormSubmit = (values) => {
    console.log("Form values:", values);
    insertRecipe(values);
  };

  const insertRecipe = (values) => {
    APIService.InsertRecipe(values)
      .then(resp => console.log("Response:", resp))
      .catch(error => console.log("Error:", error));
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <Sidebar isSidebar={isSidebar} />
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
              <Box m="20px">
                <Header title="Create Recipes" subtitle="Create a New Recipe" />
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={checkoutSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4",
                          },
                        }}
                      >
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
                        <Autocomplete
                         multiple
                         id="ingredients"
                         options={ingredients}
                         getOptionLabel={(option) => option.name}
                         onChange={(event, value) => {
                           setSelectedIngredients(value);
                           setFieldValue("ingredients", value);
                         }}
                        renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="filled"
                              label="Ingredients"
                              values={selectedIngredients}
                              error={!!touched.ingredients && !!errors.ingredients}
                              helperText={touched.ingredients && errors.ingredients}

                            />
                          )}
                          sx={{
                            gridColumn: "span 4",
                            maxHeight: 100,
                            overflowY: "auto"
                           }}
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
                          Create New Recipe
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

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  instructions: yup.string().required("required"),
  description: yup.string().required("required"),
  image: yup.mixed().required("required"),
  ingredients: yup.array().min(1, "At least one ingredient is required"),
});

const initialValues = {
  title: "",
  instructions: "",
  description: "",
  image: null,
  ingredients: [],
};

export default Form_Recipes;
