export const metadata = {
  title: "Login | House Rental Management System",
};

export default function LoginPage() {
  return (
    <section className="section-block auth-section">
      <div className="page-container auth-container">
        <h1>Login</h1>
        <p>Sign in to continue to your role-based dashboard.</p>
        <form className="auth-form" action="#">
          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="********" required />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
