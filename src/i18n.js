import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enProduct from "./assets/locals/en/product.json"
import arProduct from "./assets/locals/ar/product.json"
import enProfile from "./assets/locals/en/profile.json";
import arProfile from "./assets/locals/ar/profile.json";
import enLayout from "./assets/locals/en/layout.json"
import arLayout from "./assets/locals/ar/layout.json"
import enDashboard from "./assets/locals/en/dashboard.json"
import arDashboard from "./assets/locals/ar/dashboard.json"
i18n.use(initReactI18next).init({
  resources: {
    en: {
     product : enProduct,
     profile : enProfile,
     layout:enLayout,
     dashboard :enDashboard
    },
    ar: {
       product : arProduct,   
        profile : arProfile,
       layout:arLayout,
       dashboard:arDashboard
    }
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
