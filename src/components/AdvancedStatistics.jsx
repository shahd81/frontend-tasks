import React from "react";
import Card from "./card";
import recognition from ".././assets/images/icon-brand-recognition.svg"
import record from ".././assets/images/icon-detailed-records.svg"
import custom from ".././assets/images/icon-fully-customizable.svg"
import { useTranslation } from "react-i18next";
export default function AdvancedStatistics() {
  const {t}=useTranslation("product");
  const cards = [
    {
      icon: recognition,
      title: t("brandRecognition"),
      description: t("brandRecognitionDesc"),
    },
    {
      icon: record,
      title: t("detailedRecords"),
      description: t("detailedRecordsDesc"),
    },
    {
      icon: custom,
      title: t("fullyCustomizable"),
      description: t("fullyCustomizableDesc"),
    },
  ];

  return (
    <section className=" relative md:py-16 px-2 md:px-16 md:space-y-8 pt-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t("advancedTitle")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {t("advancedDesc")}
        </p>
      </div>
      {/* Line */}
        <div className=" absolute  bg-cyan-400 z-0 
          md:bottom-65 md:left-1/4 md:right-1/4 md:h-1 md:mt-70 
           ">      
           </div>  
        <div className=" absolute  bg-cyan-400 z-0 md:hidden
          left-1/2 -translate-x-1/2  top-1/4 bottom-1/4 w-1
           ">        
        </div>
      <div className="flex flex-col md:flex-row gap-8 relative mt-16 z-10">
        {cards.map((card, idx) => (
           <div
            key={idx}
            className={`relative md:flex-1 z-10 ${idx === 1 ? "mt-8 md:mt-12" : idx === 2 ? "mt-16 md:mt-24" : "mt-0"}`}
          >
            <Card {...card} />
          </div>
      
        ))}
      </div>
    </section>
  );
}
