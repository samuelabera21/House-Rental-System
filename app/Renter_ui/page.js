"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import RenterNotifications from "../../components/RenterNotifications";
import RenterQuickSearch from "../../components/RenterQuickSearch";
import RenterRecommendations from "../../components/RenterRecommendations";
import { getActiveUser } from "../../lib/auth";
import {
  renterListings,
  renterNotifications,
  renterStats,
} from "../../lib/renterData";

export default function RenterDashboardPage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rooms, setRooms] = useState("all");
  const [requestedListingIds, setRequestedListingIds] = useState([]);
  const [notifications, setNotifications] = useState(renterNotifications);

  // Form modal state
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
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

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "renter") {
      router.replace("/login");
      return;
    }

    // Pre-fill form with user data if available
    if (activeUser) {
      setFormData((prev) => ({
        ...prev,
        name: activeUser.name || "",
        email: activeUser.email || "",
      }));
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
    setSelectedListing(listing);
    setShowFormModal(true);
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

    if (requestedListingIds.includes(selectedListing.id)) {
      return;
    }

    // Here you would typically send the form data to your backend API
    console.log("Request submitted for:", selectedListing);
    console.log("Form data:", formData);

    setRequestedListingIds((prev) => [...prev, selectedListing.id]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Request Sent",
        detail: `Your request for ${selectedListing.location} has been sent to the owner. We'll notify you once they respond.`,
        type: "info",
      },
      ...prev,
    ]);

    // Close modal and reset form
    setShowFormModal(false);
    setSelectedListing(null);
    setFormData((prev) => ({
      ...prev,
      message: "",
      moveInDate: "",
    }));
  };

  const closeModal = () => {
    setShowFormModal(false);
    setSelectedListing(null);
  };

  return (
    <section className="section-block renter-section">
      <div className="page-container renter-dashboard-wrap renter-shell">
        <header className="renter-hero">
          <div className="renter-hero-copy">
            <span className="section-kicker">
              <span className="section-kicker-line" />
              Renter Workspace
            </span>
          <h1>Welcome back, find your next home faster</h1>
          <p>
            Search houses, review recommendations, and track request updates
            from one dashboard.
          </p>
          </div>
        </header>

        <div className="renter-stats-grid">
          {statsWithLiveRequests.map((item) => (
            <article key={item.id} className="renter-stat-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>

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
        <RenterNotifications notifications={notifications} />

        {/* now add requested form */}

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
                    <label htmlFor="name">Full Name *</label>
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
                    <label htmlFor="email">Email Address *</label>
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
                    <label htmlFor="phone">Phone Number *</label>
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
                    <label htmlFor="moveInDate">Preferred Move-in Date *</label>
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
                      Preferred Contact Method
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
                    <label htmlFor="message">Additional Message</label>
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
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
