import { Divider, Paper } from "@mui/material";
import React, { useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function AdminDashboardAnalyticsSocialMediaBar(props) {
  useEffect(() => {
    props.setSocialMedia([
      [2340, 459],
      [2330, 455],
      [20555, 1000022],
    ]);
  }, []);
  return (
    <div className="d-flex admin_dashboard_analytics-socialmedia-bar justify-content-center mb-5 mt-4 ">
      <Paper className="d-flex  p-4 mx-5 bg-white" elevation={12}>
        <FacebookIcon sx={{ fontSize: 70, color: "#4267B2" }} />
        <Divider style={{ height: "100%" }} orientation="vertical"></Divider>
        <div className="d-flex flex-column mx-4">
          <h3 className="h3">2K+</h3>
          <span>Group Members</span>
        </div>
        <Divider style={{ height: "100%" }} orientation="vertical"></Divider>
        <div className="d-flex flex-column mx-4">
          <h3 className="h3">459</h3>
          <span>Feeds</span>
        </div>
      </Paper>
      <Paper className="d-flex  p-4 mx-5 bg-white" elevation={12}>
        <TwitterIcon sx={{ fontSize: 70, color: "#1DA1F2" }} />
        <Divider style={{ height: "100%" }} orientation="vertical"></Divider>
        <div className="d-flex flex-column mx-4">
          <h3 className="h3">2K+</h3>
          <span>Followers</span>
        </div>
        <Divider style={{ height: "100%" }} orientation="vertical"></Divider>
        <div className="d-flex flex-column mx-4">
          <h3 className="h3">455</h3>
          <span>Tweets</span>
        </div>
      </Paper>
      <Paper className="d-flex  p-4 mx-5 bg-white" elevation={12}>
        <YouTubeIcon sx={{ fontSize: 70, color: "#FF0000" }} />
        <Divider style={{ height: "100%" }} orientation="vertical"></Divider>
        <div className="d-flex flex-column mx-4">
          <h3 className="h3">20K+</h3>
          <span>Subscribers</span>
        </div>
        <Divider style={{ height: "100%" }} orientation="vertical"></Divider>
        <div className="d-flex flex-column mx-4">
          <h3 className="h3">1M+</h3>
          <span>Views</span>
        </div>
      </Paper>
    </div>
  );
}
