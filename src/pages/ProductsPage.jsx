"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../components/ProductCard";
import {
  fetchProducts,
  fetchCategories,
  filterProductsByCategory,
} from "../redux/slices/productSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {  filteredProducts, categories, status, error } = useSelector(
    (state) => state.products
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // Filter products based on search term
    if (searchTerm.trim() === "") {
      setDisplayedProducts(filteredProducts);
    } else {
      const filtered = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedProducts(filtered);
    }
  }, [searchTerm, filteredProducts]);

  const handleCategoryChange = (event) => {
    dispatch(filterProductsByCategory(event.target.value));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>

      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            defaultValue="all"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === "all"
                  ? "All Categories"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {status === "failed" && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {status === "succeeded" && displayedProducts.length === 0 && (
        <Alert severity="info" sx={{ my: 2 }}>
          No products found.
        </Alert>
      )}

      <Grid container spacing={3}>
        {displayedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
