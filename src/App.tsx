import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ProfilePage from "./pages/profile-page";
import DetailItem from "./pages/detail-item";
import UserPage from "./pages/user-page";
import CategoryListPage from "./pages/category-list-page";
import ProductListPage from "./pages/product-list-page";
import EditCategoryPage from "./pages/edit-category-page";
import EditProductPage from "./pages/edit-product-page";
import ComplainPage from "./pages/complain-page";
import MessagePage from "./pages/message-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/message" element={<MessagePage />} />
          <Route path="/detail" element={<DetailItem />} />
          <Route path="/category" element={<CategoryListPage />} />
          <Route path="/category/edit" element={<EditCategoryPage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/product/edit" element={<EditProductPage />} />
          <Route path="/complain" element={<ComplainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
