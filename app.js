const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://Kurama:kurama@macluster.ul1qntu.mongodb.net/";
const dbName = "Pharma";
const CollectionName = "Pharma";
async function connectToDb() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(CollectionName);
    console.log("Connected to MongoDB");

    app.get("/", (req, res) => {
      // Add your route logic here
      res.json("Welcome to the API");
    });

    app.post("/auth", async (req, res) => {
      const total = Object.keys(req.body).length;
      if (total == 2) {
        const { metamaskId, password } = req.body;
        try {
          const check = await collection.findOne({
            // Changed findone to findOne
            metamaskId: metamaskId,
            password: password,
          });
          if (check) {
            res.json("exists");
          } else {
            res.json("not exists");
          }
        } catch (error) {
          res.json("not exists");
        }
      } else {
        const { companyName, metamaskId, password, confirmPassword } = req.body;
        if (password === confirmPassword) {
          const data = {
            companyName: companyName,
            metamaskId: metamaskId,
            password: password,
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

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
  }
}
connectToDb();

// app.get("/", (req, res) => {
//   // Add your route logic here
//   res.json("Welcome to the API");
// });

// app.post("/auth", async (req, res) => {
//   const total = Object.keys(req.body).length;
//   if (total == 2) {
//     const { metamaskId, password } = req.body;
//     try {
//       const check = await collection.findOne({
//         // Changed findone to findOne
//         metamaskId: metamaskId,
//         password: password,
//       });
//       if (check) {
//         res.json("exists");
//       } else {
//         res.json("not exists");
//       }
//     } catch (error) {
//       res.json("not exists");
//     }
//   } else {
//     const { companyName, metamaskId, password, confirmPassword } = req.body;
//     if (password === confirmPassword) {
//       const data = {
//         companyName: companyName,
//         metamaskId: metamaskId,
//         password: password,
//       };
//       try {
//         const check = await collection.findOne({ metamaskId: metamaskId });
//         if (check) {
//           res.json("exists");
//         } else {
//           res.json("not exists");
//           await collection.insertMany([data]);
//         }
//       } catch (error) {
//         res.json("not exists");
//       }
//     } else {
//       res.json("passwords do not match");
//     }
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
