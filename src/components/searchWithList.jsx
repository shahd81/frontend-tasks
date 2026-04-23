import { useState, useEffect } from "react";
import Backgroundimg from "../assets/images/bg-shorten-desktop.svg";
import { useLinks } from "../context/LinksContext"; 
import { useTranslation } from "react-i18next";
function SearchWithList() {
  const [input, setInput] = useState("");
  const { links, setLinks } = useLinks(); 
   const {t}=useTranslation("product");

  // Shorten button state
  const [shortenActive, setShortenActive] = useState(false);

  // Copy button state
  const [copiedIds, setCopiedIds] = useState([]);

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

  const handleCopy = (linkId, text) => {
    navigator.clipboard.writeText(text);

    setCopiedIds((prev) => [...prev, linkId]);

    // إعادة اللون والنص بعد ثانيتين
    setTimeout(() => {
      setCopiedIds((prev) => prev.filter((id) => id !== linkId));
    }, 2000);
  };

  return (
    <>
      {/* Search Card */}
      <section className="relative overflow-hidden py-10 z-10 mt-20 m-10">
         
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

      {/* Results */}
    {links.length > 0 && (
  <div className="container mx-auto px-6 mt-6 space-y-4 justify-between gap-6">
    {links.map((link) => (
    

        <div
  className="
    bg-white dark:bg-gray-800
    rounded-md p-4
    flex flex 
    shadow justify-between gap-6
  "
>
  <p className="truncate text-gray-800 dark:text-white font-medium">
    {link.original}
  </p>

  <span className="text-cyan-500 font-semibold">
    {link.short}
  </span>

  <button
    className={`px-4 py-2 rounded-md text-white text-sm transition
      ${
        copiedIds.includes(link.id)
          ? "bg-teal-700"
          : "bg-teal-400 hover:bg-cyan-500"
      }
    `}
   onClick={() => handleCopy(link.id, link.short)}
  >
    {copiedIds.includes(link.id) ? t("copied") : t("copy")}
  </button>
      </div>
    ))}
  </div>
)}
    </>
  );
}

export default SearchWithList;
