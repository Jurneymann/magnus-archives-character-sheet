// ==================== SAVE/LOAD SYSTEM ==================== //

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

    // Gather ALL character data
    const characterData = {
      // === IDENTITY ===
      name: character.name || document.getElementById("charName")?.value || "",
      descriptor:
        character.descriptor ||
        document.getElementById("descriptor")?.value ||
        "",
      type: character.type || document.getElementById("type")?.value || "",
      focus1:
        character.focus1 || document.getElementById("focus1")?.value || "",
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
        currentArc: character.characterArc?.currentArc ?? null,
        arcName: character.characterArc?.arcName || "",
        arcNotes: character.characterArc?.arcNotes || "",
        arcsCompleted: character.characterArc?.arcsCompleted || 0,
        arcSelections: character.characterArc?.arcSelections || 0,
        firstArcFree: character.characterArc?.firstArcFree ?? true,
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
      advancementsPurchasedThisTier:
        character.advancementsPurchasedThisTier || 0,
      currentTierAdvancements: {
        increasePools:
          character.currentTierAdvancements?.increasePools || false,
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
      savedDate: new Date().toISOString(),
      version: "1.2",
    };

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
        `Check your Downloads folder for the JSON file.`
    );
  } catch (error) {
    console.error("Error saving character:", error);
    alert(`Error saving character:\n\n${error.message}`);
  }
}

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

        // === IDENTITY ===
        character.name = data.name || "";
        character.descriptor = data.descriptor || "";
        character.type = data.type || "";
        character.focus1 = data.focus1 || "";
        character.identityConfirmed = data.identityConfirmed || false;

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

          // Hide the ENTIRE character-identity-section using the correct class
          const identitySection = document.querySelector(
            ".character-identity-section"
          );
          if (identitySection) {
            identitySection.classList.add("confirmed");
            console.log("✓ Identity section hidden");
          } else {
            console.warn("✗ Could not find .character-identity-section");
          }

          // Show the character statement showcase
          const showcase = document.getElementById(
            "characterStatementShowcase"
          );
          if (showcase) {
            showcase.style.display = "block";
            console.log("✓ Character statement showcase displayed");
          }
        }

        // === CHARACTER STATEMENT SHOWCASE ===
        // Update the character statement showcase
        if (
          character.name &&
          character.type &&
          character.descriptor &&
          character.focus1
        ) {
          const showcase = document.getElementById(
            "characterStatementShowcase"
          );
          const statementText = document.getElementById("charStatement");

          if (showcase && statementText) {
            const article = /^[aeiou]/i.test(character.descriptor) ? "an" : "a";

            // Build statement with Avatar suffix if applicable
            let statement = `<strong>${character.name}</strong> is ${article} <strong>${character.descriptor} ${character.type}</strong> who <strong>${character.focus1}</strong>`;

            // Check if character is an Avatar
            if (
              character.avatar &&
              character.avatar.isAvatar &&
              character.avatar.entityName
            ) {
              statement += ` and <strong style="color: #ff4444;">Avatar of Fear</strong> in service to <strong style="color: #ff4444;">${character.avatar.entityName}</strong>`;
            }

            statementText.innerHTML = statement + `.`;
            showcase.style.display = "block";

            // Apply Avatar styling if applicable
            if (
              character.avatar &&
              character.avatar.isAvatar &&
              character.avatar.entityName
            ) {
              console.log("Applying Avatar mode styling to showcase");
              showcase.classList.add("avatar-mode");

              const avatarBadge = document.getElementById("avatarBadge");
              const avatarEntityName =
                document.getElementById("avatarEntityName");
              if (avatarBadge && avatarEntityName) {
                avatarEntityName.textContent = character.avatar.entityName;
                avatarBadge.style.display = "inline-block";
              }
            } else {
              console.log("Removing Avatar mode styling from showcase");
              showcase.classList.remove("avatar-mode");

              const avatarBadge = document.getElementById("avatarBadge");
              if (avatarBadge) {
                avatarBadge.style.display = "none";
              }
            }
          }

          // Update the page title when loading a character
          const pageTitle = document.getElementById("pageTitle");
          if (pageTitle && character.name) {
            pageTitle.textContent = `${character.name} – Character Sheet`;
            console.log(
              "✓ Page title updated on load to:",
              pageTitle.textContent
            );
          }

          // Hide identity fields if confirmed
          if (character.identityConfirmed) {
            const identityFields = document.querySelector(".identity-fields");
            if (identityFields) {
              identityFields.style.display = "none";
            }

            const characterOptions =
              document.querySelector(".character-options");
            if (characterOptions) {
              characterOptions.classList.remove("hidden");
            }
          }
        }

        // === BACKGROUND & CONNECTIONS ===
        character.background = data.background || "";
        character.connections = data.connections || "";
        connectionsData = data.connectionsData || [];

        const backgroundInput = document.getElementById("characterBackground");
        const connectionsInput = document.getElementById(
          "characterConnections"
        );

        if (backgroundInput) backgroundInput.value = character.background;
        if (connectionsInput) connectionsInput.value = character.connections;

        renderConnectionsTable();

        // === CHARACTER ARC ===
        character.characterArc = data.characterArc || {
          currentArc: null,
          arcName: "",
          arcNotes: "",
          arcsCompleted: 0,
          arcSelections: 0,
          firstArcFree: true,
        };

        updateCharacterArcDisplay();

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

        // Update recovery bonus display
        const recoveryBonusDisplay = document.getElementById(
          "recoveryBonusDisplay"
        );
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
        character.superStress =
          data.superStress || data.supernaturalStress || 0;
        character.supernaturalStress =
          data.supernaturalStress || data.superStress || 0;

        const stressPointsEl = document.getElementById("stressPoints");
        const stressLevelEl = document.getElementById("stressLevel");
        const superStressEl = document.getElementById("superStressDisplay");

        if (stressPointsEl) stressPointsEl.textContent = character.stress;
        if (stressLevelEl) stressLevelEl.textContent = character.stressLevel;
        if (superStressEl) {
          superStressEl.textContent = character.supernaturalStress;
        }

        updateDamageDisplay();
        updateStressDisplay();

        // === SKILLS ===
        skillsData = data.skillsData || [];
        renderSkillsTable();

        // === DESCRIPTOR DATA ===
        character.descriptorSkills = data.descriptorSkills || [];
        character.descriptorCharacteristics =
          data.descriptorCharacteristics || [];
        character.descriptorSuggestions = data.descriptorSuggestions || {};

        // Restore descriptor characteristics if they exist
        if (
          character.descriptorCharacteristics &&
          character.descriptorCharacteristics.length > 0
        ) {
          character.descriptorCharacteristics.forEach((characteristic) => {
            // Re-add each characteristic to the display
            const characteristicsSection = document.getElementById(
              "descriptorCharacteristics"
            );

            if (!characteristicsSection) {
              // Create the section if it doesn't exist
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

            // Add the characteristic to the list
            const characteristicsList = document.getElementById(
              "characteristicsList"
            );

            if (
              characteristicsList &&
              !characteristicsList.querySelector(
                `[data-characteristic="${characteristic.name}"]`
              )
            ) {
              const characteristicItem = document.createElement("div");
              characteristicItem.setAttribute(
                "data-characteristic",
                characteristic.name
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
        character.extraFocusAbilitySelections =
          data.extraFocusAbilitySelections || {
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
        console.log("Raw assigned cyphers:", assignedCyphers);

        // Recalculate Edge bonuses for loaded cyphers
        assignedCyphers = assignedCyphers.map((cypher, index) => {
          if (!cypher) {
            console.log(`Cypher slot ${index}: empty`);
            return null;
          }

          console.log(
            `Cypher slot ${index}:`,
            cypher.name,
            "Level:",
            cypher.level
          );

          // Recalculate Edge bonus if applicable
          if (cypher.EdgeBonusStat && cypher.EdgeBonus) {
            console.log(`  - Has EdgeBonus property:`, cypher.EdgeBonus);
            console.log(`  - EdgeBonus type:`, typeof cypher.EdgeBonus);

            // Direct calculation instead of relying on function
            const level = parseInt(cypher.level);
            console.log(`  - Parsed level:`, level);

            // Calculate based on level (1 if level < 5, otherwise 2)
            cypher.calculatedEdgeBonus = level >= 5 ? 2 : 1;
            console.log(
              `  ✓ Calculated Edge Bonus: +${cypher.calculatedEdgeBonus} ${
                cypher.EdgeBonusStat
              } Edge (level ${level} ${level >= 5 ? ">=" : "<"} 5)`
            );
          } else {
            console.log(`  - No Edge bonus for this cypher`);
            if (!cypher.EdgeBonusStat) {
              console.log(`    - Missing EdgeBonusStat`);
            }
            if (!cypher.EdgeBonus) {
              console.log(`    - Missing EdgeBonus`);
            }
          }

          return cypher;
        });

        console.log("=== CYPHER EDGE BONUS SUMMARY ===");
        const cyphersWithBonuses = assignedCyphers.filter(
          (c) => c && c.calculatedEdgeBonus
        );
        console.log("Cyphers with Edge bonuses:", cyphersWithBonuses.length);
        cyphersWithBonuses.forEach((c, i) => {
          console.log(
            `  ${i + 1}. ${c.name} (Level ${c.level}): +${
              c.calculatedEdgeBonus
            } ${c.EdgeBonusStat} Edge`
          );
        });

        console.log(
          "Cyphers with Edge bonuses:",
          assignedCyphers.filter((c) => c && c.calculatedEdgeBonus).length
        );

        console.log("=== DIAGNOSTIC: RAW CYPHER DATA ===");
        assignedCyphers.forEach((cypher, index) => {
          if (cypher) {
            console.log(`Slot ${index}:`, {
              name: cypher.name,
              level: cypher.level,
              hasEdgeBonusStat: !!cypher.EdgeBonusStat,
              EdgeBonusStat: cypher.EdgeBonusStat,
              hasEdgeBonus: !!cypher.EdgeBonus,
              EdgeBonus: cypher.EdgeBonus,
              hasCalculatedBonus: !!cypher.calculatedEdgeBonus,
              calculatedEdgeBonus: cypher.calculatedEdgeBonus,
            });
          }
        });

        const cypherSlotsEl = document.getElementById("cypherSlotsDisplay");
        if (cypherSlotsEl) {
          cypherSlotsEl.textContent = character.cypherSlots;
          console.log("✓ Updated cypher slots display");
        }

        renderCypherTable();
        console.log("✓ Rendered cypher table");

        // Check if any loaded cyphers need the roll table
        const hasRollEffectCypher = assignedCyphers.some(
          (c) =>
            c &&
            (c.name === "Librarian's pupil" || c.name === "Learn from The Web")
        );

        if (hasRollEffectCypher) {
          const firstRollEffectCypher = assignedCyphers.find(
            (c) =>
              c &&
              (c.name === "Librarian's pupil" ||
                c.name === "Learn from The Web")
          );
          if (firstRollEffectCypher) {
            showCypherRollEffectTable(firstRollEffectCypher.name);
            console.log(
              "✓ Showed roll effect table for:",
              firstRollEffectCypher.name
            );
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

        // If avatar is active, update the display
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

        console.log("Active cypher boosts data:", character.activeCypherBoosts);
        console.log(
          "Number of active boosts:",
          Object.keys(character.activeCypherBoosts).length
        );

        // If any cyphers have active boosts, reapply the Edge bonuses
        if (
          character.activeCypherBoosts &&
          Object.keys(character.activeCypherBoosts).length > 0
        ) {
          console.log("Reapplying active cypher Edge bonuses...");

          Object.keys(character.activeCypherBoosts).forEach((cypherIndex) => {
            const index = parseInt(cypherIndex);
            console.log(
              `Checking cypher at index ${index}:`,
              character.activeCypherBoosts[index]
            );

            if (character.activeCypherBoosts[index]) {
              const cypher = assignedCyphers[index];
              console.log(`  - Cypher:`, cypher ? cypher.name : "null");

              if (!cypher) {
                console.warn(
                  `  - WARNING: Active boost for missing cypher at index ${index}`
                );
                delete character.activeCypherBoosts[index];
                return;
              }

              if (cypher.EdgeBonusStat && cypher.calculatedEdgeBonus) {
                // Reapply the Edge bonus
                const statName = cypher.EdgeBonusStat.toLowerCase();
                console.log(`  - Stat name: ${statName}`);
                console.log(
                  `  - Edge bonus amount: ${cypher.calculatedEdgeBonus}`
                );
                console.log(
                  `  - Current ${cypher.EdgeBonusStat} Edge:`,
                  character[statName + "Edge"]
                );

                if (character[statName + "Edge"] !== undefined) {
                  const oldEdge = character[statName + "Edge"];
                  character[statName + "Edge"] += cypher.calculatedEdgeBonus;
                  const newEdge = character[statName + "Edge"];

                  console.log(
                    `  ✓ Reapplied ${cypher.calculatedEdgeBonus} to ${cypher.EdgeBonusStat} Edge from ${cypher.name}`
                  );
                  console.log(`  - Edge changed from ${oldEdge} to ${newEdge}`);
                } else {
                  console.error(
                    `  - ERROR: ${statName}Edge property not found on character!`
                  );
                }
              } else {
                console.warn(
                  `  - WARNING: Cypher ${cypher.name} missing EdgeBonusStat or calculatedEdgeBonus`
                );
                console.log(`    - EdgeBonusStat:`, cypher.EdgeBonusStat);
                console.log(
                  `    - calculatedEdgeBonus:`,
                  cypher.calculatedEdgeBonus
                );
              }
            }
          });

          console.log("Edge values after reapplying cypher boosts:");
          console.log("  - Might Edge:", character.mightEdge);
          console.log("  - Speed Edge:", character.speedEdge);
          console.log("  - Intellect Edge:", character.intellectEdge);

          // Update Edge display after reapplying bonuses
          if (typeof updateEdgeDisplay === "function") {
            updateEdgeDisplay();
            console.log("✓ Called updateEdgeDisplay()");
          } else {
            console.error("✗ updateEdgeDisplay function not found!");

            // Fallback: manually update Edge display elements
            ["Might", "Speed", "Intellect"].forEach((stat) => {
              const edgeEl = document.getElementById(
                `${stat.toLowerCase()}Edge`
              );
              if (edgeEl) {
                edgeEl.textContent =
                  character.edge[stat] ||
                  character[stat.toLowerCase() + "Edge"] ||
                  0;
                console.log(
                  `✓ Manually updated ${stat} Edge display to:`,
                  edgeEl.textContent
                );
              }
            });
          }
        } else {
          console.log("No active cypher boosts to reapply");
        }

        // Update cypher boosts display (this will show Edge bonus UI if applicable)
        console.log("Calling updateCypherBoosts()...");
        try {
          if (typeof updateCypherBoosts === "function") {
            updateCypherBoosts();
            console.log("✓ Called updateCypherBoosts()");
          } else {
            console.error("✗ updateCypherBoosts function not found!");
          }
        } catch (error) {
          console.error("Error calling updateCypherBoosts:", error);
          console.log(
            "This is non-fatal - cypher boosts can be viewed by switching to Stats tab"
          );
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

        // Load applied focus pool increases tracking
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

        // Show in output if it exists
        const outputElement = document.getElementById("output");
        if (outputElement) {
          outputElement.textContent = JSON.stringify(data, null, 2);
        }

        alert(
          `Character loaded successfully!\n\n` +
            `Name: ${character.name}\n` +
            `Tier: ${character.tier}\n` +
            `Type: ${character.type}\n` +
            `${
              data.savedDate
                ? `Saved: ${new Date(data.savedDate).toLocaleString()}`
                : ""
            }`
        );

        console.log("=== FINAL CHARACTER STATE ===");
        console.log("Character edge object:", character.edge);
        console.log("Character mightEdge:", character.mightEdge);
        console.log("Character speedEdge:", character.speedEdge);
        console.log("Character intellectEdge:", character.intellectEdge);
        console.log("Active cypher boosts:", character.activeCypherBoosts);

        // Verify Edge display elements
        ["Might", "Speed", "Intellect"].forEach((stat) => {
          const edgeEl = document.getElementById(`${stat.toLowerCase()}Edge`);
          console.log(`${stat} Edge display element:`, edgeEl?.textContent);
        });
        console.log("✓ Character loaded successfully");
      } catch (error) {
        console.error("Error loading character:", error);
        alert(
          `Error loading character file:\n\n${error.message}\n\nPlease check the file format.`
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
      alert("No saved character found in browser storage.");
      return;
    }

    const confirmation = confirm(
      "Load the character saved in your browser?\n\n" +
        "This will overwrite any unsaved changes."
    );

    if (!confirmation) return;

    // Create a fake file event
    const data = JSON.parse(savedData);
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const file = new File([blob], "localStorage_backup.json");

    const reader = new FileReader();
    reader.onload = function (event) {
      // Reuse the same loading logic
      const fakeEvent = {
        target: {
          result: event.target.result,
        },
      };
      loadCharacter.onload = reader.onload;
      reader.onload(fakeEvent);
    };
    reader.readAsText(file);
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    alert(`Error loading saved character:\n\n${error.message}`);
  }
}

function resetCharacter() {
  if (
    !confirm(
      "Are you sure you want to reset your character?\n\n" +
        "This will erase ALL character data and cannot be undone.\n\n" +
        "Your current character will be lost forever."
    )
  ) {
    return;
  }

  // Double confirmation for safety
  if (
    !confirm(
      "FINAL WARNING: This action is permanent.\n\n" +
        "Click OK to permanently delete your character data."
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
        currentArc: null,
        arcName: "",
        arcNotes: "",
        arcsCompleted: 0,
        arcSelections: 0,
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
        "The page will now reload to display the fresh character sheet."
    );

    location.reload();
  } catch (error) {
    console.error("Error resetting character:", error);
    alert(
      `Error resetting character:\n\n${error.message}\n\n` +
        `You may need to manually refresh the page.`
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
        `Check your Downloads folder.`
    );
  } catch (error) {
    console.error("Error exporting to text:", error);
    alert(`Error exporting character:\n\n${error.message}`);
  }
}
