import { useState } from "react";

export default function HouseCard({ house }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="house-card">
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
      </div>
    </article>
  );
}
