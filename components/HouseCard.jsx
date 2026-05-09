import { useState } from "react";

export default function HouseCard({
  house,
  isRequested = false,
  onSendRequest = null,
  isDarkTheme = false,
}) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className={`house-card ${isDarkTheme ? "house-card-dark" : ""}`}>
      <div className="house-media">
        {!imageError && house?.image ? (
          <img
            src={house.image}
            alt={`${house.location} house`}
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="image-placeholder">
            <span>Image not available</span>
          </div>
        )}
      </div>
      <div className="house-content">
        <div className="house-meta">
          <p className="house-price">${house.price.toLocaleString()} / month</p>
          <p className="house-location">{house.location}</p>
        </div>
        <p className="house-description">{house.description}</p>
        {onSendRequest && (
          <div className="renter-card-footer">
            <span>{house.rooms} room(s)</span>
            <button
              type="button"
              onClick={() => onSendRequest(house)}
              disabled={isRequested}
              className={
                isRequested ? "request-btn request-btn-sent" : "request-btn"
              }
            >
              {isRequested ? "Request Sent" : "Send Request"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
