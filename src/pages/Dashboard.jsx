import StatsChart from "../components/statsChart";
import GaugeChart from "../components/GaugeChart";
import StatCard from "../components/common/Card/statsCard";
import SalesDonut from "../components/salesDount";
import UpcomingSchedule from "../components/UpComingSchedule";
import RecentOrders from "../components/RecentOrder";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation("dashboard");

  return (
    <div className=" flex-col bg-gray-100 dark:bg-gray-900 min-h-screen 
    text-gray-900 dark:text-gray-100 transition-colors">
      <div className=" mx-auto pt-12 px-2 md:px-8 ">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title={t("stats.card1.title")} value="$120,369" change={20} />
          <StatCard title={t("stats.card2.title")} value="$234,210" change={9.0} />
          <StatCard title={t("stats.card3.title")} value="874" change={-4.5} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <StatsChart />
          </div>
          <GaugeChart />
        </div>

        {/* Donut + Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
          <SalesDonut title={t("charts.salesCategory")} totalLabel={t("charts.total")} />
          <UpcomingSchedule title={t("charts.upcomingSchedule")} />
        </div>

        <RecentOrders title={t("recentOrders")} />

      </div>
    </div>
  );
}
