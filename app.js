const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Myapi = "Kurama";
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://Kurama:kurama@macluster.ul1qntu.mongodb.net/";
const dbName = "Pharma";
const CollectionName = "Pharma";
const trcCollection = "TruckData";
const Alertsc = "Alerts";

async function connectToDb() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(CollectionName);
    const TruckDetails = db.collection(trcCollection);
    const Alerts = db.collection(Alertsc);

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
      // Tdata.StripID = Tdata.StripID.map(Number);
      console.log(Tdata);
      try {
        const resultt = await TruckDetails.findOne({
          RegistrationNumber: RegistrationNumber,
        });
        if (resultt) {
          res.json("exists");
        } else {
          await TruckDetails.insertMany([Tdata]);
          res.json("added");
        }
      } catch (error) {
        res.json({ message: "Error occurred" });
      }
    });

    // app.post("/getTemp", async (req, res) => {
    //   const { temperature, humidity, RegistrationNumber } = req.body;
    //   const apiKey = req.header("Authorization");

    //   if (apiKey !== Myapi) {
    //     res.status(401).send("Unauthorized");
    //     return;
    //   }

    //   try {
    //     const resultt = await TruckDetails.find({
    //       RegistrationNumber: RegistrationNumber,
    //       status: "0",
    //     });
    //     if (resultt.length > 0) {
    //       const StripID = resultt[0].StripID;
    //       console.log(StripID);
    //     } else {
    //       console.log("No matching results found.");
    //     }

    //     const chk = await Alerts.find({
    //       RegistrationNumber: RegistrationNumber,
    //       status: "0",
    //     });
    //     if (chk && chk.length > 0) {
    //       res.json("exists");
    //     } else {
    //       const Edata = {
    //         temperature: temperature,
    //         humidity: humidity,
    //         RegistrationNumber: RegistrationNumber,
    //         StripID: StripIDs,
    //         status: "0",
    //       };
    //       await Alerts.insertMany([Edata]);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    app.post("/getTemp", async (req, res) => {
      const { temperature, humidity, RegistrationNumber } = req.body;
      console.log(temperature, humidity, RegistrationNumber);
      const apiKey = req.header("Authorization");

      if (apiKey !== Myapi) {
        res.status(401).send("Unauthorized");
        return;
      }

      try {
        const resulttt = await TruckDetails.findOne({
          RegistrationNumber: RegistrationNumber,
          status: "0",
        });

        if (resulttt) {
          const StripID = resulttt.StripID; // Access StripID directly from resulttt
          console.log(StripID);

          const chk = await Alerts.findOne({
            RegistrationNumber: RegistrationNumber,
            status: "0",
          });

          if (chk) {
            res.json("exists");
          } else {
            const Edata = {
              temperature: temperature,
              humidity: humidity,
              RegistrationNumber: RegistrationNumber,
              StripID: StripID, // Use StripID here
              status: "0",
            };

            await Alerts.insertMany([Edata]);
            res.json("Data inserted successfully.");
          }
        } else {
          console.log("No matching results found.");
          res.json("No matching results found.");
        }
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
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
