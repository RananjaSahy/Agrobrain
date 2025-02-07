import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mongoose schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, default: "unknown" },
  fieldsOwned: { type: Number, default: 0 },
  cropsPlanted: { type: Number, default: 0 },
  totalDiseasesDetected: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

// API route for login and location update
app.post("/api/login", async (req, res) => {
  const { email, name, location = "unknown" } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Missing email or name" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, location },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "User logged in", user });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
});


app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
