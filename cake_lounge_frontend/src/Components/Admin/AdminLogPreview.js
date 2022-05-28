import React, { useEffect, useState } from "react";
import { Form } from "reactstrap";

//Material Ui components
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

//Date formatter
import { format } from "date-fns";

export default function AdminLogPreview(props) {
  const [logs, setLogs] = useState(props.logs);
  const [open, setopen] = useState(false);
  const [urgency, setUrgency] = useState("Urgent");
  const [date, setDate] = useState();
  const [content, setContent] = useState("");
  useEffect(() => {
    setLogs(props.logs);
    setDate(fetchDate);
  }, []);

  //backdrop toggler
  const handleToggle = () => {
    setopen(!open);
  };
  //fetch current date
  const fetchDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  //handle form urgency field change
  const handleFormUrgencyFieldChange = (event) => {
    setUrgency(event.target.value);
  };

  //handle form content field change
  const handleFormContentFieldChange = (event) => {
    setContent(event.target.value);
  };

  //send data to the backend
  const handleSubmit = () => {
    const log = { log: { content: content, date: date, flag: urgency } };
    props.createLog(log);
  };
  //rendering
  if (logs === null) {
    return <></>;
  } else {
    return (
      <div className="col-4 custom_admin_log_preview p-4 d-flex flex-column ">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="h4">Logs</h4>
          <AddIcon
            sx={{ color: "white", cursor: "pointer" }}
            className="custom_admin_log_add_new "
            onClick={handleToggle}
          />
        </div>
        {logs.map((log) => (
          <Card
            className="mt-4 admin_log_preview_card"
            onClick={() => {
              props.setCurrentLog(log);
            }}
          >
            <CardHeader
              className="pb-0"
              subheader={log.flag}
              action={
                <CloseIcon
                  onClick={() => {
                    props.deleteLog(log);
                  }}
                  style={{ cursor: "pointer" }}
                />
              }
            />
            <CardContent>
              <b>{log.content}.....</b> <br />
              {format(new Date(log.date), "yyyy-MM-dd")}
            </CardContent>
          </Card>
        ))}
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <Form className="p-5 bg-white w-25 rounded">
              <div className="mb-4 d-flex flex-column">
                <CloseIcon
                  onClick={handleToggle}
                  fontSize="large"
                  sx={{ color: "red", display: "block", cursor: "pointer" }}
                />
                <h4 className="h4 text-dark mt-4">New Log</h4>
              </div>
              <TextField
                required
                label={"Date"}
                className="mb-4"
                variant="outlined"
                fullWidth
                value={fetchDate()}
              />
              <TextField
                required
                label={"Urgency Level"}
                className="mb-4"
                select
                fullWidth
                value={urgency}
                onChange={handleFormUrgencyFieldChange}
              >
                <MenuItem key="Urgent" value="Urgent">
                  Urgent
                </MenuItem>
                <MenuItem key="Important" value="Important">
                  Important
                </MenuItem>
                <MenuItem key="Medium" value="Medium">
                  Medium
                </MenuItem>
              </TextField>
              <TextField
                required
                multiline
                maxRows={20}
                label={"Content"}
                className="mb-4"
                variant="outlined"
                fullWidth
                value={content}
                onChange={handleFormContentFieldChange}
              />
              <Button
                className="mt-3"
                variant="contained"
                onClick={handleSubmit}
              >
                Create a New Log
              </Button>
            </Form>
          </Backdrop>
        </div>
      </div>
    );
  }
}
