import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [tempSelectedLocations, setTempSelectedLocations] = useState([]); // Temporary state for modal selections
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/companies");
        const data = response.data;
        setCompanies(data);
        setFilteredCompanies(data);

        const uniqueLocations = Array.from(new Set(data.map(company => company.company_location)));
        setLocations(uniqueLocations);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const applyFilters = () => {
    let filtered = companies;

    if (selectedLocations.length > 0) {
      filtered = filtered.filter(company => selectedLocations.includes(company.company_location));
    }

    if (selectedCompanyTypes.length > 0) {
      filtered = filtered.filter(company => selectedCompanyTypes.includes(company.company_type));
    }

    setFilteredCompanies(filtered);
  };

  const handleApplyModalFilters = () => {
    setSelectedLocations(tempSelectedLocations); // Set selectedLocations from temporary state
    setShowModal(false);
  };

  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  const toggleLocationInModal = (location) => {
    setTempSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  const toggleCompanyType = (type) => {
    setSelectedCompanyTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedLocations([]);
    setSelectedCompanyTypes([]);
    setFilteredCompanies(companies); // Reset to show all companies
  };

  const filteredLocations = locations.filter((location) =>
    location?.toLowerCase().includes(searchLocation.toLowerCase())
  );

  useEffect(() => {
    applyFilters();
  }, [selectedLocations, selectedCompanyTypes]);

  if (loading) return <p className="text-center text-gray-500 mt-4">Loading...</p>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <aside className="w-1/4 p-6 bg-white shadow-lg border-r hidden lg:block">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">All Filters</h2>
          <button className="text-blue-600 hover:underline text-sm" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium text-gray-600">Company Type</h3>
          <ul className="mt-3 space-y-2 text-gray-500">
            <li><label><input type="checkbox" className="mr-2" checked={selectedCompanyTypes.includes("Corporate")} onChange={() => toggleCompanyType("Corporate")} />Corporate</label></li>
            <li><label><input type="checkbox" className="mr-2" checked={selectedCompanyTypes.includes("MNC")} onChange={() => toggleCompanyType("MNC")} />MNC</label></li>
            <li><label><input type="checkbox" className="mr-2" checked={selectedCompanyTypes.includes("Indian MNC")} onChange={() => toggleCompanyType("Indian MNC")} />Indian MNC</label></li>
            <li><label><input type="checkbox" className="mr-2" checked={selectedCompanyTypes.includes("Startup")} onChange={() => toggleCompanyType("Startup")} />Startup</label></li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-600">Location</h3>
          <input
            type="text"
            placeholder="Search Location"
            className="w-full border-gray-300 border rounded-md p-2 mt-2 mb-4 text-sm"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <ul className="space-y-2 text-gray-500">
            {filteredLocations.slice(0, 4).map((location, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedLocations.includes(location)}
                    onChange={() => toggleLocation(location)}
                  />
                  {location}
                </label>
              </li>
            ))}
          </ul>
          {filteredLocations.length > 4 && (
            <button className="mt-4 text-blue-600 hover:underline" onClick={() => setShowModal(true)}>
              {filteredLocations.length - 4}+ more
            </button>
          )}
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Showing {filteredCompanies.length} companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company._id}
              className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border"
            >
              <img
                src={company.company_avatar || 'https://via.placeholder.com/100'} // Default avatar if none
                alt={company.company_name}
                className="w-14 h-14 rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800">{company.company_name}</h3>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">{company.company_type}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">{company.industry_type}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">{company.business_nature}</span>

                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for More Locations */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Select Location</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="Search Location"
              className="w-full border-gray-300 border rounded-md p-2 text-sm mb-4"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <ul className="grid grid-cols-2 gap-2 text-gray-500 max-h-60 overflow-y-auto">
              {filteredLocations.map((location, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={tempSelectedLocations.includes(location)}
                      onChange={() => toggleLocationInModal(location)}
                    />
                    {location}
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg"
              onClick={handleApplyModalFilters}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
