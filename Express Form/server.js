const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const HTTP_PORT = process.env.PORT || 8080; // assign a port

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

// Serve static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.post("/submit", upload.single("artwork"), (req, res) => {
  const { title, artist, date, description } = req.body;
  const file = req.file;

  console.log("Form Data:", { title, artist,date, description });
  console.log("Uploaded File:", file);

  res.send("Form submitted successfully!");
});

// Start the server
app.listen(HTTP_PORT, () => {
  console.log(`Server running at http://localhost:${HTTP_PORT}`);
});