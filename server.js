const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Route for "/" -> home.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Serve all static files (CSS, JS, images) from public folder
app.use(express.static(path.join(__dirname, "public")));

// Optional: route for home.html
app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
