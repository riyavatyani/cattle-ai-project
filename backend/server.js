const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const FormData = require("form-data");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Backend server working");
});

app.post("/predict", upload.single("image"), async (req, res) => {

  try {

    console.log("Request reached server");

    if (!req.file) {
      return res.status(400).json({ error: "No image received" });
    }

    console.log("Image received from mobile");

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 20000
      }
    );

    fs.unlinkSync(req.file.path);

    console.log("Prediction received from Python");

    res.json(response.data);

  } catch (error) {

    console.error("Prediction error:", error.message);

    res.status(500).json({
      error: "Prediction failed"
    });

  }

});

app.listen(5000, () => {
  console.log("Node server running on port 5000");
});