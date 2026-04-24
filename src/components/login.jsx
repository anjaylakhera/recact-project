import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCurrentUser } from '../store/userSlice';

// Zod Schema
const schema = z.object({
  email: z.string().min(2, "Email must be at least 2 character"),
  password: z.string().min(6, "Password must be at least 6 characters").max(10, "Password must not exceed 10 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    const baseURL = import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com";

    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.email, // make sure this is actually username
          password: data.password,
        }),
      });

      const result = await response.json();

      // if (!response.ok) {
      //   setErrorMessage(result.message || "Invalid credentials");
      //   return;
      // }

      setSuccessMessage("Login successful");

      const user = result;
      dispatch(setCurrentUser(user));

      navigate("/users");
    } catch (error) {
      setErrorMessage(error.message || "Unable to login");
      console.error("Login error", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center">
          Login
        </Typography>

        {errorMessage && (
          <Typography variant="body2" color="error" mb={2} align="center">
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body2" color="success.main" mb={2} align="center">
            {successMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;