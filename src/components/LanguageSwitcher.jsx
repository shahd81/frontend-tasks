import i18n from "i18next";

function LanguageSwitcher() {
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

 return (
  <div className="flex gap-2">
    <select
     onClick={(e) => changeLanguage(e.target.value)}
       className="px-4 py-2 rounded-full border border-gray-400 text-m md:text-xl
       dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"

    >
      <option value="en" >EN</option>
      <option value="ar">AR</option>
    </select>
  </div>
);

}
export default LanguageSwitcher;