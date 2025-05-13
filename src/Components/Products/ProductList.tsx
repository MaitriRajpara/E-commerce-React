import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/Sidebar";

const ProductList = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="ml-20 flex-1">
          <Navbar />
          <main className="pl-50 pt-18 bg-black min-h-screen text-white">
            <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
                <p className="text-lg text-gray-400">
                  You have successfully signed up. This is the product page.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductList;