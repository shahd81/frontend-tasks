import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
  const { t } = useTranslation("product");

  return (
    <Motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="
        bg-white dark:bg-gray-900
        shadow-lg dark:shadow-gray-800
        rounded-2xl overflow-hidden
        border border-gray-100 dark:border-gray-700
        hover:shadow-2xl
        transition-shadow
      "
    >
      <div className="relative h-48 w-full">
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="object-cover w-full h-full"
        />
        <span className="
          absolute top-2 right-2
          bg-orange-500
          text-white
          px-2 py-1 text-xs font-semibold rounded
        ">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
          {product.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-lg text-gray-900 dark:text-white">
            ${product.price}
          </span>

          <span className="text-yellow-500 font-semibold">
            {"★".repeat(Math.round(product.rating))}
          </span>
        </div>

        <div className="flex justify-between text-gray-400 dark:text-gray-500 text-xs mt-2">
          <span>Stock: {product.stock}</span>
          <span>MOQ: {product.minimumOrderQuantity}</span>
        </div>

        <button
          className="
            mt-3 w-full
            bg-indigo-600 dark:bg-indigo-500
            text-white
            py-2 rounded-xl
            hover:bg-indigo-700 dark:hover:bg-indigo-600
            transition-colors
            font-semibold
          "
        >
          {t("addToCard")}
        </button>
      </div>
    </Motion.div>
  );
}