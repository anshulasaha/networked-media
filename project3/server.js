const express = require("express");

const parser = require("body-parser");
const encodedParser = parser.urlencoded({ extended: true });

// const multer = require("mul// setting up multer libraryter");
// const uploadProcessor = multer({ dest: "assets/upload/" });

const app = express();

app.use(express.static("assets"));
app.use(encodedParser);

app.set("view engine", "ejs");

const buckets = {
  Manhattan: [],
  Brooklyn: [],
  Queens: [],
  Bronx: [],
  "Staten Island": [],
  Other: [],
};

const senseClass = {
  sight: "chip-sight",
  scent: "chip-scent",
  taste: "chip-taste",
  sound: "chip-sound",
  unnamed: "chip-unnamed",
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/submit", (req, res) => {
  const guest = (req.query.guest || "").trim();
  const message = (req.query.message || "").trim();
  const sense = (req.query.sense || "").trim().toLowerCase();
  const borough = (req.query.borough || "").trim();
  const location = (req.query.location || "").trim();

  const entry = {
    guest,
    message,
    sense,
    borough,
    location,
    time: new Date().toLocaleString(),
    colorClass: senseClass[sense] || senseClass.unnamed,
  };

  const key = buckets[borough] ? borough : "Other";
  buckets[key].push(entry);

  // go to that borough page
  res.redirect(`/borough/${encodeURIComponent(key)}`);
});

//ejs is dynamic so it makes those dynamic pages instead iof .htmls
app.get("/borough/:name", (req, res) => {
  const name = req.params.name;
  const list = buckets[name] || [];
  res.render("boroughs.ejs", { name, list });
});

app.get("/collection", (req, res) => {
  res.render("collection.ejs", {});
});

app.listen(5001, () => {
  console.log("server started");
});
