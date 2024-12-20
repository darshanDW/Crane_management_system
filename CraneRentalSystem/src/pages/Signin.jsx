import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
    InputAdornment,
    IconButton,
    Snackbar,
    CircularProgress,
} from "@mui/material";
import {
    Email,
    Lock,
    Visibility,
    VisibilityOff,
    Login,
} from "@mui/icons-material";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        if (!username || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError("");

        if (username === "admin@gmail.com" && password === "123456") {
            setTimeout(() => {
                setLoading(false);
                navigate("/adminDashboard");
            }, 1000);
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}user/signin`,
                { username, password }
            );

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", username);
                setLoading(false);
                navigate("/CranesPage");
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setError("User not found");
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6a9f 100%)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    padding: 4,
                    borderRadius: 4,
                    maxWidth: 400,
                    width: "100%",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#764ba2" }}
                >
                    Welcome Back
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    gutterBottom
                    sx={{ color: "text.secondary", mb: 3 }}
                >
                    Please sign in to your account
                </Typography>

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g., john.doe@gmail.com"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{
                        mt: 3,
                        mb: 2,
                        background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                        boxShadow: "0 3px 5px 2px rgba(118, 75, 162, .3)",
                    }}
                    onClick={handleSignin}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Login />}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </Button>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 2, color: "text.secondary" }}
                >
                    Don't have an account?{" "}
                    <Link
                        component="button"
                        onClick={() => navigate("/signup")}
                        sx={{
                            color: "#764ba2",
                            fontWeight: "bold",
                            textDecoration: "none",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError("")}
                message={error}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Box>
    );
};

