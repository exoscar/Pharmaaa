import React from "react";

const AddMedicine = () => {
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

                <form className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Medicine Name"
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
                      />
                      <label htmlFor="floatingconditions">Conditions</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Address"
                        id="floatingIngredients"
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
                        placeholder="Mdate"
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
                        placeholder="Edate"
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
