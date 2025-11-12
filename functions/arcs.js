// ==================== CHARACTER ARCS SYSTEM ==================== //

// Initialize character arc data
if (!character.characterArc) {
  character.characterArc = {
    currentArc: null,
    arcName: "",
    arcNotes: "",
    arcsCompleted: 0,
    arcSelections: 0, // Track how many times an arc has been selected
    firstArcFree: true,
  };
}

// Populate the character arc dropdown
function populateCharacterArcSelect() {
  const select = document.getElementById("characterArcSelect");

  if (!select) return;

  // Clear existing options except the first one
  select.innerHTML = '<option value="">-- No Arc Selected --</option>';

  // Add all character arcs
  CHARACTER_ARCS.forEach((arc, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = arc.name;
    select.appendChild(option);
  });

  // Set current selection
  if (character.characterArc.currentArc !== null) {
    select.value = character.characterArc.currentArc;
  }
}

// Update the arc description when selection changes
function updateArcDescription() {
  const select = document.getElementById("characterArcSelect");
  const descriptionTextarea = document.getElementById(
    "characterArcDescription"
  );

  if (!select || !descriptionTextarea) return;

  const selectedIndex = select.value;

  if (
    selectedIndex === "" ||
    selectedIndex === null ||
    selectedIndex === undefined
  ) {
    descriptionTextarea.value = "";
    return;
  }

  const arc = CHARACTER_ARCS[parseInt(selectedIndex)];
  if (arc) {
    descriptionTextarea.value = arc.description;
  } else {
    descriptionTextarea.value = "";
  }
}

// Save arc notes
function saveArcNotes() {
  const notesTextarea = document.getElementById("characterArcNotes");

  if (!notesTextarea) return;

  character.characterArc.arcNotes = notesTextarea.value;
}

// Select or change character arc
function selectCharacterArc() {
  const select = document.getElementById("characterArcSelect");
  const selectedIndex = select.value;

  if (selectedIndex === "") {
    alert("Please select a character arc from the dropdown first.");
    return;
  }

  const arc = CHARACTER_ARCS[parseInt(selectedIndex)];

  // Check if this is a change or first selection
  const isChanging = character.characterArc.currentArc !== null;
  const isFirstArc = character.characterArc.arcSelections === 0;

  let confirmMessage = "";
  let cost = 0;

  if (isFirstArc) {
    confirmMessage =
      `Select "${arc.name}" as your character arc?\n\n` +
      `Your first arc is FREE!\n\n` +
      `Completing this arc will award 2 XP.`;
    cost = 0;
  } else if (isChanging) {
    confirmMessage =
      `Change your character arc to "${arc.name}"?\n\n` +
      `Current Arc: ${character.characterArc.arcName}\n` +
      `Cost: 1 XP\n\n` +
      `Completing the new arc will award 2 XP.`;
    cost = 1;
  } else {
    confirmMessage =
      `Select "${arc.name}" as your new character arc?\n\n` +
      `Cost: 1 XP\n\n` +
      `Completing this arc will award 2 XP.`;
    cost = 1;
  }

  const confirmation = confirm(confirmMessage);

  if (!confirmation) return;

  // Deduct XP if not first arc
  if (cost > 0) {
    if (character.xp < cost) {
      alert("Not enough XP! You need 1 XP to select a new arc.");
      return;
    }

    character.xp = Math.max(0, character.xp - cost); // Ensure XP doesn't go negative
  }

  // Set the new arc
  character.characterArc.currentArc = parseInt(selectedIndex);
  character.characterArc.arcName = arc.name;
  character.characterArc.arcSelections++;
  character.characterArc.firstArcFree = false;

  // Update displays
  updateXPDisplay();
  updateCharacterArcDisplay();

  alert(
    `Character Arc Selected: ${arc.name}\n\n` +
      (cost > 0
        ? `1 XP spent. Current XP: ${character.xp}\n`
        : `First arc is free!\n`) +
      `Complete this arc to earn 2 XP!`
  );
}

// Complete character arc
function completeCharacterArc() {
  if (character.characterArc.currentArc === null) {
    alert("You don't have an active character arc to complete.");
    return;
  }

  const arcName = character.characterArc.arcName;

  const confirmation = confirm(
    `Complete your character arc: "${arcName}"?\n\n` +
      `You will receive 2 XP as a reward!\n\n` +
      `After completing this arc, you can select a new one.`
  );

  if (!confirmation) return;

  // Award XP - ensure it's a valid number operation
  const currentXP = parseInt(character.xp) || 0;
  character.xp = currentXP + 2;
  character.characterArc.arcsCompleted++;

  // Clear current arc
  character.characterArc.currentArc = null;
  character.characterArc.arcName = "";
  character.characterArc.arcNotes = "";

  // Update XP display - try both methods
  const xpInput = document.getElementById("xp");
  if (xpInput) {
    xpInput.value = character.xp;
  }

  // Also call the update function if it exists
  if (typeof updateXPDisplay === "function") {
    updateXPDisplay();
  } else {
    // Manually update advancement display
    updateAdvancementDisplay();
  }

  // Update character arc display
  updateCharacterArcDisplay();

  // Clear the form
  const select = document.getElementById("characterArcSelect");
  const notesTextarea = document.getElementById("characterArcNotes");
  const descriptionTextarea = document.getElementById(
    "characterArcDescription"
  );

  if (select) {
    select.value = "";
    // Manually trigger change event
    const event = new Event("change", { bubbles: true });
    select.dispatchEvent(event);
  }
  if (notesTextarea) {
    notesTextarea.value = "";
  }
  if (descriptionTextarea) {
    descriptionTextarea.value = "";
  }

  alert(
    `Character Arc Completed!\n\n` +
      `"${arcName}"\n\n` +
      `You have been awarded 2 XP!\n` +
      `Current XP: ${character.xp}\n` +
      `Total Arcs Completed: ${character.characterArc.arcsCompleted}\n\n` +
      `You can now select a new character arc for 1 XP.`
  );
}

// Update character arc display
function updateCharacterArcDisplay() {
  const currentArcName = document.getElementById("currentArcName");
  const arcsCompletedCount = document.getElementById("arcsCompletedCount");
  const notesTextarea = document.getElementById("characterArcNotes");

  if (currentArcName) {
    currentArcName.textContent = character.characterArc.arcName || "None";
  }

  if (arcsCompletedCount) {
    arcsCompletedCount.textContent = character.characterArc.arcsCompleted || 0;
  }

  if (notesTextarea) {
    notesTextarea.value = character.characterArc.arcNotes || "";
  }
}

// Initialize character arcs on page load
function initializeCharacterArcs() {
  populateCharacterArcSelect();
  updateCharacterArcDisplay();

  // If there's a current arc, show its description
  if (character.characterArc.currentArc !== null) {
    updateArcDescription();
  }
}
console.log("✓ Character Arcs system initialized");
