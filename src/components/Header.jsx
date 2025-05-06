"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutUser } from "../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            letterSpacing: 1.2,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          🛒 E-Shop
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component={Link}
              to="/products"
              sx={{
                color: "#fff",
                fontWeight: 500,
                borderRadius: "20px",
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              Products
            </Button>

            <IconButton component={Link} to="/cart" size="large" sx={{ color: "#fff" }}>
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              onClick={handleClick}
              sx={{
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <AccountCircleIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  px: 1,
                  background: "#f9f9f9",
                  color: "#333",
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <MenuItem disabled sx={{ fontWeight: 600 }}>
                {currentUser?.firstName} {currentUser?.lastName}
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ fontWeight: 500 }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "#fff",
                fontWeight: 500,
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                backgroundColor: "#ff9800",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "20px",
                px: 3,
                "&:hover": {
                  backgroundColor: "#fb8c00",
                },
              }}
            >
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
