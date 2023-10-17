const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "Pharma",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://Kurama:kurama@macluster.ul1qntu.mongodb.net/";
const dbName = "Pharma";
const CollectionName = "Pharma";

async function connectToDb() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);
    const Pharma = db.collection(CollectionName);
    const TruckDetails = db.collection("TruckDetails");
    console.log("Connected to MongoDB");

    app.get("/", (req, res) => {
      // Add your route logic here
      res.json("Welcome to the API");
    });
    app.get("/auth", (req, res) => {
      if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
      } else {
        res.send({ loggedIn: false });
      }
    });

    app.post("/auth", async (req, res) => {
      const total = Object.keys(req.body).length;
      if (total == 2) {
        const { metamaskId, password } = req.body;
        try {
          const check = await Pharma.findOne({
            // Changed findone to findOne
            metamaskId: metamaskId,
          });
          if (check) {
            const passwordMatch = await bcrypt.compare(
              password,
              check.password
            );
            if (passwordMatch) {
              req.session.user = check;
              console.log(req.session.user);
              res.json("exists");
            } else {
              res.json("Wrong Password");
            }
          } else {
            res.json("not exists");
          }
        } catch (error) {
          res.json("not exists");
        }
      } else {
        const { companyName, metamaskId, password, confirmPassword } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (password === confirmPassword) {
          const data = {
            companyName: companyName,
            metamaskId: metamaskId,
            password: hashedPassword,
          };
          try {
            const check = await pharma.findOne({ metamaskId: metamaskId });
            if (check) {
              res.json("exists");
            } else {
              res.json("not exists");
              await pharma.insertMany([data]);
            }
          } catch (error) {
            res.json("not exists");
          }
        } else {
          res.json("passwords do not match");
        }
      }
    });

    app.post("/addTruckDetails", async (req, res) => {
      const { RegistrationNumber, NationalDrugCode, From, To } = req.body;
      const status = "0";
      const data = {
        RegistrationNumber: RegistrationNumber,
        NationalDrugCode: NationalDrugCode,
        From: From,
        To: To,
        status: status,
      };
      try {
        const check = await TruckDetails.findOne({
          RegistrationNumber: RegistrationNumber,
        });
        if (check) {
          res.json("exists");
        } else {
          await TruckDetails.insertMany([data]);
          res.json("added");
        }
      } catch (error) {
        res.json("not exists");
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
  }
}
connectToDb();
