import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import React from "react";
import "./login.css";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import {
  Button,
  CardActions,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../components/redux/actions";
import { useSelector } from "react-redux";

export default function Login() {
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const loggedIn = useSelector((state) => state.login.isLoggedin);
  useEffect(() => {
    navigate("/reports");
  }, [loggedIn]);

  console.log("logged in ", loggedIn);
  const dispatch = useDispatch();
  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setValues({
      email: "",
      password: "",
      showPassword: false,
    });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
    reset();
  };

  const close = () => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  useEffect(() => {
    if (error) {
      closeError();
    }
    if (alert) {
      close();
    }
  }, [error, alert]);

  const closeError = () => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const onSubmit = (userObj) => {
    console.log("userObj", userObj);
    dispatch(LOGIN_USER({ email: values.email, password: values.password }));
    /* axios
      .post("http://localhost:7000/login", userObj)
      .then((res) => {
        if (res.status === 200) {
          console.log("login response ==", res.data);
          localStorage.setItem("token", res.data.token);
          setAlert(true);
          setError(false);
          setTimeout(function () {
            console.log("Delayed for 5 second.");
            setLoading(true);
          }, 5000);
          navigate("/reports");
        } else setError(true);
      })
      .catch((error) => setError(true));*/
  };

  return (
    <section className="container">
      <Box sx={{ minWidth: 600 }}>
        <Card
          variant="outlined"
          style={{ paddingRight: "20px", borderRadius: "10px" }}
        >
          <CardContent>
            {alert && (
              <Alert severity="success" onClose={close}>
                logged in successfully
              </Alert>
            )}
            {error && (
              <Alert severity="error" onClose={closeError}>
                Unauthorized user
              </Alert>
            )}
            {loading && (
              <Box>
                <CircularProgress color="primary" size="md" value={30} />
              </Box>
            )}
            <Typography
              component="div"
              variant="body2"
              sx={{ fontSize: 30 }}
              style={{ color: "blue", textAlign: "center", fontWeight: "bold" }}
              gutterBottom
            >
              Login
            </Typography>

            <Typography component={"div"}>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <br />
                <InputLabel htmlFor="username">Email or Username</InputLabel>
                <Input
                  id="username"
                  name="email"
                  type={"text"}
                  value={values.email}
                  onChange={onInputChange}
                />
              </FormControl>
              <br />
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={onInputChange}
                  type={values.showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onChange={onInputChange}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Typography>
          </CardContent>
          <CardActions style={{ display: "block" }}>
            <Button
              onClick={handleSubmit}
              type="submit"
              style={{ marginLeft: "12px" }}
              variant="outlined"
              size="medium"
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Box>
    </section>
  );
}
