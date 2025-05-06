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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutUser } from "../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            E-Shop
          </Link>
        </Typography>

        {isAuthenticated ? (
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="inherit" component={Link} to="/products">
                Products
              </Button>

              <IconButton
                color="inherit"
                component={Link}
                to="/cart"
                sx={{ ml: 1 }}
              >
                <Badge badgeContent={totalQuantity} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton color="inherit" onClick={handleClick} sx={{ ml: 1 }}>
                <AccountCircleIcon />
              </IconButton>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem disabled>
                  {currentUser?.firstName} {currentUser?.lastName}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
