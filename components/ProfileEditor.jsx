"use client";

import { useEffect, useMemo, useState } from "react";
import { getActiveUser, updateStoredUserProfile } from "../lib/auth";

const MAX_PROFILE_IMAGE_SIDE = 480;

function compressProfileImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.onload = () => {
      const image = new Image();

      image.onerror = () => reject(new Error("Unable to process the selected image."));
      image.onload = () => {
        const scale = Math.min(
          1,
          MAX_PROFILE_IMAGE_SIDE / Math.max(image.width || 1, image.height || 1),
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));

        const context = canvas.getContext("2d");

        if (!context) {
          resolve(String(reader.result || ""));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        try {
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        } catch {
          resolve(String(reader.result || ""));
        }
      };

      image.src = String(reader.result || "");
    };

    reader.readAsDataURL(file);
  });
}

function getInitials(fullName) {
  const parts = String(fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "U";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function ProfileEditor() {
  const [activeUser, setActiveUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const user = getActiveUser();

    if (!user || user.role === "admin") {
      return;
    }

    setActiveUser(user);
    setFullName(user.fullName || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
    setBio(user.bio || "");
    setProfileImage(user.profileImage || "");
  }, []);

  const avatarLabel = useMemo(
    () => getInitials(activeUser?.fullName || fullName),
    [activeUser, fullName],
  );

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const imageData = await compressProfileImage(file);
      setProfileImage(imageData);
      setStatus("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load the selected image.");
      setStatusType("error");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!activeUser) {
      setStatus("Profile data is not available right now.");
      setStatusType("error");
      return;
    }

    const trimmedName = fullName.trim();

    if (!trimmedName) {
      setStatus("Full name is required.");
      setStatusType("error");
      return;
    }

    setIsSaving(true);

    const updatedUser = updateStoredUserProfile(activeUser.email, {
      fullName: trimmedName,
      phone,
      address,
      bio,
      profileImage,
    });

    setIsSaving(false);

    if (!updatedUser) {
      setStatus("Unable to save profile changes.");
      setStatusType("error");
      return;
    }

    setActiveUser(updatedUser);
    setProfileImage(updatedUser.profileImage || "");
    setStatus("Profile updated successfully.");
    setStatusType("success");
  };

  return (
    <section className="profile-panel" aria-label="Profile editor">
      <div className="profile-panel-head">
        <div>
          <span className="profile-badge">My Profile</span>
          <h2>Keep your account details current</h2>
          <p>
            Update your name, contact details, bio, and profile picture without leaving the dashboard.
          </p>
        </div>

        <div className="profile-avatar" aria-hidden="true">
          {profileImage ? <img src={profileImage} alt="" /> : <span>{avatarLabel}</span>}
        </div>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-grid">
          <label className="profile-field profile-upload-field">
            Profile Picture
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <span>Choose an image from your device</span>
          </label>

          <label className="profile-field">
            Full Name
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
            />
          </label>

          <label className="profile-field">
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Your contact number"
            />
          </label>

          <label className="profile-field">
            Address
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Your city or area"
            />
          </label>

          <label className="profile-field profile-bio-field">
            Bio
            <textarea
              rows="4"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Short description about you"
            />
          </label>
        </div>

        <div className="profile-meta-grid">
          <div>
            <span>Email</span>
            <strong>{activeUser?.email || "Not available"}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>{activeUser?.role || "Unknown"}</strong>
          </div>
        </div>

        {status ? <p className={`profile-status profile-status-${statusType}`}>{status}</p> : null}

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </section>
  );
}