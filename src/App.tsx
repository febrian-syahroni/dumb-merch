import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import RoleUser from "./components/roleUser";
import RoleAdmin from "./components/roleAdmin";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: <RoleUser allowedRoles={[2]} />, // Bungkus semua route yang membutuhkan autentikasi
    children: [
      { path: "profile", element: <ProfilePage /> },
      { index: true, element: <UserPage /> },
      { path: "user/message", element: <MessagePage /> },
      { path: "detail-product/:id", element: <DetailItem /> },
    ],
  },
  {
    path: "/",
    element: <RoleAdmin allowedRoles={[1]} />,
    children: [
      { path: "admin/category", element: <CategoryListPage /> },
      { path: "admin/category/edit", element: <EditCategoryPage /> },
      { path: "admin/product", element: <ProductListPage /> },
      { path: "admin/product/edit", element: <EditProductPage /> },
      { path: "admin/complain", element: <ComplainPage /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
