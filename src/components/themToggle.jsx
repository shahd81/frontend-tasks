import { useTheme } from "../context/ThemesContext";
import { useTranslation } from "react-i18next";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation("layout");

  return (
    <button
      onClick={toggleTheme}
      title={theme === "light" ? t("navbar.darkMode") : t("navbar.lightMode")}
      className="
        w-15 md:w-20 h-10 
        flex items-center justify-center 
        rounded-full
        bg-gray-200 dark:bg-gray-700
        text-gray-800 dark:text-yellow-400
        hover:scale-110
        transition-all duration-300
      "
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}