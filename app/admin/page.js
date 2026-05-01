export const metadata = {
    title: "Admin Dashboard | House Rental Management System",
};

export default function AdminPage() {
    return (
        <section className="section-block admin-page">
            <div className="page-container">
                <div className="section-head">
                    <h2>Admin Dashboard</h2>
                    <p>Review system status, manage users, and moderate listings from one central place.</p>
                </div>

                <div className="admin-overview">
                    <article className="admin-stat-card">
                        <span className="stat-label">Users</span>
                        <strong>1,254</strong>
                    </article>
                    <article className="admin-stat-card">
                        <span className="stat-label">Listings</span>
                        <strong>812</strong>
                    </article>
                </div>

                <div className="admin-grid">
                    <section className="admin-card">
                        <div className="admin-card-header">
                            <h3>Manage Users</h3>
                            <p>View, remove, or block accounts to keep the community safe.</p>
                        </div>
                        <ul className="admin-list">
                            <li>
                                <span>John Doe</span>
                                <span className="admin-status admin-status-active">Owner</span>
                            </li>
                            <li>
                                <span>Mary Gebremedhin</span>
                                <span className="admin-status admin-status-muted">Renter</span>
                            </li>
                            <li>
                                <span>Samuel Abera</span>
                                <span className="admin-status admin-status-active">Administrator</span>
                            </li>
                        </ul>
                        <button className="admin-action-btn">Open user management</button>
                    </section>

                    <section className="admin-card">
                        <div className="admin-card-header">
                            <h3>Manage Listings</h3>
                            <p>Approve new homes and remove listings that violate policy.</p>
                        </div>
                        <ul className="admin-list">
                            <li>
                                <span>5-bedroom Villa, Addis Ababa</span>
                                <span className="admin-status admin-status-pending">Pending</span>
                            </li>
                            <li>
                                <span>Cozy Urban Apartment</span>
                                <span className="admin-status admin-status-approved">Approved</span>
                            </li>
                            <li>
                                <span>Cottage Near Lake</span>
                                <span className="admin-status admin-status-flagged">Flagged</span>
                            </li>
                        </ul>
                        <button className="admin-action-btn">Review listings</button>
                    </section>
                    <section className="admin-card">
                        <div className="admin-card-header">
                            <h3>Review Requests</h3>
                            <p>Track rental requests, confirm status updates, and keep renters informed.</p>
                        </div>
                        <ul className="admin-list">
                            <li>
                                <span>Request from Meron for 3-bed apartment</span>
                                <span className="admin-status admin-status-pending">Pending</span>
                            </li>
                            <li>
                                <span>Request from Daniel for studio flat</span>
                                <span className="admin-status admin-status-approved">Accepted</span>
                            </li>
                            <li>
                                <span>Request from Selam for lakeside house</span>
                                <span className="admin-status admin-status-flagged">Flagged</span>
                            </li>
                        </ul>
                        <button className="admin-action-btn">Manage requests</button>
                    </section>
                </div>
            </div>
        </section>
    );
}
