import { useEffect, useState } from "react";
import {
  TideCloakContextProvider,
  useTideCloak } from
"@tidecloak/react";
import App from "./App.jsx";
import { canAccess } from "./authPolicy.js";
import {
  authenticateMockUser,
  loadMockProfile,
  registerMockUser } from
"./mockAuth.js";

const mockSessionKey = "orbit-tidecloak-mock-session";

function AuthState({ error }) {
  return (
    <main className="auth-state" role={error ? "alert" : "status"}>
      <h1>{error ? "Cannot connect TideCloak" : "Checking login session\u2026"}</h1>
      {error &&
      <>
          <p>{error.message}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </>
      }
    </main>);

}

function AuthGate({ login }) {
  return (
    <main className="auth-state auth-gate">
      <span className="auth-orbit" aria-hidden="true">✦</span>
      <p className="auth-kicker">SAFE SPACE GATE</p>
      <h1>Log in to start your journey.</h1>
      <p>Orbit uses TideCloak to protect your identity and sync your study progress.</p>
      <button onClick={() => void login()}>Continue with TideCloak</button>
    </main>);

}

function MockAuthGate({ register, signIn }) {
  const [view, setView] = useState("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await (view === "login" ? signIn(data) : register(data));
    } catch (nextError) {
      setError(nextError.message);
      setBusy(false);
    }
  };

  return (
    <main className="auth-state auth-gate">
      <span className="auth-orbit" aria-hidden="true">✦</span>
      <p className="auth-kicker">TIDECLOAK · SIMULATION MODE</p>
      <h1>{view === "login" ? "Welcome back." : "Create your space passport."}</h1>
      <p>
        {view === "login" ?
        "Log in to continue your journey and reopen your own progress." :
        "New accounts start with a student role and a unique journey."}
      </p>
      <div className="auth-tabs" role="tablist" aria-label="Account">
        <button className={view === "login" ? "active" : ""} onClick={() => {setView("login");setError("");}} role="tab" aria-selected={view === "login"}>Log in</button>
        <button className={view === "register" ? "active" : ""} onClick={() => {setView("register");setError("");}} role="tab" aria-selected={view === "register"}>Register</button>
      </div>
      <form className="mock-auth-form" onSubmit={submit}>
        {view === "register" &&
        <label>Nickname<input name="name" autoComplete="name" required placeholder="For example: Morning Star" /></label>
        }
        <label>Email<input name="email" type="email" autoComplete="email" required placeholder="learner@example.com" /></label>
        <label>Password<input name="password" type="password" autoComplete={view === "login" ? "current-password" : "new-password"} minLength={8} required placeholder="At least 8 characters" /></label>
        {error && <p className="auth-form-error" role="alert">{error}</p>}
        <button className="auth-submit" disabled={busy}>{busy ? "Checking\u2026" : view === "login" ? "Log in" : "Create an account"}</button>
      </form>
      <small className="mock-auth-note">Local simulation · does not send data out · is not used for production</small>
    </main>);

}

function MockTideCloakApp() {
  const [profile, setProfile] = useState(() => {
    try {
      return loadMockProfile(localStorage.getItem(mockSessionKey));
    } catch {
      return null;
    }
  });

  const startSession = (nextProfile) => {
    try {
      localStorage.setItem(mockSessionKey, nextProfile.userId);
    } catch {

      // The in-memory session still works when browser storage is unavailable.
    }setProfile(nextProfile);
  };
  const logout = () => {
    try {
      localStorage.removeItem(mockSessionKey);
    } catch {

      // The in-memory session is cleared below.
    }setProfile(null);
  };

  if (!profile)
  return (
    <MockAuthGate
      register={async (credentials) => startSession(await registerMockUser(credentials))}
      signIn={async (credentials) => startSession(await authenticateMockUser(credentials))} />);



  return (
    <App
      key={profile.userId}
      auth={{
        authenticated: true,
        enabled: true,
        mode: "mock",
        ...profile,
        can: (permission) => canAccess(profile.roles, permission),
        hasRole: (role) => profile.roles.includes(role),
        logout
      }} />);


}

function TideCloakApp() {
  const {
    authenticated,
    getValueFromToken,
    getValueFromIdToken,
    initError,
    isInitializing,
    login,
    logout
  } = useTideCloak();

  useEffect(() => {
    if (!isInitializing && window.location.pathname.endsWith("/auth/redirect"))
    window.history.replaceState(null, "", import.meta.env.BASE_URL);
  }, [isInitializing]);

  if (isInitializing) return <AuthState />;
  if (initError) return <AuthState error={initError} />;
  if (!authenticated) return <AuthGate login={login} />;

  const userId = getValueFromIdToken("sub");
  if (!userId)
  return <AuthState error={new Error("ID token has no claim sub.")} />;

  const name =
  getValueFromIdToken("preferred_username") ||
  getValueFromIdToken("name") ||
  "your account";
  const roles = getValueFromToken("realm_access")?.roles || [];

  return (
    <App
      key={userId || "anonymous"}
      auth={{
        authenticated,
        enabled: true,
        login,
        logout,
        name,
        userId,
        roles,
        can: (permission) => canAccess(roles, permission),
        hasRole: (role) => roles.includes(role),
        mode: "live"
      }} />);


}

export default function AuthRoot() {
  if (import.meta.env.VITE_TIDECLOAK_MODE === "mock")
  return <MockTideCloakApp />;

  const configUrl = import.meta.env.VITE_TIDECLOAK_CONFIG_URL;
  if (!configUrl)
  return <AuthState error={new Error("Missing required TideCloak configuration.")} />;

  return (
    <TideCloakContextProvider configUrl={configUrl}>
      <TideCloakApp />
    </TideCloakContextProvider>);

}
