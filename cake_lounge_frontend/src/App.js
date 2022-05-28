import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import adminStyles from "./Components/Admin/admin.css";
//importing components
import AdminManager from "./Manager/AdminManager";
import CakeLoungeHomePage from "./Pages/CakeLoungeHomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminManager></AdminManager>} />
          <Route path="/" element={<CakeLoungeHomePage></CakeLoungeHomePage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
