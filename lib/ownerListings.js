const OWNER_LISTINGS_STORAGE_KEY = "hrms_owner_listings";

export const DEFAULT_OWNER_LISTINGS = [
  {
    id: "L-101",
    title: "Modern Family Apartment",
    location: "Bole, Addis Ababa",
    price: 1200,
    status: "Active",
    rooms: 3,
    image:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80",
    description:
      "Comfortable family apartment close to shopping centers and major roads.",
    propertyType: "Apartment",
    size: 1200,
    yearBuilt: 2018,
    furnished: true,
    amenities: ["WiFi", "Parking", "Air Conditioning"],
  },
  {
    id: "L-102",
    title: "Compact City Studio",
    location: "Kazanchis, Addis Ababa",
    price: 780,
    status: "Pending Approval",
    rooms: 1,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7f34b5063ec?auto=format&fit=crop&w=900&q=80",
    description:
      "Budget-friendly studio in the city center, suitable for one person.",
    propertyType: "Studio",
    size: 400,
    yearBuilt: 2020,
    furnished: false,
    amenities: ["WiFi", "Security"],
  },
  {
    id: "L-103",
    title: "Garden View Villa",
    location: "CMC, Addis Ababa",
    price: 1650,
    status: "Active",
    rooms: 4,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    description:
      "Large villa with a private compound and bright living areas.",
    propertyType: "Villa",
    size: 2500,
    yearBuilt: 2015,
    furnished: true,
    amenities: ["WiFi", "Parking", "Garden", "Security", "Pool"],
  },
];

function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function getOwnerListings() {
  if (typeof window === "undefined") {
    return DEFAULT_OWNER_LISTINGS;
  }

  const parsed = safeParse(
    localStorage.getItem(OWNER_LISTINGS_STORAGE_KEY) || "[]",
    [],
  );

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return DEFAULT_OWNER_LISTINGS;
  }

  return parsed;
}

export function saveOwnerListings(listings) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(OWNER_LISTINGS_STORAGE_KEY, JSON.stringify(listings));
}
