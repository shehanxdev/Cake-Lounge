import React, { useState } from "react";
//React router imports
import { Link } from "react-router-dom";
//componenets
import AdminDashboardOverviewChart from "./AdminDashboardOverviewChart";
import AdminDashboardOverviewPieChart from "./AdminDashboardOverviewPieChart";
//Material UI imports
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Avatar, Stack } from "@mui/material";

function AdminDashboardOverview(props) {
  const [shops, setShops] = useState(props.shop);
  return (
    <div className="flex-grow-1 p-5 d-flex justify-content-center admin_dashboard_overview_container">
      <div className="d-flex flex-column ">
        <div className="d-flex flex-row justify-content-between ">
          <div className="d-flex col-7 h-75 flex-column">
            <h1 className="h1 mb-5">Hello Shehan,</h1>
            <div className="p-4  shadow admin_dashboard_boxed_container ">
              <h3 className="h3">Top Sellers</h3>
              <Link to="/">
                See More <ArrowRightAltIcon />
              </Link>
              <Stack className="mt-4" direction="row" spacing={3}>
                {shops.map((shop, index) => {
                  return (
                    <div>
                      <Avatar
                        src={shop.appearance.prop_pic}
                        key={index}
                        sx={{ width: 110, height: 110 }}
                      />
                      <span className="d-block text-center">{shop.name}</span>
                    </div>
                  );
                })}
              </Stack>
            </div>
          </div>
          <div className="p-4 col-4 shadow admin_dashboard_boxed_container">
            <AdminDashboardOverviewPieChart></AdminDashboardOverviewPieChart>
          </div>
        </div>

        <AdminDashboardOverviewChart orders={props.orders} />
      </div>
    </div>
  );
}
export default AdminDashboardOverview;
