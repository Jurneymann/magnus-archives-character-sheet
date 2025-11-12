// ==================== Character Identity Confirmation ==================== //

function confirmIdentity() {
  const name = document.getElementById("charName").value;
  const descriptor = document.getElementById("descriptor").value;
  const type = document.getElementById("type").value;
  const focus1 = document.getElementById("focus1").value;

  if (!name || !descriptor || !type || !focus1) {
    alert(
      "Please fill in all required identity fields (marked with *) before confirming."
    );
    return;
  }

  // Build the character statement
  let statement = `${name} is a ${descriptor} ${type} who ${focus1}.`;

  const confirmation = confirm(
    `Confirm your character identity?\n\n` +
      `${statement}\n\n` +
      `Once confirmed, you cannot change these fields.`
  );

  if (!confirmation) return;

  console.log("Identity confirmed - starting lockdown");

  // Store the identity in character object
  character.name = name;
  character.descriptor = descriptor;
  character.type = type;
  character.focus1 = focus1;
  character.focus2 = null;
  character.identityConfirmed = true;

  console.log("Identity stored:", character);

  // Apply Type defaults
  console.log("Applying Type defaults...");
  applyTypeDefaults();

  console.log("Stats after defaults:", character.stats);
  console.log("Pools after defaults:", character.currentPools);

  // Apply Descriptor bonuses
  console.log("Applying Descriptor bonuses...");
  applyDescriptorBonuses();

  console.log("Stats after descriptor bonuses:", character.stats);
  console.log("Pools after descriptor bonuses:", character.currentPools);

  // Update the character statement showcase
  const showcase = document.getElementById("characterStatementShowcase");
  const statementText = document.getElementById("charStatement");

  if (showcase && statementText) {
    const article = /^[aeiou]/i.test(descriptor) ? "an" : "a";

    // Build statement with Avatar suffix if applicable
    let displayStatement = `<strong>${name}</strong> is ${article} <strong>${descriptor} ${type}</strong> who <strong>${focus1}</strong>`;

    // Check character is Avatar
    if (
      character.avatar &&
      character.avatar.isAvatar &&
      character.avatar.entityName
    ) {
      displayStatement += ` and <strong style="color: #ff4444;">Avatar of Fear</strong> in service to <strong style="color: #ff4444;">${character.avatar.entityName}</strong>`;
    }

    statementText.innerHTML = displayStatement + `.`;
    showcase.style.display = "block";

    // Apply Avatar styling using the correct path
    if (
      character.avatar &&
      character.avatar.isAvatar &&
      character.avatar.entityName
    ) {
      console.log("Applying Avatar mode styling to showcase");
      showcase.classList.add("avatar-mode");

      const avatarBadge = document.getElementById("avatarBadge");
      const avatarEntityName = document.getElementById("avatarEntityName");
      if (avatarBadge && avatarEntityName) {
        avatarEntityName.textContent = character.avatar.entityName;
        avatarBadge.style.display = "inline-block";
      }
    } else {
      console.log("Not an Avatar - using default green styling");
      showcase.classList.remove("avatar-mode");

      const avatarBadge = document.getElementById("avatarBadge");
      if (avatarBadge) {
        avatarBadge.style.display = "none";
      }
    }
  }

  // Update the page title
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) {
    pageTitle.textContent = `${name} – Character Sheet`;
    console.log("Page title updated to:", pageTitle.textContent);
  }

  // HIDE the entire identity section
  const identitySection = document.querySelector(".character-identity-section");
  if (identitySection) {
    identitySection.classList.add("confirmed");
    console.log("Identity section hidden");
  }

  // Grant initial Type ability selections
  console.log("Granting Type ability selections...");
  if (!character.typeAbilitySelections) {
    character.typeAbilitySelections = {
      available: 0,
      used: 0,
      confirmed: false,
    };
  }
  character.typeAbilitySelections.available = 2;
  character.typeAbilitySelections.used = 0;
  character.typeAbilitySelections.confirmed = false;

  // Initialize selected abilities arrays
  if (!character.selectedTypeAbilities) {
    character.selectedTypeAbilities = [];
  }
  if (!character.selectedFocusAbilities) {
    character.selectedFocusAbilities = [];
  }

  console.log("Rendering ability tables...");

  // Render ability tables with a slight delay to ensure DOM is ready
  setTimeout(() => {
    renderTypeAbilitiesTable();
    renderFocusAbilitiesTable();
    console.log("Ability tables rendered");
  }, 100);

  // Initialize cypher table with correct slots
  initializeCypherTable();
  renderCypherTable();
  console.log("Cypher table rendered");

  // Show descriptor suggestions in Skills tab
  setTimeout(() => {
    showDescriptorSuggestions();
  }, 200);

  // SHOW THE STAT ALLOCATION UI
  console.log("Showing stat allocation UI...");

  // Show allocation UI
  setTimeout(() => {
    const statAllocationUI = document.getElementById("statAllocation");

    if (statAllocationUI) {
      console.log("Found stat allocation UI, displaying it");
      statAllocationUI.style.display = "block";

      // Reset the allocation state
      statBonuses = { Might: 0, Speed: 0, Intellect: 0 };
      pointsToAllocate = 6;
      statsConfirmed = false;

      // Update UI
      const mightBonus = document.getElementById("mightBonus");
      const speedBonus = document.getElementById("speedBonus");
      const intellectBonus = document.getElementById("intellectBonus");
      const pointsRemaining = document.getElementById("pointsRemaining");
      const confirmStatsBtn = document.getElementById("confirmStats");

      if (mightBonus) mightBonus.textContent = 0;
      if (speedBonus) speedBonus.textContent = 0;
      if (intellectBonus) intellectBonus.textContent = 0;
      if (pointsRemaining) pointsRemaining.textContent = 6;
      if (confirmStatsBtn) confirmStatsBtn.disabled = true;

      console.log("Stat allocation UI configured");

      // Scroll to the stat allocation section
      statAllocationUI.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Could not find stat allocation UI element!");
    }
  }, 300);

  // Initialize recovery formulas
  updateRecoveryFormulas();

  // Initialize calculators
  initializeAttackCalculator();

  // Clear any previously applied pool increases
  character.appliedFocusPoolIncreases = [];

  setTimeout(() => {
    checkAllFocusAbilitiesForPoolIncreases();
  }, 2000);

  // Show alert with instructions
  alert(
    "Character identity confirmed!\n\n" +
      "Your base stats have been set based on your Type.\n\n" +
      "Next steps:\n" +
      "1. Allocate your 6 bonus points to stat pools (in Stats tab)\n" +
      "2. Select 2 Type abilities (in Skills & Abilities tab)\n" +
      "3. Your Focus abilities are automatically granted\n\n" +
      "Your character identity is now locked and displayed."
  );
}

function updateBackgroundCharCount(textarea) {
  const charCount = textarea.value.length;
  const maxLength = textarea.maxLength;
  const counter = document.getElementById("backgroundCharCount");

  if (counter) {
    counter.textContent = `${charCount} / ${maxLength}`;

    // Change color based on usage
    if (charCount > maxLength * 0.9) {
      counter.style.background = "rgba(255, 152, 0, 0.9)"; // Orange when near limit
    } else if (charCount > maxLength * 0.75) {
      counter.style.background = "rgba(255, 193, 7, 0.9)"; // Yellow
    } else {
      counter.style.background = "rgba(49, 126, 48, 0.9)"; // Green
    }
  }
}

function updateCharacterBackground(value) {
  character.background = value;
  console.log("Character background updated:", value.substring(0, 50) + "...");
}

function updateCharacterConnections(value) {
  character.connections = value;
  console.log("Character connections updated");
}

function applyTypeDefaults() {
  const type = character.type || document.getElementById("type").value;

  console.log("Applying defaults for type:", type);

  const defaults = {
    Investigator: {
      Might: 10,
      Speed: 9,
      Intellect: 9,
      MightEdge: 0,
      SpeedEdge: 1,
      IntellectEdge: 1,
      Effort: 1,
      Cyphers: 2,
      HeavyWeapons: "Inability",
    },
    Protector: {
      Might: 10,
      Speed: 10,
      Intellect: 8,
      MightEdge: 1,
      SpeedEdge: 1,
      IntellectEdge: 0,
      Effort: 1,
      Cyphers: 2,
      HeavyWeapons: "Ability",
    },
    Elocutionist: {
      Might: 8,
      Speed: 9,
      Intellect: 11,
      MightEdge: 0,
      SpeedEdge: 0,
      IntellectEdge: 1,
      Effort: 1,
      Cyphers: 2,
      HeavyWeapons: "Inability",
    },
    Occultist: {
      Might: 7,
      Speed: 9,
      Intellect: 12,
      MightEdge: 0,
      SpeedEdge: 0,
      IntellectEdge: 1,
      Effort: 1,
      Cyphers: 3,
      HeavyWeapons: "Inability",
    },
  };

  if (!defaults[type]) {
    console.error(`No defaults found for type: ${type}`);
    alert(
      `Error: Type "${type}" not recognized. Please reload the page and try again.`
    );
    return;
  }

  const typeDefaults = defaults[type];

  console.log("Type defaults:", typeDefaults);

  // Set stat pools
  character.stats = {
    Might: typeDefaults.Might,
    Speed: typeDefaults.Speed,
    Intellect: typeDefaults.Intellect,
  };

  character.currentPools = { ...character.stats };

  // Set Edge values
  character.edge = {
    Might: typeDefaults.MightEdge,
    Speed: typeDefaults.SpeedEdge,
    Intellect: typeDefaults.IntellectEdge,
  };

  // Set Effort
  character.effort = typeDefaults.Effort;

  // Set Cypher slots - use the new function to calculate based on tier
  character.cypherSlots = getCypherSlotsForTier(character.tier || 1, type);

  console.log("Updating displays...");

  // Update all displays
  const mightMax = document.getElementById("mightMax");
  const speedMax = document.getElementById("speedMax");
  const intellectMax = document.getElementById("intellectMax");
  const mightPool = document.getElementById("mightPool");
  const speedPool = document.getElementById("speedPool");
  const intellectPool = document.getElementById("intellectPool");
  const mightEdge = document.getElementById("mightEdge");
  const speedEdge = document.getElementById("speedEdge");
  const intellectEdge = document.getElementById("intellectEdge");
  const effortLevel = document.getElementById("effortLevel");
  const cypherSlotsDisplay = document.getElementById("cypherSlotsDisplay");

  if (mightMax) mightMax.textContent = typeDefaults.Might;
  if (speedMax) speedMax.textContent = typeDefaults.Speed;
  if (intellectMax) intellectMax.textContent = typeDefaults.Intellect;
  if (mightPool) mightPool.textContent = typeDefaults.Might;
  if (speedPool) speedPool.textContent = typeDefaults.Speed;
  if (intellectPool) intellectPool.textContent = typeDefaults.Intellect;
  if (mightEdge) mightEdge.textContent = typeDefaults.MightEdge;
  if (speedEdge) speedEdge.textContent = typeDefaults.SpeedEdge;
  if (intellectEdge) intellectEdge.textContent = typeDefaults.IntellectEdge;
  if (effortLevel) effortLevel.textContent = typeDefaults.Effort;
  if (cypherSlotsDisplay) cypherSlotsDisplay.textContent = typeDefaults.Cyphers;

  // Initialize empty equipment
  character.equipment = { basic: "", org: "", additional: "" };

  // Initialize empty cypher array
  assignedCyphers = [];

  // Render cypher table
  renderCypherTable();

  // Update UI
  updateCharacterSheetUI();

  console.log("Type defaults applied successfully");
  console.log("Final character stats:", character.stats);
  console.log("Final character edge:", character.edge);
}

function getCypherSlotsForTier(tier, type) {
  // Cypher slots table
  const cypherSlotsByTier = {
    Occultist: {
      1: 3,
      2: 3,
      3: 4,
      4: 4,
      5: 5,
      6: 5,
    },
    Investigator: {
      1: 2,
      2: 2,
      3: 3,
      4: 3,
      5: 4,
      6: 4,
    },
    Protector: {
      1: 2,
      2: 2,
      3: 3,
      4: 3,
      5: 4,
      6: 4,
    },
    Elocutionist: {
      1: 2,
      2: 2,
      3: 3,
      4: 3,
      5: 4,
      6: 4,
    },
  };

  const slots = cypherSlotsByTier[type]?.[tier];

  if (slots === undefined) {
    console.warn(
      `No cypher slots defined for ${type} at Tier ${tier}, using default of 2`
    );
    return 2;
  }

  console.log(`✓ ${type} at Tier ${tier} has ${slots} cypher slots`);
  return slots;
}

function applyDescriptorBonuses() {
  const descriptor =
    character.descriptor || document.getElementById("descriptor")?.value;

  console.log("Applying bonuses for descriptor:", descriptor);

  if (!descriptor) {
    console.error("No descriptor selected");
    return;
  }

  const descriptorData = DESCRIPTORS_DATA.find(
    (d) => d.Descriptor === descriptor
  );

  if (!descriptorData) {
    console.error(`No data found for descriptor: ${descriptor}`);
    return;
  }

  console.log("Descriptor data:", descriptorData);

  // APPLY STAT BONUSES
  const statBonus = descriptorData.Stat;
  const increase = descriptorData.Increase;

  if (statBonus && increase > 0) {
    // Handle array of stats (e.g., ["Might", "Intellect"])
    if (Array.isArray(statBonus)) {
      console.log("Array stat bonus detected:", statBonus);
      showDescriptorBonusAllocation(statBonus, increase);
    }
    // Handle string with "/" separator (e.g., "Might/Intellect")
    else if (typeof statBonus === "string" && statBonus.includes("/")) {
      const stats = statBonus.split("/").map((s) => s.trim());
      console.log("Split stat bonus detected:", stats);
      showDescriptorBonusAllocation(stats, increase);
    }
    // Handle single stat string
    else if (typeof statBonus === "string" && statBonus.trim() !== "") {
      console.log(`Applying ${increase} to ${statBonus}`);
      character.stats[statBonus] += increase;
      character.currentPools[statBonus] += increase;

      const maxElement = document.getElementById(
        `${statBonus.toLowerCase()}Max`
      );
      const poolElement = document.getElementById(
        `${statBonus.toLowerCase()}Pool`
      );

      if (maxElement) maxElement.textContent = character.stats[statBonus];
      if (poolElement)
        poolElement.textContent = character.currentPools[statBonus];

      console.log(`${statBonus} increased by ${increase}`);
    } else {
      console.log("Empty or invalid stat bonus, skipping");
    }
  }

  // APPLY TRAINED SKILLS
  const trainedSkill = descriptorData.TrainedSkill;
  const trainedSkillStat = descriptorData.TrainedSkillStat;
  const trainedSkillCount = descriptorData.TrainedSkillCount || 1;

  if (trainedSkill && trainedSkillStat) {
    console.log(
      "Applying trained skills:",
      trainedSkill,
      "count:",
      trainedSkillCount
    );
    applyDescriptorTrainedSkill(
      trainedSkill,
      trainedSkillStat,
      trainedSkillCount
    );
  } else {
    console.log("No trained skills for this descriptor");
  }
}

function showDescriptorSuggestions() {
  const descriptor =
    character.descriptor || document.getElementById("descriptor")?.value;

  if (!descriptor) {
    console.error("No descriptor selected");
    return;
  }

  const descriptorData = DESCRIPTORS_DATA.find(
    (d) => d.Descriptor === descriptor
  );

  if (!descriptorData) {
    console.error(`No data found for descriptor: ${descriptor}`);
    return;
  }

  console.log("Showing descriptor suggestions for:", descriptor);

  if (document.getElementById("descriptorSuggestions")) {
    document.getElementById("descriptorSuggestions").remove();
  }

  const skillsTab = document.querySelector("#skills");

  if (!skillsTab) {
    console.error("Skills tab not found");
    return;
  }

  const suggestionsBox = document.createElement("div");
  suggestionsBox.id = "descriptorSuggestions";
  suggestionsBox.className = "descriptor-suggestions";
  suggestionsBox.style.cssText = `
    background: #2a2a2a;
    border: 2px solid #317e30;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  `;

  let suggestionsHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
      <h3 style="color: #317e30; margin: 0;">Descriptor Suggestions (${descriptor})</h3>
      <button 
        onclick="dismissDescriptorSuggestions()" 
        style="
          background: #d32f2f; 
          color: white; 
          border: none; 
          padding: 5px 15px; 
          border-radius: 4px; 
          cursor: pointer;
          font-size: 0.9em;
        "
      >
        Dismiss
      </button>
    </div>
    <p style="color: #ddd; margin-bottom: 15px; font-style: italic;">
      You may take an additional Skill for your character Type.<br>
      These are suggestions from your descriptor - taking one requires you to also take an Inability.
    </p>
  `;

  // Handle suggested second skills
  if (descriptorData.SuggestedSecondSkill) {
    const suggestions = Array.isArray(descriptorData.SuggestedSecondSkill)
      ? descriptorData.SuggestedSecondSkill
      : [descriptorData.SuggestedSecondSkill];

    // Separate characteristics from skills
    const skillSuggestions = [];
    const characteristicSuggestions = [];

    suggestions.forEach((suggestion) => {
      if (suggestion.startsWith("Optional:")) {
        characteristicSuggestions.push(suggestion);
      } else {
        skillSuggestions.push(suggestion);
      }
    });

    // Display skill suggestions
    if (skillSuggestions.length > 0) {
      suggestionsHTML += `
        <div style="margin-bottom: 15px;">
          <h4 style="color: #4CAF50; margin-bottom: 10px;">📚 Suggested Additional Skills:</h4>
          <ul style="color: #ddd; margin-left: 20px; margin-bottom: 5px;">
            ${skillSuggestions.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
          <p style="color: #888; font-size: 0.9em; margin-left: 20px; margin-top: 5px;">
            Add one of these using the "Add Skill" button below. <strong style="color: #ff6b6b;">You must also select an Inability.</strong>
          </p>
        </div>
      `;
    }

    // Display characteristic suggestions
    if (characteristicSuggestions.length > 0) {
      characteristicSuggestions.forEach((characteristic) => {
        const characteristicName = characteristic
          .replace("Optional:", "")
          .trim();
        const characteristicDesc = descriptorData.Characteristic || "";

        suggestionsHTML += `
          <div style="margin-bottom: 15px; background: #1a1a1a; padding: 15px; border-radius: 6px; border: 1px solid #444;">
            <h4 style="color: #9c27b0; margin-top: 0; margin-bottom: 10px;">✨ Optional Characteristic: ${characteristicName}</h4>
            <p style="color: #ddd; margin-bottom: 10px; font-size: 0.95em;">${characteristicDesc}</p>
            <button 
              onclick="addDescriptorCharacteristic('${characteristicName}', \`${characteristicDesc}\`)"
              style="
                background: #9c27b0;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
              "
            >
              Add This Characteristic
            </button>
          </div>
        `;
      });
    }
  }

  // Add suggested inability
  if (descriptorData.SuggestedInability) {
    const inabilities = Array.isArray(descriptorData.SuggestedInability)
      ? descriptorData.SuggestedInability
      : [descriptorData.SuggestedInability];

    suggestionsHTML += `
      <div>
        <h4 style="color: #ff6b6b; margin-bottom: 10px;">⚠️ Suggested ${
          inabilities.length > 1 ? "Inabilities" : "Inability"
        }:</h4>
        <ul style="color: #ddd; margin-left: 20px; margin-bottom: 5px;">
          ${inabilities.map((inability) => `<li>${inability}</li>`).join("")}
        </ul>
        <p style="color: #888; font-size: 0.9em; margin-left: 20px; margin-top: 5px;">
          ${
            inabilities.length > 1 ? "Choose one of these" : "Add this"
          } as an "Inability" in your skills if you take an additional skill.
        </p>
      </div>
    `;
  }

  suggestionsBox.innerHTML = suggestionsHTML;

  // Insert at the top of the Skills tab
  const firstSection = skillsTab.querySelector(".section");
  if (firstSection) {
    skillsTab.insertBefore(suggestionsBox, firstSection);
  } else {
    skillsTab.insertBefore(suggestionsBox, skillsTab.firstChild);
  }

  console.log("Descriptor suggestions displayed");
}

// Add function to handle adding characteristics:
function addDescriptorCharacteristic(name, description) {
  // Check if characteristics section exists
  let characteristicsSection = document.getElementById(
    "descriptorCharacteristics"
  );

  if (!characteristicsSection) {
    // Create characteristics section below skills table
    const skillsSection = document.querySelector("#skills .section");

    characteristicsSection = document.createElement("div");
    characteristicsSection.id = "descriptorCharacteristics";
    characteristicsSection.style.cssText = `
      background: #2a2a2a;
      border: 2px solid #9c27b0;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
    `;

    characteristicsSection.innerHTML = `
      <h3 style="color: #9c27b0; margin-top: 0; margin-bottom: 15px;">Descriptor Characteristics</h3>
      <div id="characteristicsList"></div>
    `;

    if (skillsSection) {
      skillsSection.appendChild(characteristicsSection);
    }
  }

  // Add characteristic to list
  const characteristicsList = document.getElementById("characteristicsList");

  // Check if already added
  if (characteristicsList.querySelector(`[data-characteristic="${name}"]`)) {
    alert("This characteristic has already been added!");
    return;
  }

  const characteristicItem = document.createElement("div");
  characteristicItem.setAttribute("data-characteristic", name);
  characteristicItem.style.cssText = `
    background: #1a1a1a;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #444;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: start;
  `;

  characteristicItem.innerHTML = `
    <div style="flex: 1;">
      <h4 style="color: #9c27b0; margin: 0 0 8px 0;">${name}</h4>
      <p style="color: #ddd; margin: 0; font-size: 0.95em;">${description}</p>
    </div>
    <button 
      onclick="removeDescriptorCharacteristic('${name}')"
      style="
        background: #d32f2f;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85em;
        margin-left: 15px;
      "
    >
      Remove
    </button>
  `;

  characteristicsList.appendChild(characteristicItem);

  // Store in character data
  if (!character.descriptorCharacteristics) {
    character.descriptorCharacteristics = [];
  }

  character.descriptorCharacteristics.push({ name, description });

  alert(`Characteristic "${name}" added to your character!`);
}

// Add function to remove characteristics:
function removeDescriptorCharacteristic(name) {
  const confirmation = confirm(`Remove the "${name}" characteristic?`);

  if (!confirmation) return;

  // Remove from display
  const item = document.querySelector(`[data-characteristic="${name}"]`);
  if (item) {
    item.remove();
  }

  // Remove from character data
  if (character.descriptorCharacteristics) {
    character.descriptorCharacteristics =
      character.descriptorCharacteristics.filter((c) => c.name !== name);
  }

  // Remove section if empty
  const characteristicsList = document.getElementById("characteristicsList");
  if (characteristicsList && characteristicsList.children.length === 0) {
    const section = document.getElementById("descriptorCharacteristics");
    if (section) {
      section.remove();
    }
  }

  alert(`Characteristic "${name}" removed.`);
}

function dismissDescriptorSuggestions() {
  const suggestionsBox = document.getElementById("descriptorSuggestions");

  if (suggestionsBox) {
    // Add a fade-out animation
    suggestionsBox.style.transition = "opacity 0.3s";
    suggestionsBox.style.opacity = "0";

    setTimeout(() => {
      suggestionsBox.remove();
    }, 300);
  }

  // Mark as dismissed in character data
  if (!character.descriptorSuggestions) {
    character.descriptorSuggestions = {};
  }
  character.descriptorSuggestions.dismissed = true;

  console.log("Descriptor suggestions dismissed");
}

// Add function to automatically hide suggestions after stat allocation
function autoHideDescriptorSuggestions() {
  // Only auto-hide if not manually dismissed and if stat allocation is confirmed
  if (character.descriptorSuggestions?.dismissed) {
    return; // User manually dismissed, don't auto-hide
  }

  // Only auto-hide if Tier 2 or higher
  if (statsConfirmed && character.tier >= 2) {
    const suggestionsBox = document.getElementById("descriptorSuggestions");

    if (suggestionsBox) {
      // Add a gentle fade-out
      suggestionsBox.style.transition = "opacity 0.5s";
      suggestionsBox.style.opacity = "0";

      setTimeout(() => {
        suggestionsBox.remove();
      }, 500);
    }

    // Mark as auto-hidden
    if (!character.descriptorSuggestions) {
      character.descriptorSuggestions = {};
    }
    character.descriptorSuggestions.autoHidden = true;

    console.log(
      `Descriptor suggestions auto-hidden after stat allocation (Tier ${character.tier})`
    );
  } else if (statsConfirmed && character.tier < 2) {
    console.log(
      `Tier ${character.tier}: Descriptor suggestions remain visible (requires manual dismissal)`
    );
  }
}

function showDescriptorBonusAllocation(stats, totalPoints) {
  // Check if allocation UI already exists
  if (document.getElementById("descriptorBonusAllocation")) {
    document.getElementById("descriptorBonusAllocation").remove();
  }

  // Find the identity tab content
  const identityTab = document.querySelector("#character");

  const allocationUI = document.createElement("div");
  allocationUI.id = "descriptorBonusAllocation";
  allocationUI.className = "allocation-ui";
  allocationUI.style.cssText = `
    background: #2a2a2a;
    border: 2px solid #317e30;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    order: 2;
  `;

  allocationUI.innerHTML = `
    <h3 style="color: #317e30; margin-top: 0;">Allocate Descriptor Bonus: ${totalPoints} Points</h3>
    <p style="color: #ddd;">Your descriptor grants ${totalPoints} bonus points to distribute between ${stats.join(
    " or "
  )}.</p>
    <p style="color: #ddd;">Points Remaining: <strong style="color: #317e30;"><span id="descriptorPointsRemaining">${totalPoints}</span></strong></p>
    
    <div class="stat-allocation-controls" style="display: flex; flex-direction: column; gap: 15px;">
      ${stats
        .map(
          (stat) => `
        <div class="allocation-row" style="display: flex; align-items: center; justify-content: space-between;">
          <label style="color: #ddd; min-width: 100px;">${stat}:</label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button onclick="allocateDescriptorPoint('${stat}', -1)" style="width: 30px; height: 30px; background: #d32f2f; color: white; border: none; border-radius: 4px; cursor: pointer;">-</button>
            <span id="descriptor${stat}Allocation" style="color: #317e30; min-width: 30px; text-align: center; font-weight: bold;">0</span>
            <button onclick="allocateDescriptorPoint('${stat}', 1)" style="width: 30px; height: 30px; background: #317e30; color: white; border: none; border-radius: 4px; cursor: pointer;">+</button>
          </div>
          <span style="color: #888;">
            Current: ${character.stats[stat] || 0}
          </span>
        </div>
      `
        )
        .join("")}
    </div>
    
    <div style="display: flex; gap: 10px; margin-top: 20px;">
      <button class="confirm-button" onclick="confirmDescriptorAllocation()" style="flex: 1; background: #317e30; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: bold;">Confirm Allocation</button>
    </div>
  `;

  // Initialize allocation tracking
  character.tempDescriptorAllocation = {};
  stats.forEach((stat) => {
    character.tempDescriptorAllocation[stat] = 0;
  });
  character.tempDescriptorAllocation.remaining = totalPoints;
  character.tempDescriptorAllocation.stats = stats;

  // Insert after the stat allocation UI (or at the beginning if stat allocation is done)
  const statAllocationUI = document.getElementById("statAllocation");
  if (statAllocationUI && statAllocationUI.style.display !== "none") {
    // Insert after stat allocation
    statAllocationUI.insertAdjacentElement("afterend", allocationUI);
  } else {
    // Insert at the beginning of the tab
    const firstSection = identityTab.querySelector(".section");
    if (firstSection) {
      identityTab.insertBefore(allocationUI, firstSection);
    } else {
      identityTab.insertBefore(allocationUI, identityTab.firstChild);
    }
  }

  console.log("Descriptor bonus allocation UI shown");
}

function allocateDescriptorPoint(stat, amount) {
  const newValue = character.tempDescriptorAllocation[stat] + amount;
  const newRemaining = character.tempDescriptorAllocation.remaining - amount;

  if (newValue >= 0 && newRemaining >= 0) {
    character.tempDescriptorAllocation[stat] = newValue;
    character.tempDescriptorAllocation.remaining = newRemaining;

    document.getElementById(`descriptor${stat}Allocation`).textContent =
      newValue;
    document.getElementById("descriptorPointsRemaining").textContent =
      newRemaining;
  }
}

function confirmDescriptorAllocation() {
  if (character.tempDescriptorAllocation.remaining > 0) {
    alert(
      `You still have ${character.tempDescriptorAllocation.remaining} points to allocate!`
    );
    return;
  }

  // Apply the allocation
  const stats = character.tempDescriptorAllocation.stats;
  stats.forEach((stat) => {
    const bonus = character.tempDescriptorAllocation[stat];
    if (bonus > 0) {
      character.stats[stat] += bonus;
      character.currentPools[stat] += bonus;

      const maxElement = document.getElementById(`${stat.toLowerCase()}Max`);
      const poolElement = document.getElementById(`${stat.toLowerCase()}Pool`);

      if (maxElement) maxElement.textContent = character.stats[stat];
      if (poolElement) poolElement.textContent = character.currentPools[stat];

      console.log(`${stat} increased by ${bonus} from descriptor`);
    }
  });

  // Remove UI
  const allocationUI = document.getElementById("descriptorBonusAllocation");
  if (allocationUI) {
    allocationUI.remove();
  }
  character.tempDescriptorAllocation = null;

  alert("Descriptor bonuses applied successfully!");
}

// Add function to apply trained skill
function applyDescriptorTrainedSkill(
  trainedSkill,
  trainedSkillStat,
  trainedSkillCount
) {
  // Normalize to arrays for consistent handling
  let skills = Array.isArray(trainedSkill)
    ? trainedSkill
    : trainedSkill
    ? [trainedSkill]
    : [];
  let stats = Array.isArray(trainedSkillStat)
    ? trainedSkillStat
    : trainedSkillStat
    ? [trainedSkillStat]
    : [];

  // Filter out empty values
  skills = skills.filter((s) => s && s.trim() !== "");
  stats = stats.filter((s) => s && s.trim() !== "");

  if (skills.length === 0 || stats.length === 0) {
    console.log("No trained skills to apply");
    return;
  }

  const count = trainedSkillCount || 1;

  // If count matches number of skills and no "/" options, apply all automatically
  if (
    count === skills.length &&
    !skills.some((s) => s.includes("/")) &&
    !stats.some((s) => s.includes("/"))
  ) {
    skills.forEach((skill, index) => {
      addDescriptorSkillToTable(
        skill,
        stats[Math.min(index, stats.length - 1)]
      );
    });
    return;
  }

  // If count is less than skills available, or has "/" options, show choice UI
  if (
    count < skills.length ||
    skills.some((s) => s.includes("/")) ||
    stats.some((s) => s.includes("/"))
  ) {
    showDescriptorSkillChoice(skills, stats, count);
  } else {
    // Auto-apply all
    skills.forEach((skill, index) => {
      addDescriptorSkillToTable(
        skill,
        stats[Math.min(index, stats.length - 1)]
      );
    });
  }
}

// Show UI for choosing skill/stat options
function showDescriptorSkillChoice(
  trainedSkills,
  trainedSkillStats,
  selectionCount
) {
  if (document.getElementById("descriptorSkillChoice")) {
    document.getElementById("descriptorSkillChoice").remove();
  }

  const identityTab = document.querySelector("#character");

  // Normalize to arrays
  const skillsArray = Array.isArray(trainedSkills)
    ? trainedSkills
    : [trainedSkills];
  const statsArray = Array.isArray(trainedSkillStats)
    ? trainedSkillStats
    : [trainedSkillStats];

  const choiceUI = document.createElement("div");
  choiceUI.id = "descriptorSkillChoice";
  choiceUI.className = "allocation-ui";
  choiceUI.style.cssText = `
    background: #2a2a2a;
    border: 2px solid #317e30;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    order: 3;
  `;

  choiceUI.innerHTML = `
    <h3 style="color: #317e30; margin-top: 0;">Choose Your Trained ${
      selectionCount > 1 ? "Skills" : "Skill"
    }</h3>
    <p style="color: #ddd;">Your descriptor grants you training in ${selectionCount} ${
    selectionCount > 1 ? "skills" : "skill"
  }. ${
    selectionCount < skillsArray.length
      ? `Select ${selectionCount} from the options below.`
      : "Choose your options below."
  }</p>
    <p style="color: #ddd;">Selections Remaining: <strong style="color: #317e30;"><span id="skillSelectionsRemaining">${selectionCount}</span></strong></p>
    
    <div style="margin-top: 20px;">
      <table class="skills-table" style="width: 100%;">
        <thead>
          <tr>
            <th style="width: 60px; text-align: center;">Select</th>
            <th>Skill</th>
            <th style="width: 120px;">Stat</th>
          </tr>
        </thead>
        <tbody id="descriptorSkillOptionsBody">
          ${skillsArray
            .map((skill, index) => {
              const skillOptions = skill.includes("/")
                ? skill.split("/").map((s) => s.trim())
                : [skill];
              const statOptions =
                statsArray[Math.min(index, statsArray.length - 1)];
              const statList = statOptions.includes("/")
                ? statOptions.split("/").map((s) => s.trim())
                : [statOptions];

              return skillOptions
                .map(
                  (skillOption) => `
              <tr>
                <td style="text-align: center;">
                  <input 
                    type="checkbox" 
                    class="descriptor-skill-checkbox" 
                    data-skill="${skillOption}" 
                    data-stat="${statList.join("/")}"
                    onchange="updateSkillSelectionCount()"
                  />
                </td>
                <td>${skillOption}</td>
                <td>
                  ${
                    statList.length > 1
                      ? `
                    <select class="descriptor-stat-select" data-skill="${skillOption}" style="width: 100%; background: #1a1a1a; border: 1px solid #317e30; color: #fff; padding: 5px; border-radius: 4px;">
                      ${statList
                        .map(
                          (stat) => `<option value="${stat}">${stat}</option>`
                        )
                        .join("")}
                    </select>
                  `
                      : statList[0]
                  }
                </td>
              </tr>
            `
                )
                .join("");
            })
            .join("")}
        </tbody>
      </table>
    </div>
    
    <div style="margin-top: 20px;">
      <button class="confirm-button" id="confirmDescriptorSkillsBtn" onclick="confirmDescriptorSkillChoice(${selectionCount})" style="width: 100%; background: #317e30; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: bold;" disabled>Confirm Skill Selection</button>
    </div>
  `;

  // Insert into DOM
  const descriptorBonusUI = document.getElementById(
    "descriptorBonusAllocation"
  );
  const statAllocationUI = document.getElementById("statAllocation");

  if (descriptorBonusUI && descriptorBonusUI.style.display !== "none") {
    descriptorBonusUI.insertAdjacentElement("afterend", choiceUI);
  } else if (statAllocationUI && statAllocationUI.style.display !== "none") {
    statAllocationUI.insertAdjacentElement("afterend", choiceUI);
  } else {
    const firstSection = identityTab.querySelector(".section");
    if (firstSection) {
      identityTab.insertBefore(choiceUI, firstSection);
    } else {
      identityTab.insertBefore(choiceUI, identityTab.firstChild);
    }
  }

  console.log(
    "Descriptor skill choice UI shown for",
    selectionCount,
    "selections"
  );
}

// Update selection count:
function updateSkillSelectionCount() {
  const checkboxes = document.querySelectorAll(
    ".descriptor-skill-checkbox:checked"
  );
  const remaining = document.getElementById("skillSelectionsRemaining");
  const confirmBtn = document.getElementById("confirmDescriptorSkillsBtn");

  if (!remaining || !confirmBtn) return;

  const maxSelections =
    parseInt(remaining.getAttribute("data-max")) ||
    parseInt(remaining.textContent);
  const selected = checkboxes.length;
  const remainingCount = maxSelections - selected;

  remaining.textContent = remainingCount;

  // Enable confirm button only if correct number selected
  confirmBtn.disabled = selected !== maxSelections;

  // Store max for later use
  if (!remaining.hasAttribute("data-max")) {
    remaining.setAttribute("data-max", maxSelections);
  }
}

// Confirm skill choice and add to table
function confirmDescriptorSkillChoice(expectedCount) {
  const checkboxes = document.querySelectorAll(
    ".descriptor-skill-checkbox:checked"
  );

  if (checkboxes.length !== expectedCount) {
    alert(
      `Please select exactly ${expectedCount} skill${
        expectedCount > 1 ? "s" : ""
      }`
    );
    return;
  }

  const selectedSkills = [];

  checkboxes.forEach((checkbox) => {
    const skill = checkbox.dataset.skill;
    const statData = checkbox.dataset.stat;

    // Check if there's a corresponding stat select
    const statSelect = document.querySelector(
      `.descriptor-stat-select[data-skill="${skill}"]`
    );
    const stat = statSelect ? statSelect.value : statData;

    selectedSkills.push({ skill, stat });
  });

  // Add all selected skills to table
  selectedSkills.forEach(({ skill, stat }) => {
    addDescriptorSkillToTable(skill, stat);
  });

  // Remove UI
  const choiceUI = document.getElementById("descriptorSkillChoice");
  if (choiceUI) {
    choiceUI.remove();
  }

  alert(
    `Training confirmed!\n\n` +
      selectedSkills.map((s) => `${s.skill} (${s.stat})`).join("\n") +
      `\n\nThese skills have been added to your character.`
  );
}

// Add skill to the skills table
function addDescriptorSkillToTable(skill, stat) {
  // Create new skill entry
  const newSkill = {
    id: Date.now(),
    skill: skill,
    stat: stat,
    ability: "Trained",
  };

  // Add to skills data
  skillsData.push(newSkill);

  // Store in character
  if (!character.descriptorSkills) {
    character.descriptorSkills = [];
  }
  character.descriptorSkills.push(newSkill);

  // Re-render the skills table
  renderSkillsTable();

  console.log("Descriptor skill added:", newSkill);
}

function updateCharacterSheetUI() {
  updateCharacterStatement();
  updateDamageUI();
  updateRecoveryFormulas();
  updateAvatarTabVisibility();
}

function updateStat(stat) {
  document.getElementById(`${stat.toLowerCase()}Max`).textContent =
    character.stats[stat];
  document.getElementById(`${stat.toLowerCase()}Pool`).textContent =
    character.currentPools[stat];
  document.getElementById(`${stat.toLowerCase()}Edge`).textContent =
    character.edge[stat];
}

function diagnoseIdentityFunctions() {
  console.log("=== DIAGNOSTIC: Checking Identity-Related Functions ===");

  const requiredFunctions = {
    confirmIdentity: typeof window.confirmIdentity,
    applyTypeDefaults: typeof window.applyTypeDefaults,
    applyDescriptorBonuses: typeof window.applyDescriptorBonuses,
    updateCharacterStatement: typeof window.updateCharacterStatement,
    validateCharacterOptions: typeof window.validateCharacterOptions,
    renderTypeAbilitiesTable: typeof window.renderTypeAbilitiesTable,
    renderFocusAbilitiesTable: typeof window.renderFocusAbilitiesTable,
    showDescriptorSuggestions: typeof window.showDescriptorSuggestions,
    renderCypherTable: typeof window.renderCypherTable,
    updateRecoveryFormulas: typeof window.updateRecoveryFormulas,
    initializeAttackCalculator: typeof window.initializeAttackCalculator,
    checkAllFocusAbilitiesForPoolIncreases:
      typeof window.checkAllFocusAbilitiesForPoolIncreases,
    updateStatDisplay: typeof window.updateStatDisplay,
    updateEdgeDisplay: typeof window.updateEdgeDisplay,
    updateStressDisplay: typeof window.updateStressDisplay,
    updateDamageDisplay: typeof window.updateDamageDisplay,
    allocatePoint: typeof window.allocatePoint,
    confirmStatAllocation: typeof window.confirmStatAllocation,
  };

  console.table(requiredFunctions);

  const missing = Object.entries(requiredFunctions)
    .filter(([name, type]) => type !== "function")
    .map(([name]) => name);

  if (missing.length > 0) {
    console.error("❌ MISSING FUNCTIONS:", missing);
  } else {
    console.log("✅ All required functions are available");
  }

  return missing;
}

// Run diagnostic on page load
window.diagnoseIdentityFunctions = diagnoseIdentityFunctions;

console.log(
  "✓ Diagnostic function loaded. Run diagnoseIdentityFunctions() in console to check."
);
