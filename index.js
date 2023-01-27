const http = require("http");
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs/promises");
const { addNote, getNotes, removeNote } = require("./notes.controller");

const port = 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "pages");

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express title",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  console.log(req.params);
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
