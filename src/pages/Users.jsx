import { useEffect, useState, useRef } from "react";
import { getUsers } from "../services/user.service";
import Loader from "../components/common/loader/loaderGif";
import { useTranslation } from "react-i18next";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hasFetched = useRef(false);
  const usersPerPage = 3;
// const apiCall=useContext(AuthContext);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const { t } = useTranslation("product");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <Loader />;
  if (error)
    return <p className="text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="flex-col md:px-5 min-h-screen bg-gray-50 dark:bg-gray-900 text-center items-center">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white pt-5">
        {t("users")}
      </h2>

      {/* Animated Cards */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={currentPage} 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4"
        >
          {currentUsers.map((user) => (
            <Motion.div
              key={user.id}
              variants={cardVariants}
              className="user-card"
            >
              <div
                className="
                  bg-white dark:bg-gray-800
                  rounded-2xl
                  p-4 
                  shadow-md dark:shadow-gray-700
                  border border-gray-100 dark:border-gray-700
                  hover:shadow-2xl hover:-translate-y-2
                  transition-all duration-300
                  group
                "
              >
                <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white group-hover:text-purple-600 transition">
                  {user.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
                  @{user.username}
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>📧 <span className="font-medium">{user.email}</span></p>
                  <p>📞 {user.phone}</p>
                  <p>📍 {user.address.street}, {user.address.city}</p>
                  <p>🏢 {user.company.name}</p>
                </div>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                >
                  {t("visitWebsite")} →
                </a>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-4">
        
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="
            px-4 py-2 rounded-full text-sm font-medium transition
            bg-white dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-300
            hover:bg-purple-50 dark:hover:bg-gray-600
            disabled:hidden disabled:cursor-not-allowed
          "
        >
          {t("previous")}
        </button>

        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-600 text-white shadow-lg">
          {currentPage}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="
            px-4 py-2 rounded-full text-sm font-medium transition
            bg-white dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-300
            hover:bg-purple-50 dark:hover:bg-gray-600
            disabled:hidden disabled:cursor-not-allowed
          "
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}

export default Users;