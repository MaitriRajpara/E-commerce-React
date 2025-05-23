import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import ProductCard from "./ProductCard";

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-20 flex-1">
        <Navbar />
        <main className="pl-50 pt-18 bg-black min-h-screen text-white">
          <ProductCard />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
