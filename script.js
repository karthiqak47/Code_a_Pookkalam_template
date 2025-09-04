function createFlowerPetals(layerId, petalCount, flowerType) {
  const layer = document.getElementById(layerId);
  layer.innerHTML = ""; // reset
  const angleStep = 360 / petalCount;
  const radius = (layer.offsetWidth / 2) - 30;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.className = `${flowerType}-petal`;

    const angle = i * angleStep;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    petal.style.left = "50%";
    petal.style.top = "50%";
    petal.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;

    layer.appendChild(petal);

    if (showEmojis) {
      const emoji = document.createElement("span");
      emoji.textContent = flowerEmojiMap[flowerType] || "🌸";
      emoji.style.position = "absolute";
      emoji.style.left = "50%";
      emoji.style.top = "50%";
      emoji.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      layer.appendChild(emoji);
    }
  }
}

function updatePetals() {
  document.querySelectorAll('input[type="range"]').forEach(slider => {
    const layer = slider.dataset.layer;
    const type = slider.dataset.type;
    const count = slider.value;
    document.getElementById(`count${layer}`).textContent = count;
    createFlowerPetals(`layer${layer}`, count, type);
  });
}

function init() {
  updatePetals();

  document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener("input", updatePetals);
  });

  document.getElementById("emojiBorder").addEventListener("change", e => {
    showEmojis = e.target.checked;
    updatePetals();
  });
}

// Emoji mapping
const flowerEmojiMap = {
  jasmine: "🤍",
  marigold: "🌼",
  rose: "🌹",
  lotus: "🌸",
  chethi: "🌺",
  sankapushpam: "💠",
};

let showEmojis = true;

// Run
init();

