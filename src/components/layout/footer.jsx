import React from "react";
import FacebookIcon from "../../assets/images/facebook.svg";
import TwitterIcon from "../../assets/images/twitter.svg";
import PinterestIcon from "../../assets/images/pinterest.svg";
import InstagramIcon from "../../assets/images/instagram.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("layout");

  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            {t("footer.logo")}
          </h2>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold mb-4 text-black dark:text-white">
            {t("footer.features.title")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/Pricing"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                {t("footer.features.pricing")}
              </Link>
            </li>
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.features.linkShortening")}
            </li>
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.features.brandedLinks")}
            </li>
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.features.analytics")}
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4 text-black dark:text-white">
            {t("footer.resources.title")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.resources.blog")}
            </li>
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.resources.developers")}
            </li>
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.resources.support")}
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-black dark:text-white">
            {t("footer.company.title")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.company.about")}
            </li>
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.company.team")}
            </li>
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.company.careers")}
            </li>
            <li className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              {t("footer.company.contact")}
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 items-start">
          <img
            src={FacebookIcon}
            alt={t("footer.social.facebook")}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
          <img
            src={TwitterIcon}
            alt={t("footer.social.twitter")}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
          <img
            src={PinterestIcon}
            alt={t("footer.social.pinterest")}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
          <img
            src={InstagramIcon}
            alt={t("footer.social.instagram")}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
        </div>

      </div>
    </footer>
  );
}