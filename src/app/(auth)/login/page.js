// src/app/(auth)/login/page.js
export default function LoginPage() {
  return (
    <main style={{ padding: '2rem', color: 'white' }}>
      <h1>Login (Minimal)</h1>
      <form
        method="POST"
        action="/api/auth/login"
        style={{ display: 'grid', gap: '1rem' }}
      >
        <label>
          Email:
          <input
            type="email"
            name="email"
            value="nick@nickneessen.com"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value="N123j234n345!$!$"
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}
