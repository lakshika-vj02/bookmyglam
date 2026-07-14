function Features() {
  return (
    <section className="container py-5">

      <div className="row g-4">

        {/* Verified Artists */}
        <div className="col-md-3">
          <div className="d-flex align-items-center bg-white shadow-sm p-3 rounded-4 h-100">

            <div
              className="me-3 d-flex justify-content-center align-items-center"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "#fde7f3",
                color: "#f472b6",
                fontSize: "28px"
              }}
            >
              🛡️
            </div>

            <div>
              <h6 className="fw-bold mb-1">Verified Artists</h6>
              <small className="text-muted">
                Trusted & professional makeup artists.
              </small>
            </div>

          </div>
        </div>

        {/* Best Price */}
        <div className="col-md-3">
          <div className="d-flex align-items-center bg-white shadow-sm p-3 rounded-4 h-100">

            <div
              className="me-3 d-flex justify-content-center align-items-center"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "#fde7f3",
                color: "#f472b6",
                fontSize: "28px"
              }}
            >
              💰
            </div>

            <div>
              <h6 className="fw-bold mb-1">Best Price</h6>
              <small className="text-muted">
                Affordable & transparent pricing.
              </small>
            </div>

          </div>
        </div>

        {/* On-time Service */}
        <div className="col-md-3">
          <div className="d-flex align-items-center bg-white shadow-sm p-3 rounded-4 h-100">

            <div
              className="me-3 d-flex justify-content-center align-items-center"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "#fde7f3",
                color: "#f472b6",
                fontSize: "28px"
              }}
            >
              ⏰
            </div>

            <div>
              <h6 className="fw-bold mb-1">On-time Service</h6>
              <small className="text-muted">
                Reliable and punctual appointments.
              </small>
            </div>

          </div>
        </div>

        {/* 24/7 Support */}
        <div className="col-md-3">
          <div className="d-flex align-items-center bg-white shadow-sm p-3 rounded-4 h-100">

            <div
              className="me-3 d-flex justify-content-center align-items-center"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "#fde7f3",
                color: "#f472b6",
                fontSize: "28px"
              }}
            >
              🎧
            </div>

            <div>
              <h6 className="fw-bold mb-1">24/7 Support</h6>
              <small className="text-muted">
                We are here to help anytime.
              </small>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}

export default Features;