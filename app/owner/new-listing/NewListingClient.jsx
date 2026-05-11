"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveUser } from "../../../lib/auth";
import { getOwnerListings, saveOwnerListings } from "../../../lib/ownerListings";
import OwnerPageTabs from "../OwnerPageTabs";

export default function NewListingClient({ listingId = null }) {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [formError, setFormError] = useState("");
  const [imageData, setImageData] = useState("");
  const [imageName, setImageName] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [newListing, setNewListing] = useState({
    title: "",
    location: "",
    price: "",
    rooms: "",
    description: "",
    propertyType: "",
    size: "",
    yearBuilt: "",
    furnished: false,
    amenities: [],
  });

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "owner") {
      router.replace("/login");
      return;
    }

    if (activeUser.isApproved === false) {
      router.replace("/owner/pending-approval");
      return;
    }

    if (listingId) {
      const listing = getOwnerListings().find((item) => item.id === listingId);

      if (listing) {
        setNewListing({
          title: listing.title || "",
          location: listing.location || "",
          price: listing.price ? String(listing.price) : "",
          rooms: listing.rooms ? String(listing.rooms) : "",
          description: listing.description || "",
          propertyType: listing.propertyType || "",
          size: listing.size ? String(listing.size) : "",
          yearBuilt: listing.yearBuilt ? String(listing.yearBuilt) : "",
          furnished: Boolean(listing.furnished),
          amenities: Array.isArray(listing.amenities) ? listing.amenities : [],
        });
        setCurrentImage(listing.image || "");
        setImageName(listing.image ? "Current image" : "");
      }
    }

    setIsAuthorizing(false);
  }, [listingId]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewListing((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setNewListing((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImageData("");
      setImageName("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFormError("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFormError("Image size must be 2MB or smaller.");
      return;
    }

    // Instead of storing large base64 in localStorage, we use a placeholder URL
    // In production, you'd upload to a server/CDN here
    setImageData("https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80");
    setImageName(file.name);
    setFormError("");
  };

  const handleSaveListing = (event) => {
    event.preventDefault();
    setFormError("");

    const title = newListing.title.trim();
    const location = newListing.location.trim();
    const description = newListing.description.trim();
    const price = Number(newListing.price);
    const rooms = Number(newListing.rooms);

    if (!title || !location || !description) {
      setFormError("Title, location, and description are required.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setFormError("Enter a valid monthly price greater than 0.");
      return;
    }

    if (!Number.isInteger(rooms) || rooms <= 0) {
      setFormError("Enter a valid room count (1 or more).");
      return;
    }

    const imageToSave = imageData || currentImage;

    if (!imageToSave) {
      setFormError("Please upload a house picture before saving.");
      return;
    }

    // Generate a unique ID with proper L- prefix for consistency with request system
    const newId = listingId || `L-${Math.floor(Math.random() * 100000)}-${Date.now()}`;
    
    const listingToSave = {
      id: newId,
      title,
      location,
      price,
      status: "Active",
      rooms,
      description,
      image: imageToSave || "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80",
      propertyType: newListing.propertyType,
      size: newListing.size ? Number(newListing.size) : null,
      yearBuilt: newListing.yearBuilt ? Number(newListing.yearBuilt) : null,
      furnished: newListing.furnished,
      amenities: newListing.amenities,
    };

    try {
      const existingListings = getOwnerListings();
      const nextListings = listingId
        ? existingListings.map((listing) =>
            listing.id === listingId ? listingToSave : listing,
          )
        : [listingToSave, ...existingListings];

      saveOwnerListings(nextListings);
      setFormError("");
      router.push("/owner");
    } catch (error) {
      setFormError("Storage quota exceeded. Please clear browser data and try again.");
    }
  };

  if (isAuthorizing) {
    return (
      <section className="section-block owner-section">
        <div className="page-container">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block owner-section">
      <div className="page-container owner-add-page-wrap">
        <header className="owner-hero owner-add-hero">
          <div className="owner-hero-copy">
            <span className="section-kicker">
              <span className="section-kicker-line" />
              {listingId ? "Edit Listing" : "New Listing"}
            </span>
            <h1>{listingId ? "Update this listing" : "Create a new listing"}</h1>
            <p>
              {listingId
                ? "Review the property details, adjust the information, and save your updates."
                : "Fill in the property details, upload a clean photo, and publish the home to your dashboard."}
            </p>
            <OwnerPageTabs activeHref={listingId ? "/owner" : "/owner/new-listing"} />
          </div>
        </header>

        <form className="owner-add-form owner-add-page-form" onSubmit={handleSaveListing}>
          <div className="owner-form-grid">
            <label>
              Listing Title
              <input
                type="text"
                name="title"
                value={newListing.title}
                onChange={handleInputChange}
                placeholder="Modern Apartment in Bole"
                required
              />
            </label>
            <label>
              Location
              <input
                type="text"
                name="location"
                value={newListing.location}
                onChange={handleInputChange}
                placeholder="Bole, Addis Ababa"
                required
              />
            </label>
            <label>
              Monthly Price (USD)
              <input
                type="number"
                name="price"
                value={newListing.price}
                onChange={handleInputChange}
                min="1"
                required
              />
            </label>
            <label>
              Rooms
              <input
                type="number"
                name="rooms"
                value={newListing.rooms}
                onChange={handleInputChange}
                min="1"
                required
              />
            </label>
            <label>
              Property Type
              <select
                name="propertyType"
                value={newListing.propertyType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Studio">Studio</option>
                <option value="Condo">Condo</option>
              </select>
            </label>
            <label>
              Size (sq ft)
              <input
                type="number"
                name="size"
                value={newListing.size}
                onChange={handleInputChange}
                min="1"
                placeholder="Optional"
              />
            </label>
            <label>
              Year Built
              <input
                type="number"
                name="yearBuilt"
                value={newListing.yearBuilt}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
                placeholder="Optional"
              />
            </label>
          </div>

          <label>
            Description
            <textarea
              name="description"
              value={newListing.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe the property and key amenities."
              required
            />
          </label>

          <div className="owner-form-section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {[
                "WiFi",
                "Parking",
                "Air Conditioning",
                "Heating",
                "Balcony",
                "Garden",
                "Security",
                "Elevator",
                "Gym",
                "Pool",
              ].map((amenity) => (
                <label key={amenity} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    checked={newListing.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <label className="owner-checkbox-field">
            <input
              type="checkbox"
              name="furnished"
              checked={newListing.furnished}
              onChange={handleInputChange}
            />
            Furnished
          </label>

          <label className="owner-upload-field">
            House Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              required={!listingId && !currentImage}
            />
            <span className="owner-upload-hint">
              {imageName || currentImage
                ? imageName || "Current image"
                : "Upload JPG, PNG, or WEBP (max 2MB)."}
            </span>
          </label>

          {(imageData || currentImage) && (
            <div className="image-preview-container">
              <img
                src={imageData || currentImage}
                alt={listingId ? "Edit listing preview" : "New listing preview"}
                className="owner-listing-thumb owner-preview-thumb"
              />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => {
                  setImageData("");
                  setImageName("");
                  setCurrentImage("");
                }}
              >
                Remove Image
              </button>
            </div>
          )}

          {formError ? <p className="auth-error">{formError}</p> : null}

          <div className="owner-add-form-actions">
            <button type="submit">{listingId ? "Update Listing" : "Save Listing"}</button>
            <button
              type="button"
              className="owner-secondary-btn"
              onClick={() => router.push("/owner")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
