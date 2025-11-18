// ==================== AVATAR SYSTEM ==================== //

// ==================== AVATAR PASSWORD CONFIGURATION ==================== //
// Change this password to control access to the Avatar tab
const AVATAR_PASSWORD = "avatar"; // <-- Change this to set your password
// ====================================================================== //

// Initialize avatar data
if (!character.avatar) {
  character.avatar = {
    isAvatar: false,
    hasUnlockedTab: false,
    entity: null,
    entityName: "",
    tetheredPower: null,
    tetheredPowerName: "",
    powerChanges: 0,
  };
}

// Check if player meets Avatar requirements
function checkAvatarRequirements() {
  const hasSupernaturalStress = (character.supernaturalStress || 0) >= 10;
  const hasTier = (character.tier || 1) >= 4;

  // Check for at least one supernatural Type Ability
  const hasSupernaturalAbility =
    character.selectedTypeAbilities &&
    character.selectedTypeAbilities.some((abilityName) => {
      const abilityData = ABILITIES_DATA.find((a) => a.name === abilityName);
      return abilityData && abilityData.supernatural === true;
    });

  console.log("Avatar Requirements Check:");
  console.log(
    "- Supernatural Stress >= 10:",
    hasSupernaturalStress,
    `(Current: ${character.supernaturalStress || 0})`
  );
  console.log("- Tier >= 4:", hasTier, `(Current: ${character.tier || 1})`);
  console.log("- Has Supernatural Ability:", hasSupernaturalAbility);
  console.log("- Type Abilities:", character.typeAbilities);

  return hasSupernaturalStress && hasTier && hasSupernaturalAbility;
}

// Check and show/hide Avatar tab
function updateAvatarTabVisibility() {
  const avatarTabBtn = document.getElementById("avatarTabBtn");

  if (!avatarTabBtn) return;

  const meetsRequirements = checkAvatarRequirements();

  if (meetsRequirements || character.avatar.isAvatar) {
    avatarTabBtn.style.display = "block";
    console.log("Avatar Requirements met. Tab is visible");
  } else {
    avatarTabBtn.style.display = "none";
    console.log("Avatar Requirements NOT met. Tab is hidden");
  }
}

// Initialize Avatar tab content
function initializeAvatarTab() {
  console.log("initializeAvatarTab called");
  console.log("character.avatar:", character.avatar);

  const passwordOverlay = document.getElementById("avatarPasswordOverlay");
  const preCommitment = document.getElementById("avatarPreCommitment");
  const postCommitment = document.getElementById("avatarPostCommitment");

  console.log("passwordOverlay:", passwordOverlay);
  console.log("preCommitment:", preCommitment);
  console.log("postCommitment:", postCommitment);

  if (!passwordOverlay || !preCommitment || !postCommitment) {
    console.error("Avatar tab elements not found!");
    return;
  }

  if (character.avatar.isAvatar) {
    console.log("Showing post-commitment content");
    // Already an Avatar - show post-commitment content
    passwordOverlay.style.display = "none";
    preCommitment.style.display = "none";
    postCommitment.style.display = "block";
    updateAvatarPostCommitmentDisplay();
  } else if (character.avatar.hasUnlockedTab) {
    console.log("Showing entity selection (pre-commitment)");
    // Unlocked but not committed - show entity selection
    passwordOverlay.style.display = "none";
    preCommitment.style.display = "block";
    postCommitment.style.display = "none";
    populateEntitySelect();
  } else {
    console.log("Showing password overlay");
    // First time - show password overlay
    passwordOverlay.style.display = "flex";
    preCommitment.style.display = "none";
    postCommitment.style.display = "none";
  }
}

// Close the password overlay and return to previous tab
function closeAvatarPasswordOverlay() {
  const overlay = document.getElementById("avatarPasswordOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }

  // Switch back to Character tab
  const characterTab = document.querySelector(
    '.tab-button[data-tab="character"]'
  );
  if (characterTab) {
    characterTab.click();
  }

  // Clear the password input
  const passwordInput = document.getElementById("avatarPassword");
  if (passwordInput) {
    passwordInput.value = "";
  }
}

// Unlock Avatar tab with password
function unlockAvatarTab() {
  const passwordInput = document.getElementById("avatarPassword");
  const password = passwordInput.value.trim();

  // Use the configured password from the top of the file
  if (password.toLowerCase() === AVATAR_PASSWORD.toLowerCase()) {
    character.avatar.hasUnlockedTab = true;

    // Clear the input
    passwordInput.value = "";

    // Initialize the tab content
    initializeAvatarTab();

    // Show success message
    alert(
      "Something is reaching for you. Slow, inevitable, and hungry.\n\n" +
        "You know you should recoil, escape, scream, but instead, your skin tingles with a dark thrill, like a dangerous secret waking inside you."
    );
  } else {
    alert("Incorrect password. The path remains closed.");
    passwordInput.value = "";
    passwordInput.focus();
  }
}

// Populate entity dropdown
function populateEntitySelect() {
  const select = document.getElementById("entitySelect");

  if (!select) return;

  select.innerHTML = '<option value="">-- Select an Entity --</option>';

  ENTITIES.forEach((entity, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = entity.name;
    select.appendChild(option);
  });
}

// Update entity description
function updateEntityDescription() {
  const select = document.getElementById("entitySelect");
  const textarea = document.getElementById("entityDescription");

  if (!select || !textarea) return;

  const selectedIndex = select.value;

  if (selectedIndex === "") {
    textarea.value = "";
    return;
  }

  const entity = ENTITIES[parseInt(selectedIndex)];
  textarea.value = entity.description;
}

// Confirm entity choice
function confirmEntityChoice() {
  const select = document.getElementById("entitySelect");
  const selectedIndex = select.value;

  if (selectedIndex === "") {
    alert("Please select an Entity first.");
    return;
  }

  const entity = ENTITIES[parseInt(selectedIndex)];

  const confirmation = confirm(
    `Become an Avatar of ${entity.name}?\n\n` +
      `${entity.description}\n\n` +
      `THIS CHOICE IS PERMANENT AND CANNOT BE UNDONE.\n\n` +
      `Do you wish to proceed?`
  );

  if (!confirmation) return;

  // Final confirmation
  const finalConfirmation = confirm(
    `Are you absolutely certain?\n\n` +
      `This will permanently transform your character into an Avatar of Fear.\n\n` +
      `There is no going back.`
  );

  if (!finalConfirmation) return;

  // Commit to being an Avatar
  character.avatar.isAvatar = true;
  character.avatar.entity = parseInt(selectedIndex);
  character.avatar.entityName = entity.name;

  // Update the character statement showcase IMMEDIATELY
  const showcase = document.getElementById("characterStatementShowcase");
  const statementText = document.getElementById("charStatement");

  if (showcase && statementText) {
    const article = /^[aeiou]/i.test(character.descriptor) ? "an" : "a";

    let statement = `<strong>${character.name}</strong> is ${article} <strong>${character.descriptor} ${character.type}</strong> who <strong>${character.focus1}</strong>`;
    statement += ` and <strong style="color: #ff4444;">Avatar of Fear</strong> in service to <strong style="color: #ff4444;">${entity.name}</strong>`;

    statementText.innerHTML = statement + `.`;

    // Apply Avatar styling
    showcase.classList.add("avatar-mode");

    const avatarBadge = document.getElementById("avatarBadge");
    const avatarEntityName = document.getElementById("avatarEntityName");
    if (avatarBadge && avatarEntityName) {
      avatarEntityName.textContent = entity.name;
      avatarBadge.style.display = "inline-block";
    }
  }

  // Update display
  initializeAvatarTab();

  alert(
    `You have become an Avatar of ${entity.name}.\n\n` +
      `The transformation is complete. You are forever changed.`
  );
}

// Update post-commitment display
// Update the updateAvatarPostCommitmentDisplay function:

function updateAvatarPostCommitmentDisplay() {
  const commitmentText = document.getElementById("avatarCommitmentText");
  const tarotImage = document.getElementById("avatarTarotImage");

  if (!character.avatar.isAvatar) return;

  const entity = ENTITIES[character.avatar.entity];

  // Update Tarot card image
  if (tarotImage) {
    const imageFile = ENTITY_TAROT_IMAGES[entity.name] || "default.jpg";
    tarotImage.src = `assets/Tarot/${imageFile}`;
    tarotImage.alt = `${entity.name} Tarot Card`;

    // Add error handler in case image doesn't exist
    tarotImage.onerror = function () {
      console.warn(`Tarot card image not found: assets/Tarot/${imageFile}`);
      this.src = "assets/Tarot/default.jpg"; // Fallback image
      this.onerror = null; // Prevent infinite loop
    };
  }

  // Update commitment text
  if (commitmentText) {
    commitmentText.textContent =
      `You have crossed a threshold that cannot be uncrossed. ` +
      `${entity.description} ` +
      `You are no longer who you were, and you cannot go back. ` +
      `There's a strength rising in you now. But it didn't come for free.`;
  }

  // Update the character statement on the Character tab
  updateCharacterStatement();

  console.log("About to populate avatar powers table...");
  const container = document.getElementById("avatarPowersTableBody");
  console.log("Container found:", !!container);
  console.log("Container element:", container);

  // Populate powers table
  populateAvatarPowersTable();

  // Update selected power display
  updateSelectedPowerDisplay();
}

// Add a new function to update the character statement with Avatar info:

function updateCharacterStatement() {
  const name = document.getElementById("charName")?.value || "";
  const descriptor = document.getElementById("descriptor")?.value || "";
  const type = document.getElementById("type")?.value || "";
  const focus1 = document.getElementById("focus1")?.value || "";
  const focus2 = document.getElementById("focus2")?.value || "";

  // Update the preview
  const previewText = document.getElementById("characterStatementPreviewText");
  const confirmBtn = document.getElementById("confirmIdentityBtn");

  if (previewText) {
    const article = descriptor && /^[aeiou]/i.test(descriptor) ? "an" : "a";

    let statement = "";

    if (name) {
      statement += `<strong>${name}</strong>`;
    } else {
      statement += `<span class="incomplete">[Name]</span>`;
    }

    statement += " is ";

    if (descriptor && type) {
      statement += `${article} <strong>${descriptor} ${type}</strong>`;
    } else if (descriptor) {
      statement += `${article} <strong>${descriptor}</strong> <span class="incomplete">[Type]</span>`;
    } else if (type) {
      statement += `<span class="incomplete">[Descriptor]</span> <strong>${type}</strong>`;
    } else {
      statement += `<span class="incomplete">[Descriptor] [Type]</span>`;
    }

    statement += " who ";

    if (focus1) {
      statement += `<strong>${focus1}</strong>`;
    } else {
      statement += `<span class="incomplete">[Focus]</span>`;
    }

    if (focus2) {
      statement += ` and <strong>${focus2}</strong>`;
    }

    statement += ".";

    previewText.innerHTML = statement;
  }

  // Enable/disable confirm button based on required fields
  if (confirmBtn) {
    const allFieldsFilled = name && descriptor && type && focus1;
    confirmBtn.disabled = !allFieldsFilled;
  }
}

// Populate Avatar Powers table
function populateAvatarPowersTable() {
  console.log("=== populateAvatarPowersTable START ===");

  const container = document.getElementById("avatarPowersTableBody");
  console.log("Container:", container);

  if (!container) {
    console.error("✗ Container 'avatarPowersTableBody' not found!");
    return;
  }

  console.log("✓ Container found");

  // Clear existing content
  container.innerHTML = "";

  const cardsList = document.createElement("div");
  cardsList.className = "avatar-powers-list";
  console.log("✓ Created cards list");

  const entityName = character.avatar.entityName;
  console.log("Entity name:", entityName);
  console.log("Total powers in AVATAR_POWERS:", AVATAR_POWERS.length);

  let cardsCreated = 0;

  AVATAR_POWERS.forEach((power, index) => {
    const isUniversal = power.fear === null;
    const isEntitySpecific = power.fear === entityName;

    console.log(
      `Power ${index}: ${power.name}, Universal: ${isUniversal}, Entity: ${isEntitySpecific}`
    );

    // Only show Universal or Entity-specific powers
    if (!isUniversal && !isEntitySpecific) {
      console.log(`  Skipping power: ${power.name}`);
      return;
    }

    console.log(`  Creating card for: ${power.name}`);
    cardsCreated++;

    // Create card
    const card = document.createElement("div");
    card.className = "avatar-power-card";

    const isTethered = character.avatar.tetheredPower === index;
    if (isTethered) {
      card.classList.add("selected-power");
    }

    // Determine if power can be used (universal OR tethered)
    const canUsePower = isUniversal || isTethered;

    // Card Header
    const header = document.createElement("div");
    header.className = "avatar-power-header";

    // Select Cell (only for entity-specific powers)
    const selectCell = document.createElement("div");
    selectCell.className = "power-select-cell";

    if (isEntitySpecific) {
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "power-toggle-btn";
      if (isTethered) {
        toggleBtn.classList.add("selected");
      }
      toggleBtn.disabled = isTethered;
      toggleBtn.onclick = () => selectTetheredPower(index);
      selectCell.appendChild(toggleBtn);
    } else {
      const universalBtn = document.createElement("button");
      universalBtn.className = "power-toggle-btn universal";
      universalBtn.disabled = true;
      selectCell.appendChild(universalBtn);
    }

    // Power Name Cell
    const nameCell = document.createElement("div");
    nameCell.className = "power-name-cell";

    const nameSpan = document.createElement("span");
    nameSpan.className = isUniversal
      ? "power-name universal-power-name"
      : "power-name entity-power-name";
    nameSpan.textContent = power.name;

    const typeBadge = document.createElement("span");
    typeBadge.className = `power-type-badge ${
      isUniversal ? "universal" : "entity-specific"
    }`;
    typeBadge.textContent = isUniversal ? "Universal" : "Entity Power";

    nameCell.appendChild(nameSpan);
    nameCell.appendChild(typeBadge);

    // Cost Badge
    const costBadge = document.createElement("div");
    costBadge.className = "power-cost-badge";
    costBadge.innerHTML = `
      <span class="badge-label">Cost</span>
      <span class="badge-value">${power.cost}</span>
    `;

    // Stress Badge
    const stressBadge = document.createElement("div");
    stressBadge.className = "power-stress-badge";
    stressBadge.innerHTML = `
      <span class="badge-label">Stress</span>
      <span class="badge-value">${power.stress}</span>
    `;

    // Use Power Button in Header
    const usePowerBtn = document.createElement("button");
    usePowerBtn.className = "use-power-btn-compact";
    usePowerBtn.textContent = "Use";
    usePowerBtn.disabled = !canUsePower;
    usePowerBtn.onclick = () => useAvatarPower(index);

    if (!canUsePower) {
      usePowerBtn.title = isEntitySpecific
        ? "You must select this as your tethered power to use it"
        : "Power not available";
    }

    // Assemble header
    header.appendChild(selectCell);
    header.appendChild(nameCell);
    header.appendChild(costBadge);
    header.appendChild(stressBadge);
    header.appendChild(usePowerBtn);

    // Card Body - Description
    const body = document.createElement("div");
    body.className = "avatar-power-description";
    const descP = document.createElement("p");
    descP.textContent = power.description;
    body.appendChild(descP);

    // Assemble card
    card.appendChild(header);
    card.appendChild(body);

    cardsList.appendChild(card);
  });

  console.log(`✓ Created ${cardsCreated} power cards`);

  container.appendChild(cardsList);
  console.log("✓ Cards appended to container");
  console.log("=== populateAvatarPowersTable END ===");
}

// Select tethered power
function selectTetheredPower(powerIndex) {
  const power = AVATAR_POWERS[powerIndex];

  // Check if changing
  const isChanging = character.avatar.tetheredPower !== null;

  let cost = 0;
  let confirmMessage = "";

  if (isChanging) {
    cost = 4;
    confirmMessage =
      `Change your tethered power to "${power.name}"?\n\n` +
      `Current Power: ${character.avatar.tetheredPowerName}\n` +
      `Cost: 4 XP\n\n` +
      `Confirm?`;
  } else {
    confirmMessage =
      `Select "${power.name}" as your tethered power?\n\n` +
      `This is your first selection, so it's FREE!\n\n` +
      `You can change it later for 4 XP.\n\n` +
      `Confirm?`;
  }

  const confirmation = confirm(confirmMessage);

  if (!confirmation) return;

  // Deduct XP if changing
  if (cost > 0) {
    if (character.xp < cost) {
      alert("Not enough XP! You need 4 XP to change your power.");
      return;
    }
    character.xp = Math.max(0, character.xp - cost);
    updateXPDisplay();
  }

  // Set new power
  character.avatar.tetheredPower = powerIndex;
  character.avatar.tetheredPowerName = power.name;
  character.avatar.powerChanges++;

  // Update displays - only call ONCE here
  populateAvatarPowersTable();
  updateSelectedPowerDisplay();
  updateTemporaryStatBoosts();

  alert(
    `Power Selected: ${power.name}\n\n` +
      (cost > 0
        ? `4 XP spent. Current XP: ${character.xp}`
        : `First selection is free!`)
  );
}

// Change tethered power (button in UI)
function changeTetheredPower() {
  alert(
    "Select a different Entity-Specific power from the table below.\n\n" +
      "Changing your power costs 4 XP."
  );
}

// Use Avatar Power
function useAvatarPower(powerIndex) {
  const power = AVATAR_POWERS[powerIndex];

  console.log(`=== Using Avatar Power: ${power.name} ===`);
  console.log(`Cost: ${power.cost} Intellect`);
  console.log(`Stress: ${power.stress}`);

  // Ensure currentPools exists
  if (!character.currentPools) {
    console.error("character.currentPools is undefined! Initializing...");
    character.currentPools = {
      Might: character.stats?.Might || 0,
      Speed: character.stats?.Speed || 0,
      Intellect: character.stats?.Intellect || 0,
    };
  }

  const currentIntellect = character.currentPools.Intellect || 0;
  const intellectEdge = character.edge?.Intellect || 0;

  // Calculate actual cost after Edge
  const actualCost = Math.max(0, power.cost - intellectEdge);

  console.log(`Current Intellect: ${currentIntellect}`);
  console.log(`Intellect Edge: ${intellectEdge}`);
  console.log(`Actual Cost (after Edge): ${actualCost}`);

  // Check if player has enough Intellect
  if (currentIntellect < actualCost) {
    alert(
      `Not enough Intellect to use ${power.name}!\n\n` +
        `Required: ${actualCost} Intellect (after Edge)\n` +
        `Current: ${currentIntellect} Intellect\n\n` +
        `You need ${actualCost - currentIntellect} more Intellect points.`
    );
    return;
  }

  // Confirmation
  const confirmation = confirm(
    `Use Avatar Power: ${power.name}?\n\n` +
      `Effect: ${power.description}\n\n` +
      `Cost: ${power.cost} Intellect (${actualCost} after Edge)\n` +
      `Stress Gained: ${power.stress}\n\n` +
      `Current Intellect: ${currentIntellect}\n` +
      `New Intellect: ${currentIntellect - actualCost}\n\n` +
      `Current Stress: ${character.stress || 0}\n` +
      `New Stress: ${(character.stress || 0) + power.stress}\n\n` +
      `Confirm?`
  );

  if (!confirmation) return;

  // Deduct Intellect cost
  character.currentPools.Intellect = currentIntellect - actualCost;

  // Add stress
  const oldStress = character.stress || 0;
  character.stress = oldStress + power.stress;

  // Update displays
  updateStatDisplay();
  updateStressDisplay();

  // Show result
  alert(
    `${power.name} activated!\n\n` +
      `Intellect: ${currentIntellect} → ${character.currentPools.Intellect}\n` +
      `Stress: ${oldStress} → ${character.stress}\n\n` +
      `${power.description}`
  );

  console.log(`✓ Power used successfully`);
  console.log(`New Intellect: ${character.currentPools.Intellect}`);
  console.log(`New Stress: ${character.stress}`);
}

// Update selected power display
function updateSelectedPowerDisplay() {
  const selectedPowerName = document.getElementById("selectedPowerName");
  const changePowerBtn = document.getElementById("changePowerBtn");

  if (selectedPowerName) {
    selectedPowerName.textContent =
      character.avatar.tetheredPowerName || "None";
  }

  if (changePowerBtn) {
    changePowerBtn.disabled = character.avatar.tetheredPower === null;
  }
}
