export const metadata = {
  title: "Owner Dashboard | House Rental Management System",
};

const ownerListings = [
  {
    id: "L-101",
    title: "Modern Family Apartment",
    location: "Bole, Addis Ababa",
    price: "$1,200 / month",
  },
  {
    id: "L-102",
    title: "Compact City Studio",
    location: "Kazanchis, Addis Ababa",
    price: "$780 / month",
  },
  {
    id: "L-103",
    title: "Garden View Villa",
    location: "CMC, Addis Ababa",
    price: "$1,650 / month",
  },
];

const incomingRequests = [
  {
    id: "REQ-201",
    renter: "Abel Tadesse",
    listing: "Modern Family Apartment",
    status: "Pending",
  },
  {
    id: "REQ-202",
    renter: "Hana Bekele",
    listing: "Garden View Villa",
    status: "Pending",
  },
  {
    id: "REQ-203",
    renter: "Liya Solomon",
    listing: "Compact City Studio",
    status: "Reviewed",
  },
];

export default function OwnerDashboardPage() {
  const totalListings = ownerListings.length;
  const totalRequests = incomingRequests.length;

  return (
    <section className="section-block owner-section">
      <div className="page-container owner-container">
        <header className="owner-header">
          <span className="owner-badge">House Owner Panel</span>
          <h1>Owner Dashboard</h1>
          <p>Track your portfolio and incoming renter demand at a glance.</p>
        </header>

        <section className="owner-summary-grid" aria-label="Owner summary cards">
          <article className="owner-summary-card">
            <p className="owner-summary-label">Total Listings</p>
            <p className="owner-summary-value">{totalListings}</p>
          </article>
          <article className="owner-summary-card">
            <p className="owner-summary-label">Requests</p>
            <p className="owner-summary-value">{totalRequests}</p>
          </article>
        </section>

        <section className="owner-preview-grid">
          <article className="owner-preview-panel">
            <h2>Listings Preview</h2>
            {ownerListings.map((listing) => (
              <div key={listing.id} className="owner-preview-item">
                <p>{listing.title}</p>
                <small>{listing.location} • {listing.price}</small>
              </div>
            ))}
          </article>

          <article className="owner-preview-panel">
            <h2>Requests Preview</h2>
            {incomingRequests.map((request) => (
              <div key={request.id} className="owner-preview-item">
                <p>{request.renter}</p>
                <small>{request.listing} • {request.status}</small>
              </div>
            ))}
          </article>
        </section>
      </div>
    </section>
  );
}