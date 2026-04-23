import { useState, useEffect } from "react";
import Backgroundimg from "../assets/images/bg-shorten-desktop.svg";
import { useLinks } from "../context/LinksContext"; 
import { useTranslation } from "react-i18next";
function SearchCard() {
  const [input, setInput] = useState("");
  const { links, setLinks } = useLinks(); 
  const {t}=useTranslation("product");
  // Shorten button state
  const [shortenActive, setShortenActive] = useState(false);

  // Copy button state

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("links")) || [];
    setLinks(savedLinks); 
  }, [setLinks]);

  const handleShorten = () => {
    if (!input.trim()) return;

    const newLink = {
      id: Date.now(),
      original: input,
      short: `shrt.ly/${Math.random().toString(36).slice(2, 7)}`,
    };

    const updatedLinks = [newLink, ...links];
    setLinks(updatedLinks);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
    setInput("");

    // تغيير النص واللون مؤقتًا
    setShortenActive(true);
    setTimeout(() => {
      setShortenActive(false);
    }, 2000);
  };


  return (
    <>
      {/* Search Card */}
      <section className="relative overflow-hidden py-10 z-0 mt-20 p-10 m-3">
        <div className="absolute inset-0 bg-[#3b3054] z-10 " 
              > 
              <img 
                 className="w-full h-full object-cover opacity-70 z-20"
              src={Backgroundimg} alt="" />
              </div>
                      
        <div className="relative z-30 container mx-auto px-6">
          <div className="bg-transparent flex flex-col md:flex-row gap-4">
           <input
  type="text"
  placeholder={t("shortenPlaceholder")}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  className="flex-1 px-4 py-3 rounded-md outline-none 
             bg-white dark:bg-gray-800 
             text-gray-900 dark:text-white"
/>

<button
  onClick={handleShorten}
  className={`px-6 py-3 rounded-md font-semibold text-white transition
    ${shortenActive 
      ? "bg-teal-700" 
      : "bg-teal-400 hover:bg-teal-500"}
  `}
>
  {shortenActive ? t("shortened") : t("shorten")}
</button>
          </div>
        </div>
      </section>

     
        
    </>
  );
}

export default SearchCard;
