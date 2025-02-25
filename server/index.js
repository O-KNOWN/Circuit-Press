require("dotenv").config()
const express = require("express")
const app =express();
const PORT = 3000 || process.env.PORT
const mongoose = require("mongoose")
const Users = require("./models/subscribers")
const cors = require("cors")
const Admin = require("./models/admin")
const jwt = require("jsonwebtoken")
app.use(
    cors({
      origin: "http://localhost:5173", // Explicitly allow your frontend
      credentials: true, // Allow cookies & authentication headers
    })
);

const connectDB = async () => {
    try {   
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database is connected successfully: ${connect.connection.host}`);

        await createAdmin();
    } catch (e) {
        console.error(e);   
    }
}
  
app.use(express.json())

app.get("/", (req,res) => {
    res.json("welcome to my page")
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

app.post("/subscribe", async(req,res) => {
    try {
        const {email} = req.body

        const user = await Users.create({  email });
        return res.status(201).json({ message: 'User subscribed successfully', userId: user._id });
    } catch (error) {
        console.log(error)
    }
})

app.get("/get-time", (req, res) => {
    const userTime = new Date().toLocaleTimeString("en-US");
    res.json({ message: "User Time Retrieved", userTime });
});

const createAdmin = async () => {
    const adminExists = await Admin.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      const admin = new Admin({
        email: "admin@circuitpress.com",
        password: "admin123@", 
        role: "admin",
      });
      await admin.save();
    //   console.log("Default Admin Created: admin@circuitpress.com | Password: admin123@");
    }
};
  

// 📌 LOGIN USER
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    return res.json({ token, user });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



connectDB();
app.listen(PORT, ()=> {
    console.log(`Example app listening on port ${PORT}`)
})   