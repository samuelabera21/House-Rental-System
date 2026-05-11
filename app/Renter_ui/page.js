"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import RenterQuickSearch from "../../components/RenterQuickSearch";
import RenterRecommendations from "../../components/RenterRecommendations";
import SearchBar from "../../components/SearchBar";
import { getActiveUser } from "../../lib/auth";
import { addRenterRequest, getRenterRequests, getRequestListingKey } from "../../lib/renterRequests";
import {
  renterListings,
  renterStats,
} from "../../lib/renterData";

export default function RenterDashboardPage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rooms, setRooms] = useState("all");
  const [requestedListingIds, setRequestedListingIds] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  // Form modal state
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [requestError, setRequestError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    moveInDate: "",
    preferredContactMethod: "email",
  });

  const visibleListings = useMemo(() => {
    return renterListings.filter((house) => {
      const matchLocation = !location.trim()
        ? true
        : house.location.toLowerCase().includes(location.trim().toLowerCase());

      const matchPrice = maxPrice ? house.price <= Number(maxPrice) : true;
      const matchRooms =
        rooms === "all"
          ? true
          : rooms === "3"
            ? house.rooms >= 3
            : house.rooms === Number(rooms);

      return matchLocation && matchPrice && matchRooms;
    });
  }, [location, maxPrice, rooms]);

  const statsWithLiveRequests = useMemo(() => {
    const baseRequests = Number(
      renterStats.find((item) => item.id === "requests")?.value ?? 0,
    );

    return renterStats.map((item) =>
      item.id === "requests"
        ? { ...item, value: baseRequests + requestedListingIds.length }
        : item,
    );
  }, [requestedListingIds]);

  const displayName =
    (activeUser?.fullName || activeUser?.name || activeUser?.username || activeUser?.email?.split("@")[0] || "Guest")
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

  useEffect(() => {
    const user = getActiveUser();

    if (!user || user.role !== "renter") {
      router.replace("/login");
      return;
    }

    // Set active user
    setActiveUser(user);

    // Pre-fill form with user data if available
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));

      // Get requests for this user from all listings
      const requestedIds = getRenterRequests()
        .filter(
          (request) =>
            request.renterEmail === (user.email || "") &&
            request.status !== "rejected",
        )
        .map((request) => request.listingId)
        .filter(Boolean);

      setRequestedListingIds(requestedIds);
    }

    setIsAuthorizing(false);
  }, [router]);

  if (isAuthorizing) {
    return (
      <section className="section-block renter-section">
        <div className="page-container renter-dashboard-wrap">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  const handleRequestClick = (listing) => {
    setRequestError("");
    setSelectedListing(listing);
    setShowFormModal(true);
  };

  const handleBrowseSearch = (query) => {
    setLocation(query);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!selectedListing) {
      setRequestError("Please select a listing again before submitting.");
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedDate = formData.moveInDate.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedDate) {
      setRequestError("Please fill in all required fields.");
      return;
    }

    if (requestedListingIds.includes(selectedListing.id)) {
      setRequestError("You already sent a request for this listing.");
      return;
    }

    const listingKey = getRequestListingKey(selectedListing);
    const duplicateRequest = getRenterRequests().some(
      (request) =>
        request.listingKey === listingKey &&
        request.renterEmail === trimmedEmail &&
        request.status !== "rejected",
    );

    if (duplicateRequest) {
      setRequestError("You already sent a request for this listing.");
      return;
    }

    addRenterRequest({
      id: `REQ-${Date.now()}`,
      listingId: selectedListing.id,
      listingKey,
      listingTitle: selectedListing.title || selectedListing.location,
      listingLocation: selectedListing.location,
      renterName: trimmedName,
      renterEmail: trimmedEmail,
      renterPhone: trimmedPhone,
      moveInDate: trimmedDate,
      message: formData.message.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    setRequestedListingIds((prev) => [...prev, selectedListing.id]);

    // Close modal and reset form
    setShowFormModal(false);
    setSelectedListing(null);
    setRequestError("");
    setFormData((prev) => ({
      ...prev,
      message: "",
      moveInDate: "",
    }));
  };

  const closeModal = () => {
    setShowFormModal(false);
    setSelectedListing(null);
    setRequestError("");
  };

  return (
    <section className="section-block renter-section">
      <div className="page-container renter-dashboard-wrap renter-shell">
        <header className="renter-hero-new">
          <div className="renter-hero-content">
            <h1 className="renter-welcome-title">
              Welcome,{" "}
              <span className="user-name">
                {displayName}
              </span>
            </h1>
            <p className="renter-welcome-subtitle">Find your perfect home today</p>
            <button
              className="renter-browse-btn"
              onClick={() => {
                document.getElementById("browse")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Browse Listings
            </button>
          </div>
        </header>

        <div className="renter-dashboard-grid">
          <main className="renter-dashboard-main">
            <section className="renter-panel renter-browse-panel" id="browse">
              <div className="section-head">
                <h2>Browse</h2>
              </div>

              <SearchBar onSearch={handleBrowseSearch} />

              <RenterQuickSearch
                location={location}
                setLocation={setLocation}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                rooms={rooms}
                setRooms={setRooms}
              />

              <RenterRecommendations
                listings={visibleListings}
                requestedListingIds={requestedListingIds}
                onSendRequest={handleRequestClick}
              />
            </section>
          </main>
        </div>

        {/* now add requested form  and ui*/}

        {/* Request Form Modal */}
        {showFormModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Request Property</h2>
                <button className="modal-close" onClick={closeModal}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="property-summary">
                  <h3>{selectedListing?.location}</h3>
                  <p>Price: ${selectedListing?.price}/month</p>
                  <p>Rooms: {selectedListing?.rooms}</p>
                </div>

                <form onSubmit={handleFormSubmit} className="request-form">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="moveInDate">Move-in Date *</label>
                    <input
                      type="date"
                      id="moveInDate"
                      name="moveInDate"
                      value={formData.moveInDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredContactMethod">
                      Contact Method
                    </label>
                    <select
                      id="preferredContactMethod"
                      name="preferredContactMethod"
                      value={formData.preferredContactMethod}
                      onChange={handleInputChange}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Any specific questions or requirements..."
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Submit Request
                    </button>
                  </div>

                  {requestError ? (
                    <p className="auth-error">{requestError}</p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
