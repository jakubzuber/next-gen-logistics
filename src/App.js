import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import LoginPage from "./MainFiles/LoginPage/LoginPage";
import NewPasswordSite from "./MainFiles/LoginPage/SetNewPasswordPage/NewPasswordSite";
import ForgetPasswordScreen from "./MainFiles/LoginPage/ForgetPasswordScreen/ForgetPasswordScreen";
import Admission from "./MainFiles/MainMenu/Warehouse/Admission/Admision";
import Releases from "./MainFiles/MainMenu/Warehouse/Releases/Releases";
import Stocks from "./MainFiles/MainMenu/Warehouse/Stocks/Stocks";
import Transfers from "./MainFiles/MainMenu/Warehouse/Transfers/Transfers";
import Invoices from "./MainFiles/MainMenu/Accounting/Invoices/Invoices";
import ToInvoice from "./MainFiles/MainMenu/Accounting/ToInvoice/ToInvoice";
import Clients from "./MainFiles/MainMenu/Administration/Clients/Clients";
import Users from "./MainFiles/MainMenu/Administration/Users/Users";

function App() {
  return (
    <HashRouter>
      <NavLink to='/'/>
      <Routes>
        <Route path="/" element={<LoginPage />} />   
        <Route path="login-page" element={<LoginPage />} />
        <Route path="new-password" element={<NewPasswordSite />} />
        <Route path="forget-password" element={<ForgetPasswordScreen />} />
        <Route path="admission" element={<Admission />} />
        <Route path="releases" element={<Releases />} />
        <Route path="stocks" element={<Stocks />} />
        <Route path="transfers" element={<Transfers />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="to-invoice" element={<ToInvoice />} />
        <Route path="clients" element={<Clients />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </HashRouter>
  )
};

export default App;