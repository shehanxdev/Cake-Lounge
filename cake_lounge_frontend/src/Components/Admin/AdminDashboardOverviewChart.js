import React, { useEffect, useRef, useState } from "react";
import sortOrders from "../../functions/sortOrders";
/*Import React Chart modules */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";

function AdminDashboardOverviewChart(props) {
  //States of the component
  const [orders, setorders] = useState(props.orders);
  const [ready, setReady] = useState(false);
  const orderData = useRef(null);
  /*************************************************************************************************************** */
  //Registering,setting labels and setting options for the chart
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Orders Per Month",
        fontSize: 15,
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
  /***************************************************************************************************************/
  //Use effect hook for setting order that are comming as props
  useEffect(() => {
    const setDataFromProps = () => {
      setorders(props.orders);
    };
    setDataFromProps();
  }, [props.orders]);

  useEffect(() => {
    if (orders[0]._id !== undefined) {
      orderData.current = {
        labels: labels,
        datasets: sortOrders(props.orders),
      };
      if (props.setOrders) {
        props.setOrders(setOrdersForPDF());
      }
      setReady(true);
    }
  }, [orders]);

  //this method sets orders for parent component
  const setOrdersForPDF = () => {
    const tempObj = sortOrders(props.orders);
    console.log(tempObj);
    return tempObj[0].data;
  };

  if (ready === false) {
    return <></>;
  } else {
    return (
      <div className="p-4 shadow-lg mt-5 admin_dashboard_boxed_container">
        <Line
          className="admin_dashboard_overview_chart mt-5"
          options={options}
          data={orderData.current}
        />
      </div>
    );
  }
}
export default AdminDashboardOverviewChart;
