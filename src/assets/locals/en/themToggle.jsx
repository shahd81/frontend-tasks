import { useTheme } from "../context/ThemesContext";
import { useTranslation } from "react-i18next";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const {t}=useTranslation("layout");
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-600 text-white rounded"
    >
      {theme === "light" ?  t("navbar.darkMode") : t("navbar.lightMode")}
    </button>
  );
}
