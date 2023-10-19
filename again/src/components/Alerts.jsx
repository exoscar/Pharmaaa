import React, { useEffect, useState } from "react";
import "../../public/assets/css/style.css";
import axios from "axios";
import { useStateContext } from "../context";
const Alerts = () => {
  const { updateManyMedicine, connect, address } = useStateContext();
  if (address) {
    console.log("Address", address);
  } else {
    connect();
  }

  const [form, setForm] = useState({
    sids: [], // Initialize with an array of strip IDs you want to update
  });

  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/alerts", { search })
        .then((res) => {
          if (res.data) {
            setAlerts(res.data);
          } else {
            console.log("no data");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function extractStripIDs(jsonArray) {
    const result = [];

    jsonArray.forEach((item) => {
      if (item.StripID && Array.isArray(item.StripID)) {
        item.StripID.forEach((idStr) => {
          const ids = idStr.split("-");
          if (ids.length === 2) {
            const start = parseInt(ids[0], 10);
            const end = parseInt(ids[1], 10);
            for (let i = start; i <= end; i++) {
              result.push(i);
            }
          } else {
            result.push(parseInt(idStr, 10));
          }
        });
      }
    });

    console.log(result);
    return result;
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const sids = extractStripIDs(alerts);
    setForm({ sids });

    try {
      await updateManyMedicine({ sids });

      for (const sid of sids) {
        console.log(sid);
        try {
          await axios
            .post("http://localhost:5000/updateStatus", { sid })
            .then((res) => {
              if (res.data == "updated") {
                console.log("updated");
              } else {
                console.log("not updated");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/alerts");
        setAlerts(result.data);
        console.log(alerts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main id="main" className="main">
      <div className="search-bar">
        <form className="search-form d-flex align-items-center">
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="text-center">
            <button onClick={handleSearch} className="btn btn-primary">
              Submit
            </button>
            {/* <input
              type="submit"
              onClick={handleSearch}
              className="btn"
              defaultValue="Sign up"
            /> */}
          </div>
        </form>
        <div className="text-center">
          <button onClick={handleUpdate} className="btn btn-primary">
            Update Alerts
          </button>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Alerts</h5>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Strip ID</th>
                  <th scope="col">Temperature</th>
                  <th scope="col">Humidity</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, i) => (
                  <tr key={alert.RegistrationNumber}>
                    <th scope="row">{i + 1}</th>
                    <td>{alert.RegistrationNumber}</td>
                    <td>
                      {alert.StripID.map((id) => (
                        <span key={id}>{id}, </span>
                      ))}
                    </td>
                    <td>{alert.temperature}</td>
                    <td>{alert.humidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Alerts;
