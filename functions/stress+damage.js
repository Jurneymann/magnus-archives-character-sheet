function changeDamageState(direction) {
  const states = ["hale", "hurt", "impaired", "debilitated", "dead"];
  const currentIndex = states.indexOf(character.damageState || "hale");
  const newIndex = Math.max(
    0,
    Math.min(states.length - 1, currentIndex + direction)
  );

  character.damageState = states[newIndex];
  updateDamageDisplay();
}

function updateDamageDisplay() {
  const stateElement = document.getElementById("damageState");
  const descElement = document.getElementById("damageDescription");

  if (!stateElement || !descElement) return;

  const state = character.damageState || "hale";

  // Update main display
  stateElement.textContent = state.charAt(0).toUpperCase() + state.slice(1);
  stateElement.className = `damage-state-value ${state}`;

  // Update description
  const descriptions = {
    hale: "Healthy and uninjured. No penalties to your actions.",
    hurt: "Minor injuries, but still functional. No penalties to your actions.",
    impaired:
      "Wounded or injured. Effort costs +1 more from stat pools. Cannot achieve minor or major effects on rolls.",
    debilitated:
      `Critically injured. No other actions available except to move, (likely crawl away).\n` +
      `Effort costs +1 more from stat pools. Cannot achieve minor or major effects.`,
    dead: "Your character has perished. May they find peace.",
  };

  descElement.textContent = descriptions[state] || descriptions.hale;

  // Update quick selection buttons
  const buttonIds = [
    "quickHale",
    "quickHurt",
    "quickImpaired",
    "quickDebilitated",
    "quickDead",
  ];
  const stateMap = {
    quickHale: "hale",
    quickHurt: "hurt",
    quickImpaired: "impaired",
    quickDebilitated: "debilitated",
    quickDead: "dead",
  };

  buttonIds.forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    if (button) {
      if (stateMap[buttonId] === state) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    }
  });
}

function setDamageState(state) {
  const validStates = ["hale", "hurt", "impaired", "debilitated", "dead"];

  if (!validStates.includes(state)) {
    console.error("Invalid damage state:", state);
    return;
  }

  character.damageState = state;
  updateDamageDisplay();
}

function setDamageStateByName(name) {
  const index = damageStates.findIndex((s) => s.name === name);
  if (index !== -1) {
    damageIndex = index;
    updateDamageDisplay();
  }
}

function updateDamageUI() {
  setDamageStateByName(character.damage || "Hale");
}

function updateStressDisplay() {
  const stressPointsElement = document.getElementById("stressPoints");
  const stressLevelElement = document.getElementById("stressLevel");
  const superStressElement = document.getElementById("superStressDisplay");

  if (stressPointsElement) {
    stressPointsElement.textContent = character.stress || 0;
  }

  if (stressLevelElement) {
    const stressLevel = Math.floor((character.stress || 0) / 3);
    stressLevelElement.textContent = stressLevel;
  }

  if (superStressElement) {
    superStressElement.textContent = character.supernaturalStress || 0;
  }

  updateSuperStressDisplay();
}

// ==================== Stress Management ==================== //
function resetStress() {
  const confirmation = confirm(
    "Are you sure you want to reset Stress to 0?\n\n" +
      "This will clear all current stress points.\n\n" +
      "(Supernatural Stress cannot be reset)\n\n" +
      "Note: This does NOT affect your Damage Track state."
  );

  if (!confirmation) return;

  character.stress = 0;
  updateStressDisplay();

  alert("Stress has been reset to 0.\n\nDamage Track remains unchanged.");
}

function adjustStress(amount) {
  character.stress = Math.max(0, (character.stress || 0) + amount);
  updateStressDisplay();
}

function addSuperStress() {
  const currentSuper = character.supernaturalStress || 0;

  // Check if already at maximum
  if (currentSuper >= 10) {
    alert(
      `Cannot add Supernatural Stress!\n\n` +
        `You are already at the maximum of 10 Stress from Supernatural Sources.\n\n` +
        `You cannot gain any more Stress from Supernatural Sources.`
    );
    return;
  }

  const confirmation = confirm(
    `Add 1 Supernatural Stress?\n\n` +
      `Current: ${currentSuper}\n` +
      `New Total: ${currentSuper + 1}\n\n` +
      `WARNING: Stress from Supernatural Sources cannot be reduced once gained!\n` +
      `THIS CANNOT BE UNDONE!`
  );

  if (!confirmation) return;

  character.supernaturalStress = currentSuper + 1;
  updateStressDisplay();
  updateSuperStressDisplay();

  const atMax = character.supernaturalStress >= 10;

  alert(
    `Supernatural Stress increased by 1.\n\n` +
      `Total Supernatural Stress: ${character.supernaturalStress}/10\n\n` +
      (atMax ? `⚠️ YOU HAVE REACHED MAXIMUM SUPERNATURAL STRESS!\n\n` : "") +
      `Note: This does NOT automatically affect your Damage Track.`
  );
}

function updateSuperStressDisplay() {
  const displayElement = document.getElementById("superStressDisplay");
  const stressNumber = displayElement;
  const stressBox = document.querySelector(
    ".supernatural-stress-value-display"
  );

  if (displayElement) {
    displayElement.textContent = character.supernaturalStress;

    // Remove all stress level classes
    stressNumber.classList.remove(
      "stress-0",
      "stress-1-2",
      "stress-3-4",
      "stress-5-6",
      "stress-7-8",
      "stress-9",
      "stress-10"
    );

    // Add appropriate class based on stress level
    const stress = character.supernaturalStress;
    if (stress === 0) {
      stressNumber.classList.add("stress-0");
      stressBox.classList.remove("high-stress");
    } else if (stress <= 2) {
      stressNumber.classList.add("stress-1-2");
      stressBox.classList.remove("high-stress");
    } else if (stress <= 4) {
      stressNumber.classList.add("stress-3-4");
      stressBox.classList.remove("high-stress");
    } else if (stress <= 6) {
      stressNumber.classList.add("stress-5-6");
      stressBox.classList.add("high-stress");
    } else if (stress <= 8) {
      stressNumber.classList.add("stress-7-8");
      stressBox.classList.add("high-stress");
    } else if (stress === 9) {
      stressNumber.classList.add("stress-9");
      stressBox.classList.add("high-stress");
    } else if (stress >= 10) {
      stressNumber.classList.add("stress-10");
      stressBox.classList.add("high-stress");
    }

    console.log(
      `Supernatural Stress updated to ${character.supernaturalStress} with visual effects`
    );
  }
}

// ==================== Damage Track ==================== //
const damageStates = [
  { name: "Hale", desc: "Normal state. No penalties.", class: "hale" },
  {
    name: "Hurt",
    desc: "You are injured but can carry on. No penalties.",
    class: "hurt",
  },
  {
    name: "Impaired",
    desc: "Effort costs +1 point. No minor/major effects or extra damage on rolls.",
    class: "impaired",
  },
  {
    name: "Debilitated",
    desc: "You can only move—no other actions possible.",
    class: "debilitated",
  },
  { name: "Dead", desc: "You are dead.", class: "dead" },
];

let damageIndex = 0;

function setDamageState(state) {
  const validStates = ["hale", "hurt", "impaired", "debilitated", "dead"];

  if (!validStates.includes(state)) {
    console.error("Invalid damage state:", state);
    return;
  }

  character.damageState = state;
  updateDamageDisplay();
}

function changeDamageState(direction) {
  const states = ["hale", "hurt", "impaired", "debilitated", "dead"];
  const currentIndex = states.indexOf(character.damageState || "hale");
  const newIndex = Math.max(
    0,
    Math.min(states.length - 1, currentIndex + direction)
  );

  character.damageState = states[newIndex];
  updateDamageDisplay();
}

function updateDamageDisplay() {
  const stateElement = document.getElementById("damageState");
  const descElement = document.getElementById("damageDescription");

  if (!stateElement || !descElement) {
    console.warn("Damage display elements not found");
    return;
  }

  const state = character.damageState || "hale";

  // Update main display
  stateElement.textContent = state.charAt(0).toUpperCase() + state.slice(1);
  stateElement.className = `damage-state-value ${state}`;

  // Update description
  const descriptions = {
    hale: "Healthy and uninjured. No penalties to your actions.",
    hurt: "Minor injuries, but still functional. No penalties to your actions.",
    impaired:
      "Effort costs +1 more from stat pools. Cannot achieve minor or major effects on rolls.",
    debilitated:
      "Effort costs +1 more from stat pools. Can only move immediate distance. Cannot achieve minor or major effects.",
    dead: "Your character has perished. May they find peace.",
  };

  descElement.textContent = descriptions[state] || descriptions.hale;

  // Update quick selection buttons
  const buttonIds = [
    "quickHale",
    "quickHurt",
    "quickImpaired",
    "quickDebilitated",
    "quickDead",
  ];
  const stateMap = {
    quickHale: "hale",
    quickHurt: "hurt",
    quickImpaired: "impaired",
    quickDebilitated: "debilitated",
    quickDead: "dead",
  };

  buttonIds.forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    if (button) {
      if (stateMap[buttonId] === state) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    }
  });

  console.log("Damage display updated to:", state);
}
