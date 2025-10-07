document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const modal = $("petModal");
  const form = $("petForm");
  const openBtn = $("openPostPetBtn");
  const cancelBtn = $("cancelBtn");
  const closeBtn = $("closePostPetBtn");

  if (!modal || !form || !openBtn || !cancelBtn || !closeBtn) return;

  const show = () => (modal.style.display = "flex");
  const hide = () => {
    form.reset();
    modal.style.display = "none";
  };

  openBtn.onclick = show;
  cancelBtn.onclick = hide;
  closeBtn.onclick = hide;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const map = {
      petName: "name",
      petBreed: "breed",
      petLocation: "location",
      petAge: "age",
      petImage: "image",
    };

    const newPet = Object.entries(map).reduce((acc, [id, key]) => {
      const el = $(id);
      acc[key] = (el?.value || "").trim();
      return acc;
    }, {});

    // Guard against whitespace-only values (required handles most cases)
    if (Object.values(newPet).some((v) => v.length === 0)) {
      form.reportValidity();
      return;
    }

    let pets = [];
    try {
      pets = JSON.parse(localStorage.getItem("pets") || "[]");
    } catch (_) {
      pets = [];
    }
    if (!Array.isArray(pets)) pets = [];

    pets.push(newPet);
    localStorage.setItem("pets", JSON.stringify(pets));

    if (typeof renderPets === "function") renderPets();

    alert("Pet posted successfully!");

    hide();
  });
});

