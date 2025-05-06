"use client";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));

    // Cleanup function
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
  };

  const handleGoBack = () => {
    navigate("/products");
  };

  if (status === "loading") {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (status === "failed") {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            mt: 2,
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  if (!selectedProduct) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ my: 2 }}>
          Product not found.
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            mt: 2,
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/products");
          }}
        >
          Products
        </Link>
        <Typography color="text.primary">{selectedProduct.title}</Typography>
      </Breadcrumbs>

      <Paper elevation={5} sx={{ p: 3, borderRadius: 2, boxShadow: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "white",
                p: 2,
                borderRadius: 2,
                boxShadow: 4,
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 12,
                },
              }}
            >
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              {selectedProduct.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                value={selectedProduct.rating.rate}
                precision={0.5}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "primary.main",
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({selectedProduct.rating.count} reviews)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${selectedProduct.price.toFixed(2)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" paragraph>
              {selectedProduct.description}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Category:{" "}
              {selectedProduct.category.charAt(0).toUpperCase() +
                selectedProduct.category.slice(1)}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{
                  mr: 2,
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "scale(1.05)",
                    boxShadow: 4,
                  },
                }}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                onClick={handleGoBack}
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                Back to Products
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;
