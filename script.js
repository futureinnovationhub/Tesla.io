/* Telsa.io frontend.
   Contact/newsletter forms use FormSubmit. Real member accounts require Supabase configuration below.
   Never put a service-role key or email password in this public file. */
const SUPABASE_URL = ""; // Add your Supabase project URL
const SUPABASE_ANON_KEY = ""; // Add your Supabase publishable/anon key only
let supabaseClient = null;
let authMode = "signup";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  menuToggle?.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuToggle.textContent = open ? "×" : "☰";
  });
  siteNav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) { menuToggle.textContent = "☰"; menuToggle.setAttribute("aria-label", "Open menu"); }
  }));
  document.getElementById("year").textContent = new Date().getFullYear();

  const modal = document.getElementById("authModal");
  const openAuth = document.getElementById("openAuth");
  const closeAuth = document.getElementById("closeAuth");
  openAuth?.addEventListener("click", () => { modal.hidden = false; document.getElementById("authEmail").focus(); });
  closeAuth?.addEventListener("click", () => { modal.hidden = true; });
  modal?.addEventListener("click", e => { if (e.target === modal) modal.hidden = true; });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal) modal.hidden = true; });

  document.getElementById("signupTab").addEventListener("click", () => setAuthMode("signup"));
  document.getElementById("loginTab").addEventListener("click", () => setAuthMode("login"));
  if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  document.getElementById("authForm").addEventListener("submit", handleAuth);
  configureFormStatus("contactForm", "contactStatus", "Your email app/service will process this message. If this is your first submission, check your inbox for FormSubmit's activation email.");
  configureFormStatus("newsletterForm", "newsletterStatus", "Subscription request submitted. Confirm the FormSubmit activation email if this is the first use. A mailing-list service is needed for automatic newsletters.");
});

function setAuthMode(mode) {
  authMode = mode;
  const signup = mode === "signup";
  document.getElementById("signupTab").classList.toggle("active", signup);
  document.getElementById("loginTab").classList.toggle("active", !signup);
  document.getElementById("authTitle").textContent = signup ? "Join Telsa.io" : "Welcome back";
  document.getElementById("authSubmit").textContent = signup ? "Create account" : "Sign in";
  document.getElementById("authPassword").autocomplete = signup ? "new-password" : "current-password";
  document.getElementById("authStatus").textContent = "";
}

async function handleAuth(event) {
  event.preventDefault();
  const status = document.getElementById("authStatus");
  const button = document.getElementById("authSubmit");
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  if (!supabaseClient) {
    status.textContent = "Member accounts are not active yet. The site owner must add the Supabase project URL and publishable key to script.js and enable email authentication in Supabase.";
    return;
  }
  button.disabled = true;
  status.textContent = authMode === "signup" ? "Creating your account…" : "Signing in…";
  try {
    const result = authMode === "signup"
      ? await supabaseClient.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
      : await supabaseClient.auth.signInWithPassword({ email, password });
    if (result.error) throw result.error;
    status.textContent = authMode === "signup"
      ? "Signup request received. Check your email for a verification link if email confirmation is enabled."
      : "You are signed in successfully.";
  } catch (error) {
    status.textContent = error.message || "We could not complete the request. Please try again.";
  } finally {
    button.disabled = false;
  }
}

function configureFormStatus(formId, statusId, successMessage) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  form.addEventListener("submit", () => {
    status.textContent = "Sending…";
    // FormSubmit handles the POST. This is a progress note, not proof of delivery.
    window.setTimeout(() => { if (status.textContent === "Sending…") status.textContent = successMessage; }, 1200);
  });
}
