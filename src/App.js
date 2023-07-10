
import { Routes, Route } from "react-router-dom";
import LoginPage from "./MainFiles/LoginPage/LoginPage";
import NewPasswordSite from "./MainFiles/LoginPage/SetNewPasswordPage/NewPasswordSite";
import ForgetPasswordScreen from "./MainFiles/LoginPage/ForgetPasswordScreen/ForgetPasswordScreen";
import MainMenu from "./MainFiles/MainMenu/MainMenu";
import NewOrdersList from './MainFiles/MainMenu/Warehouse/NewOrders/NewOrdersList'
import Releases from "./MainFiles/MainMenu/Warehouse/Releases/Releases";
import Stocks from "./MainFiles/MainMenu/Warehouse/Stocks/Stocks";
import Transfers from "./MainFiles/MainMenu/Warehouse/Transfers/Transfers";
import Clients from "./MainFiles/MainMenu/Administration/Clients/Clients";
import Users from "./MainFiles/MainMenu/Administration/Users/Users";
import WhPlaces from "./MainFiles/MainMenu/Administration/WhPlaces/WhPlaces";
import WhCarriers from "./MainFiles/MainMenu/Administration/WhCarriers/WhCarriers";
import HistoryOrders from "./MainFiles/MainMenu/Accounting/HistoryOrders/HistoryOrders"; 
import HistoryReleases from "./MainFiles/MainMenu/Accounting/HistoryReleases/HistoryReleases";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="login-page" element={<LoginPage />} />
      <Route path="new-password" element={<NewPasswordSite />} />
      <Route path="forget-password" element={<ForgetPasswordScreen />} />
      <Route path="mainmenu" element={<MainMenu />} >
        <Route index element={<NewOrdersList />} />
        <Route path="admission" element={<NewOrdersList />} />
        <Route path="releases" element={<Releases />} />
        <Route path="stocks" element={<Stocks />} />
        <Route path="transfers" element={<Transfers />} />
        <Route path="invoices" element={<HistoryReleases />} />
        <Route path="to-invoice" element={<HistoryOrders />} />
        <Route path="clients" element={<Clients />} />
        <Route path="users" element={<Users />} />
        <Route path="whplaces" element={<WhPlaces />} />
        <Route path="wh-carriers" element={<WhCarriers />} />
      </Route>
    </Routes>
  )
};

export default App;