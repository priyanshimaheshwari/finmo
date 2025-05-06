"use client";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Rating, Box } from "@mui/material";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify"; // Import toast

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch the addToCart action
    toast.success(`${product.title} added to cart!`, {
      position: "top-right", // Toast position
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: false, // Show progress bar
      closeOnClick: true, // Close on click
      pauseOnHover: true, // Pause on hover
      draggable: true, // Enable drag
      progress: undefined, // Optional: Can be used for showing progress
    });
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        background: "#fff",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", p: 2, backgroundColor: "#f9f9f9" }}
      />
      <CardContent sx={{ flexGrow: 1, px: 3 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          sx={{ fontWeight: 600 }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 1,
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Rating
            value={product.rating.rate}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.rating.count})
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: "#2e7d32",
            mt: 1,
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          component={Link}
          to={`/products/${product.id}`}
          size="small"
          variant="outlined"
          sx={{
            borderRadius: "20px",
            fontWeight: 500,
            textTransform: "none",
            borderColor: "#2196f3",
            color: "#2196f3",
            "&:hover": {
              backgroundColor: "#e3f2fd",
              borderColor: "#1976d2",
              color: "#1976d2",
            },
          }}
        >
          View Details
        </Button>

        <Button
          size="small"
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            backgroundColor: "#ff9800",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#fb8c00",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
