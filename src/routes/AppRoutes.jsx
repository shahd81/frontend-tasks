import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LinksProvider } from "../context/LinksContext";
import Layout from "../components/layout/layout";
import Home from "../pages/Home";
import Pricing from "../pages/pricing";
import Users from "../pages/Users";
import Posts from "../pages/Posts";
import Products from "../pages/Product";
import Loader from "../components/common/loader/loaderGif";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/profile";
import NotAuthorized from "../pages/NotAuthorized";
import FileUpload from "../pages/fileUpload";
import ProtectedRoute from "./ProtectedRoute";
import { Roles } from "../constants/roles";
import Register from "../pages/Register";
import UserTable from "../pages/userTable";
import {  useLoader } from "../context/loaderContext";
import { setLoaderSetter } from "../services/api";
import { AuthProvider } from "../context/AuthContext";
import Page from "../pages/page";
import TestComponent from "../pages/TestComponand";
export default function AppRoutes() {
  // const location = useLocation();
  const { loading, setLoading } = useLoader();
   setLoaderSetter(setLoading);
  return (
   <AuthProvider>
    <LinksProvider>
      <BrowserRouter>
    {loading && <Loader />}
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={[Roles.Admin, Roles.User]}>
                <Layout />
              </ProtectedRoute>
            }
            >
            {/* Main Pages */}
           <Route path="/Home" element={<Page><Home/></Page>} />
           <Route path="/Test" element={<Page><TestComponent/></Page>} />
           <Route path="Pricing" element={<Page><Pricing /></Page>} />
           <Route path="UserTable" element={<Page><UserTable /></Page>} />
           <Route path="Users" element={<Page><Users /></Page>} />
           <Route path="Posts" element={<Page><Posts /></Page>} />
           <Route path="Products" element={<Page><Products /></Page>} />

            {/* Admin-only Pages */}
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute allowedRoles={[Roles.Admin]}>
                  <Dashboard />
                </ProtectedRoute>
              }
              />
            <Route
              path="UploadFile"
              element={
                <ProtectedRoute allowedRoles={[Roles.Admin , Roles.User]}>
                  <FileUpload />
                </ProtectedRoute>
              }
              />

            {/* Admin & User */}
            <Route
              path="Profile"
              element={
                <ProtectedRoute allowedRoles={[Roles.Admin, Roles.User]}>
                  <Profile />
                </ProtectedRoute>
              }
              />

            <Route path="NotAuthorized" element={<NotAuthorized />} />
          </Route>
        </Routes>
              </AnimatePresence>
      </BrowserRouter>
    </LinksProvider>
        </AuthProvider>
  );
}