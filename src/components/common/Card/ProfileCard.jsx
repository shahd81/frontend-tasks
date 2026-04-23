import { useAuth } from "../../../hooks/useAuth";
import InfoItem from "../InfoItem";
import {  useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../context/userContext";
export default function ProfileCard({user1}) {
    const { user, updateUser } = useUser();
    const{role}=useAuth();
  const handleImg = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ image: reader.result }); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6 flex items-center gap-6 transition-colors">
      <input
    type="file"
    accept="image/*"
    id="avatarUpload"
    onChange={handleImg}
    className="hidden"
  />
  
  <label htmlFor="avatarUpload" className="cursor-pointer block">
    <img
      src={user.image}
      alt="Profile Photo"
      className="w-20 h-20 rounded-full border-2 border-green-700 object-cover"
    />
  </label>
      <div className="flex flex-col dark:text-white">
        <h2 className="text-xl font-bold text-black dark:text-white"> {user.firstName} {user.lastName}</h2>
        <p className="text-gray-500 dark:text-gray-100">{role}</p>
        <p className="text-gray-500 dark:text-gray-100">{user1.location}</p>
      </div>
    </div>
  );
}
export function PersonalInfo({ user1  }) {
 const {t} = useTranslation("profile");
   const { user, updateUser } = useUser();
     const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    updateUser({
      firstName,
      lastName,
      email
    });

    setEditing(false);
  };
  const { role } = useAuth();
  return (
    <div className="grid gap-8 bg-white p-6 rounded-xl shadow mb-6 pt-3 dark:bg-gray-800">
        <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="font-semibold text-2xl">
         { t("personalInfo")}
        </h3>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-1 rounded-lg text-sm"
          >
             { t("edit")}
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-1 rounded-lg text-sm"
          >
             { t("save")}
          </button>
        )}
        </div>
       <div className=" grid grid-cols-3 gap-8  ">
  <InfoItem  label={t("firstName")} value={editing?
    ( <input
                type="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              firstName
            )} />
  <InfoItem label={t("lastName")}  value={editing?
    ( <input
                type="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              lastName
            )}
               />
  <InfoItem label={t("dob")} value={user1.dob} />
  <InfoItem label={t("email")}
  value={editing?
    ( <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full text-gray-800 dark:text-gray-100"
              />
            ) : (
              email
            )}
              />
  <InfoItem label={t("phone")} value={user1.phone} />
  <InfoItem label={t("role")} value={role} />
  </div> 
  </div>
  );
}
export function AddressInfo({ user }) {
  const {t}=useTranslation("profile");
  return (
    <div className="grid gap-8 bg-white p-6 rounded-xl shadow mb-6 pt-3 dark:bg-gray-800">
        <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="font-semibold text-2xl">
          {t("addressInfo")}
        </h3>
        <button className=" transition text-black px-4 py-1 rounded-xl border-b text-sm dark:text-white">
         { t("edit")}
        </button>
        </div>
<div className=" grid grid-cols-3 gap-8 text-white-800 dark:text-white">
  <InfoItem label= {t("country")} value={user.country} />
  <InfoItem label= {t("city")} value={user.city} />
  <InfoItem label= {t("postalCode")} value={user.postalCode} />
      
      </div>
    </div>
  );
}
