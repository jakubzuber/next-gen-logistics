import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import LoginPage from "./MainFiles/LoginPage/LoginPage";
import NewPasswordSite from "./MainFiles/LoginPage/SetNewPasswordPage/NewPasswordSite";
import ForgetPasswordScreen from "./MainFiles/LoginPage/ForgetPasswordScreen/ForgetPasswordScreen";
import Admission from "./MainFiles/MainMenu/Warehouse/Admission/Admision";
import Releases from "./MainFiles/MainMenu/Warehouse/Releases/Releases";

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
      </Routes>
    </HashRouter>
  )
};

export default App;