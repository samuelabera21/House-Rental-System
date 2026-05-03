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
      <h2>Quick House Search</h2>
      <p>Filter listings by location, monthly budget, and number of rooms.</p>

      <div className="renter-search-grid">
        <label>
          Location
          <input
            type="text"
            placeholder="e.g. Bole"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>

        <label>
          Max Price (USD)
          <input
            type="number"
            min="0"
            placeholder="e.g. 1500"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </label>

        <label>
          Rooms
          <select
            value={rooms}
            onChange={(event) => setRooms(event.target.value)}
          >
            <option value="all">All</option>
            <option value="1">1 room</option>
            <option value="2">2 rooms</option>
            <option value="3">3+ rooms</option>
          </select>
        </label>
      </div>
    </section>
  );
}
