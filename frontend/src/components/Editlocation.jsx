
import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const EditLocation = ({ onLocationUpdate }) => {
    const {user} = useAuth0();
  const [email, setEmail] = useState(user.email);
  const [newLocation, setNewLocation] = useState("");

  const handleUpdateLocation = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/update-location", {
        email,
        newLocation,
      });
      alert(`Location updated to: ${response.data.user.location}`);
      // Call the callback function to refresh user data in Dashboard component
      onLocationUpdate(response.data.user.location);
    } catch (error) {
      alert("Error updating location: " + error.response.data.error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter new location"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
      />
      <button onClick={handleUpdateLocation}>Update Location</button>
    </div>
  );
};
export default EditLocation