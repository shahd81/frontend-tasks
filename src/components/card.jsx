import React from "react";

export default function Card({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 relative">
      <div className="absolute -top-10 left-8">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-full flex items-center justify-center shadow-xl">
          {/* Add your icon image here */}
          <img src={icon} />
        </div>
      </div>
      <div className="pt-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
