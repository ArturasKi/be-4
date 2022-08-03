const express = require('express');
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
// const md5 = require('js-md5');
// const uuid = require('uuid');

app.use(
  express.urlencoded({
      extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "viesasis_sektorius",
});

//BACK CREATE SAVIVALDYBĖ
app.post("/admin/savivaldybes", (req, res) => {
  const sql = `
  INSERT INTO savivaldybes
  (title)
  VALUES (?)
  `;
  con.query(sql, [req.body.title], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "Pridėta nauja savivaldybė!", type: "success" } });
  });
});

//BACK CREATE SRITIS
app.post("/admin/sritys", (req, res) => {
  const sql = `
  INSERT INTO sritys
  (title, photo, sav_id)
  VALUES (?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.photo, req.body.sav], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "Pridėta nauja sritis!", type: "success" } });
  });
});

//BACK READ SAVIVALDYBĖS
app.get("/admin/savivaldybes", (req, res) => {
  const sql = `
SELECT *
FROM savivaldybes
ORDER BY title
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//BACK READ SRITYS
app.get("/admin/sritys", (req, res) => {
  const sql = `
SELECT sr.id, sr.title, sav.title AS sav, photo
FROM sritys AS sr
LEFT JOIN savivaldybes AS sav
ON sav.id = sr.sav_id
ORDER BY title
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//BACK DELETE SAVIVALDYBĖ
app.delete("/admin/savivaldybes/:id", (req, res) => {
  const sql = `
  DELETE FROM savivaldybes
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Savivaldybė buvo ištrinta', type: 'danger' } });
  });
});

//BACK DELETE SAVIVALDYBĖ
app.delete("/admin/sritys/:id", (req, res) => {
  const sql = `
  DELETE FROM sritys
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Savivaldybė buvo ištrinta', type: 'danger' } });
  });
});

// con - connection objektas;

//BACK EDIT SAVIVALDYBĖ
app.put("/admin/savivaldybes/:id", (req, res) => {
  const sql = `
  UPDATE savivaldybes
  SET title = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Savivaldybė redaguota', type: 'success' } });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})