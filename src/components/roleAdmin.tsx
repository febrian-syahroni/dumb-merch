import React from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { hasRole } from '../utils/auth-utils';
import logo from "@/assets/logo.svg";
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/login';

interface Props {
  allowedRoles: number[]; // Role yang diizinkan (misalnya: [1, 2])
}

const RoleAdmin: React.FC<Props> = ({ allowedRoles }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect ke halaman login
  };

  return (
    <div className='relative flex flex-col justify-center items-center px-[80px] bg-[#0B0B0B] text-white w-full h-screen'>
      <div className="absolute z-[99999] flex justify-between px-[50px] py-[20px] left-0 top-0 w-full">
        <img width={50} src={logo} alt="logo" />
        <div className="flex text-[15px] font-bold items-center gap-[23px]">
          <NavLink
            to="/admin/complain"
            className={({ isActive }) => (isActive ? "text-red-500" : "")}
          >
            Complain
          </NavLink>
          <NavLink
            to="/admin/category"
            className={({ isActive }) => (isActive ? "text-red-500" : "focus:text-red-500")}
          >
            Category
          </NavLink>
          <NavLink
            to="/admin/product"
            className={({ isActive }) => (isActive ? "text-red-500" : "focus:text-red-500")}
          >
            Product
          </NavLink>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  )
};

export default RoleAdmin;
