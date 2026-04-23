import React, { useState } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeToggle from "../themToggle";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState(""); 
  const { t } = useTranslation("product");
  const { logout } = useAuth();

  const pages = [
    { name: t("home"), path: "/Home" },
    { name: t("dashboard"), path: "/Dashboard" },
    { name: t("pricing"), path: "/Pricing" },
    { name: t("users"), path: "/Users" },
    { name: t("posts"), path: "/Posts" },
    { name: t("products"), path: "/Products" },
    { name: t("profile"), path: "/Profile" },
  ];
  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav className="fixed top-0 z-40 w-full bg-white dark:bg-gray-800 shadow-md h-20 flex items-center justify-between px-4">
      
      {/* Left Side: Burger, Logo, Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl hidden text-black dark:text-white md:block "
        >
          ☰
        </button>

        <h1 className="font-bold text-xl md:text-3xl text-black dark:text-white">
          Shortly
        </h1>

        {/* Search Input */}
        <div className="relative px-2 pl-5 md:pl-52">
          <input
            type="text"
            placeholder="Search pages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 w-20 md:w-60 text-black dark:text-white bg-gray-100 dark:bg-gray-700"
          />

          {searchTerm && (
            <div className="absolute left-0 right-0 mt-1  w-20 md:w-60 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700 text-black dark:text-white"
                    onClick={() => setSearchTerm("")}
                  >
                    {page.name}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500 dark:text-gray-300 text-black dark:text-white">
                  No Pages Found
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 pr-10">
        <div className="  flex-row hidden md:flex gap-4 items-center">
        <ThemeToggle />
        <LanguageSwitcher />
         <button
          onClick={logout}
          className=" flex items-center gap-2 text-red-500  p-6 "
        >
          <FaSignOutAlt />
          {t("logout")}
        </button>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-2xl text-black dark:text-white  md:hidden"
        >
          ☰
        </button>
       
      </div>
    </nav>
  );
}