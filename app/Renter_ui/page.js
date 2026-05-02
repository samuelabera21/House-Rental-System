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

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "renter") {
      router.replace("/login");
      return;
    }

    setIsAuthorizing(false);
  }, [router]);

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

  if (isAuthorizing) {
    return (
      <section className="section-block renter-section">
        <div className="page-container renter-dashboard-wrap">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

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

  const handleSendRequest = (listing) => {
    if (requestedListingIds.includes(listing.id)) {
      return;
    }

    setRequestedListingIds((prev) => [...prev, listing.id]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Request Sent",
        detail: `Your request for ${listing.location} has been sent to the owner.`,
        type: "info",
      },
      ...prev,
    ]);
  };

  return (
    <section className="section-block renter-section">
      <div className="page-container renter-dashboard-wrap">
        <div className="renter-head">
          <span className="hero-badge">Renter Dashboard</span>
          <h1>Welcome back, find your next home faster</h1>
          <p>
            Search houses, review recommendations, and track request updates
            from one dashboard.
          </p>
        </div>

        <div className="renter-stats-grid">
          {statsWithLiveRequests.map((item) => (
            <article key={item.id} className="renter-stat-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>

        {/* searching house by location, prices and number of rooms */}
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
          onSendRequest={handleSendRequest}
        />
        <RenterNotifications notifications={notifications} />
      </div>
    </section>
  );
}
