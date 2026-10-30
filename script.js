// Telsa.io — front-end interactions.
// Newsletter and account forms are demos. Connect a trusted backend/service before collecting real data.

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const dialog = document.getElementById("accountDialog");
  const openButtons = [document.getElementById("openAccount"), document.getElementById("footerAccount")];
  const closeButton = document.getElementById("closeAccount");
  const accountForm = document.getElementById("accountForm");
  const accountMessage = document.getElementById("accountMessage");
  const accountName = document.getElementById("accountName");
  const nameLabel = document.getElementById("nameLabel");
  const accountPassword = document.getElementById("accountPassword");
  const accountSubmit = document.getElementById("accountSubmit");
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterMessage = document.getElementById("newsletterMessage");
  let currentTab = "signup";

  document.getElementById("year").textContent = new Date().getFullYear();

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  function openDialog() {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else alert("Your browser does not support the account preview dialog.");
  }
  openButtons.forEach(button => button.addEventListener("click", openDialog));
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      currentTab = tab.dataset.tab;
      document.querySelectorAll(".tab").forEach(item => item.classList.toggle("active", item === tab));
      const isSignup = currentTab === "signup";
      accountName.hidden = !isSignup;
      nameLabel.hidden = !isSignup;
      accountName.required = isSignup;
      accountPassword.autocomplete = isSignup ? "new-password" : "current-password";
      accountSubmit.textContent = isSignup ? "Create demo account" : "Sign-in preview";
      accountMessage.textContent = "";
    });
  });

  accountForm.addEventListener("submit", event => {
    event.preventDefault();
    accountMessage.textContent = currentTab === "signup"
      ? "Preview only: no account was created. Connect a secure authentication backend to enable registration."
      : "Preview only: sign-in is not connected. No credentials were sent or saved.";
  });

  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    newsletterMessage.textContent = "Thanks! This demo did not store your email. Connect a newsletter provider to enable subscriptions.";
    newsletterForm.reset();
  });
});
