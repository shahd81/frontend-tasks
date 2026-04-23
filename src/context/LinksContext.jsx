import { createContext, useContext, useState } from "react";

const LinksContext = createContext();

export function LinksProvider({ children }) {
  const [links, setLinks] = useState([]);
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => setShowLinks(prev => !prev);

  return (
    <LinksContext.Provider value={{ links, setLinks, showLinks, toggleLinks }}>
      {children}
    </LinksContext.Provider>
  );
}

export const useLinks = () => useContext(LinksContext);
