function ScheduleItem({ title, date, time, description }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-none">

      <input
        type="checkbox"
        className="w-5 h-5 mt-1 accent-indigo-600"
      />

      <div className="flex gap-4">
        
        {/* Date & Time */}
        <div className="min-w-[70px]">
          <p className="text-sm text-gray-500">{date}</p>
          <p className="font-semibold">{time}</p>
        </div>

        {/* Title & Desc */}
        <div>
          <p className="font-semibold text-gray-800">
            {title}
          </p>
          <p className="text-gray-500 text-sm">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}
export default ScheduleItem;
