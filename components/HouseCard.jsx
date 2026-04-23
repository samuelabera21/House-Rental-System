export default function HouseCard({ house }) {
  return (
    <article className="house-card">
      <div className="house-media">
        <img src={house.image} alt={`${house.location} house`} loading="lazy" />
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
