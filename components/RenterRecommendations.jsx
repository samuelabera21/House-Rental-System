export default function RenterRecommendations({ listings }) {
  return (
    <section className="renter-panel" aria-label="Recommended listings">
      <div className="section-head">
        <h2>Recommended Listings</h2>
        <p>Personalized house suggestions for your preferences.</p>
      </div>

      {listings.length > 0 ? (
        <div className="house-grid renter-house-grid">
          {listings.map((listing) => (
            <article className="house-card" key={listing.id}>
              <div className="house-media">
                <img
                  src={listing.image}
                  alt={`${listing.location} listing`}
                  loading="lazy"
                />
              </div>
              <div className="house-content">
                <div className="house-meta">
                  <p className="house-price">
                    ${listing.price.toLocaleString()} / month
                  </p>
                  <p className="house-location">{listing.location}</p>
                </div>
                <p className="house-description">{listing.description}</p>
                <div className="renter-card-footer">
                  <span>{listing.rooms} room(s)</span>
                  <button type="button">Send Request</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No matches found</h3>
          <p>Try changing your filters to see more recommended houses.</p>
        </div>
      )}
    </section>
  );
}
