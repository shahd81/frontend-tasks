import ProfileCard from "../components/common/Card/ProfileCard";
import { PersonalInfo , AddressInfo } from "../components/common/Card/ProfileCard";
import { useTranslation } from "react-i18next";
export default function Profile() {
     const {t} = useTranslation("profile")
     const user = {
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

  return (
    <div className="flex-1  bg-gray-50  pt-4 px-3
     dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <h1 className="font-semibold text-3xl p-4">{t("title")} </h1>
        <ProfileCard user1={user} />
<PersonalInfo user1={user}  />
        <AddressInfo user={user} />
      </div>
  );
}
