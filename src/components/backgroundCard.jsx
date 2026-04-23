import Backgroundimg from "../assets/images/bg-boost-desktop.svg";
import { useTranslation } from "react-i18next";

function BackgroundCard() {
  const { t } = useTranslation("product");

  return (
    <section className="relative overflow-hidden w-full my-5">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#3b3054] dark:bg-gray-900" />
        <img
          className="w-full h-full object-cover opacity-70"
          src={Backgroundimg}
          alt="Background"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto text-center z-10">
        <h2 className="md:text-3xl text-xl font-bold m-3 md:text-5xl text-white dark:text-white">
          {t("boostLinksToday")}
        </h2>
        <button className="px-10 py-6 m-3 rounded-full font-semibold text-sm md:text-lg  sm:w-48 md:w-56 lg:w-64
        transition-all transform hover:scale-105 shadow-xl bg-cyan-400 dark:bg-cyan-600 hover:bg-cyan-500 text-white">
          {t("getStarted")}
        </button>
      </div>
    </section>
  );
}

export default BackgroundCard;