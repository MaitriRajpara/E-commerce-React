import { useState } from "react";
import logo from "../../assets/cart2.jpg";

const Sidebar = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState("");

  const categories = [
    "Clothing",
    "Grocery",
    "Home & Living",
    "Beauty",
    "Electronics",
  ];
  const brands = ["Nike", "Apple", "Samsung", "Zara", "H&M"];
  const genders = ["Male", "Female", "None"];

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    currentState: string[]
  ) => {
    const value = e.target.value;
    if (e.target.checked) {
      setState([...currentState, value]);
    } else {
      setState(currentState.filter((item) => item !== value));
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(e.target.value);
    console.log("Gender:", e.target.value);
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col justify-between fixed top-0 left-0 z-50 px-8 py-5 shadow-lg">
      <div>
        <div className="flex justify-center mb-8 w-full">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-14 rounded-full cursor-pointer border border-gray-700"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Sort By</h2>
          <select className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none">
            <option value="">-- Select --</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A - Z</option>
            <option value="name-desc">Name: Z - A</option>
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Gender</h2>
          <div className="space-y-2">
            {genders.map((gender) => (
              <label key={gender} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={selectedGender === gender}
                  onChange={handleGenderChange}
                  className="accent-yellow-500"
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="my-8">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      setSelectedCategories,
                      selectedCategories
                    )
                  }
                  className="accent-yellow-500"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Brands</h2>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) =>
                    handleCheckboxChange(e, setSelectedBrands, selectedBrands)
                  }
                  className="accent-yellow-500"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button className="w-full py-2 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg">
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
