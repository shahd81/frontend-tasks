import React from "react";

function PostCard({ title, body }) {
  return (
    <div className="
      bg-white 
      rounded-2xl 
      p-6 
      shadow-md 
      hover:shadow-xl 
      hover:-translate-y-1 
      transition-all 
      duration-300
      border border-gray-100
    ">
      
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {body}
      </p>

      <button className="
        mt-4 
        text-teal-500 
        text-sm 
        font-semibold 
        hover:text-teal-600 
        transition
      ">
        Read More →
      </button>

    </div>
  );
}

export default PostCard;
