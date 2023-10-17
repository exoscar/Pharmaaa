const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://Kurama:kurama@macluster.ul1qntu.mongodb.net/";
const dbName = "Pharma";
const CollectionName = "Pharma";
const trcCollection = "TruckData";

async function connectToDb() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(CollectionName);
    const TruckDetails = db.collection(trcCollection);
    console.log("Connected to MongoDB");

    app.get("/", (req, res) => {
      res.json("Welcome to the API");
    });

    app.post("/auth", async (req, res) => {
      const total = Object.keys(req.body).length;
      if (total == 2) {
        const { metamaskId, password } = req.body;
        try {
          const check = await collection.findOne({
            metamaskId: metamaskId,
          });
          if (check) {
            const passwordMatch = await bcrypt.compare(
              password,
              check.password
            );
            if (passwordMatch) {
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
            const check = await collection.findOne({ metamaskId: metamaskId });
            if (check) {
              res.json("exists");
            } else {
              res.json("not exists");
              await collection.insertMany([data]);
            }
          } catch (error) {
            res.json("not exists");
          }
        } else {
          res.json("passwords do not match");
        }
      }
    });

    app.post("/sendTruckDetails", async (req, res) => {
      const { RegistrationNumber, StripID, From, To, address } = req.body;
      const status = "0";
      const Tdata = {
        RegistrationNumber: RegistrationNumber,
        StripID: StripID,
        from: From,
        to: To,
        status: status,
        address: address,
      };
      Tdata.StripID = Tdata.StripID.map(Number);
      console.log(Tdata);
      try {
        const resultt = await TruckDetails.find({
          RegistrationNumber: RegistrationNumber,
        });
        if (resultt && resultt.length > 0) {
          res.json("exists");
        } else {
          await TruckDetails.insertMany([Tdata]);
          res.json("added");
        }
      } catch (error) {
        res.json({ message: "Error occurred" });
      }
    });

    // app.post('/addMmedicine', async (req, res) => {
    //   const { Medicinines ,BatchNumber,tempmin,tempmax,}
    // });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
  }
}
connectToDb();
