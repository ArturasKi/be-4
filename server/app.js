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

//BACK CREATE SAV
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//BACK SAV
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