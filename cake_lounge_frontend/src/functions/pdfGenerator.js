import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ralewayFont from "../Assets/Fonts/Raleway-Regular.ttf";

const generate = (orders, userDevice, bouncerate) => {
  const deviceSum = userDevice.reduce((pv, cv) => pv + cv, 0);
  const orderSum = orders.reduce((pv, cv) => pv + cv, 0);
  const doc = new jsPDF();
  //global values
  doc.rect(
    5,
    5,
    doc.internal.pageSize.width - 10,
    doc.internal.pageSize.height - 10,
    "S"
  );
  let pageWidth = doc.internal.pageSize.getWidth();
  let pageHeight = doc.internal.pageSize.getHeight();
  //config
  doc.setFontSize(60);
  doc.setTextColor(255, 92, 141);
  //Main heading
  doc.text("Cake Lounge", pageWidth / 2, pageHeight / 2, "center");
  //config sub heading
  doc.setFontSize(40);
  doc.setTextColor(0, 0, 0);
  //Sub heading
  doc.text(
    `General Analysis Report`,
    pageWidth / 2,
    pageHeight / 2 + 20,
    "center"
  );
  //Page 2----------------------------------------------------------------------------------------------------------------------
  doc.addPage("a4");
  doc.rect(
    5,
    5,
    doc.internal.pageSize.width - 10,
    doc.internal.pageSize.height - 10,
    "S"
  );
  doc.setFontSize(20);
  doc.text("Order Analysis", pageWidth / 2, 20, "center");
  autoTable(doc, {
    startY: 40,
    head: [["Month", "Number of Orders", "Auto Generated Comment"]],
    body: [
      ["January", `${orders[0]}`, "No Comment"],
      ["February", `${orders[1]}`, "No Comment"],
      ["March", `${orders[2]}`, "No Comment"],
      ["April", `${orders[3]}`, "No Comment"],
      ["May", `${orders[4]}`, "No Comment"],
      ["June", `${orders[5]}`, "No Comment"],
      ["July", `${orders[6]}`, "No Comment"],
      ["August", `${orders[7]}`, "No Comment"],
      ["September", `${orders[8]}`, "No Comment"],
      ["Otcomber", `${orders[9]}`, "No Comment"],
      ["November", `${orders[10]}`, "No Comment"],
      ["December", `${orders[11]}`, "No Comment"],
    ],
  });
  doc.setFontSize(15);
  doc.text(`Total number of sales = ${orderSum}`, 20, 150, "left");
  doc.text(
    `Maximum Number of sales per month = ${Math.max(...orders)}`,
    20,
    160,
    "left"
  );
  doc.text(
    `Minimum Number of sales per month = ${Math.min(...orders)}`,
    20,
    170,
    "left"
  );
  doc.setTextColor(255, 0, 0);
  doc.setFontSize(10);
  doc.text(
    "This page is auto-generated. Any faults or improvements should be directed to the developer team through contact.",
    pageWidth / 2,
    190,
    "center"
  );
  doc.addPage("a4");
  doc.rect(
    5,
    5,
    doc.internal.pageSize.width - 10,
    doc.internal.pageSize.height - 10,
    "S"
  );
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text("User device analysis", pageWidth / 2, 20, "center");
  autoTable(doc, {
    startY: 30,
    head: [["Device type", "Percentage of users"]],
    body: [
      ["Mobile", `${Math.floor((userDevice[0] / deviceSum) * 100)}%`],
      ["Computer-PC", `${Math.floor((userDevice[1] / deviceSum) * 100)}%`],
      ["Tablet", `${Math.floor((userDevice[2] / deviceSum) * 100)}%`],
      ["Wearable devices", `${Math.floor((userDevice[3] / deviceSum) * 100)}%`],
    ],
  });
  doc.text("Bounce Rate Per Month", pageWidth / 2, 100, "center");
  autoTable(doc, {
    startY: 110,
    head: [["Month", "Bounce Rate", "Auto Generated Comment"]],
    body: [
      ["January", `${bouncerate[0]}`, "No Comment"],
      ["February", `${bouncerate[1]}`, "No Comment"],
      ["March", `${bouncerate[2]}`, "No Comment"],
      ["April", `${bouncerate[3]}`, "No Comment"],
    ],
  });
  doc.save("Cake_Lounge_Admin_General_Report.pdf");
};

export default generate;
