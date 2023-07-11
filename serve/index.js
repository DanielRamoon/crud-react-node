const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Daniel13!",
  database: "crudgames",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let SQL = "INSERT INTO games (name, cost, category) VALUES (?,?,?)";

  db.query(SQL, [name, cost, category], (err, result) => {
    console.log(err);
  });
});

app.get("/getcards", (req, res) => {
  let SQL = "SELECT * from games";

  db.query(SQL, (err, resilt) => {
    if (err) console.log(err);
    else res.send(resilt);
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let mysql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE id = ?";
  db.query(mysql, [name, cost, category, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { idgames } = req.params;
  let mysql = "DELETE FROM games WHERE idgames = ?";
  db.query(mysql, idgames, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(8800, () => {
  console.log("SERVIDOR RODANDO");
});
