export default function RenterQuickSearch({
  location,
  setLocation,
  maxPrice,
  setMaxPrice,
  rooms,
  setRooms,
}) {
  return (
    <section
      className="renter-panel renter-search-panel"
      aria-label="Quick house search"
    >
      <div className="renter-search-header">
        <h2>Filter Your Search</h2>
      </div>

      <div className="renter-search-grid">
        <div className="search-filter-group">
          <label htmlFor="location-input">
            <span className="filter-label">Location</span>
          </label>
          <input
            id="location-input"
            type="text"
            placeholder="e.g. Bole, Kazanchis"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="search-filter-input"
          />
        </div>

        <div className="search-filter-group">
          <label htmlFor="price-input">
            <span className="filter-label">Max Price</span>
          </label>
          <div className="price-input-wrapper">
            <span className="price-currency">$</span>
            <input
              id="price-input"
              type="number"
              min="0"
              placeholder="1500"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="search-filter-input price-input"
            />
          </div>
        </div>

        <div className="search-filter-group">
          <label htmlFor="rooms-select">
            <span className="filter-label">Rooms</span>
          </label>
          <select
            id="rooms-select"
            value={rooms}
            onChange={(event) => setRooms(event.target.value)}
            className="search-filter-input"
          >
            <option value="all">Any number of rooms</option>
            <option value="1">1 room</option>
            <option value="2">2 rooms</option>
            <option value="3">3+ rooms</option>
          </select>
        </div>
      </div>
    </section>
  );
}
