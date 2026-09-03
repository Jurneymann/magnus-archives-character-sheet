// ==================== 3D DICE ROLLER SYSTEM ==================== //

let diceBox = null;
let diceRollerInitialized = false;
let currentRollResult = null;
let currentRollCallback = null;
let manualInputShouldBeHidden = false;

// Force remove any conflicting styles on page load
document.addEventListener("DOMContentLoaded", function () {
  const manualRow = document.getElementById("manualInputRow");
  if (manualRow && !manualInputShouldBeHidden) {
    // ADD FLAG CHECK
    // Remove any inline styles that might be interfering
    manualRow.removeAttribute("style");
    // Set initial display
    manualRow.style.display = "flex";
    manualRow.style.flexDirection = "row";
    manualRow.style.alignItems = "center";
    manualRow.style.gap = "12px";
    console.log("✓ Manual input row initialized");
  }
});

// Initialize the DICE.dice_box
function initializeDiceBox() {
  if (diceRollerInitialized && diceBox) {
    console.log("✓ DiceBox already initialized");
    return true;
  }

  try {
    console.log("Initializing DICE.dice_box...");

    // Check if DICE library is loaded
    if (typeof DICE === "undefined" || typeof DICE.dice_box === "undefined") {
      console.error("✗ DICE library not found!");
      return false;
    }

    console.log("✓ DICE library found");

    // Get the container element
    const container = document.getElementById("dice-canvas-container");
    if (!container) {
      console.error("✗ Dice container element not found!");
      return false;
    }

    // Create new DICE.dice_box instance
    diceBox = new DICE.dice_box(container);

    diceRollerInitialized = true;
    console.log("✓ DICE.dice_box initialized successfully");
    return true;
  } catch (error) {
    console.error("✗ Failed to initialize DICE.dice_box:", error);
    diceRollerInitialized = false;
    return false;
  }
}

// Suppress Three.js shader warnings (cosmetic only, no functional impact)
const originalWarn = console.warn;
console.warn = function (message) {
  // Filter out Three.js shader loop warnings
  if (
    typeof message === "string" &&
    (message.includes("gl.getProgramInfoLog") ||
      message.includes("loop only executes for 1 iteration"))
  ) {
    return; // Suppress these specific warnings
  }
  // Pass through all other warnings
  originalWarn.apply(console, arguments);
};

console.log("✓ Dice roller initialized (shader warnings suppressed)");

const DICE_BACKGROUNDS = [
  ["", "The Statement"], ["archive.jpg", "The Archive"],
  ["institute.jpg", "The Institute"], ["logo.jpg", "The Icon"],
  ["library.jpg", "The Library"], ["hallway.jpg", "The Corridor"],
  ["darkroom.jpg", "The Darkroom"], ["windowface.jpg", "The Spectre"],
  ["mirror.jpg", "The Beast"], ["eater.jpg", "The Creature"],
  ["ensnared.jpg", "The Ensnared"], ["spiders.jpg", "The Swarm"],
  ["graffiti.jpg", "The Message"], ["alleyway.jpg", "The Alleyway"],
  ["pursuit.jpg", "The Pursuit"], ["shadow.jpg", "The Shadow"],
  ["trapdoor.jpg", "The Passage"], ["cavern.jpg", "The Cavern"],
  ["coffin.jpg", "The Coffin"], ["body.jpg", "The Remains"],
  ["choke.jpg", "The Attack"], ["doorway.jpg", "The Threshold"],
  ["wasteland.jpg", "The Wasteland"], ["bluesky.jpg", "The Sky"],
  ["manwhowasntthere.jpg", "The Imposter"], ["archivist.jpg", "The Archivist"],
  ["nikola.jpg", "The Ringmaster"], ["weaver.jpg", "The Weaver"],
  ["mrspider.jpg", "Mr. Spider"], ["feast.jpg", "The Feast"],
];

const DICE_CUSTOMISER_DEFAULTS = {
  background: "",
  diceColor: "#202020",
  labelColor: "#aaaaaa",
  lightColor: "#f0f0f0",
  matteFinish: false,
  avatarPreset: "crimson",
  avatarTexture: "",
};

const AVATAR_PRESETS = {
  crimson: ["The Marked", "#0f0000", "#e05060", "#000000", "#200408"],
  sapphire: ["The Witnessed", "#000a18", "#60b8e8", "#000000", "#040a1a"],
  emerald: ["The Archivist", "#001008", "#50d870", "#000000", "#031a08"],
  amethyst: ["The Herald", "#0e0018", "#c070e8", "#000000", "#14021e"],
  amber: ["The Chronicler", "#140800", "#e8a830", "#000000", "#1e0d00"],
  obsidian: ["The Consumed", "#000000", "#e8e8e8", "#000000", "#080808"],
  ivory: ["The Ancient", "#d8d0c0", "#101010", "#c0b8a8", "#b0a890"],
};

const AVATAR_TEXTURES = ["", "bonestexture.png", "burningearthtexture.png", "fleshtexture.jpg", "hivetexture.png", "nebulatexture.png", "obsidiantexture.png", "rusttexture.png", "shardtexture.png", "stonetexture.png", "twistedtexture.png", "watchertexture.png", "wavestexture.png", "webbingtexture.png"];

function getDiceSettings() {
  try {
    return { ...DICE_CUSTOMISER_DEFAULTS, ...JSON.parse(localStorage.getItem("magnusDiceCustomiser") || "{}") };
  } catch (error) {
    return { ...DICE_CUSTOMISER_DEFAULTS };
  }
}

function applyDiceSettings() {
  const settings = getDiceSettings();
  const container = document.getElementById("dice-canvas-container");
  if (container) {
    container.style.backgroundImage = settings.background ? `url('assets/DiceBackgrounds/${settings.background}')` : "";
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
  }
  if (typeof DICE !== "undefined" && DICE.setTheme) {
    const lightColor = parseInt(settings.lightColor.replace("#", ""), 16);
    const preset = AVATAR_PRESETS[settings.avatarPreset] || AVATAR_PRESETS.crimson;
    const theme = {
      dice_color: settings.diceColor,
      label_color: settings.labelColor,
      label_font: "Georgia",
      ambient_light_color: lightColor,
      spot_light_color: lightColor,
      shininess: settings.matteFinish ? 0 : 40,
      specular: settings.matteFinish ? 0x000000 : 0x172022,
      use_avatar_style: !!settings.avatarTexture,
      avatar_number_outline: "#000000",
      avatar_inner_color: preset[3],
      avatar_rim_color: preset[4],
    };
    if (settings.avatarTexture) {
      theme.dice_color = preset[1];
      theme.label_color = preset[2];
      const image = new Image();
      image.onload = () => DICE.setTheme({ ...theme, avatar_face_texture: image });
      image.onerror = () => DICE.setTheme(theme);
      image.src = "assets/Texture/" + settings.avatarTexture;
    } else {
      DICE.setTheme({ ...theme, avatar_face_texture: null });
    }
  }
}

function initialiseDiceCustomiser() {
  const settings = getDiceSettings();
  const backgroundPicker = document.getElementById("diceBackgroundPicker");
  const colorPicker = document.getElementById("diceColorPicker");
  const labelPicker = document.getElementById("diceLabelColorPicker");
  const lightPicker = document.getElementById("diceLightColorPicker");
  const mattePicker = document.getElementById("diceMattePicker");
  const avatarOptions = document.getElementById("avatarDiceOptions");
  const avatarPreset = document.getElementById("avatarDicePreset");
  const avatarTexture = document.getElementById("avatarDiceTexture");
  if (!backgroundPicker) return;
  backgroundPicker.innerHTML = DICE_BACKGROUNDS.map(([file, label]) => `<option value="${file}">${label}</option>`).join("");
  backgroundPicker.value = settings.background;
  colorPicker.value = settings.diceColor;
  labelPicker.value = settings.labelColor;
  lightPicker.value = settings.lightColor;
  mattePicker.checked = settings.matteFinish;
  const isAvatarPlayer = typeof character !== "undefined" && character.avatar && (character.avatar.isAvatar === true || character.avatar.gmUnlocked === true);
  avatarOptions.style.display = isAvatarPlayer ? "contents" : "none";
  avatarPreset.innerHTML = Object.entries(AVATAR_PRESETS).map(([id, preset]) => `<option value="${id}">${preset[0]}</option>`).join("");
  avatarTexture.innerHTML = AVATAR_TEXTURES.map((texture) => `<option value="${texture}">${texture ? texture.replace(/texture|\.(png|jpg)/g, "") : "No texture"}</option>`).join("");
  avatarPreset.value = settings.avatarPreset;
  avatarTexture.value = settings.avatarTexture;
  const save = () => {
    localStorage.setItem("magnusDiceCustomiser", JSON.stringify({
      background: backgroundPicker.value,
      diceColor: colorPicker.value,
      labelColor: labelPicker.value,
      lightColor: lightPicker.value,
      matteFinish: mattePicker.checked,
      avatarPreset: avatarPreset.value,
      avatarTexture: isAvatarPlayer ? avatarTexture.value : "",
    }));
    applyDiceSettings();
  };
  [backgroundPicker, colorPicker, labelPicker, lightPicker, mattePicker, avatarPreset, avatarTexture].forEach((input) => input.addEventListener("input", save));
  applyDiceSettings();
}

document.addEventListener("DOMContentLoaded", initialiseDiceCustomiser);

// Show the dice roller modal
function showDiceRoller(diceType = "d20", callback = null) {
  console.log(`Opening dice roller for ${diceType}`);

  const modal = document.getElementById("diceRollerModal");
  if (!modal) return;

  currentRollCallback = callback;
  currentRollResult = null;
  manualInputShouldBeHidden = false; // RESET FLAG

  // Set dice type
  const rollTypeText = document.getElementById("diceRollType");
  if (rollTypeText) rollTypeText.textContent = `Roll ${diceType}`;

  // Reset roll button
  const rollButton = document.getElementById("rollDiceButton");
  if (rollButton) {
    rollButton.style.display = "block";
    rollButton.disabled = false;
    rollButton.setAttribute("data-dice-type", diceType);
    rollButton.onclick = () => rollDice(diceType);
  }

  // Reset manual input - EXPLICITLY SHOW IT
  const manualRow = document.getElementById("manualInputRow");
  const manualInput = document.getElementById("manualDiceInput");

  if (manualRow) {
    manualRow.style.display = "flex";
    console.log("✓ Manual input row shown");
  }

  if (manualInput) {
    manualInput.value = "";
    manualInput.max = diceType === "d6" ? 6 : 20;
    manualInput.placeholder = `1-${manualInput.max}`;
  }

  // Hide other buttons
  const rerollBtn = document.getElementById("rerollDiceButton");
  const acceptBtn = document.getElementById("acceptDiceButton");
  if (rerollBtn) rerollBtn.style.display = "none";
  if (acceptBtn) acceptBtn.style.display = "none";

  // Clear result
  const result = document.getElementById("diceResult");
  if (result) {
    result.style.display = "none";
    result.textContent = "";
  }

  modal.style.display = "flex";

  // Initialize dice box if needed
  if (!diceRollerInitialized) {
    initializeDiceBox();
  }
  applyDiceSettings();
}

// Update rollDice to set the flag:
function rollDice(diceType) {
  console.log(`Rolling ${diceType}...`);

  const rollButton = document.getElementById("rollDiceButton");
  const manualRow = document.getElementById("manualInputRow");

  // Log initial state
  console.log("=== ROLL DICE CALLED ===");
  console.log("Manual row element:", manualRow);
  console.log(
    "Manual row display BEFORE:",
    manualRow ? manualRow.style.display : "NULL"
  );

  if (rollButton) {
    rollButton.disabled = true;
    rollButton.textContent = "Rolling...";
  }

  // SET FLAG and FORCE HIDE
  manualInputShouldBeHidden = true; // SET FLAG
  if (manualRow) {
    manualRow.style.setProperty("display", "none", "important");
    console.log("Manual row display AFTER:", manualRow.style.display);
    console.log("✓ Manual input FORCED hidden, flag set to true");
  } else {
    console.error("✗ Manual row element is NULL!");
  }

  if (!diceBox || !diceRollerInitialized) {
    console.error("DiceBox not initialized");
    if (rollButton) {
      rollButton.disabled = false;
      rollButton.textContent = "Roll Virtual Dice";
    }
    return;
  }

  try {
    const notation = `1${diceType}`;
    diceBox.setDice(notation);

    function after_roll(notation) {
      console.log("After roll:", JSON.stringify(notation));
      console.log("Flag manualInputShouldBeHidden:", manualInputShouldBeHidden); // ADD LOG

      if (notation?.result?.length > 0) {
        const rollValue = notation.result[0];
        currentRollResult = rollValue;

        // Reset button text before hiding it
        if (rollButton) {
          rollButton.textContent = "Roll Virtual Dice";
          rollButton.disabled = false;
        }

        setTimeout(() => displayRollResult(rollValue), 500);
      } else {
        console.error("No result in notation");
        if (rollButton) {
          rollButton.disabled = false;
          rollButton.textContent = "Roll Virtual Dice";
        }
      }
    }

    diceBox.start_throw(null, after_roll);
  } catch (error) {
    console.error("Error rolling:", error);
    if (rollButton) {
      rollButton.disabled = false;
      rollButton.textContent = "Roll Virtual Dice";
    }
  }
}

// Roll the dice using DICE.dice_box
function rollDice(diceType) {
  console.log(`Rolling ${diceType}...`);

  const rollButton = document.getElementById("rollDiceButton");
  const manualRow = document.getElementById("manualInputRow");

  // Log initial state
  console.log("=== ROLL DICE CALLED ===");
  console.log("Manual row element:", manualRow);
  console.log(
    "Manual row display BEFORE:",
    manualRow ? manualRow.style.display : "NULL"
  );

  if (rollButton) {
    rollButton.disabled = true;
    rollButton.textContent = "Rolling...";
  }

  // FORCE HIDE with !important via inline style
  if (manualRow) {
    manualRow.style.setProperty("display", "none", "important");
    console.log("Manual row display AFTER:", manualRow.style.display);
    console.log("✓ Manual input FORCED hidden");
  } else {
    console.error("✗ Manual row element is NULL!");
  }

  if (!diceBox || !diceRollerInitialized) {
    console.error("DiceBox not initialized");
    if (rollButton) {
      rollButton.disabled = false;
      rollButton.textContent = "Roll Virtual Dice";
    }
    return;
  }

  try {
    const notation = `1${diceType}`;
    diceBox.setDice(notation);

    function after_roll(notation) {
      console.log("After roll:", JSON.stringify(notation));

      if (notation?.result?.length > 0) {
        const rollValue = notation.result[0];
        currentRollResult = rollValue;

        // Reset button text before hiding it
        if (rollButton) {
          rollButton.textContent = "Roll Virtual Dice";
          rollButton.disabled = false;
        }

        setTimeout(() => displayRollResult(rollValue), 500);
      } else {
        console.error("No result in notation");
        if (rollButton) {
          rollButton.disabled = false;
          rollButton.textContent = "Roll Virtual Dice";
        }
      }
    }

    diceBox.start_throw(null, after_roll);
  } catch (error) {
    console.error("Error rolling:", error);
    if (rollButton) {
      rollButton.disabled = false;
      rollButton.textContent = "Roll Virtual Dice";
    }
  }
}

// Display the roll result
function displayRollResult(rollValue) {
  const rollButton = document.getElementById("rollDiceButton");
  const rerollButton = document.getElementById("rerollDiceButton");
  const acceptButton = document.getElementById("acceptDiceButton");
  const resultDisplay = document.getElementById("diceResult");
  const manualRow = document.getElementById("manualInputRow");

  console.log(`Displaying result: ${rollValue}`);

  // ENSURE manual input is hidden AND flag is set
  if (manualRow) {
    console.log(
      "IN displayRollResult BEFORE - manualRow.style.display:",
      manualRow.style.display
    );
    console.log("Flag manualInputShouldBeHidden:", manualInputShouldBeHidden);

    manualRow.style.setProperty("display", "none", "important");

    console.log(
      "IN displayRollResult AFTER - manualRow.style.display:",
      manualRow.style.display
    );
    console.log("✓ Manual input confirmed hidden in displayRollResult");

    // Add a MutationObserver to prevent it from being re-shown
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          if (manualInputShouldBeHidden && manualRow.style.display !== "none") {
            console.warn("⚠ Manual input was re-shown! Hiding again...");
            manualRow.style.setProperty("display", "none", "important");
          }
        }
      });
    });

    observer.observe(manualRow, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // Store observer so we can disconnect it later
    manualRow._styleObserver = observer;
  }

  // Hide initial roll button
  if (rollButton) {
    rollButton.style.display = "none";
  }

  // Show result
  if (resultDisplay) {
    resultDisplay.textContent = `You rolled: ${rollValue}`;
    resultDisplay.style.display = "block";

    // Add styling based on roll value
    resultDisplay.className = "dice-result";
    if (rollValue === 20) {
      resultDisplay.classList.add("critical-success");
    } else if (rollValue === 1) {
      resultDisplay.classList.add("critical-failure");
    }
  }

  // Show reroll and accept buttons
  if (rerollButton) {
    rerollButton.style.display = "inline-block";
  }

  if (acceptButton) {
    acceptButton.style.display = "inline-block";
  }
}

// Reroll the dice
function rerollDice() {
  const rollButton = document.getElementById("rollDiceButton");
  const manualRow = document.getElementById("manualInputRow");
  const diceType = rollButton?.getAttribute("data-dice-type") || "d20";

  // Disconnect observer if it exists
  if (manualRow && manualRow._styleObserver) {
    manualRow._styleObserver.disconnect();
    delete manualRow._styleObserver;
  }

  // Hide result and action buttons
  document.getElementById("diceResult").style.display = "none";
  document.getElementById("rerollDiceButton").style.display = "none";
  document.getElementById("acceptDiceButton").style.display = "none";

  // RESET FLAG and show manual input
  manualInputShouldBeHidden = false;

  // Show roll button and manual input
  if (rollButton) rollButton.style.display = "block";
  if (manualRow) {
    manualRow.style.display = "flex";
  }

  rollDice(diceType);
}

// Accept the roll result
function acceptDiceRoll() {
  console.log(`acceptDiceRoll called with result: ${currentRollResult}`);
  console.log(`Callback exists: ${!!currentRollCallback}`);

  if (currentRollResult !== null && currentRollCallback) {
    console.log(`Executing callback with result: ${currentRollResult}`);

    // Store callback and result before closing
    const rollResult = currentRollResult;
    const callback = currentRollCallback;

    // Close the dice roller FIRST
    closeDiceRoller();

    // Then execute callback after a short delay to ensure modal is closed
    setTimeout(() => {
      try {
        callback(rollResult);
        console.log("Callback executed successfully");
      } catch (error) {
        console.error("Error executing callback:", error);
      }
    }, 100);
  } else {
    console.warn("No callback or result to process");
    closeDiceRoller();
  }
}

// Close the dice roller modal
function closeDiceRoller() {
  const modal = document.getElementById("diceRollerModal");
  if (modal) {
    modal.style.display = "none";
  }

  // Reset state
  currentRollResult = null;
  currentRollCallback = null;
}

// Test function
function testDiceRoller() {
  showDiceRoller("d20", (result) => {
    console.log("Test roll result:", result);
    alert(`You rolled: ${result}`);
  });
}
// Quick D6 manual submission
function submitManualD6() {
  const input = document.getElementById("manualD6Input");
  const value = parseInt(input.value);

  if (!value || value < 1 || value > 6) {
    alert("Please enter a valid d6 roll (1-6)");
    input.focus();
    return;
  }

  console.log(`Manual d6 roll: ${value}`);
  alert(`You rolled a ${value} on d6!`);

  // Clear input
  input.value = "";
}

// Quick D20 manual submission
function submitManualD20() {
  const input = document.getElementById("manualD20Input");
  const value = parseInt(input.value);

  if (!value || value < 1 || value > 20) {
    alert("Please enter a valid d20 roll (1-20)");
    input.focus();
    return;
  }

  console.log(`Manual d20 roll: ${value}`);
  alert(`You rolled a ${value} on d20!`);

  // Clear input
  input.value = "";
}

// Manual dice roll submission for 3D dice roller modal
function submitManualRoll() {
  const input = document.getElementById("manualDiceInput");
  const value = parseInt(input.value);

  // Get max from placeholder or modal
  const rollButton = document.getElementById("rollDiceButton");
  const diceType = rollButton?.getAttribute("data-dice-type") || "d20";
  const maxValue = diceType === "d6" ? 6 : 20;

  // Validate
  if (!value || value < 1 || value > maxValue) {
    alert(`Please enter a valid roll (1-${maxValue})`);
    return;
  }

  // Store result
  currentRollResult = value;

  // Clear input
  input.value = "";

  // Hide manual input row
  const manualRow = document.getElementById("manualInputRow");
  if (manualRow) manualRow.style.display = "none";

  // Hide roll button
  if (rollButton) rollButton.style.display = "none";

  // Display result
  displayRollResult(value);
}

const originalShowDiceRoller = showDiceRoller;

console.log("✓ Manual dice input functions loaded");
console.log("✓ 3D Dice Roller system loaded");
console.log("  Call testDiceRoller() to test");
