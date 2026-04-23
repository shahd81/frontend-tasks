import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
export default function GaugeChart() {
  const {t}=useTranslation("dashboard");
  const goalNum =90
  const data = [{ name: "Goal", value: goalNum }];

  const data2 = [
    {
      name: t("GaugeChart.data.name"),
      amount: 30569,
      percent: 85,
    },
    {
      name: t("GaugeChart.data.name2"),
      amount: 20486,
      percent: 55,
    },
  ];
  const backgroundData = [{ name: "Background", value: 100 }];
  return (
    <div className="bg-white p-2 rounded-2xl shadow-sm border items-center pt-4 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">{t("GaugeChart.title")}</h3>

      {/* Gauge Section */}
      <div className="relative h-[240px] border-b ">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
           data={data}
            startAngle={180}
            endAngle={0}
            innerRadius="75%"
            outerRadius="100%"
           
          >
           
              <RadialBar
              dataKey="value"
              data={backgroundData}
              cornerRadius={10}
              fill="#898a8d"
            />

            <RadialBar
              dataKey="value"
              data={data}
              cornerRadius={10}
              fill="#4f46e5"
              minAngle={0}
            />
            <Tooltip/>
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div
          className="absolute inset-0 flex flex-col
          mb-5 items-center justify-center pointer-events-none"
        >
          <p className="text-gray-500 text-lg">{t("GaugeChart.goal")}</p>
          <p className="text-2xl font-bold mb-12">${goalNum}</p>
        </div>
      </div>

      {/* Marketing & Sales */}
      <div className=" items-center justify-between p-3">
        {data2.map((item, index) => (
          <div key={index}>
            <div className=" justify-between items-center">
              <div>
                <p className="text-gray-600">{item.name}</p>
                <p className="text-xl font-semibold">
                  ${item.amount.toLocaleString()}.00
                </p>
              </div>
              <div className=" flex items-center gap-4 w-[280px] ">
                {/* Progress Bar */}
                <div className=" flex-1 w-150 bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="font-medium text-gray-600">
                  {item.percent}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
