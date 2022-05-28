import React, { useRef, useState } from "react";
//Assets import
import SupportHeaderImage from "../../Assets/Support_background.png";
//reactstrap Imports
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
//importing email js to send emails
import emailjs from "@emailjs/browser";
//customized alerts
import Swal from "sweetalert2";

export default function AdminSupport(props) {
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMail();
  };
  const sendMail = () => {
    if (subject == null || message == null) {
      alert("Fill all the fields");
    } else {
      emailjs
        .send(
          "service_mg4cytm",
          "template_byazlih",
          { Subject: subject, Message: message },
          "JID1GLXwrmpX1BqfF"
        )
        .then(
          (result) => {
            setMessage("");
            setSubject("");
            Swal.fire("Successful", "Email Sent", "success");
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          }
        );
    }
  };
  const handleSubjectChange = (event) => {
    event.preventDefault();
    setSubject(event.target.value);
  };
  const handleMessageChange = (event) => {
    event.preventDefault();
    setMessage(event.target.value);
  };
  //rendering the component
  return (
    <div className="d-flex flex-grow-1 p-5 flex-column custom_admin_dashboard_support">
      <div className="d-flex flex-column">
        <section style={{ backgroundImage: `url(${SupportHeaderImage})` }}>
          <div>
            <h1 className="display-1 text-center mt-5">Support Center</h1>
          </div>
        </section>
        <Form className="p-4 shadow" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Subject</Label>
            <Input
              type="text"
              value={subject}
              name="Subject"
              id="Subject"
              placeholder="Enter Your Subject"
              onChange={(event) => {
                handleSubjectChange(event);
              }}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              value={message}
              type="textarea"
              style={{ height: "300px" }}
              name="Message"
              id="Message"
              onChange={(event) => {
                handleMessageChange(event);
              }}
              required
            />
          </FormGroup>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
