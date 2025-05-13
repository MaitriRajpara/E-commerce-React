import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Auth/SignUp/SignUp";
import ProductList from "./Components/Products/ProductList";
import Login from "./Components/Auth/Login/Login";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/product" element={<ProductList />} />
          <Route path="/" element={<ProductList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
