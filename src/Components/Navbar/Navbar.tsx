import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      const storedUser = JSON.parse(stored);
      setUser({
        username: storedUser.name || "",
        email: storedUser.email || "",
      });
    }
  }, []);

  const toggleUserInfo = () => setShowUserInfo((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setShowUserInfo(false);
  };

  return (
    <nav className="ml-50 h-18 bg-black flex justify-end items-center px-7 py-5 fixed top-0 right-0 left-20 z-40 text-white">
      <form className="flex items-center bg-gray-800 rounded-lg px-3 py-1 mr-6">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-64"
        />
        <button type="submit" className="ml-2 text-gray-400 hover:text-white">
          <FaSearch />
        </button>
      </form>

      <div className="relative">
        <FaUserCircle
          className="text-3xl cursor-pointer hover:text-gray-400"
          onClick={toggleUserInfo}
        />
        {showUserInfo && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 p-4">
            <p className="text-sm mb-1">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-yellow-500 py-2 rounded hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
