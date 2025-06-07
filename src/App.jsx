import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./components/AddVehicle";
import VehicleList from "./components/VehicleList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
AddVehicle
const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-center mt-10">Welcome to MyApp</h1>}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/vehicle-list" element={<VehicleList />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;