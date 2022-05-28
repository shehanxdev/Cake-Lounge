import React, { useState } from "react";
import axios from "axios";
//importing material ui components
import { Chip, Divider, Button } from "@mui/material";
//importing charts
import AdminDashboardAnalyticsDoughnut from "./AdminDashboardAnalyticsDoughnut";
import AdminDashboardAnalyticsSocialMediaBar from "./AdminDashboardAnalyticsSocialMediaBar";
import { AdminDashboardAnalyticsVerticalBarChart } from "./AdminDashboardAnalyticsVerticalBarChart";
import AdminDashboardOverviewChart from "./AdminDashboardOverviewChart";
import AdminDashboardAnalyticsSpeedDial from "./AdminDashboardAnalyticsSpeedDial";
//importing pdf generator
import generate from "../../functions/pdfGenerator";

export default function AdminDahsboardAnalytics(props) {
  //Component states
  const [socialmedia, setSocialMedia] = useState(null);
  const [orders, setOrders] = useState(null);
  const [userDevice, setuserDevice] = useState(null);
  const [bouncerate, setBounceRate] = useState(null);

  //handles print function
  const handlePrintReport = () => {
    console.log(bouncerate);
    generate(orders, userDevice, bouncerate);
  };
  return (
    <div className="d-flex flex-grow-1 p-5 flex-column admin_dahsboard_analytics ">
      <Divider>Social media perfomances</Divider>
      <div id="admin_dashboard_spacer_top"></div>
      <AdminDashboardAnalyticsSocialMediaBar setSocialMedia={setSocialMedia} />
      <div id="admin_dashboard_spacer_bottom"></div>

      <Divider>Sales performances</Divider>
      <div id="admin_dashboard_spacer_top"></div>
      <AdminDashboardOverviewChart
        orders={props.orders}
        setOrders={setOrders}
      />
      <div id="admin_dashboard_spacer_bottom"></div>
      <div id="admin_dashboard_spacer_bottom"></div>
      <Divider>Technical analysis</Divider>
      <div id="admin_dashboard_spacer_top"></div>
      <div className="d-flex justify-content-around align-items-center ">
        <div className="chartWrapper shadow-lg rounded p-3 mx-5 custom-border">
          <h5 className="h5 text-center my-3">
            Users based on the type of device
          </h5>
          <AdminDashboardAnalyticsDoughnut setuserDevice={setuserDevice} />
          <p style={{ marginTop: "40px", fontSize: "20px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            cupiditate fuga beatae modi explicabo adipisci blanditiis labore,
            quae pariatur magni dignissimos culpa atque nemo laboriosam eaque!
            Doloribus sunt tempora nemo omnis sapiente culpa ex maxime,
            dignissimos adipisci praesentium totam vel illum, placeat dolore nam
            perferendis assumenda dolorum quibusdam aliquam animi quas
            blanditiis earum repellat voluptas.
          </p>
        </div>
      </div>
      <div className="admin_dahsboard_analytics_vetical_bar shadow-lg rounded p-3 mx-5 custom-border d-flex">
        <AdminDashboardAnalyticsVerticalBarChart
          className="flex-grow-1"
          setBounceRate={setBounceRate}
        />
        <p
          className="col-md-3"
          style={{ marginLeft: "10px", fontSize: "20px", alignSelf: "center" }}
        >
          <b>Bounce Rate</b>
          <br />
          Bounce Rate is the rate of which users leave the site after entering
          for one reason or the other. You should keep eye on the rate as an
          increase in this rate indicates that tyour app fails to attract and
          satisfy users. According to google, main resons for increased bounce
          rate are,
          <ul>
            <li>Poor speed</li>
            <li>Lack of intuative UI</li>
            <li>Lack of Call to Actions</li>
          </ul>
        </p>
      </div>
      <AdminDashboardAnalyticsSpeedDial handlePrintReport={handlePrintReport} />
    </div>
  );
}
