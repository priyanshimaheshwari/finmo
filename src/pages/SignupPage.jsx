"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Alert,
  Grid,
} from "@mui/material";
import { registerUser, clearError } from "../redux/slices/authSlice";

// Validation schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  React.useEffect(() => {
    // Clear any previous errors
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (values, { setSubmitting }) => {
    const { firstName, lastName, email, password } = values;

    dispatch(
      registerUser({
        firstName,
        lastName,
        email,
        password,
      })
    );

    setSubmitting(false);

    // If no error, navigate to login
    if (!error) {
      navigate("/login");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 5, mt: 8, borderRadius: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  mt: 3,
                  padding: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Sign Up
              </Button>

              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#3f51b5", fontWeight: "bold" }}>
                    Login
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default SignupPage;
