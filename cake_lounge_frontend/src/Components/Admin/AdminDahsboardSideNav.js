//General imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

//Material UI imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Avatar } from "@mui/material";

function AdminDahsboardSideNav(props) {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [prop_pic, setPropPic] = useState(admin.prop_pic);

  return (
    <div className="container-fliud min-vh-100 shadow-lg d-flex flex-column  custom_admin_dashboard_side_nav align-items-center  pt-5 position-fixed">
      <div className="mt-5">
        <Avatar
          className="mt-5"
          src={prop_pic}
          sx={{ width: 170, height: 170 }}
        />
        <span className="d-block text-center mt-2">Shehan Chanuka</span>
      </div>

      <div className="custom_admin_dashboard_sidenav_links p-4">
        <Accordion className="w-100 mt-4" sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4 className="h4">
              <DashboardIcon /> Dashboard
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <ul>
                <li className="list-unstyled">
                  <Link
                    className="text-decoration-none text-dark"
                    to="../../admin/dashboard/overview"
                  >
                    Overview
                  </Link>
                </li>

                <li className="list-unstyled">
                  <Link
                    className="text-decoration-none text-dark"
                    to="../../admin/dashboard/users"
                  >
                    Users
                  </Link>
                </li>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Products
                  </a>
                </li>
                <li className="list-unstyled">
                  <Link
                    className="text-decoration-none text-dark"
                    to="../../admin/dashboard/analytics"
                  >
                    Analytics
                  </Link>
                </li>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <h4 className="h4">
              <EmailIcon /> Messages
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <ul>
                <li className="list-unstyled">
                  <Link
                    className="text-decoration-none text-dark"
                    to="../../admin/dashboard/message/all"
                  >
                    View Messages
                  </Link>
                </li>
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <h4 className="h4">
              <AssignmentIcon /> Logs
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <ul>
                <li className="list-unstyled">
                  <Link
                    className="text-decoration-none text-dark"
                    to="../../admin/dashboard/logs/new "
                  >
                    View Logs
                  </Link>
                </li>
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <h4 className="h4">
              <HelpCenterIcon /> Support
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <ul>
                <li className="list-unstyled">
                  <Link
                    className="text-decoration-none text-dark"
                    to="../../admin/dashboard/support"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="flex-grow-1">
        <span className="position-relative bottom-0 ">
          Made with ❤ by Shehan Chanuka
        </span>
      </div>
    </div>
  );
}
export default AdminDahsboardSideNav;
