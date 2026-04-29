export default function RenterNotifications({ notifications }) {
  return (
    <section className="renter-panel" aria-label="Renter notifications">
      <div className="section-head">
        <h2>Notifications</h2>
        <p>
          Important updates about your rental requests and matched listings.
        </p>
      </div>

      <div className="renter-notification-list">
        {notifications.map((note) => (
          <article
            key={note.id}
            className={`renter-note renter-note-${note.type}`}
          >
            <h3>{note.title}</h3>
            <p>{note.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
