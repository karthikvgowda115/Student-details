const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://karthik:karthik123@cluster0.jwekdv3.mongodb.net/studentdb")
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch(err => {
  console.log("❌ MongoDB Error:", err);
});

// Routes
app.use("/students", studentRoutes);

// Test route
app.get("/", (req,res)=>{
  res.send("Server Working 🚀");
});

app.listen(5001, () => {
  console.log("🚀 Server running on http://localhost:5001");
});
