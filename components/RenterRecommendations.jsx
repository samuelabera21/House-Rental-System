import { useState } from "react";

export default function RenterRecommendations({
  listings,
  requestedListingIds,
  onSendRequest,
}) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (listingId) => {
    setImageErrors((prev) => ({
      ...prev,
      [listingId]: true,
    }));
  };

  return (
    <section className="renter-panel" aria-label="Recommended listings">
      <div className="section-head">
        <h2>Recommended Listings</h2>
        <p>Personalized house suggestions for your preferences.</p>
      </div>

      {listings.length > 0 ? (
        <div className="renter-house-grid">
          {listings.map((listing) => {
            const isRequested = requestedListingIds.includes(listing.id);
            const hasImageError = imageErrors[listing.id];

            return (
              <article className="listing-card" key={listing.id}>
                <div className="listing-card-image">
                  {!hasImageError && listing?.image ? (
                    <img
                      src={listing.image}
                      alt={`${listing.location} listing`}
                      loading="lazy"
                      onError={() => handleImageError(listing.id)}
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>Image not available</span>
                    </div>
                  )}
                </div>

                <div className="listing-card-overlay">
                  <div className="overlay-content">
                    <h3 className="overlay-title">{listing.location}</h3>
                    <p className="overlay-price">${listing.price.toLocaleString()} / month</p>
                    <p className="overlay-description">{listing.description}</p>
                    <p className="overlay-rooms">{listing.rooms} room(s)</p>
                    <button
                      type="button"
                      onClick={() => onSendRequest(listing)}
                      disabled={isRequested}
                      className={`overlay-btn ${isRequested ? "btn-sent" : "btn-active"}`}
                    >
                      {isRequested ? "Request Sent" : "Send Request"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
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
