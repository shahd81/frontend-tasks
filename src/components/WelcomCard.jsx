import { useNavigate } from "react-router-dom";
import heroImg from "../assets/images/illustration-working.svg";
import { useTranslation } from "react-i18next";

function WelcomeCard() {
  const { t } = useTranslation("product");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-10 py-16 px-5">
      
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {t("heroTitle1")} <br />
          <span className="text-teal-400">{t("heroTitle2")}</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
          {t("heroDesc1")} <br />
          <span>{t("heroDesc2")}</span>
        </p>

        <button 
        onClick={()=>navigate("/Register")}
        className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3 rounded-full transition">
          {t("getStarted")}
        </button>
      </div>

      <div className="md:w-1/2">
        <img src={heroImg} alt="Illustration" className="w-full" />
      </div>
    </div>
  );
}

export default WelcomeCard;