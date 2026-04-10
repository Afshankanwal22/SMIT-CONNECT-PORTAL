import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import Leave from "./pages/Leave";
import MyLeaves from "./pages/MyLeaves";
import AdminLeaves from "./pages/AdminLeaves";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ApplyLeave from "./pages/ApplyLeave";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
         <Route path="/AdminStudents" element={<AdminStudents />} />
        <Route path="/AdminLeaves" element={<AdminLeaves />} />
        <Route path="/ApplyLeave" element={<ApplyLeave />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/MyLeaves" element={<MyLeaves />} />
        <Route path="/admin/leaves" element={<AdminLeaves />} />
        <Route path="/About" element={<About />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;