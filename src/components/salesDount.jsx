import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";

export default function SalesDonut() {
  const { t } = useTranslation("dashboard");
  const data = t("salesDonut.data", { returnObjects: true });
  const total = data.reduce((sum, item) => sum + item.value, 0); 
  const [activeData, setActiveData] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 transition hover:shadow-md">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
          {t("salesDonut.title")}
        </h3>
        <span className="text-gray-400 dark:text-gray-300 text-xl cursor-pointer hover:text-gray-600 transition">
          ⋮
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="relative w-[200px] sm:w-[250px] h-[200px] sm:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveData(data[index])}
                onMouseLeave={() => setActiveData(null)}
              >
                <Cell fill="#4f46e5" />
                <Cell fill="#6366f1" />
                <Cell fill="#c7d2fe" />
              </Pie>
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {activeData ? (
              <>
                <span className="text-gray-500 dark:text-gray-300 text-m">
                  {activeData.name}
                </span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  {activeData.value}%
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-500 dark:text-gray-300 text-sm">
                  {t("salesDonut.total")}
                </span>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  {total}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4 w-full md:w-auto text-sm sm:text-base">
          {data.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full mt-2 bg-indigo-500" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.value}% • {item.products.toLocaleString()} {t("salesDonut.total")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
