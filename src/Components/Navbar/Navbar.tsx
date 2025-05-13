import { FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar = () => {
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
        <FaUserCircle className="text-3xl cursor-pointer hover:text-gray-400" />
      </div>
    </nav>
  );
};

export default Navbar;
