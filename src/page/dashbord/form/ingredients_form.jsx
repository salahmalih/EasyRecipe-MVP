import React, { useState } from "react";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../header/Header";
import { Sidebar, Topbar } from "../../../scenes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import APIService from "../APIService";

const Form_ingredients = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category

  // Define static options for the category Autocomplete
  const categoryOptions = [
    "Vegetables",
    "Fruits",
    "Proteins",
    "Grains and Legumes",
    "Dairy and Alternatives",
    "Herbs and Spices",
    "Condiments and Oils",
  ];

  const handleFormSubmit = (values) => {
    console.log("Form values:", values);
    Insertingredient(values);
    initialValues()
  };

  const Insertingredient = (values) => {
    APIService.Insertingredient(values)
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
                <Header title="Create Ingredients" subtitle="Create a New Ingredients" />
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
                    setFieldValue,
                    handleChange,
                    handleSubmit,
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
                          label="Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <Autocomplete
                          id="category"
                          value={selectedCategory}
                          onChange={(event, newValue) => {
                            setFieldValue("category", newValue); // Update Formik field value
                            setSelectedCategory(newValue); // Update local state
                          }}
                          options={categoryOptions}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="filled"
                              label="Category"
                              error={!!touched.category && !!errors.category}
                              helperText={touched.category && errors.category}
                            />
                          )}
                          sx={{
                            gridColumn: "span 4",
                            maxHeight: 100,
                            overflowY: "auto",
                          }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                          Create New Ingredients
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
  name: yup.string().required("Required"),
  category: yup.string().nullable().required("Required"), // Validate category as string and required
});

const initialValues = {
  name: "",
  category: null, // Initialize category as null
};

export default Form_ingredients;
