import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import BookModel from "./Models/BookModel.js";
import EventModel from "./Models/EventModel.js"; // Import EventModel if needed
import bcrypt from "bcrypt";
import eventRoutes from "./Routes/eventRoutes.js"; // Ensure this line is present

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const connectString ="mongodb+srv://shooq:admin2025@eventcluster.izzwyc2.mongodb.net/eventapp?retryWrites=true&w=majority&appName=EventCluster"

mongoose.connect(connectString)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// API Routes
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({ user, msg: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    res.status(200).json({ user, message: "Login successful." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during login." });
  }
});

app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
});

app.put("/updateProfile", async (req, res) => {
  // Profile update logic to be implemented
});

app.post("/saveBook", async (req, res) => {
  try {
    const { bookMsg, email } = req.body;

    const book = new BookModel({
      bookMsg,
      email,
    });

    await book.save();
    res.status(201).send({ book, msg: "Book saved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving the book." });
  }
});

app.get("/getBooks", async (req, res) => {
  try {
    const books = await BookModel.find({}).sort({ createdAt: -1 });
    const countBooks = await BookModel.countDocuments({});
    res.send({ books, count: countBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

// Integrate Event Routes
app.use("/api/events", eventRoutes); // Add the event routes here

app.listen(3001, () => {
  console.log("You are connected thank you");
});