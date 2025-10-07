// Example pet data
const samplePets = [
  {
    name: "Sunny",
    breed: "Golden Retriever",
    location: "Paris, FR",
    age: "6 mo",
    image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=1600&auto=format&fit=crop"
  },
  {
    name: "Miso",
    breed: "Tabby Kitten",
    location: "Berlin, DE",
    age: "3 mo",
    image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1600&auto=format&fit=crop"
  },
  {
    name: "Coco",
    breed: "Toy Poodle",
    location: "Tokyo, JP",
    age: "1 yr",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1600&auto=format&fit=crop"
  }
];

// Load pets from localStorage or fallback
function loadPets() {
  let pets = JSON.parse(localStorage.getItem("pets"));
  if (!pets) {
    pets = samplePets;
    localStorage.setItem("pets", JSON.stringify(pets));
  }
  return pets;
}

// Render pet cards
function renderPets() {
  const grid = document.getElementById("pet-grid");
  grid.innerHTML = ""; // clear
  const pets = loadPets();
  pets.forEach(pet => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${pet.image}" alt="${pet.breed}">
      <div class="pad">
        <strong>${pet.name} • ${pet.breed}</strong><br>
        <span class="muted">${pet.location} • ${pet.age}</span>
        <div style="margin-top:10px; display:flex; justify-content:flex-end;">
          <button class="btn" type="button" onclick="adopt()">Adopt</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Run after page loads
document.addEventListener("DOMContentLoaded", renderPets);
