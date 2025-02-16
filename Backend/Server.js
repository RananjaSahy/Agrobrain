import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/mongoDB.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(bodyParser.json());


connectDB();



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
