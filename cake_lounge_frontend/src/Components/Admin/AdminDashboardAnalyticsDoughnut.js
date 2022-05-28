import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
const data = {
  labels: ["Mobile", "Computer-PC", "Tablet", "Wear"],
  datasets: [
    {
      label: "Device Type",
      data: [120, 70, 40, 10],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export default function AdminDashboardAnalyticsDoughnut(props) {
  useEffect(() => {
    props.setuserDevice(data.datasets[0].data);
  });
  return <Doughnut className="bg-white shadow p-3 rounded" data={data} />;
}
