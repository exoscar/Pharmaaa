import React from "react";

const ViewMedicine = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>PharmaChain</h1>
      </div>
      {/* End Page Title */}

      <section className="section profile">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <div className="tab-content pt-2">
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 className="card-title">About</h5>
                    <p className="small fst-italic">
                      Sunt est soluta temporibus accusantium neque nam maiores
                      cumque temporibus. Tempora libero non est unde veniam est
                      qui dolor. Ut sunt iure rerum quae quisquam autem eveniet
                      perspiciatis odit. Fuga sequi sed ea saepe at unde.
                    </p>

                    <h5 className="card-title">Medicine Details</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Medicine Name
                      </div>
                      <div className="col-lg-9 col-md-8">Paracetamol</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        National Drug Code
                      </div>
                      <div className="col-lg-9 col-md-8">45216</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Conditions</div>
                      <div className="col-lg-9 col-md-8">20-40°C, 30%</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Manufacturer
                      </div>
                      <div className="col-lg-9 col-md-8">Micro Labs</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Side Effects
                      </div>
                      <div className="col-lg-9 col-md-8">
                        Dry eyes, oral ulcers
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Expiry Date</div>
                      <div className="col-lg-9 col-md-8">12/10/2025</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Manufacturing Date
                      </div>
                      <div className="col-lg-9 col-md-8">12/10/2023</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Batch Number
                      </div>
                      <div className="col-lg-9 col-md-8">120AQ34</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">MRP</div>
                      <div className="col-lg-9 col-md-8">45.965</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Status</div>
                      <div className="col-lg-9 col-md-8">Safe to consume</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ViewMedicine;
