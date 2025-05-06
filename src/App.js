import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./redux/store";
import theme from "./theme";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/Cart";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>

        {/* ToastContainer to display toast notifications */}
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
