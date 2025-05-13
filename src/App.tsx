import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Auth/SignUp/SignUp";
import ProductList from "./Components/Products/ProductList";
import Login from "./Components/Auth/Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
