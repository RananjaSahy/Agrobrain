import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "./Sidebar";
import axios from "axios";
import EditLocation from "./Editlocation";
import { Button } from "./components/ui/button";

const Dashboard = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const[Edit,SetEdit] = useState(false);
  const [userData, setUserData] = useState({
    fieldsOwned: 0,
    cropsPlanted: 0,
    environmentalImpact: 0,
    cropAnalyses: 0,
    diseaseDetections: 0,
    weatherReports: 0,
    location: "Unknown", // Add location field here
  });

  // Function to refresh user data after location change
  const handleLocationUpdate = (newLocation) => {
    setUserData((prevData) => ({
      ...prevData,
      location: newLocation, // Update location in state
    }));
    SetEdit(false)
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/api/user-data?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching data:", err));
    } else {
      loginWithRedirect();
    }
  }, [isAuthenticated, user, loginWithRedirect]);
  return (
    <div className="flex h-screen bg-gradient-to-r from-green-100 to-white">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
       
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-6">
          <img
            src={user?.picture || "/default-profile.png"}
            alt="User Profile"
            className="w-24 h-24 rounded-full border-2 border-green-500 object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold text-green-900">
              {user?.name || "User Name"}
            </h3>
            <p className="text-gray-600">
              Location: {userData?.location || "Unknown"}
             {Edit && <EditLocation onLocationUpdate={handleLocationUpdate} />} 
             <button onClick={()=>SetEdit(!Edit)} className="m-4 bg-[#5DB996] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#118B50] focus:outline-none focus:ring-2 focus:ring-blue-300">
  {Edit ? "Cancel": "Edit"}
</button>

            </p>
          </div>
        </div>

        {/* Farm Info Section */}
        <h3 className="text-xl font-semibold mt-8">Farm Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card title="Fields Owned" value={`${userData.fieldsOwned}`} />
          <Card title="Crops Planted" value={`${userData.cropsPlanted}`} />
          <Card
            title="Environmental Impact"
            value={`${userData.environmentalImpact}% positive`}
          />
        </div>

        {/* Progress Section */}
        <h3 className="text-xl font-semibold mt-8">Progress</h3>
        <div className="mt-4">
          <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
            Graph Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

function Card({ title, value }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <p className="text-green-600 text-lg">{value}</p>
      <p>{title}</p>
    </div>
  );
}

export default Dashboard;
