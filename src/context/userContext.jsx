import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const user1 = {
    name: "Natashia Khaleira",
    img: "https://i.pravatar.cc/40",
    role: "Admin",
    location: "Leeds, United Kingdom",
    firstName: "Natashia",
    lastName: "Khaleira",
    dob: "12-10-1990",
    email: "info@binary-fusion.com",
    phone: "(+62) 821 2554-5846",
    country: "United Kingdom",
    city: "Leeds, East London",
    postalCode: "ERT 1254"
  };
  const [user, setUser] = useState({
    firstName: localStorage.getItem("FirstName") || user1.firstName,
    lastName: localStorage.getItem("LastName") || user1.lastName,
    email: localStorage.getItem("email") || user1.email,
    image: localStorage.getItem("image") || user1.image
  });

  const updateUser = (newData) => {
    const updated = { ...user, ...newData };

    setUser(updated);

    localStorage.setItem("FirstName", updated.firstName);
    localStorage.setItem("LastName", updated.lastName);
    localStorage.setItem("email", updated.email);
    localStorage.setItem("image", updated.image);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}