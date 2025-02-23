require("dotenv").config()
const express = require("express")
const app =express();
const PORT = 3000 || process.env.PORT
const mongoose = require("mongoose")
const Users = require("./models/subscribers")
const cors = require("cors")

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
    } catch (e) {
        console.error(e);   
    }
}
  
app.use(express.json())

app.get("/", (req,res) => {
    res.json("welcome to my page")
})

app.post("/subscribe", async(req,res) => {
    try {
        const {email} = req.body

        const user = await Users.create({  email });
        return res.status(201).json({ message: 'User subscribed successfully', userId: user._id });
    } catch (error) {
        console.log(error)
    }
})




connectDB();
app.listen(PORT, ()=> {
    console.log(`Example app listening on port ${PORT}`)
})