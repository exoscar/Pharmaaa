import React, { useState } from "react";
import { ethers } from "ethers";
import { useStateContext } from "../context";
const AddMedicine = () => {
  const { addMedicine, connect, address } = useStateContext();
  if (address) {
    console.log("Address", address);
  } else {
    connect();
  }
  const [formData, setFormData] = useState({
    MedicineName: "",
    NationalDrugCode: 0,
    Conditions: "",
    Quantity: "",
    Status: "Ideal/Trustworthy",
    Ingredients: "",
    SideEffects: "",
    ExpiryDate: "",
    ManufactureDate: "",
    BatchNumber: "",
    Price: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //  Convert ExpiryDate and ManufactureDate to strings
    if (name === "ExpiryDate" || name === "ManufactureDate") {
      setFormData({
        ...formData,
        [name]: value.toString(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addMedicine({
      ...formData,
    });
    console.log(formData);
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Add Medicine</h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"></h5>

                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Medicine Name"
                        name="MedicineName"
                        value={formData.MedicineName}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingName">Medicine Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingDrugCode"
                        placeholder="National Drug Code"
                        name="NationalDrugCode"
                        value={formData.NationalDrugCode}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingDrugCode">
                        National Drug Code
                      </label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingconditions"
                        placeholder="Conditions"
                        name="Conditions"
                        value={formData.Conditions}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingconditions">Conditions</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Ingredients"
                        id="floatingIngredients"
                        name="Ingredients"
                        value={formData.Ingredients}
                        onChange={handleInputChange}
                      ></textarea>
                      <label htmlFor="floatingIngredients">Ingredients</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingBatchNumber"
                        placeholder="Batch Number"
                        name="BatchNumber"
                        value={formData.BatchNumber}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingBatchNumber">Batch Number</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingQuantity"
                          placeholder="Quantity"
                          name="Quantity"
                          value={formData.Quantity}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="floatingQuantity">Quantity</label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingPrice"
                        placeholder="Price"
                        name="Price"
                        value={formData.Price}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingPrice">Price</label>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingMdate"
                        placeholder="Manufacturing date"
                        name="ManufactureDate"
                        value={formData.ManufactureDate}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingMdate">Manufacturing date</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingEdate"
                        placeholder="Expiry date"
                        name="ExpiryDate"
                        value={formData.ExpiryDate}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="floatingEdate">Expiry date</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Address"
                        id="floatingSideEffects"
                        name="SideEffects"
                        value={formData.SideEffects}
                        onChange={handleInputChange}
                      ></textarea>
                      <label htmlFor="floatingSideEffects">Side Effects</label>
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <button type="reset" className="btn btn-secondary">
                      Reset
                    </button>
                  </div>
                </form>
                {/* End floating Labels Form */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddMedicine;
