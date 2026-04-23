import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900  ">

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isRTL={isRTL}
      />
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div
       className={`
        flex flex-col  transition-all duration-300
        ${sidebarOpen
      ? isRTL
        ? "md:mr-64"
        : "md:ml-64"
      : isRTL
      ? "md:mr-16"
      : "md:ml-16"}
  `}
      >

        <main className="flex-1 min-h-screen pt-20 ">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}