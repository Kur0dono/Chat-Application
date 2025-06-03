import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white">
      <Link to="/" className="text-xl font-bold">
        whispr
      </Link>
      <div className="flex items-center gap-4">
        {authUser && (
          <>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <Link to="/settings" className="hover:underline">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;