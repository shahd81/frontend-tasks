
import { useTranslation } from "react-i18next";
export default function StatCard({ title, value, change }) {
  const isPositive = change > 0;
  const {t}=useTranslation("dashboard")
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border w-full dark:bg-gray-700">
      
      {/* Value */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
        {value}
      </h2>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        
        <p className="text-gray-500 text-sm sm:text-base">
          {title}
        </p>

        <div className="flex items-center text-xs sm:text-sm flex-wrap">
          <span
            className={`px-2 sm:px-3 py-1 rounded-full mr-2
              ${isPositive 
                ? "bg-green-100 text-green-600" 
                : "bg-red-100 text-red-600"}`}
          >
            {change}%
          </span>

          <span className="text-gray-500">
           {t("stats.frm")}
          </span>
        </div>

      </div>
    </div>
  );
}
