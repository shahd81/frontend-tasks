import React from "react";

export default function TextInput({ value, onChange, placeholder, type = "text"  }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
       className="w-full px-4 py-3 rounded-xl border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-pink-400
                 dark:bg-gray-700 dark:text-white"
    />
  );
}
