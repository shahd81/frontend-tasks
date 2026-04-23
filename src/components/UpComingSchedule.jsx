import ScheduleItem from "./ScheduleItem";
import { useTranslation } from "react-i18next";

export default function UpcomingSchedule() {
  const { t } = useTranslation("dashboard");

  const scheduleData = t("scheduleItems", { returnObjects: true });

  return (
    <div className="bg-white dark:bg-gray-800 
    v p-2 rounded-2xl shadow-sm border transition-colors">
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold p-2 text-gray-900 dark:text-white">
          {t("upcomingSchedule")}
        </h3>
        <span className="text-gray-400 dark:text-gray-300 text-xl">⋮</span>
      </div>

      {scheduleData.map((item, index) => (
        <ScheduleItem key={index} {...item} />
      ))}
    </div>
  );
}
