"use client";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  IconButton,
  Divider,
  TextField,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <ShoppingCartIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/products"
            sx={{
              mt: 2,
              background: "linear-gradient(45deg, #ff6f61, #ff9e80)",
              "&:hover": { background: "linear-gradient(45deg, #ff9e80, #ff6f61)" },
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                {items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3} sm={2}>
                        <Box
                          sx={{
                            height: 80,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            p: 1,
                            borderRadius: 1,
                            boxShadow: 2,
                          }}
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={9} sm={4}>
                        <Typography
                          variant="subtitle1"
                          component={Link}
                          to={`/products/${item.id}`}
                          sx={{
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: "bold",
                            "&:hover": { color: "primary.main", textDecoration: "underline" },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>

                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value);
                              if (!isNaN(value)) {
                                handleUpdateQuantity(item.id, value);
                              }
                            }}
                            inputProps={{
                              min: 1,
                              style: { textAlign: "center" },
                            }}
                            sx={{
                              width: 60,
                              mx: 1,
                              border: "1px solid #ddd",
                              borderRadius: 1,
                              transition: "all 0.3s",
                              "&:focus": { borderColor: "#3f51b5" },
                            }}
                          />

                          <IconButton
                            size="small"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>

                      <Grid item xs={4} sm={2} sx={{ textAlign: "right" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid item xs={2} sm={1} sx={{ textAlign: "right" }}>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearCart}
                    sx={{
                      borderRadius: "30px",
                      "&:hover": {
                        backgroundColor: "#f8d7da",
                        borderColor: "#f5c6cb",
                      },
                    }}
                  >
                    Clear Cart
                  </Button>

                  <Button
                    variant="outlined"
                    component={Link}
                    to="/products"
                    sx={{
                      borderRadius: "30px",
                      "&:hover": {
                        backgroundColor: "#e0f7fa",
                        borderColor: "#80deea",
                      },
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Subtotal ({totalQuantity} items)</Typography>
                  <Typography variant="body1">${totalAmount.toFixed(2)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">$0.00</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Tax</Typography>
                  <Typography variant="body1">$0.00</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    background: "linear-gradient(45deg, #3f51b5, #2196f3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #2196f3, #3f51b5)",
                    },
                  }}
                >
                  Checkout
                </Button>

                <Alert severity="info" sx={{ mt: 2 }}>
                  This is a demo application. Checkout functionality is not
                  implemented.
                </Alert>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Cart;
