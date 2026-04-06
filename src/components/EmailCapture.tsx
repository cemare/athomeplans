export default function EmailCapture() {
  return (
    <section className="emailCapture" aria-labelledby="emailCaptureHeading">
      <h2 id="emailCaptureHeading">Get Blog Updates</h2>
      <p>Weekly interior design tips, furniture picks, and new plan drops.</p>
      <form
        method="post"
        action={process.env.NEXT_PUBLIC_EMAIL_CAPTURE_URL || "https://example.com/newsletter-signup"}
        target="_blank"
      >
        <label htmlFor="emailCaptureInput" className="srOnly">
          Email address
        </label>
        <input
          id="emailCaptureInput"
          name="email"
          type="email"
          required
          placeholder="you@domain.com"
          autoComplete="email"
        />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}
