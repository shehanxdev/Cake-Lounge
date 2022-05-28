//React imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
//Fontawesome inports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
//Material Ui imports
import { Avatar, Badge, Button, Divider, Paper } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Backdrop from "@mui/material/Backdrop";

function AdminPostLoginHeader(props) {
  const [open, setOpen] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [prop_pic, setPropPic] = useState(admin.prop_pic);
  const [notifications, setNotification] = useState(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [notVisibility, setNotVisibility] = useState(true);

  //useEffect for fetching notifications
  useEffect(() => {
    async function fetchData() {
      await fetchNotifications();
      console.log(notifications);
    }
    fetchData();
  }, []);

  const fetchNotifications = async () => {
    try {
      axios
        .post("http://localhost:8080/admin/notifications/fetch")
        .then((result) => {
          if (result.data.notifications.length === 0) {
            setNotification(null);
          } else {
            setNotification(result.data.notifications);
          }
          setBadgeCount(result.data.notifications.length);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("[Cake Lounge Frontend] ", error);
    }
  };

  //toggler for backdrop
  const handleOpen = () => {
    setOpen(!open);
  };
  //handles state for hovering on the notification icon
  const handleNotIconHover = () => {
    setNotVisibility(!notVisibility);
  };
  //classes for the notification paper
  var classesForNotification = classnames({
    "d-none": notVisibility,
  });
  //conditional rendering
  if (notifications == null) {
    return (
      <div className="position-fixed w-100 custom_admin_post_login_header_container">
        <nav className="custom_admin_post_login_header d-flex justify-content-between align-items-center pr-4 pl-4 ">
          <h2 className="h2">Cake Lounge</h2>
          <div className="d-flex custom_admin_post_login_header_icons mr-2">
            <Badge
              badgeContent={badgeCount}
              color="primary"
              overlap="circular"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              style={{ transform: "translate(16px,-8px)" }}
            ></Badge>
            <NotificationsIcon
              className="mx-3"
              onClick={() => {
                handleNotIconHover();
              }}
              sx={{ fontSize: 25, color: "white" }}
            />
            <Avatar
              onClick={handleOpen}
              src={prop_pic}
              sx={{ width: 25, height: 25 }}
            />
          </div>
        </nav>
        <div className={classesForNotification}>
          <Paper className="position-absolute admin_post_login_header_notification p-4 d-flex flex-column border shadow-lg rounded">
            <span className="text-primary">No new notifications</span>
          </Paper>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleOpen}
        >
          <Button
            className="pl-3 pr-3"
            variant="contained"
            startIcon={<LogoutIcon></LogoutIcon>}
          >
            <span>Log Out</span>
          </Button>
        </Backdrop>
      </div>
    );
  } else {
    return (
      <div className="position-fixed w-100 custom_admin_post_login_header_container">
        <nav className="custom_admin_post_login_header d-flex justify-content-between align-items-center pr-4 pl-4 ">
          <h2 className="h2">Cake Lounge</h2>
          <div className="d-flex custom_admin_post_login_header_icons mr-2">
            <Badge
              badgeContent={badgeCount}
              color="primary"
              overlap="circular"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              style={{ transform: "translate(16px,-8px)" }}
            ></Badge>
            <NotificationsIcon
              onClick={() => {
                handleNotIconHover();
              }}
              className="mx-3"
              sx={{ fontSize: 25, color: "white" }}
            />
            <Avatar
              onClick={handleOpen}
              src={prop_pic}
              sx={{ width: 25, height: 25 }}
            />
          </div>
        </nav>
        <div className={classesForNotification}>
          <Paper className="position-absolute admin_post_login_header_notification p-4 d-flex flex-column border shadow-lg rounded">
            {notifications.map((notification, ID) => (
              <>
                <div
                  key={ID}
                  className="rounded align-items-start p-2"
                  style={{ cursor: "pointer" }}
                >
                  <p className="h5">{notification.action} </p>
                  <p>{notification.date.toString()}</p>
                </div>
                <Divider />
              </>
            ))}
            <span
              onClick={() => {
                setNotification(null);
                setBadgeCount(0);
              }}
              className="d-block text-primary m-3"
            >
              Clear all notification
            </span>
          </Paper>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleOpen}
        >
          <Button
            className="pl-3 pr-3"
            variant="contained"
            startIcon={<LogoutIcon></LogoutIcon>}
          >
            <span>Log Out</span>
          </Button>
        </Backdrop>
      </div>
    );
  }
}
export default AdminPostLoginHeader;
