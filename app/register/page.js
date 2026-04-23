export const metadata = {
  title: "Register | House Rental Management System",
};

export default function RegisterPage() {
  return (
    <section className="section-block auth-section">
      <div className="page-container auth-container">
        <h1>Register</h1>
        <p>Create an account as a renter or house owner.</p>
        <form className="auth-form" action="#">
          <label>
            Full Name
            <input type="text" placeholder="Full name" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a password" required />
          </label>
          <label>
            Role
            <select defaultValue="renter" required>
              <option value="renter">Renter</option>
              <option value="owner">House Owner</option>
            </select>
          </label>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </section>
  );
}
