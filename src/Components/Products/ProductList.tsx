import Navbar from "../Navbar/Navbar";

const ProductList = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-lg text-gray-400">
            You have successfully signed up. This is the product page.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductList;
