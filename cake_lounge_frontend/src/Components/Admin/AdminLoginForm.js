import { React, Component, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//material ui imports
import { InputAdornment, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

function AdminLoginForm(props) {
  //States and variables
  let navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  //handles email change
  const handleEmailChange = (event) => {
    event.persist();
    setEmail(event.target.value);
  };
  //handles password change
  const handlePasswordChange = (event) => {
    event.persist();
    setPassword(event.target.value);
  };
  //handles form submittion
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/admin/login", { email, password })
        .then((res) => {
          if (res) {
            //setting local storage vatiables

            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
              "admin",
              JSON.stringify(res.data.administrator)
            );
            //resetting input fields
            setEmail("");
            setPassword("");
            //changing the logged state
            props.changeLogedState();
            navigate("../dashboard/overview");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (props.logged) {
    return <></>;
  } else if (props.logged == false) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center  flex-column  mt-5">
        <Form className="w-25" onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              required
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              className="admin_login_text_field w-100"
              type="email"
              name="AdminEmail"
              value={email}
              id="AdminEmail"
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              className="admin_login_text_field w-100 mt-5"
              type="password"
              name="AdminPassword"
              value={password}
              id="AdminPassword"
              onChange={handlePasswordChange}
              placeholder="password"
            />
          </FormGroup>
          <Button className="w-50 m-auto d-block mt-5">Log In</Button>
        </Form>
        <span>
          <Link
            className=" text-decoration-none admin_login_forgot_password mt-3 d-block"
            to="../../admin/help"
          >
            Forgot Password?
          </Link>
        </span>
      </div>
    );
  }
}

export default AdminLoginForm;
