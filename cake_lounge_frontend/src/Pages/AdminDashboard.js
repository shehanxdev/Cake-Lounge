import react, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
//component imports
import AdminPostLoginHeader from "../Components/Admin/AdminPostLoginHeader";
import AdminDahsboardSideNav from "../Components/Admin/AdminDahsboardSideNav";
import AdminDashboardOverview from "../Components/Admin/AdminDashboardOverview";
import AdminDashboardUsers from "../Components/Admin/AdminDashboardUsers";
import AdminLog from "../Components/Admin/AdminLog";
import AdminDashboardMessage from "../Components/Admin/AdminDashboardMessage";
import AdminDahsboardAnalytics from "../Components/Admin/AdminDashboardAnalytics";
import AdminSupport from "../Components/Admin/AdminSupport";

function AdminDashboard(props) {
  const [shops, setShops] = useState(null);
  const [orders, setOrders] = useState([{}]);
  const token = localStorage.getItem("token");
  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    const fetchDashboardOverviewData = async () => {
      await axios
        .post("http://localhost:8080/admin/dashboard", { token, admin })
        .then((result) => {
          setShops(result.data.shops);

          setOrders(result.data.orders);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchDashboardOverviewData();
  }, []);

  if (shops == null) {
    return <h1>Loading.....</h1>;
  } else {
    return (
      <>
        <AdminPostLoginHeader></AdminPostLoginHeader>
        <div className="d-flex">
          <AdminDahsboardSideNav></AdminDahsboardSideNav>
          <Routes>
            <Route
              path="users"
              element={<AdminDashboardUsers></AdminDashboardUsers>}
            ></Route>
            <Route
              path="overview"
              element={
                <AdminDashboardOverview
                  shop={shops}
                  orders={orders}
                ></AdminDashboardOverview>
              }
            ></Route>
            <Route path="logs/new" element={<AdminLog></AdminLog>}></Route>
            <Route
              path="message/all"
              element={<AdminDashboardMessage></AdminDashboardMessage>}
            ></Route>
            <Route
              path="analytics"
              element={
                <AdminDahsboardAnalytics
                  orders={orders}
                ></AdminDahsboardAnalytics>
              }
            ></Route>
            <Route
              path="support"
              element={<AdminSupport></AdminSupport>}
            ></Route>
          </Routes>
        </div>
      </>
    );
  }
}

export default AdminDashboard;
