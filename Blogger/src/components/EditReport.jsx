import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { api } from "../api/apiconfig";

export default function EditReport({ reportData, value }) {
  const [id, setId] = useState(null);
  const [customEmail, setCustomEmail] = useState([]);
  const [edit, setEdit] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const removeCustomEmail = (index) => {
    setCustomEmail(customEmail.filter((_, i) => index !== i));
  };

  const addEmail = (event) => {
    if (customEmail !== "" && !customEmail.includes(event.target.value)) {
      setCustomEmail([...customEmail, event.target.value]);
    } else {
      setDuplicate(true);
    }
    event.target.value = "";
  };

  const editEmail = (userObj) => {
    setEdit(true);
    setCustomEmail(userObj.emails);
    setId(userObj.reportId);
  };

  const updateEmail = () => {
    const payload = {
      reportname: "report1",
      emails: customEmail,
    };
    axios
      .put(`${api}/${id}`, payload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setEdit(false);
    setCustomEmail([]);
    setId(null);
    value(true);
  };

  const deleteReport = () => {
    axios
      .delete(`${api}/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setCustomEmail([]);
    setId(null);
    value(true);
  };

  const cancel = () => {
    setEdit(false);
    setCustomEmail([]);
    setId(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Report Id</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Report Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Reciepents List
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData &&
              reportData.map((rep, index) => (
                <TableRow key={index}>
                  <TableCell>{rep.reportId}</TableCell>
                  <TableCell>{rep.reportname}</TableCell>
                  <TableCell>
                    {edit && id === rep.reportId ? (
                      <>
                        <TextField
                          type={"email"}
                          sx={{ mb: 2 }}
                          variant="outlined"
                          label="Email"
                          name="customEmail"
                          onKeyDown={(e) => {
                            e.key === "Enter" ? addEmail(e) : null;
                          }}
                        />
                        <Stack direction="row" spacing={1}>
                          {customEmail &&
                            customEmail.map((recipient, ind) => (
                              <Chip
                                key={ind}
                                label={recipient}
                                color="primary"
                                variant="outlined"
                                style={{
                                  marginRight: "8px",
                                  cursor: "pointer",
                                }}
                                onDelete={() => removeCustomEmail(ind)}
                              />
                            ))}
                        </Stack>
                      </>
                    ) : (
                      <>
                        {rep.emails.map((recipient, i) => (
                          <Chip
                            key={i}
                            label={recipient}
                            color="primary"
                            variant="outlined"
                            style={{ marginRight: "8px", cursor: "pointer" }}
                          />
                        ))}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {id !== rep.reportId && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => editEmail(rep)}
                      >
                        Edit
                      </Button>
                    )}

                    {edit && id === rep.reportId && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: 2 }}
                          onClick={() => updateEmail()}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => cancel()}
                        >
                          Cancel
                        </Button>
                        <Button
                          sx={{ ml: 2, mr: 2 }}
                          variant="contained"
                          color="error"
                          onClick={() => {
                            if (window.confirm("Are you sure to delete?")) {
                              deleteReport();
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
