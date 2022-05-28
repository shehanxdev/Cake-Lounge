const sortOrders = (orders) => {
  var date;
  let cdata = new Array(12).fill(0);
  orders.forEach((order) => {
    date = new Date(order.paidOn);
    if (date.getMonth() == 0) {
      cdata[0] += 1;
    } else if (date.getMonth() === 1) {
      cdata[1] += 1;
    } else if (date.getMonth() === 2) {
      cdata[2] += 1;
    } else if (date.getMonth() === 3) {
      cdata[3] += 1;
    } else if (date.getMonth() === 4) {
      cdata[4] += 1;
    } else if (date.getMonth() === 5) {
      cdata[5] += 1;
    } else if (date.getMonth() === 6) {
      cdata[6] += 1;
    } else if (date.getMonth() === 7) {
      cdata[7] += 1;
    } else if (date.getMonth() === 8) {
      cdata[8] += 1;
    } else if (date.getMonth() === 9) {
      cdata[9] += 1;
    } else if (date.getMonth() === 10) {
      cdata[10] += 1;
    } else if (date.getMonth() === 11) {
      cdata[11] += 1;
    }
  });
  const object = [
    {
      label: "Orders",
      data: cdata,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];
  return object;
};

export default sortOrders;
