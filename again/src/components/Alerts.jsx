import React, { useEffect, useState } from "react";
import "../../public/assets/css/style.css";
import axios from "axios";
const Alerts = () => {
  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState([]);

  // async function handleSearch(e) {
  //   e.preventDefault();
  //   try {
  //     await axios
  //       .post("http://localhost:5000/alerts", { search })
  //       .then((res) => {
  //         if (res.data) {
  //           console.log(res.data);
  //         } else {
  //           console.log("no data");
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

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
        <form className="search-form d-flex align-items-center" action="POST">
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
            <button
              type="submit"
              // onSubmit={handleSearch}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Medicines</h5>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Medicine Name</th>
                  <th scope="col">Strip ID</th>
                  <th scope="col">Batch Number</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.RegistrationNumber}>
                    <th scope="row">1</th>
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
