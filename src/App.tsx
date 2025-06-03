import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login/Login";
import SignUp from "./Components/Authentication/SignUp/SignUp";
import Product from "./Components/Products/ProductList";
import { ProtectedRoute } from "./Components/Authentication/ProtectedRoute/ProctedRoute";
import ProductDetail from "./Components/Products/ProductDetail";
import { SortProvider } from "./Components/Context/SortContext";
import { SearchProvider } from "./Components/Context/SearchContext";
import NotFound from "./Components/Notfound.tsx/NotFound";

const App = () => (
  <SortProvider>
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Product />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SearchProvider>
  </SortProvider>
);

export default App;
