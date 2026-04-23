import { useEffect, useState, useRef } from "react";
import { getUsers } from "../services/user.service";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);
const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [visibleColumns, setVisibleColumns] = useState({
  name: true,
  email: true,
  city: true,
  company: true,
});
const [showColumnsMenu, setShowColumnsMenu] = useState(false);
const [debouncedSearch, setDebouncedSearch] = useState("");
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 500);
  return () => {
    clearTimeout(timer);
  };
}, [searchTerm]);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  //  Format data
  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address.city,
    company: user.company.name,
  }));

  //  Filter
const filteredData = formattedUsers.filter((user) => {
  const matchesCity = selectedCity
    ? user.city === selectedCity
    : true;
  const matchesCompany = selectedCompany
    ? user.company === selectedCompany
    : true;

  const matchesSearch =
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(debouncedSearch.toLowerCase());

  return matchesCity && matchesSearch&&matchesCompany;
});
  //  Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // sort handler
  function handleSort(key) {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  // cities dropdown
  const cities = [...new Set(formattedUsers.map((user) => user.city))];
  const companies = [...new Set(formattedUsers.map((user) => user.company))];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
     <div className="flex flex-col md:flex-row gap-4 mb-4 ">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border p-2 rounded w-full md:w-64 text-black dark:text-white"
  />

  <select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    className="border p-2 rounded w-full md:w-48 bg-white dark:bg-gray-600  text-black dark:text-white"
  >
    <option value=""  className="text-black ">All Cities</option>
    {cities.map((city) => (
      <option key={city}
      className="text-black dark:text-white"
      value={city}>
        {city}
      </option>
    ))}
  </select>
  <select
    value={selectedCompany}
    onChange={(e) => setSelectedCompany(e.target.value)}
    className="border p-2 rounded w-full md:w-48 bg-white dark:bg-gray-600 text-black dark:text-white "
  >
    <option value=""  className=" ">Select Company</option>
    {companies.map((company) => (
      <option key={company}
      className="text-black dark:text-white"
      value={company}>
        {company}
      </option>
    ))}
  </select>
</div> 

 <div className="relative inline-block p-5 text-black dark:text-white">
  <button className="border p-2 rounded"
    onClick={() => setShowColumnsMenu(!showColumnsMenu)}
>Columns </button>
  {showColumnsMenu && (
  <div className="absolute bg-white dark:bg-black dark: text-white text-black border rounded shadow mt-1 p-2">
    {Object.keys(visibleColumns).map((col) => (
      <label key={col} className="flex items-center gap-2 mb-1">
        <input
          type="checkbox"
          checked={visibleColumns[col]}
          onChange={() =>
            setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }))
          }
        />
        <span className="capitalize">{col}</span>
      </label>
    ))}
  </div>
)}
</div>
      <div className="overflow-x-auto">
   <table className="min-w-[750px] w-full divide-y divide-gray-200 
   dark:divide-gray-700 transition-colors  text-black dark:text-white">      
   <thead>
  <tr className="bg-gray-100 dark:bg-gray-700">
    {visibleColumns.name && <th className="p-2 cursor-pointer" onClick={() => handleSort("name")}>Name</th>}
    {visibleColumns.email && <th className="p-2 cursor-pointer" onClick={() => handleSort("email")}>Email</th>}
    {visibleColumns.city && <th className="p-2">City</th>}
    {visibleColumns.company && <th className="p-2">Company</th>}
  </tr>
</thead>

          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              sortedData.map((user) => (
                <tr key={user.id} className="border-t">
                  {visibleColumns.name && <td className="p-2">{user.name}</td>}
      {visibleColumns.email && <td className="p-2">{user.email}</td>}
      {visibleColumns.city && <td className="p-2">{user.city}</td>}
      {visibleColumns.company && <td className="p-2">{user.company}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}