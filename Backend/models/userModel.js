import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, default: "unknown" },
    fieldsOwned: { type: Number, default: 0 },
    cropsPlanted: { type: Number, default: 0 },
    totalDiseasesDetected: { type: Number, default: 0 },
  });

  const User = mongoose.model("User", userSchema);
  export default User;