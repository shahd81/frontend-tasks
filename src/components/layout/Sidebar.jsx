import { NavLink, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import {
  FaHome,
  FaTachometerAlt,
  FaUser,
  FaBars,
  FaList,
  FaBox,
  FaUsers,
  FaTag,
  FaTimes,
  FaSignOutAlt,
  FaUpload,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import ThemeToggle from "../themToggle";
import { useUser } from "../../context/userContext";
import { useAuth } from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { motion as Motion ,AnimatePresence } from "framer-motion";
import { getUsers } from "../../services/user.service";
import { getProducts } from "../../services/product.service";
import { getPosts } from "../../services/posts.service";
import LanguageSwitcher from "../LanguageSwitcher";
export default function Sidebar({ isOpen, setIsOpen }) {
  // const [isOnline, setIsOnline] = useState(navigator.onLine);
  const {logout}=useAuth();
  const { user } = useUser();
  const { t, i18n } = useTranslation("layout");
  const isRTL = i18n.language === "ar";
  const queryClient = useQueryClient();
  const prefetchedRoutes=useRef(new Set());
  const handlePrefetch =async (path) => {
      console.log("hover", path);
    if (prefetchedRoutes.current.has(path)) return;
    
  switch (path) {
    case "/Users":
     await queryClient.prefetchQuery({
        queryKey: ["users"],
        queryFn: getUsers,
      });
      break;

    case "/Products":
      queryClient.prefetchQuery({
            queryKey: ["products"],
            queryFn: () => getProducts(10, 0),
          });
      break;

    case "/Posts":
       queryClient.prefetchQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
      });
      break;

    default:
      break;
    }
   prefetchedRoutes.current.add(path);
    console.log(prefetchedRoutes)
};
  const links = [
    { name: t("sidebar.dashboard"), path: "/Dashboard", icon: <FaTachometerAlt /> },
    { name: t("sidebar.home"), path: "/Home", icon: <FaHome /> },
    { name: t("sidebar.pricing"), path: "/Pricing", icon: <FaTag /> },
    
    // { name: t("sidebar.features"), path: "/", icon: <FaList /> },
    { name: t("sidebar.posts"), path: "/Posts", icon: <FaList /> },
    { name: t("sidebar.products"), path: "/Products", icon: <FaBox /> },
    { name: t("sidebar.users"), path: "/Users", icon: <FaUsers /> },
    { name: t("sidebar.uploadFile"), path: "/UploadFile", icon: <FaUpload /> },
    { name: t("sidebar.usertable"), path: "/UserTable", icon: <FaBox /> },
    { name: t("sidebar.profile"), path: "/profile", icon: <FaUser /> },
  ];


  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={` hidden md:block border-r border-gray-700 fixed top-20 ${isRTL ? "right-0" : "left-0"}
    h-[calc(100vh-80px)] 
    z-50 md:z-0
    overflow-hidden
   ${isOpen ? "w-full md:w-64" : "w-0 md:w-16"}
    bg-white dark:bg-gray-800 
    shadow-lg transition-all duration-300
  `}
      >
        {/* <div className="flex items-center justify-between p-4 border-b">
          <li onClick={toggleSidebar}>
         <Link to="/Home">
                     <h1 className=" text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                     Sh<span className="text-gray-700 dark:text-white-200"> {isOpen&&"ortly"}</span>
                     </h1>
                   </Link>
    </li>
        </div> */}

        <nav 
        
        className="mt-4 flex flex-col gap-1 flex-1  md:items-start md:pl-4 
              items-center justify-center ">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              data-tooltip-id="sidebar-tooltip"
              data-tooltip-content={link.name}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }

              }}
              // onMouseOver={() => handlePrefetch(link.path)}
              onMouseEnter={() => handlePrefetch(link.path)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 dark:text-gray-100 text-gray-900 
                 w-full hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded ${
                  isActive
                    ? "bg-gray-200 dark:text-gray-300 dark:bg-gray-700 font-semibold"
                    : ""
                }`
              }
            >
             <span className="text-l">{link.icon}</span>
              <span>{isOpen && link.name}</span>
              {/* {isOpen && <Tooltip id="sidebar-tooltip" place="right" />} */}
            </NavLink>
          ))}
          </nav>
          <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 p-4 mt-auto md:items-start md:pl-4 
              items-center justify-center "
        >
          <FaSignOutAlt />
          <span>{isOpen && t("sidebar.logout")}</span>
        </button>
              {/* {!isOpen && <Tooltip id="sidebar-tooltip" place="right" />} */}
      </aside>
      {/* Mobile Sidebar */}
      <AnimatePresence>
{isOpen && (
  <Motion.div
  initial={{ x: "-100%" }}
  animate={{ x: isOpen ? 0 : "-100%" }}
   exit={{ x: 50, opacity: 0 }}
  transition={{ duration: 0.3 }}
  className="fixed top-0 left-0 h-full w-full transform transition-transform 
  duration- ease-in-out bg-white dark:bg-gray-800 z-50 md:hidden"
>
  <div className="fixed inset-0 z-50 md:hidden bg-black/40">
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-r-3xl p-3 flex flex-col">
      {/* Close Button */}
      <div className="flex justify-end dark:text-white text-black">
        <Motion.button
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsOpen(false)}
      className="text-xl"
    >
      ✕
    </Motion.button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col mb-2">  
        
        <img
    src={user.image}
    className="w-15 h-15 rounded-full object-cover"
  /> 
  <div className="flex  ">

        <h2 className="text-lg font-bold text-black dark:text-white p-3">
          Hello,<span>{user.firstName}</span>
        </h2>
          <div className="flex ms-auto gap-2 ">
            <LanguageSwitcher/>
        <ThemeToggle/>
        </div>
  </div>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg 
               dark:text-gray-200 border-b
               ${isActive ? "bg-gray-200 dark:bg-gray-700" : ""}`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 text-red-500 mt-3"
      >
        <FaSignOutAlt />
        {t("sidebar.logout")}
      </button>
    </div>
  </div>
  </Motion.div>
)}
</AnimatePresence>
        {!isOpen && <Tooltip id="sidebar-tooltip" place="right" /> }
    </>
  );
}
