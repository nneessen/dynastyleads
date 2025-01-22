// app/(auth)/magic-link/page.js
export default function MagicLinkPage() {
  return (
    <main style={{ padding: '2rem', color: 'white' }}>
      <h1>Magic Link Login</h1>
      <form method="POST" action="/api/auth/loginMagic">
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" name="email" type="email" required />
        </div>
        <button type="submit">Send Magic Link</button>
      </form>
    </main>
  );
}
