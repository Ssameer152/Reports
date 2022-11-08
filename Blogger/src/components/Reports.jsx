import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import EditReport from "./EditReport";

export default function Reports() {
  const [report, setReport] = useState([]);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState([]);
  const [duplicate, setDuplicate] = useState(false);
  const navigate = useNavigate();
  useEffect(
    async (reportData) => {
      await axios
        .get("http://localhost:7000/reports", reportData)
        .then((res) => {
          setReport(res.data);
        });
      setEdit(false);
    },
    [!edit]
  );

  const getUpdate = (value) => {
    console.log("value ,", value);
    setEdit(value);
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const onEmailEnter = (event) => {
    if (email.length === 0) {
      alert("email cannot be empty");
      setEmail([...email, ""]);
    }
    if (email !== "" && !email.includes(event.target.value)) {
      setEmail([...email, event.target.value]);
    } else {
      setDuplicate(true);
    }

    event.target.value = "";
  };

  const removeEmail = (index) => {
    setEmail(email.filter((_, i) => index !== i));
  };
  // add report

  const add = () => {
    if (email.length > 0) {
      const payload = {
        reportName: "report1",
        emails: email,
      };
      axios
        .post("http://localhost:7000/report", payload)
        .then((res) => {
          console.log("response", res.data);
          setEdit(true);
          setEmail([]);
        })
        .catch((err) => console.log(err));
    } else {
      alert("email cannot be empty");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Typography
        variant="h1"
        sx={{ fontSize: 30 }}
        style={{
          color: "green",
          textAlign: "center",
          fontWeight: "bold",
          textDecoration: "underline",
          marginTop: "10px",
        }}
        gutterBottom
      >
        Reports List
      </Typography>
      <Button
        onClick={() => logout()}
        type="button"
        variant="outlined"
        size="medium"
        sx={{ float: "right" }}
      >
        Logout
      </Button>
      <Box sx={{ minWidth: 700 }}>
        <Card
          variant="outlined"
          style={{ paddingRight: "20px", borderRadius: "10px" }}
        >
          <CardContent>
            <Typography component={"div"} sx={{ m: 2 }}>
              <FormControl sx={{ m: 2, width: "35ch" }} variant="standard">
                {duplicate && (
                  <Alert severity="error" variant="filled" sx={{ m: 2 }}>
                    Email already exists in queue
                  </Alert>
                )}
                <TextField
                  required={true}
                  id="email"
                  helperText={email.length > 0 ? "Empty email" : ""}
                  variant="outlined"
                  label="Email(reciepents)"
                  name="email"
                  typeof="email"
                  onKeyDown={(e) => {
                    e.key === "Enter" ? onEmailEnter(e) : null;
                  }}
                  placeholder="enter email"
                />
                <input type={"hidden"} name="reportName" value={"r1"} />
              </FormControl>
              <div style={{ width: "100%" }}>
                {email.length > 0 &&
                  email.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      variant="outlined"
                      color="primary"
                      style={{ padding: "4px", marginRight: "4px" }}
                      onDelete={() => {
                        removeEmail(index);
                      }}
                    />
                  ))}
              </div>
            </Typography>
          </CardContent>
          <CardActions style={{ display: "block" }}>
            <Button
              type="button"
              variant="outlined"
              size="medium"
              style={{ margin: "10px" }}
              onClick={add}
            >
              Update recipient
            </Button>
          </CardActions>
        </Card>
      </Box>
      <EditReport reportData={report} value={getUpdate} />
    </>
  );
}
