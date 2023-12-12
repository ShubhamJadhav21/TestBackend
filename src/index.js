const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const route = require("./routes/user.routes");
const app = express();
const mongoose = require("mongoose");

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://Nishant:Kh8cI13BDxDiuUHh@cluster0.k0s0qbw.mongodb.net/ravoProject",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

// Route to handle file uploads
app.post("/user", upload.any(), route);

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
