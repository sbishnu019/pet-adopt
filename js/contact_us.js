document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      form.reportValidity();
      return;
    }

    // Persist to localStorage
    let messages = [];
    try {
      const raw = localStorage.getItem("contactMessages");
      messages = raw ? JSON.parse(raw) : [];
    } catch (e) {
      messages = [];
    }
    if (!Array.isArray(messages)) messages = [];

    messages.push({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("contactMessages", JSON.stringify(messages));

    alert("Message sent successfully! We will get back to you soon.");
    form.reset();
  });
});