const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const dotenv = require("dotenv")
dotenv.config()

mongoose
  .connect(
    "mongodb+srv://fakhri:fakhri@cluster0.97hxxd2.mongodb.net/Project0?retryWrites=true&w=majority"
  )
  .then(() => console.log("database connected"))
  .catch((err) => {
    if (err) throw err;
  });



app.use("/api", require("./routes/PersonRoutes"));

const port=process.env.PORT
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("database connected")).catch((err)=> console.error(err))
