import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bounce Rate per month",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octomber",
  "November",
  "December",
];

const data = {
  labels,
  datasets: [
    {
      label: "Bounce Rate",
      data: [10, 30, 20, 60],
      backgroundColor: "rgba(53, 162, 235, 1)",
    },
  ],
};

export function AdminDashboardAnalyticsVerticalBarChart(props) {
  useEffect(() => {
    props.setBounceRate(data.datasets[0].data);
  });
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
