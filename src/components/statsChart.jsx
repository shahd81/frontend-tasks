import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTranslation } from "react-i18next";
export default function StatsChart() {
  const {t} = useTranslation("dashboard");
  const data = [ { month: "Jan", value1: 180, value2: 40 }, { month: "Feb", value1: 190, value2: 30 }, { month: "Mar", value1: 170, value2: 50 }, { month: "Apr", value1: 160, value2: 40 }, { month: "May", value1: 175, value2: 55 }, { month: "Jun", value1: 165, value2: 40 }, { month: "Jul", value1: 170, value2: 70 }, { month: "Aug", value1: 200, value2: 100 }, { month: "Sep", value1: 230, value2: 110 }, { month: "Oct", value1: 210, value2: 120 }, { month: "Nov", value1: 240, value2: 150 }, { month: "Dec", value1: 235, value2: 140 }, ];
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border w-full mt-4 dark:bg-gray-800">
      
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-black dark:text-white">
        {t("stats.statistics")}
      </h3>

      {/* Responsive Height */}
      <div className="w-full h-[220px] sm:h-[280px] lg:h-[320px] ">
        <ResponsiveContainer width="100%" height="100%" >
          <LineChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis 
              dataKey="month"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />

            <YAxis 
              tick={{ fontSize: 10 }}
              width={30}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value1"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="value2"
              stroke="#93c5fd"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
