export const metadata = {
  title: "Register | House Rental Management System",
};
// add function
export default function RegisterPage() {
  return (
    <section className="section-block auth-section">
      <div className="page-container auth-container">
        <h1>Create account</h1>
        <p>Register as a renter or house owner to access your dashboard.</p>
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
            Phone Number
            <input type="tel" placeholder="+251 9XX XXX XXX" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a password" required />
          </label>
          <label>
            Confirm Password
            <input type="password" placeholder="Repeat your password" required />
          </label>
          <label>
            Role
            <select defaultValue="renter" required>
              <option value="renter">Renter</option>
              <option value="owner">House Owner</option>
            </select>
          </label>
          <label className="flex items-start gap-2 text-sm font-medium text-slate-700">
            <input className="mt-1" type="checkbox" required />
            <span>I agree to the terms and privacy policy.</span>
          </label>
          <button type="submit">Create Account</button>
        </form>
        <p className="mt-3 text-sm text-slate-600">
          Already have an account? <a className="font-semibold text-blue-600 hover:text-blue-700" href="/login">Login here</a>
        </p>
      </div>
    </section>
  );
}
