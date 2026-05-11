const RENTER_REQUESTS_STORAGE_KEY = "hrms_renter_requests";

export const DEFAULT_RENTER_REQUESTS = [
  {
    id: "REQ-201",
    listingId: "L-101",
    listingKey: "Modern Family Apartment::Bole, Addis Ababa",
    listingTitle: "Modern Family Apartment",
    listingLocation: "Bole, Addis Ababa",
    renterName: "Abel Tadesse",
    renterEmail: "abel@example.com",
    renterPhone: "+251900000001",
    moveInDate: "2026-05-15",
    message: "I am interested in moving in soon.",
    status: "pending",
    createdAt: "2026-05-11T08:00:00.000Z",
  },
  {
    id: "REQ-202",
    listingId: "L-103",
    listingKey: "Garden View Villa::CMC, Addis Ababa",
    listingTitle: "Garden View Villa",
    listingLocation: "CMC, Addis Ababa",
    renterName: "Hana Bekele",
    renterEmail: "hana@example.com",
    renterPhone: "+251900000002",
    moveInDate: "2026-05-22",
    message: "Please confirm availability for next month.",
    status: "pending",
    createdAt: "2026-05-11T08:05:00.000Z",
  },
];

function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function normalizeRequests(requests) {
  if (!Array.isArray(requests)) {
    return [];
  }

  return requests.map((request, index) => ({
    id: request.id || `REQ-${Date.now()}-${index}`,
    listingId: request.listingId || "",
    listingKey:
      request.listingKey ||
      `${request.listingTitle || ""}::${request.listingLocation || ""}`,
    listingTitle: request.listingTitle || request.listing || "Unknown listing",
    listingLocation: request.listingLocation || "",
    renterName: request.renterName || request.renter || "Unknown renter",
    renterEmail: request.renterEmail || "",
    renterPhone: request.renterPhone || "",
    moveInDate: request.moveInDate || "",
    message: request.message || "",
    status: request.status || "pending",
    createdAt: request.createdAt || new Date().toISOString(),
  }));
}

export function getRenterRequests() {
  if (typeof window === "undefined") {
    return DEFAULT_RENTER_REQUESTS;
  }

  const parsed = safeParse(
    localStorage.getItem(RENTER_REQUESTS_STORAGE_KEY) || "[]",
    [],
  );

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return DEFAULT_RENTER_REQUESTS;
  }

  return normalizeRequests(parsed);
}

export function saveRenterRequests(requests) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    RENTER_REQUESTS_STORAGE_KEY,
    JSON.stringify(normalizeRequests(requests)),
  );
}

export function addRenterRequest(request) {
  const nextRequests = [...getRenterRequests(), normalizeRequests([request])[0]];
  saveRenterRequests(nextRequests);
  return nextRequests;
}

export function updateRenterRequestStatus(requestId, status) {
  const nextRequests = getRenterRequests().map((request) =>
    request.id === requestId ? { ...request, status } : request,
  );

  saveRenterRequests(nextRequests);
  return nextRequests;
}

export function getRequestListingKey(listing) {
  if (!listing) {
    return "";
  }

  return `${listing.title || listing.listingTitle || ""}::${listing.location || listing.listingLocation || ""}`;
}
