import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {!token ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;