// ==================== SAVE/LOAD SYSTEM ==================== //

// ==================== CENTRALIZED CHARACTER DATA BUILDER ==================== //

/**
 * Builds complete character data object for saving/loading
 * @param {boolean} isAutoSave - If true, adds autoSavedDate instead of savedDate
 * @returns {Object} Complete character data structure
 */
function buildCharacterData(isAutoSave = false) {
  const characterData = {
    // === IDENTITY ===
    name: character.name || document.getElementById("charName")?.value || "",
    descriptor:
      character.descriptor ||
      document.getElementById("descriptor")?.value ||
      "",
    type: character.type || document.getElementById("type")?.value || "",
    focus1: character.focus1 || document.getElementById("focus1")?.value || "",
    identityConfirmed: character.identityConfirmed || false,

    // === BACKGROUND & CONNECTIONS ===
    background:
      character.background ||
      document.getElementById("characterBackground")?.value ||
      "",
    connections: character.connections || "",
    connectionsData:
      typeof connectionsData !== "undefined" ? connectionsData : [],

    // === CHARACTER ARC ===
    characterArc: {
      activeArcs: character.characterArc?.activeArcs || [],
      currentlyViewingIndex: character.characterArc?.currentlyViewingIndex || 0,
      arcsCompleted: character.characterArc?.arcsCompleted || 0,
      totalArcsSelected: character.characterArc?.totalArcsSelected || 0,
      firstArcFree: character.characterArc?.firstArcFree ?? true,
      // Keep old format for backwards compatibility (will be migrated on load)
      currentArc: character.characterArc?.currentArc ?? null,
      arcName: character.characterArc?.arcName || "",
      arcNotes: character.characterArc?.arcNotes || "",
      arcSelections: character.characterArc?.arcSelections || 0,
    },

    // === TIER & XP ===
    tier: character.tier || 1,
    xp: character.xp || 0,

    // === STATS ===
    stats: {
      Might: character.stats?.Might || 0,
      Speed: character.stats?.Speed || 0,
      Intellect: character.stats?.Intellect || 0,
    },
    currentPools: {
      Might: character.currentPools?.Might || 0,
      Speed: character.currentPools?.Speed || 0,
      Intellect: character.currentPools?.Intellect || 0,
    },
    edge: {
      Might: character.edge?.Might || 0,
      Speed: character.edge?.Speed || 0,
      Intellect: character.edge?.Intellect || 0,
    },

    // === POOL OBJECTS (Legacy support) ===
    mightPool: {
      max: character.stats?.Might || 0,
      current: character.currentPools?.Might || 0,
    },
    speedPool: {
      max: character.stats?.Speed || 0,
      current: character.currentPools?.Speed || 0,
    },
    intellectPool: {
      max: character.stats?.Intellect || 0,
      current: character.currentPools?.Intellect || 0,
    },

    // === EDGE VALUES (Flat properties for compatibility) ===
    mightEdge: character.edge?.Might || 0,
    speedEdge: character.edge?.Speed || 0,
    intellectEdge: character.edge?.Intellect || 0,

    // === TEMPORARY STAT BOOSTS ===
    temporaryStatBoosts: character.temporaryStatBoosts || {},

    // === EFFORT & RECOVERY ===
    effort: character.effort || 1,
    recoveryBonus: character.recoveryBonus || 0,
    recoveryRolls: {
      action: character.recoveryRolls?.action || false,
      tenMinutes: character.recoveryRolls?.tenMinutes || false,
      oneHour: character.recoveryRolls?.oneHour || false,
      tenHours: character.recoveryRolls?.tenHours || false,
    },

    // === ADVANCEMENTS ===
    advancementsPurchasedThisTier: character.advancementsPurchasedThisTier || 0,
    currentTierAdvancements: {
      increasePools: character.currentTierAdvancements?.increasePools || false,
      increaseEdge: character.currentTierAdvancements?.increaseEdge || false,
      increaseEffort:
        character.currentTierAdvancements?.increaseEffort || false,
      trainSkill: character.currentTierAdvancements?.trainSkill || false,
      increaseRecovery:
        character.currentTierAdvancements?.increaseRecovery || false,
      extraFocusAbility:
        character.currentTierAdvancements?.extraFocusAbility || false,
      extraTypeAbility:
        character.currentTierAdvancements?.extraTypeAbility || false,
    },

    // === EQUIPMENT ===
    weapons: character.weapons || [],
    items: character.items || [],

    // === DAMAGE & STRESS ===
    damageTrack: character.damageTrack || character.damageState || "hale",
    damageState: character.damageState || character.damageTrack || "hale",
    damage: character.damageState || character.damageTrack || "hale",
    stress: character.stress || 0,
    stressLevel: character.stressLevel || 0,
    superStress: character.supernaturalStress || 0,
    supernaturalStress: character.supernaturalStress || 0,

    // === SKILLS ===
    skillsData: typeof skillsData !== "undefined" ? skillsData : [],

    // === DESCRIPTOR DATA ===
    descriptorSkills: character.descriptorSkills || [],
    descriptorCharacteristics: character.descriptorCharacteristics || [],
    descriptorSuggestions: character.descriptorSuggestions || {},

    // === TYPE ABILITIES ===
    typeAbilities: character.typeAbilities || [],
    typeAbilitySelections: {
      available: character.typeAbilitySelections?.available || 0,
      used: character.typeAbilitySelections?.used || 0,
      confirmed: character.typeAbilitySelections?.confirmed || false,
    },
    selectedTypeAbilities: character.selectedTypeAbilities || [],

    // === FOCUS ABILITIES ===
    focusTierChoices: {
      tier3: character.focusTierChoices?.tier3 ?? null,
      tier6: character.focusTierChoices?.tier6 ?? null,
    },
    selectedFocusAbilities: character.selectedFocusAbilities || [],
    extraFocusAbilitySelections: {
      available: character.extraFocusAbilitySelections?.available || 0,
      used: character.extraFocusAbilitySelections?.used || 0,
    },
    appliedFocusPoolIncreases: character.appliedFocusPoolIncreases || [],

    // === CYPHERS ===
    cypherSlots: character.cypherSlots || 0,
    assignedCyphers:
      typeof assignedCyphers !== "undefined" ? assignedCyphers : [],
    activeCypherBoosts: character.activeCypherBoosts || {},

    // === AVATAR ===
    avatar: {
      isAvatar: character.avatar?.isAvatar || false,
      hasUnlockedTab: character.avatar?.hasUnlockedTab || false,
      entity: character.avatar?.entity ?? null,
      entityName: character.avatar?.entityName || "",
      tetheredPower: character.avatar?.tetheredPower ?? null,
      tetheredPowerName: character.avatar?.tetheredPowerName || "",
      powerChanges: character.avatar?.powerChanges || 0,
    },

    // === PENDING STATE ===
    pendingPoolPoints: character.pendingPoolPoints || 0,
    pendingSkillTraining: character.pendingSkillTraining || false,
    pendingEdgeIncrease: character.pendingEdgeIncrease || false,
    tempPoolAllocation: character.tempPoolAllocation || null,
    tempEdgeSelection: character.tempEdgeSelection || null,

    // === METADATA ===
    version: "1.2",
  };

  // Add appropriate timestamp
  if (isAutoSave) {
    characterData.autoSavedDate = new Date().toISOString();
  } else {
    characterData.savedDate = new Date().toISOString();
  }

  return characterData;
}

// Centralized function to load character data
function loadCharacterFromData(data) {
  // === IDENTITY ===
  character.name = data.name || "";
  character.descriptor = data.descriptor || "";
  character.type = data.type || "";
  character.focus1 = data.focus1 || "";
  character.identityConfirmed = data.identityConfirmed || false;

  // Update UI fields
  const nameInput = document.getElementById("charName");
  const descriptorInput = document.getElementById("descriptor");
  const typeInput = document.getElementById("type");
  const focus1Input = document.getElementById("focus1");

  if (nameInput) nameInput.value = character.name;
  if (descriptorInput) descriptorInput.value = character.descriptor;
  if (typeInput) typeInput.value = character.type;
  if (focus1Input) focus1Input.value = character.focus1;

  // Handle locked identity
  if (character.identityConfirmed) {
    console.log("Identity is confirmed, hiding identity section");

    const identitySection = document.querySelector(
      ".character-identity-section",
    );
    if (identitySection) {
      identitySection.classList.add("confirmed");
      console.log("✓ Identity section hidden");
    }

    const showcase = document.getElementById("characterStatementShowcase");
    if (showcase) {
      showcase.style.display = "block";
      console.log("✓ Character statement showcase displayed");
    }
  }

  // === CHARACTER STATEMENT SHOWCASE ===
  if (
    character.name &&
    character.type &&
    character.descriptor &&
    character.focus1
  ) {
    const showcase = document.getElementById("characterStatementShowcase");
    const statementText = document.getElementById("charStatement");

    if (showcase && statementText) {
      const article = /^[aeiou]/i.test(character.descriptor) ? "an" : "a";

      let statement = `<strong>${character.name}</strong> is ${article} <strong>${character.descriptor} ${character.type}</strong> who <strong>${character.focus1}</strong>`;

      if (
        character.avatar &&
        character.avatar.isAvatar &&
        character.avatar.entityName
      ) {
        statement += ` and <strong style="color: #ff4444;">Avatar of Fear</strong> in service to <strong style="color: #ff4444;">${character.avatar.entityName}</strong>`;
      }

      statementText.innerHTML = statement + `.`;
      showcase.style.display = "block";

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
      }
    }

    // Update page title
    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle && character.name) {
      pageTitle.textContent = `${character.name} – Character Sheet`;
      console.log("✓ Page title updated on load to:", pageTitle.textContent);
    }
  }

  // === BACKGROUND & CONNECTIONS ===
  character.background = data.background || "";
  character.connections = data.connections || "";
  connectionsData = data.connectionsData || [];

  const backgroundInput = document.getElementById("characterBackground");
  const connectionsInput = document.getElementById("characterConnections");

  if (backgroundInput) backgroundInput.value = character.background;
  if (connectionsInput) connectionsInput.value = character.connections;

  renderConnectionsTable();

  // === CHARACTER ARC ===
  // Support both new multi-arc format and old single-arc format
  if (data.characterArc) {
    // Check if data has new format (activeArcs array)
    if (data.characterArc.activeArcs !== undefined) {
      character.characterArc = {
        activeArcs: data.characterArc.activeArcs || [],
        currentlyViewingIndex: data.characterArc.currentlyViewingIndex || 0,
        arcsCompleted: data.characterArc.arcsCompleted || 0,
        totalArcsSelected:
          data.characterArc.totalArcsSelected ||
          data.characterArc.arcSelections ||
          0,
        firstArcFree: data.characterArc.firstArcFree ?? true,
      };
    } else {
      // Old format - migrate to new format
      character.characterArc = {
        activeArcs: [],
        currentlyViewingIndex: 0,
        arcsCompleted: data.characterArc.arcsCompleted || 0,
        totalArcsSelected: data.characterArc.arcSelections || 0,
        firstArcFree: data.characterArc.firstArcFree ?? true,
      };

      // If there was an active arc in old format, migrate it
      if (
        data.characterArc.currentArc !== null &&
        data.characterArc.currentArc !== undefined
      ) {
        character.characterArc.activeArcs.push({
          arcIndex: data.characterArc.currentArc,
          arcName: data.characterArc.arcName || "",
          arcNotes: data.characterArc.arcNotes || "",
        });
      }
    }
  } else {
    // No arc data at all - initialize
    character.characterArc = {
      activeArcs: [],
      currentlyViewingIndex: 0,
      arcsCompleted: 0,
      totalArcsSelected: 0,
      firstArcFree: true,
    };
  }

  if (typeof updateCharacterArcDisplay === "function") {
    updateCharacterArcDisplay();
  }

  if (typeof displayCurrentArc === "function") {
    displayCurrentArc();
  }

  // === TIER & XP ===
  character.tier = data.tier || 1;
  character.xp = data.xp || 0;

  const xpInput = document.getElementById("xp");
  if (xpInput) xpInput.value = character.xp;

  updateXPDisplay();

  // === STATS ===
  character.stats = data.stats || { Might: 0, Speed: 0, Intellect: 0 };
  character.currentPools = data.currentPools || { ...character.stats };
  character.edge = data.edge || { Might: 0, Speed: 0, Intellect: 0 };

  ["Might", "Speed", "Intellect"].forEach((stat) => {
    const maxEl = document.getElementById(`${stat.toLowerCase()}Max`);
    const poolEl = document.getElementById(`${stat.toLowerCase()}Pool`);
    const edgeEl = document.getElementById(`${stat.toLowerCase()}Edge`);

    if (maxEl) maxEl.textContent = character.stats[stat];
    if (poolEl) poolEl.textContent = character.currentPools[stat];
    if (edgeEl) edgeEl.textContent = character.edge[stat];
  });

  // === TEMPORARY STAT BOOSTS ===
  character.temporaryStatBoosts = data.temporaryStatBoosts || {};
  if (typeof updateTemporaryStatBoosts === "function") {
    updateTemporaryStatBoosts();
  }

  // === EFFORT & RECOVERY ===
  character.effort = data.effort || 1;
  character.recoveryBonus = data.recoveryBonus || 0;
  character.recoveryRolls = data.recoveryRolls || {
    action: false,
    tenMinutes: false,
    oneHour: false,
    tenHours: false,
  };

  const effortEl = document.getElementById("effortLevel");
  if (effortEl) effortEl.textContent = character.effort;

  const recoveryBonusDisplay = document.getElementById("recoveryBonusDisplay");
  if (recoveryBonusDisplay) {
    recoveryBonusDisplay.textContent = `+${character.recoveryBonus}`;
  }

  updateRecoveryDisplay();
  updateRecoveryFormulas();

  // === ADVANCEMENTS ===
  character.advancementsPurchasedThisTier =
    data.advancementsPurchasedThisTier || 0;
  character.currentTierAdvancements = data.currentTierAdvancements || {
    increasePools: false,
    increaseEdge: false,
    increaseEffort: false,
    trainSkill: false,
    increaseRecovery: false,
    extraFocusAbility: false,
    extraTypeAbility: false,
  };

  updateAdvancementDisplay();

  // === EQUIPMENT ===
  character.weapons = data.weapons || [];
  character.items = data.items || [];

  console.log("Loaded weapons:", character.weapons.length);
  console.log("Loaded items:", character.items.length);

  renderWeaponsTable();
  renderItemsTable();

  // === DAMAGE & STRESS ===
  character.damageTrack = data.damageTrack || data.damageState || "hale";
  character.damageState = data.damageState || data.damageTrack || "hale";
  character.damage = character.damageState;
  character.stress = data.stress || 0;
  character.stressLevel = data.stressLevel || 0;
  character.superStress = data.superStress || data.supernaturalStress || 0;
  character.supernaturalStress =
    data.supernaturalStress || data.superStress || 0;

  const stressPointsEl = document.getElementById("stressPoints");
  const stressLevelEl = document.getElementById("stressLevel");
  const superStressEl = document.getElementById("superStressDisplay");

  if (stressPointsEl) stressPointsEl.textContent = character.stress;
  if (stressLevelEl) stressLevelEl.textContent = character.stressLevel;
  if (superStressEl) superStressEl.textContent = character.supernaturalStress;

  updateDamageDisplay();
  updateStressDisplay();

  // === SKILLS ===
  skillsData = data.skillsData || [];
  renderSkillsTable();

  // === DESCRIPTOR DATA ===
  character.descriptorSkills = data.descriptorSkills || [];
  character.descriptorCharacteristics = data.descriptorCharacteristics || [];
  character.descriptorSuggestions = data.descriptorSuggestions || {};

  // Restore descriptor characteristics
  if (
    character.descriptorCharacteristics &&
    character.descriptorCharacteristics.length > 0
  ) {
    character.descriptorCharacteristics.forEach((characteristic) => {
      // Re-add each characteristic to the display
      const characteristicsSection = document.getElementById(
        "descriptorCharacteristics",
      );

      if (!characteristicsSection) {
        const skillsSection = document.querySelector("#skills .section");

        const newSection = document.createElement("div");
        newSection.id = "descriptorCharacteristics";
        newSection.style.cssText = `
          background: #2a2a2a;
          border: 2px solid #9c27b0;
          border-radius: 8px;
          padding: 15px;
          margin-top: 20px;
        `;

        newSection.innerHTML = `
          <h3 style="color: #9c27b0; margin-top: 0; margin-bottom: 15px;">Descriptor Characteristics</h3>
          <div id="characteristicsList"></div>
        `;

        if (skillsSection) {
          skillsSection.appendChild(newSection);
        }
      }

      const characteristicsList = document.getElementById(
        "characteristicsList",
      );

      if (
        characteristicsList &&
        !characteristicsList.querySelector(
          `[data-characteristic="${characteristic.name}"]`,
        )
      ) {
        const characteristicItem = document.createElement("div");
        characteristicItem.setAttribute(
          "data-characteristic",
          characteristic.name,
        );
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
            <h4 style="color: #9c27b0; margin: 0 0 8px 0;">${characteristic.name}</h4>
            <p style="color: #ddd; margin: 0; font-size: 0.95em;">${characteristic.description}</p>
          </div>
          <button 
            onclick="removeDescriptorCharacteristic('${characteristic.name}')"
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
      }
    });
  }

  // === TYPE ABILITIES ===
  character.typeAbilities = data.typeAbilities || [];
  character.typeAbilitySelections = data.typeAbilitySelections || {
    available: 0,
    used: 0,
    confirmed: false,
  };
  character.selectedTypeAbilities = data.selectedTypeAbilities || [];

  // === FOCUS ABILITIES ===
  character.focusTierChoices = data.focusTierChoices || {
    tier3: null,
    tier6: null,
  };
  character.selectedFocusAbilities = data.selectedFocusAbilities || [];
  character.extraFocusAbilitySelections = data.extraFocusAbilitySelections || {
    available: 0,
    used: 0,
  };

  renderTypeAbilitiesTable();
  renderFocusAbilitiesTable();

  // === CYPHERS ===
  character.cypherSlots = data.cypherSlots || 0;
  assignedCyphers = data.assignedCyphers || [];

  console.log("=== LOADING CYPHERS ===");
  console.log("Cypher slots:", character.cypherSlots);
  console.log("Assigned cyphers count:", assignedCyphers.length);

  // Recalculate Edge bonuses for loaded cyphers
  assignedCyphers = assignedCyphers.map((cypher, index) => {
    if (!cypher) return null;

    if (cypher.EdgeBonusStat && cypher.EdgeBonus) {
      const level = parseInt(cypher.level);
      cypher.calculatedEdgeBonus = level >= 5 ? 2 : 1;
      console.log(
        `✓ Calculated Edge Bonus: +${cypher.calculatedEdgeBonus} ${cypher.EdgeBonusStat} Edge (level ${level})`,
      );
    }

    return cypher;
  });

  const cypherSlotsEl = document.getElementById("cypherSlotsDisplay");
  if (cypherSlotsEl) {
    cypherSlotsEl.textContent = character.cypherSlots;
  }

  renderCypherTable();

  // Check if any loaded cyphers need the roll table
  const hasRollEffectCypher = assignedCyphers.some(
    (c) =>
      c && (c.name === "Librarian's pupil" || c.name === "Learn from The Web"),
  );

  if (hasRollEffectCypher) {
    const firstRollEffectCypher = assignedCyphers.find(
      (c) =>
        c &&
        (c.name === "Librarian's pupil" || c.name === "Learn from The Web"),
    );
    if (firstRollEffectCypher) {
      showCypherRollEffectTable(firstRollEffectCypher.name);
    }
  }

  // === AVATAR ===
  character.avatar = data.avatar || {
    isAvatar: false,
    hasUnlockedTab: false,
    entity: null,
    entityName: "",
    tetheredPower: null,
    tetheredPowerName: "",
    powerChanges: 0,
  };

  updateAvatarTabVisibility();

  if (character.avatar.isAvatar) {
    if (typeof updateAvatarPostCommitmentDisplay === "function") {
      updateAvatarPostCommitmentDisplay();
    }
    if (typeof populateAvatarPowersTable === "function") {
      populateAvatarPowersTable();
    }
    if (typeof updateSelectedPowerDisplay === "function") {
      updateSelectedPowerDisplay();
    }
  }

  // === ACTIVE CYPHER BOOSTS ===
  console.log("=== LOADING ACTIVE CYPHER BOOSTS ===");
  character.activeCypherBoosts = data.activeCypherBoosts || {};

  if (
    character.activeCypherBoosts &&
    Object.keys(character.activeCypherBoosts).length > 0
  ) {
    console.log("Reapplying active cypher Edge bonuses...");

    Object.keys(character.activeCypherBoosts).forEach((cypherIndex) => {
      const index = parseInt(cypherIndex);

      if (character.activeCypherBoosts[index]) {
        const cypher = assignedCyphers[index];

        if (!cypher) {
          console.warn(
            `WARNING: Active boost for missing cypher at index ${index}`,
          );
          delete character.activeCypherBoosts[index];
          return;
        }

        if (cypher.EdgeBonusStat && cypher.calculatedEdgeBonus) {
          const statName = cypher.EdgeBonusStat.toLowerCase();

          if (character[statName + "Edge"] !== undefined) {
            character[statName + "Edge"] += cypher.calculatedEdgeBonus;
            console.log(
              `✓ Reapplied ${cypher.calculatedEdgeBonus} to ${cypher.EdgeBonusStat} Edge from ${cypher.name}`,
            );
          }
        }
      }
    });

    if (typeof updateEdgeDisplay === "function") {
      updateEdgeDisplay();
    }
  }

  if (typeof updateCypherBoosts === "function") {
    try {
      updateCypherBoosts();
    } catch (error) {
      console.error("Error calling updateCypherBoosts:", error);
    }
  }

  // === PENDING STATE ===
  character.pendingPoolPoints = data.pendingPoolPoints || 0;
  character.pendingSkillTraining = data.pendingSkillTraining || false;
  character.pendingEdgeIncrease = data.pendingEdgeIncrease || false;
  character.tempPoolAllocation = data.tempPoolAllocation || null;
  character.tempEdgeSelection = data.tempEdgeSelection || null;

  // === FINAL UPDATES ===
  updateCharacterStatement();
  updateCharacterSheetUI();

  if (data.appliedFocusPoolIncreases) {
    character.appliedFocusPoolIncreases = data.appliedFocusPoolIncreases;
  } else {
    character.appliedFocusPoolIncreases = [];
  }

  // Initialize calculators after load
  if (typeof initializeAttackCalculator === "function") {
    initializeAttackCalculator();
  }
  if (typeof initializeDefendCalculator === "function") {
    initializeDefendCalculator();
  }
  if (typeof initializeActionCalculator === "function") {
    initializeActionCalculator();
  }
}

// Save character data to JSON file
function saveCharacter() {
  console.log("saveCharacter() called");

  try {
    // === DEBUG: LOG CYPHER DATA BEFORE SAVING ===
    console.log("=== SAVING CYPHERS DEBUG ===");
    if (typeof assignedCyphers !== "undefined") {
      assignedCyphers.forEach((cypher, index) => {
        if (cypher) {
          console.log(`Saving cypher ${index}:`, {
            name: cypher.name,
            level: cypher.level,
            EdgeBonusStat: cypher.EdgeBonusStat,
            EdgeBonus: cypher.EdgeBonus,
            PoolGain: cypher.PoolGain,
            calculatedEdgeBonus: cypher.calculatedEdgeBonus,
          });
        }
      });
    }

    // Use centralized data builder
    const characterData = buildCharacterData(false);

    console.log("Character data compiled:", characterData);

    // Convert to JSON string
    const characterJson = JSON.stringify(characterData, null, 2);
    console.log("JSON string created, length:", characterJson.length);

    // Save to localStorage as backup
    try {
      localStorage.setItem("magnusCharacter", characterJson);
      console.log("✓ Saved to localStorage");
    } catch (storageError) {
      console.error("Failed to save to localStorage:", storageError);
    }

    // Generate filename
    const characterName = characterData.name || "character";
    const sanitizedName = characterName
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `${sanitizedName}_tier${characterData.tier}_${dateStr}.json`;

    console.log("Generated filename:", filename);

    // Create blob and download
    const blob = new Blob([characterJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    alert(
      `Character saved!\n\n` +
        `File: ${filename}\n\n` +
        `Check your Downloads folder for the JSON file.`,
    );
  } catch (error) {
    console.error("Error saving character:", error);
    alert(`Error saving character:\n\n${error.message}`);
  }
}

// Auto-save character data every 10 minutes
function autoSave() {
  console.log("=== AUTO-SAVE SYSTEM INITIALIZED ===");
  console.log(`Auto-save will run every 10 minute (600000ms)`);
  console.log(
    `First auto-save will occur at: ${new Date(
      Date.now() + 600000,
    ).toLocaleTimeString()}`,
  );

  setInterval(() => {
    console.log("=== AUTO-SAVE TRIGGERED ===");
    console.log(`Current time: ${new Date().toLocaleTimeString()}`);

    try {
      // Use centralized data builder with auto-save flag
      const characterData = buildCharacterData(true);

      // Log what we're about to save
      console.log("Character data prepared:", {
        name: characterData.name,
        tier: characterData.tier,
        autoSavedDate: characterData.autoSavedDate,
        version: characterData.version,
      });

      // Save to localStorage with correct key
      const jsonString = JSON.stringify(characterData);
      localStorage.setItem("magnusCharacter", jsonString);

      console.log(`✓ Character auto-saved successfully`);
      console.log(`  - Data size: ${(jsonString.length / 1024).toFixed(2)} KB`);
      console.log(`  - Timestamp: ${characterData.autoSavedDate}`);
      console.log(
        `  - Next save: ${new Date(Date.now() + 60000).toLocaleTimeString()}`,
      );

      // Verify it was saved
      const verified = localStorage.getItem("magnusCharacter");
      if (verified) {
        const parsed = JSON.parse(verified);
        console.log(`✓ Verified in localStorage: ${parsed.autoSavedDate}`);
      } else {
        console.error("✗ Failed to verify save in localStorage!");
      }

      // Show subtle notification to user
      showAutoSaveNotification();
    } catch (error) {
      console.error("❌ Auto-save failed:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      // Check if localStorage is full
      if (error.name === "QuotaExceededError") {
        console.error("localStorage quota exceeded! Data may be too large.");
        alert(
          "Warning: Auto-save failed because browser storage is full.\n\n" +
            "Please manually save your character and clear browser data.",
        );
      }
    }
  }, 600000); // Save every 10 minutes
}

function testAutoSave() {
  console.log("\n=== TESTING AUTO-SAVE ===\n");

  // Check if character has data
  console.log("1. Current character state:");
  console.log("   Name:", character.name || "(none)");
  console.log("   Tier:", character.tier);
  console.log("   XP:", character.xp);

  // Try to build character data
  console.log("\n2. Building character data...");
  try {
    const characterData = buildCharacterData(true);
    console.log("   ✓ Character data built successfully");
    console.log("   Timestamp:", characterData.autoSavedDate);
    console.log("   Data keys:", Object.keys(characterData).length);
  } catch (error) {
    console.error("   ✗ Failed to build character data:", error);
    return;
  }

  // Try to save to localStorage
  console.log("\n3. Attempting localStorage save...");
  try {
    const characterData = buildCharacterData(true);
    const jsonString = JSON.stringify(characterData);
    localStorage.setItem("magnusCharacter", jsonString);
    console.log("   ✓ Saved to localStorage");
    console.log("   Size:", (jsonString.length / 1024).toFixed(2), "KB");
  } catch (error) {
    console.error("   ✗ Failed to save to localStorage:", error);
    return;
  }

  // Try to read back from localStorage
  console.log("\n4. Verifying localStorage save...");
  try {
    const saved = localStorage.getItem("magnusCharacter");
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("   ✓ Data found in localStorage");
      console.log("   Timestamp:", parsed.autoSavedDate);
      console.log("   Character:", parsed.name, `(Tier ${parsed.tier})`);
    } else {
      console.error("   ✗ No data found in localStorage!");
    }
  } catch (error) {
    console.error("   ✗ Failed to read from localStorage:", error);
  }

  console.log("\n=== TEST COMPLETE ===\n");
  console.log("If all checks passed, auto-save is working correctly.");
  console.log("The interval timer will save every 1 minute.");
}

// Load character data from JSON file
function loadCharacter() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const data = JSON.parse(event.target.result);

        console.log("Loading character data:", data);

        // Call centralized load function
        loadCharacterFromData(data);

        alert(
          `Character loaded successfully!\n\n` +
            `Name: ${character.name}\n` +
            `Tier: ${character.tier}\n` +
            `Type: ${character.type}\n` +
            `${
              data.savedDate
                ? `Saved: ${new Date(data.savedDate).toLocaleString()}`
                : ""
            }`,
        );

        console.log("✓ Character loaded successfully");
      } catch (error) {
        console.error("Error loading character:", error);
        alert(
          `Error loading character file:\n\n${error.message}\n\nPlease check the file format.`,
        );
      }
    };

    reader.readAsText(file);
  };

  input.click();
}

// Add a function to load from localStorage (for backup/recovery)
function loadFromLocalStorage() {
  try {
    const savedData = localStorage.getItem("magnusCharacter");

    if (!savedData) {
      alert(
        "No saved character found in browser storage.\n\n" +
          "Browser backup data is created automatically every 10 minutes " +
          "or when you manually save your character.\n\n" +
          "If you've never saved before, there won't be any backup data.",
      );
      return;
    }

    const data = JSON.parse(savedData);

    // Show info about the backup
    const backupDate = data.autoSavedDate || data.savedDate;
    const backupInfo = backupDate
      ? `\n\nLast backup: ${new Date(backupDate).toLocaleString()}`
      : "";

    const characterInfo = data.name
      ? `\n\nCharacter: ${data.name} (Tier ${data.tier || 1})`
      : "";

    const confirmation = confirm(
      "Load the character saved in your browser?" +
        characterInfo +
        backupInfo +
        "\n\nThis will overwrite any unsaved changes to your current character.",
    );

    if (!confirmation) return;

    loadCharacterFromData(data);

    alert(
      "Character loaded from browser backup!" +
        characterInfo +
        backupInfo +
        "\n\n💡 Tip: Use 'Save Character' to download a backup file too!",
    );

    console.log("✓ Character loaded from localStorage");
  } catch (error) {
    console.error("Error loading from localStorage:", error);

    // More helpful error message
    let errorMsg = "Error loading saved character:\n\n";

    if (error.name === "SyntaxError") {
      errorMsg +=
        "The backup data appears to be corrupted.\n\n" +
        "This might happen if the save was interrupted.\n\n" +
        "Try loading from a downloaded save file instead.";
    } else {
      errorMsg += error.message;
    }

    alert(errorMsg);
  }
}

function resetCharacter() {
  if (
    !confirm(
      "Are you sure you want to reset your character?\n\n" +
        "This will erase ALL character data and cannot be undone.\n\n" +
        "Your current character will be lost forever.",
    )
  ) {
    return;
  }

  // Double confirmation for safety
  if (
    !confirm(
      "FINAL WARNING: This action is permanent.\n\n" +
        "Click OK to permanently delete your character data.",
    )
  ) {
    return;
  }

  console.log("Resetting character to defaults...");

  try {
    // Clear localStorage
    localStorage.removeItem("magnusCharacter");
    console.log("✓ Cleared localStorage");

    // Reset the global character object to defaults
    window.character = {
      name: "",
      descriptor: "",
      type: "",
      focus1: "",
      identityConfirmed: false,
      background: "",
      connections: "",
      tier: 1,
      xp: 0,
      stats: { Might: 0, Speed: 0, Intellect: 0 },
      currentPools: { Might: 0, Speed: 0, Intellect: 0 },
      edge: { Might: 0, Speed: 0, Intellect: 0 },
      effort: 1,
      recoveryBonus: 0,
      recoveryRolls: {
        action: false,
        tenMinutes: false,
        oneHour: false,
        tenHours: false,
      },
      damageTrack: "hale",
      damageState: "hale",
      stress: 0,
      supernaturalStress: 0,
      weapons: [],
      items: [],
      skillsData: [],
      typeAbilities: [],
      selectedTypeAbilities: [],
      typeAbilitySelections: { available: 0, used: 0, confirmed: false },
      selectedFocusAbilities: [],
      focusTierChoices: { tier3: null, tier6: null },
      extraFocusAbilitySelections: { available: 0, used: 0 },
      appliedFocusPoolIncreases: [],
      cypherSlots: 0,
      assignedCyphers: [],
      activeCypherBoosts: {},
      temporaryStatBoosts: {},
      advancementsPurchasedThisTier: 0,
      currentTierAdvancements: {
        increasePools: false,
        increaseEdge: false,
        increaseEffort: false,
        trainSkill: false,
        increaseRecovery: false,
        extraFocusAbility: false,
        extraTypeAbility: false,
      },
      descriptorSkills: [],
      descriptorCharacteristics: [],
      descriptorSuggestions: {},
      characterArc: {
        activeArcs: [],
        currentlyViewingIndex: 0,
        arcsCompleted: 0,
        totalArcsSelected: 0,
        firstArcFree: true,
      },
      avatar: {
        isAvatar: false,
        hasUnlockedTab: false,
        entity: null,
        entityName: "",
        tetheredPower: null,
        tetheredPowerName: "",
        powerChanges: 0,
      },
      pendingPoolPoints: 0,
      pendingSkillTraining: false,
      pendingEdgeIncrease: false,
      tempPoolAllocation: null,
      tempEdgeSelection: null,
    };

    console.log("✓ Character object reset to defaults");

    // Clear global arrays
    if (typeof assignedCyphers !== "undefined") {
      window.assignedCyphers = [];
    }
    if (typeof skillsData !== "undefined") {
      window.skillsData = [];
    }
    if (typeof connectionsData !== "undefined") {
      window.connectionsData = [];
    }

    console.log("✓ Global arrays cleared");

    // Reload the page to reset all UI elements
    alert(
      "Character has been reset.\n\n" +
        "The page will now reload to display the fresh character sheet.",
    );

    location.reload();
  } catch (error) {
    console.error("Error resetting character:", error);
    alert(
      `Error resetting character:\n\n${error.message}\n\n` +
        `You may need to manually refresh the page.`,
    );
  }
}

// Export character to text format
function exportToText() {
  console.log("exportToText() called");

  try {
    // Build text representation
    let textOutput = "";

    // Header
    textOutput += "═══════════════════════════════════════════════════\n";
    textOutput += "    THE MAGNUS ARCHIVES - CHARACTER SHEET\n";
    textOutput += "═══════════════════════════════════════════════════\n\n";

    // Identity
    textOutput += "CHARACTER IDENTITY\n";
    textOutput += "─────────────────────────────────────────────────\n";
    textOutput += `Name: ${character.name || "Unnamed"}\n`;

    const article = /^[aeiou]/i.test(character.descriptor) ? "an" : "a";
    textOutput += `Statement: ${character.name || "Character"} is ${article} ${
      character.descriptor || "Unknown"
    } ${character.type || "Unknown"} who ${character.focus1 || "Unknown"}`;

    if (character.avatar?.isAvatar && character.avatar?.entityName) {
      textOutput += ` and Avatar of Fear in service to ${character.avatar.entityName}`;
    }
    textOutput += ".\n\n";

    // Stats
    textOutput += "STATS & POOLS\n";
    textOutput += "─────────────────────────────────────────────────\n";
    textOutput += `Tier: ${character.tier}\n`;
    textOutput += `XP: ${character.xp}\n`;
    textOutput += `Effort: ${character.effort}\n\n`;

    textOutput += `Might:     ${character.currentPools?.Might || 0} / ${
      character.stats?.Might || 0
    }  (Edge: ${character.edge?.Might || 0})\n`;
    textOutput += `Speed:     ${character.currentPools?.Speed || 0} / ${
      character.stats?.Speed || 0
    }  (Edge: ${character.edge?.Speed || 0})\n`;
    textOutput += `Intellect: ${character.currentPools?.Intellect || 0} / ${
      character.stats?.Intellect || 0
    }  (Edge: ${character.edge?.Intellect || 0})\n\n`;

    // Damage & Stress
    textOutput += "CONDITION\n";
    textOutput += "─────────────────────────────────────────────────\n";
    textOutput += `Damage Track: ${character.damageState || "Hale"}\n`;
    textOutput += `Stress: ${character.stress || 0} (Level ${
      character.stressLevel || 0
    })\n`;
    textOutput += `Supernatural Stress: ${
      character.supernaturalStress || 0
    }\n\n`;

    // Recovery
    textOutput += "RECOVERY\n";
    textOutput += "─────────────────────────────────────────────────\n";
    textOutput += `Recovery Bonus: +${character.recoveryBonus || 0}\n`;
    textOutput += `Action: ${
      character.recoveryRolls?.action ? "Used" : "Available"
    }\n`;
    textOutput += `10 Minutes: ${
      character.recoveryRolls?.tenMinutes ? "Used" : "Available"
    }\n`;
    textOutput += `1 Hour: ${
      character.recoveryRolls?.oneHour ? "Used" : "Available"
    }\n`;
    textOutput += `10 Hours: ${
      character.recoveryRolls?.tenHours ? "Used" : "Available"
    }\n\n`;

    // Skills
    if (skillsData && skillsData.length > 0) {
      textOutput += "SKILLS\n";
      textOutput += "─────────────────────────────────────────────────\n";
      skillsData.forEach((skill) => {
        textOutput += `${skill.name} (${skill.stat}): ${skill.level}\n`;
      });
      textOutput += "\n";
    }

    // Type Abilities
    if (
      character.selectedTypeAbilities &&
      character.selectedTypeAbilities.length > 0
    ) {
      textOutput += "TYPE ABILITIES\n";
      textOutput += "─────────────────────────────────────────────────\n";
      character.selectedTypeAbilities.forEach((ability) => {
        textOutput += `• ${ability.name}\n`;
        textOutput += `  ${ability.description}\n\n`;
      });
    }

    // Focus Abilities
    if (
      character.selectedFocusAbilities &&
      character.selectedFocusAbilities.length > 0
    ) {
      textOutput += "FOCUS ABILITIES\n";
      textOutput += "─────────────────────────────────────────────────\n";
      character.selectedFocusAbilities.forEach((ability) => {
        textOutput += `• ${ability.name} (Tier ${ability.tier})\n`;
        textOutput += `  ${ability.description}\n\n`;
      });
    }

    // Equipment
    if (character.weapons && character.weapons.length > 0) {
      textOutput += "WEAPONS\n";
      textOutput += "─────────────────────────────────────────────────\n";
      character.weapons.forEach((weapon) => {
        textOutput += `• ${weapon.name}`;
        if (weapon.damage) textOutput += ` (${weapon.damage} damage)`;
        if (weapon.notes) textOutput += ` - ${weapon.notes}`;
        textOutput += "\n";
      });
      textOutput += "\n";
    }

    if (character.items && character.items.length > 0) {
      textOutput += "EQUIPMENT\n";
      textOutput += "─────────────────────────────────────────────────\n";
      character.items.forEach((item) => {
        textOutput += `• ${item.name}`;
        if (item.notes) textOutput += ` - ${item.notes}`;
        textOutput += "\n";
      });
      textOutput += "\n";
    }

    // Cyphers
    if (assignedCyphers && assignedCyphers.some((c) => c)) {
      textOutput += "CYPHERS\n";
      textOutput += "─────────────────────────────────────────────────\n";
      textOutput += `Cypher Limit: ${character.cypherSlots}\n\n`;
      assignedCyphers.forEach((cypher, index) => {
        if (cypher) {
          textOutput += `${index + 1}. ${cypher.name} (Level ${
            cypher.level
          })\n`;
          textOutput += `   ${cypher.effect}\n\n`;
        }
      });
    }

    // Avatar Powers
    if (character.avatar?.isAvatar) {
      textOutput += "AVATAR POWERS\n";
      textOutput += "─────────────────────────────────────────────────\n";
      textOutput += `Entity: ${character.avatar.entityName}\n`;
      if (character.avatar.tetheredPowerName) {
        textOutput += `Tethered Power: ${character.avatar.tetheredPowerName}\n`;
      }
      textOutput += "\n";
    }

    // Background
    if (character.background) {
      textOutput += "BACKGROUND\n";
      textOutput += "─────────────────────────────────────────────────\n";
      textOutput += `${character.background}\n\n`;
    }

    // Connections
    if (connectionsData && connectionsData.length > 0) {
      textOutput += "CONNECTIONS\n";
      textOutput += "─────────────────────────────────────────────────\n";
      connectionsData.forEach((conn) => {
        textOutput += `• ${conn.name} - ${conn.relationship}\n`;
      });
      textOutput += "\n";
    }

    // Footer
    textOutput += "═══════════════════════════════════════════════════\n";
    textOutput += `Exported: ${new Date().toLocaleString()}\n`;
    textOutput += "═══════════════════════════════════════════════════\n";

    // Generate filename
    const characterName = character.name || "character";
    const sanitizedName = characterName
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `${sanitizedName}_sheet_${dateStr}.txt`;

    console.log("Generated text export, length:", textOutput.length);

    // Create blob and download
    const blob = new Blob([textOutput], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    alert(
      `Character sheet exported to text!\n\n` +
        `File: ${filename}\n\n` +
        `Check your Downloads folder.`,
    );
  } catch (error) {
    console.error("Error exporting to text:", error);
    alert(`Error exporting character:\n\n${error.message}`);
  }
}

// Update showAutoSaveNotification in save-load.js:
function showAutoSaveNotification() {
  let notification = document.getElementById("autoSaveNotification");

  if (!notification) {
    notification = document.createElement("div");
    notification.id = "autoSaveNotification";
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(3, 66, 18, 0.95);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 0.9em;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10000;
      pointer-events: none;
      border: 2px solid rgba(0, 37, 0, 0.5);
      box-shadow: 0 4px 12px rgba(26, 102, 17, 0.46);
    `;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 1.2em;">🔄</span>
        <div>
          <div style="font-weight: bold;">Auto-saved to browser</div>
          <div style="font-size: 0.85em; opacity: 0.9;">Use "Load Browser Backup" to restore</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
  }

  notification.style.opacity = "0.8";

  setTimeout(() => {
    notification.style.opacity = "0";
  }, 3000); // Show for 3 seconds
}

// Monitor localStorage for character data
function monitorLocalStorage() {
  console.log("\n=== LOCALSTORAGE MONITOR ===\n");

  const data = localStorage.getItem("magnusCharacter");

  if (!data) {
    console.log("❌ No character data in localStorage");
    return;
  }

  try {
    const parsed = JSON.parse(data);

    console.log("✓ Character data found");
    console.log("  Name:", parsed.name || "(unnamed)");
    console.log("  Tier:", parsed.tier);
    console.log("  Version:", parsed.version);

    if (parsed.autoSavedDate) {
      const saveDate = new Date(parsed.autoSavedDate);
      const now = new Date();
      const minutesAgo = Math.floor((now - saveDate) / 60000);

      console.log("  Last auto-save:", saveDate.toLocaleString());
      console.log("  Time since save:", minutesAgo, "minutes ago");

      if (minutesAgo > 10) {
        console.warn(
          "  ⚠️ Auto-save may not be running (last save was over 10 minutes ago)",
        );
      } else {
        console.log("  ✓ Auto-save appears to be running");
      }
    }

    if (parsed.savedDate) {
      console.log(
        "  Last manual save:",
        new Date(parsed.savedDate).toLocaleString(),
      );
    }

    console.log("  Data size:", (data.length / 1024).toFixed(2), "KB");
  } catch (error) {
    console.error("❌ Error parsing localStorage data:", error);
  }

  console.log("\n=== END MONITOR ===\n");
}
