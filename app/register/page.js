"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "renter",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (successMessage) {
      setSuccessMessage("");
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (formData.fullName.trim().length < 3) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (formData.phone.trim().length < 9) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreeToTerms) {
      nextErrors.agreeToTerms = "You must agree to the terms and privacy policy.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("Validation passed. Your account details are ready to submit.");
  };

  return (
    <section className="section-block auth-section">
      <div className="page-container auth-container">
        <h1>Create account</h1>
        <p>Register as a renter or house owner to access your dashboard.</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full Name
            <input
              name="fullName"
              type="text"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
          </label>
          {errors.fullName ? (
            <p id="fullName-error" className="field-error">
              {errors.fullName}
            </p>
          ) : null}
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </label>
          {errors.email ? (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          ) : null}
          <label>
            Phone Number
            <input
              name="phone"
              type="tel"
              placeholder="+251 9XX XXX XXX"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </label>
          {errors.phone ? (
            <p id="phone-error" className="field-error">
              {errors.phone}
            </p>
          ) : null}
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
          </label>
          {errors.password ? (
            <p id="password-error" className="field-error">
              {errors.password}
            </p>
          ) : null}
          <label>
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
            />
          </label>
          {errors.confirmPassword ? (
            <p id="confirm-password-error" className="field-error">
              {errors.confirmPassword}
            </p>
          ) : null}
          <label>
            Role
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="renter">Renter</option>
              <option value="owner">House Owner</option>
            </select>
          </label>
          <label className="terms-row">
            <input
              name="agreeToTerms"
              className="mt-1"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              aria-invalid={Boolean(errors.agreeToTerms)}
              aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
            />
            <span>I agree to the terms and privacy policy.</span>
          </label>
          {errors.agreeToTerms ? (
            <p id="terms-error" className="field-error">
              {errors.agreeToTerms}
            </p>
          ) : null}
          <button type="submit">Create Account</button>
          {successMessage ? <p className="success-message">{successMessage}</p> : null}
        </form>
        <p className="mt-3 text-sm text-slate-600">
          Already have an account? <a className="font-semibold text-blue-600 hover:text-blue-700" href="/login">Login here</a>
        </p>
      </div>
    </section>
  );
}
