const express = require("express");
const app = express();
const Pharma = require("./mongo");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { metamaskId, password } = req.body;
  try {
    const check = await Pharma.findone({ metamaskId: metamaskId });
    if (check) {
      res.json("exists");
    } else {
      res.json("not exists");
    }
  } catch (error) {
    res.json("not exists");
  }
});

app.post("/", async (req, res) => {
  const { companyName, metamaskId, password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    const data = {
      companyName: companyName,
      metamaskId: metamaskId,
      password: password,
    };
    try {
      const check = await Pharma.findone({ metamaskId: metamaskId });
      if (check) {
        res.json("exists");
      } else {
        res.json("not exists");
        await Pharma.insertMany([data]);
      }
    } catch (error) {
      res.json("not exists");
    }
  } else {
    res.json("passwords do not match");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
