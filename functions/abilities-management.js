// ==================== FOCUS ABILITIES TABLE MANAGEMENT ==================== //

// Track selected focus abilities
if (!character.selectedFocusAbilities) {
  character.selectedFocusAbilities = [];
}

// Track tier 3 and tier 6 choices
if (!character.focusTierChoices) {
  character.focusTierChoices = {
    tier3: null, // Will store the chosen ability name
    tier6: null, // Will store the chosen ability name
  };
}

// Track extra focus ability selections available
if (!character.extraFocusAbilitySelections) {
  character.extraFocusAbilitySelections = {
    available: 0,
    used: 0,
  };
}

function getAvailableFocusAbilities() {
  const focus1 = character.focus1;
  const playerTier = character.tier || 1;

  if (!focus1) {
    return [];
  }

  // Check if focusAbilities is loaded
  if (typeof focusAbilities === "undefined") {
    console.error("focusAbilities is not loaded!");
    return [];
  }

  // Get abilities for focus
  let abilities = focusAbilities.filter(
    (ability) =>
      ability.Focus === focus1 && parseInt(ability.Tier) <= playerTier
  );

  return abilities;
}

function renderFocusAbilitiesTable() {
  console.log("renderFocusAbilitiesTable called");

  const container = document.querySelector(".focus-abilities-section");
  if (!container) {
    console.error("Focus abilities section not found");
    return;
  }

  const focus1 = character.focus1;
  const focus2 = character.focus2;

  console.log("Focus 1:", focus1, "Focus 2:", focus2);

  if (!focus1) {
    container.innerHTML = `
      <h2>Focus Abilities</h2>
      <div class="focus-abilities-empty">
        <p>Please confirm your character identity first to see available Focus abilities.</p>
      </div>
    `;
    return;
  }

  // Check if focusAbilities exists
  if (typeof focusAbilities === "undefined") {
    console.error("focusAbilities is not loaded!");
    container.innerHTML = `
      <h2>Focus Abilities</h2>
      <div class="focus-abilities-empty">
        <p style="color: #d32f2f;">Error: Focus abilities data not loaded. Please check that abilities.js is loaded correctly.</p>
      </div>
    `;
    return;
  }

  const availableAbilities = getAvailableFocusAbilities();

  console.log("Available focus abilities:", availableAbilities.length);

  // Build the HTML
  let html = `
    <h2>Focus Abilities</h2>
    
    <p id="focusAbilityCounter" style="background: #1a1a1a; border: 2px solid #317e30; border-radius: 6px; padding: 12px 20px; margin-bottom: 15px; text-align: center; font-size: 1.1em; font-weight: 600; color: #4caf50;">
      ${buildFocusCounterText()}
    </p>

    <div class="focus-abilities-list">
  `;

  if (availableAbilities.length === 0) {
    html += `
      <div class="focus-abilities-empty">
        <p>No focus abilities available.</p>
      </div>
    `;
  } else {
    // Group abilities by tier
    const abilitiesByTier = {};
    availableAbilities.forEach((ability) => {
      const tier = ability.Tier;
      if (!abilitiesByTier[tier]) {
        abilitiesByTier[tier] = [];
      }
      abilitiesByTier[tier].push(ability);
    });

    console.log("Abilities grouped by tier:", Object.keys(abilitiesByTier));

    // Render each tier
    Object.keys(abilitiesByTier)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach((tier) => {
        const tierAbilities = abilitiesByTier[tier];
        const tierNum = parseInt(tier);

        // Determine if this is a choice tier
        const isChoiceTier =
          (tierNum === 3 || tierNum === 6) && tierAbilities.length >= 2;

        let tierHeaderText = "";
        if (isChoiceTier) {
          if (tierAbilities.length === 2) {
            tierHeaderText = "Choose One";
          } else if (tierAbilities.length === 3) {
            tierHeaderText = "Choose One of First Two, Third Auto-Gained";
          } else {
            tierHeaderText = "Choose One of First Two, Rest Auto-Gained";
          }
        } else {
          tierHeaderText = "All Auto-Gained";
        }

        // Add tier header
        html += `
          <div class="focus-tier-header">
            <h3>Tier ${tier}</h3>
            <span class="tier-rule">${tierHeaderText}</span>
          </div>
        `;

        const choiceKey = `tier${tierNum}`;
        const hasChosenForTier =
          character.focusTierChoices?.[choiceKey] !== null;

        tierAbilities.forEach((ability, abilityIndex) => {
          // Determine ability status
          const isChoiceAbility = isChoiceTier && abilityIndex < 2;
          const isAutoGained = !isChoiceAbility;

          const isChosen =
            isChoiceAbility &&
            character.focusTierChoices?.[choiceKey] === ability.Ability;
          const isAvailableChoice = isChoiceAbility && !hasChosenForTier;
          const isExtraSelection = character.selectedFocusAbilities?.includes(
            ability.Ability
          );

          // Determine select button content
          let selectContent = "";
          let selectClass = "";

          if (isAutoGained) {
            selectContent = "✓";
            selectClass = "auto-gained";
          } else if (isChosen) {
            selectContent = "✓";
            selectClass = "chosen";
          } else if (isAvailableChoice) {
            selectContent = "";
            selectClass = "available";
          } else {
            selectContent = "";
            selectClass = "unavailable";
          }

          // Check for extra selection
          const canSelectExtra =
            !isAutoGained &&
            !isChosen &&
            character.extraFocusAbilitySelections?.available >
              character.extraFocusAbilitySelections?.used;

          // Build meta string for mobile
          const metaString = `Tier ${ability.Tier} • ${
            ability.Stat || "No Cost"
          } • ${ability.Cost || 0} Points`;

          html += `
            <div class="focus-ability-card ${
              isChosen || isAutoGained ? "selected-ability" : ""
            }">
              <div class="focus-ability-header">
                <div class="ability-select-cell">
                  ${
                    isAutoGained
                      ? `
                    <div class="ability-status-badge auto-gained">Auto</div>
                  `
                      : isChosen
                      ? `
                    <div class="ability-status-badge chosen">Chosen</div>
                  `
                      : isAvailableChoice
                      ? `
                    <button
                      class="ability-choice-btn"
                      onclick="chooseFocusTierAbility(${tierNum}, '${ability.Ability.replace(
                          /'/g,
                          "\\'"
                        )}')"
                    >
                      Choose
                    </button>
                  `
                      : `
                    <div class="ability-status-badge unavailable">—</div>
                  `
                  }
                  ${
                    isExtraSelection || canSelectExtra
                      ? `
                    <div style="margin-top: 5px;">
                      ${
                        isExtraSelection
                          ? `
                        <div class="ability-status-badge extra">Extra</div>
                      `
                          : `
                        <button
                          class="ability-extra-btn"
                          onclick="selectExtraFocusAbility('${ability.Ability.replace(
                            /'/g,
                            "\\'"
                          )}')"
                        >
                          Select Extra
                        </button>
                      `
                      }
                    </div>
                  `
                      : ""
                  }
                </div>

                <div class="ability-name-cell" data-meta="${metaString}">
                  <span class="ability-name">${ability.Ability}</span>
                </div>

                <div class="ability-tier-badge">
                  <span class="badge-label">Tier</span>
                  <span class="badge-value">${ability.Tier}</span>
                </div>

                <div class="ability-stat-badge">
                  <span class="badge-label">Stat</span>
                  <span class="badge-value">${ability.Stat || "—"}</span>
                </div>

                <div class="ability-points-badge">
                  <span class="badge-label">Cost</span>
                  <span class="badge-value">${ability.Cost || "—"}</span>
                </div>
              </div>

              <div class="focus-ability-description">
                <p>${ability.Effect || "No description available."}</p>
              </div>
            </div>
          `;
        });
      });
  }

  html += `</div>`;

  container.innerHTML = html;
  updateFocusAbilityCounter();
}

function buildFocusCounterText() {
  let text = `Tier 1 & 2: Auto-gained`;

  if (character.tier >= 3) {
    const tier3Choice = character.focusTierChoices?.tier3;
    text += ` | Tier 3: ${tier3Choice || "Not chosen"}`;
  }

  if (character.tier >= 6) {
    const tier6Choice = character.focusTierChoices?.tier6;
    text += ` | Tier 6: ${tier6Choice || "Not chosen"}`;
  }

  if (character.extraFocusAbilitySelections?.available > 0) {
    text += ` | Extra: ${character.extraFocusAbilitySelections.used}/${character.extraFocusAbilitySelections.available}`;
  }

  return text;
}

function chooseFocusTierAbility(tier, abilityName) {
  const choiceKey = `tier${tier}`;

  const confirmation = confirm(
    `Choose "${abilityName}" as your Tier ${tier} Focus ability?\n\n` +
      `This choice is permanent and cannot be changed.`
  );

  if (confirmation) {
    character.focusTierChoices[choiceKey] = abilityName;

    renderFocusAbilitiesTable();

    alert(
      `You have chosen "${abilityName}" as your Tier ${tier} Focus ability!`
    );

    // Find the ability data
    const abilityData = focusAbilities.find(
      (a) =>
        a.Ability === abilityName &&
        a.Focus === character.focus1 &&
        parseInt(a.Tier) === tier
    );

    if (abilityData && (abilityData.PoolIncrease || abilityData.EdgeIncrease)) {
      console.log("Stat increase detected for:", abilityName);
      console.log("Full ability data:", abilityData);

      // Create unique key
      const abilityKey = `${character.focus1}_${abilityName}_T${tier}`;

      // Initialize tracking if needed
      if (!character.appliedFocusPoolIncreases) {
        character.appliedFocusPoolIncreases = [];
      }

      // Check if already applied
      if (!character.appliedFocusPoolIncreases.includes(abilityKey)) {
        // Mark as applied
        character.appliedFocusPoolIncreases.push(abilityKey);

        // Apply the increase
        setTimeout(() => {
          applyFocusAbilityPoolIncrease(abilityData);
        }, 500);
      } else {
        console.log("Already applied:", abilityKey);
      }
    }
  }
}

function selectExtraFocusAbility(abilityName) {
  if (
    character.extraFocusAbilitySelections.used >=
    character.extraFocusAbilitySelections.available
  ) {
    alert("You have no extra Focus ability selections available!");
    return;
  }

  const confirmation = confirm(
    `Select "${abilityName}" as an extra Focus ability?\n\n` +
      `This will use one of your extra Focus ability selections.`
  );

  if (confirmation) {
    character.selectedFocusAbilities.push(abilityName);
    character.extraFocusAbilitySelections.used++;

    renderFocusAbilitiesTable();

    alert(`You have selected "${abilityName}" as an extra Focus ability!`);

    // Check if this ability grants a pool or edge increase
    const abilityData = focusAbilities.find(
      (a) => a.Ability === abilityName && a.Focus === character.focus1
    );

    if (abilityData && (abilityData.PoolIncrease || abilityData.EdgeIncrease)) {
      console.log("Stat increase detected for:", abilityName);
      console.log("PoolIncrease:", abilityData.PoolIncrease);
      console.log("EdgeIncrease:", abilityData.EdgeIncrease);
      console.log("EdgeIncreaseStat:", abilityData.EdgeIncreaseStat);

      // Apply or show allocation UI for pool/edge increase
      setTimeout(() => {
        applyFocusAbilityPoolIncrease(abilityData);
      }, 500);
    }
  }
}

function grantExtraFocusAbilitySelection() {
  character.extraFocusAbilitySelections.available++;
  renderFocusAbilitiesTable();

  alert(
    `You can now select 1 additional Focus ability!\n\n` +
      `Look for abilities marked "Select as Extra" in the Focus Abilities table.`
  );
}

function updateFocusAbilityCounter() {
  const counter = document.getElementById("focusAbilityCounter");
  if (counter) {
    let text = `Tier 1 & 2: Auto-gained`;

    if (character.tier >= 3) {
      const tier3Choice = character.focusTierChoices.tier3;
      text += ` | Tier 3: ${tier3Choice || "Not chosen"}`;
    }

    if (character.tier >= 6) {
      const tier6Choice = character.focusTierChoices.tier6;
      text += ` | Tier 6: ${tier6Choice || "Not chosen"}`;
    }

    if (character.extraFocusAbilitySelections.available > 0) {
      text += ` | Extra: ${character.extraFocusAbilitySelections.used}/${character.extraFocusAbilitySelections.available}`;
    }

    counter.textContent = text;
  }
}

// ==================== ABILITY SELECTION LIMITS ==================== //

function getTypeAbilitiesMax() {
  // 2 at tier 1, +2 for each tier increase
  return 2 + (character.tier - 1) * 2;
}

function getFocusAbilitiesMax() {
  // 1 at tier 1, +1 for each tier increase
  return character.tier;
}

function getSelectedTypeAbilities() {
  return selectedAbilities.filter((a) => {
    if (!a.type) return false;
    return a.type === character.type;
  });
}

function getSelectedFocusAbilities() {
  return selectedAbilities.filter((a) => {
    if (!a.focus) return false;
    return a.focus === character.focus1 || a.focus === character.focus2;
  });
}

// ==================== ABILITY MANAGEMENT ==================== //

let selectedAbilities = [];

function getAvailableAbilities() {
  if (!character.type || !character.tier) {
    return [];
  }

  const type = character.type;
  const tier = character.tier;
  const focus1 = character.focus1;
  const focus2 = character.focus2;

  let abilities = [];

  if (typeof ABILITIES_DATA !== "undefined" && ABILITIES_DATA.length > 0) {
    abilities = ABILITIES_DATA.filter(
      (ability) => ability.type === type && ability.tier <= tier
    );
  }

  if (typeof focusAbilities !== "undefined" && focusAbilities.length > 0) {
    if (focus1) {
      const focus1Abilities = focusAbilities.filter(
        (ability) =>
          ability.focus === focus1 && (!ability.tier || ability.tier <= tier)
      );
      abilities = abilities.concat(focus1Abilities);
    }

    if (focus2) {
      const focus2Abilities = focusAbilities.filter(
        (ability) =>
          ability.focus === focus2 && (!ability.tier || ability.tier <= tier)
      );
      abilities = abilities.concat(focus2Abilities);
    }
  }

  const uniqueAbilities = [];
  const seenNames = new Set();
  abilities.forEach((ability) => {
    if (!seenNames.has(ability.name)) {
      seenNames.add(ability.name);
      uniqueAbilities.push(ability);
    }
  });

  return uniqueAbilities;
}

function removeAbility(index) {
  selectedAbilities.splice(index, 1);
  renderTypeAbilitiesTable();
  renderFocusAbilitiesTable();
  updateSummary();
}

// ==================== TYPE ABILITIES TABLE MANAGEMENT ==================== //

// Track selected type abilities
if (!character.selectedTypeAbilities) {
  character.selectedTypeAbilities = [];
}

// Track how many type abilities the player can select
if (!character.typeAbilitySelections) {
  character.typeAbilitySelections = {
    available: 0,
    used: 0,
    confirmed: false,
  };
}

// Track current filters
let typeAbilitiesFilters = {
  tier: "all",
  stat: "all",
  stress: "all",
  sortBy: "tier",
  viewMode: "all", // 'all' or 'selected'
};

function getAvailableTypeAbilities() {
  const type = character.type;
  const playerTier = character.tier || 1;

  console.log("=== getAvailableTypeAbilities DEBUG ===");
  console.log("Character type:", type);
  console.log("Player tier:", playerTier);

  if (!type) {
    console.error("No character type selected");
    return [];
  }

  // Check multiple possible variable names for type abilities data
  let abilitiesData = null;

  if (typeof typeAbilities !== "undefined") {
    abilitiesData = typeAbilities;
    console.log("✓ Using typeAbilities variable");
  } else if (typeof ABILITIES_DATA !== "undefined") {
    abilitiesData = ABILITIES_DATA;
    console.log("✓ Using ABILITIES_DATA variable");
  } else if (typeof abilitiesData !== "undefined") {
    abilitiesData = window.abilitiesData;
    console.log("✓ Using abilitiesData variable");
  } else {
    console.error("❌ Type abilities data not loaded!");
    console.error(
      "Available globals:",
      Object.keys(window).filter((k) => k.toLowerCase().includes("abilit"))
    );
    return [];
  }

  console.log("Total abilities in database:", abilitiesData.length);

  // Log first ability to see structure
  if (abilitiesData.length > 0) {
    console.log("Sample ability structure:", abilitiesData[0]);
    console.log("Keys:", Object.keys(abilitiesData[0]));
  }

  // Get abilities for this type at or below current tier
  // Check what the actual property names are
  let abilities = abilitiesData.filter((ability) => {
    const abilityType = ability.Type || ability.type || ability.CLASS;
    const abilityTier = ability.Tier || ability.tier || ability.TIER;

    return abilityType === type && parseInt(abilityTier) <= playerTier;
  });

  console.log(
    `Found ${abilities.length} abilities for ${type} at tier ${playerTier}`
  );

  if (abilities.length > 0) {
    console.log("Sample ability:", abilities[0]);
  }

  return abilities;
}

function renderTypeAbilitiesTable() {
  console.log("renderTypeAbilitiesTable called");

  const container = document.querySelector(".type-abilities-section");
  if (!container) {
    console.error("Type abilities section not found");
    return;
  }

  const type = character.type;
  if (!type) {
    container.innerHTML = `
      <h2>Type Abilities</h2>
      <div class="type-abilities-empty">
        <p>Please confirm your character identity first to see available Type abilities.</p>
      </div>
    `;
    return;
  }

  // Get all available abilities
  let abilities = getAvailableTypeAbilities();

  console.log(
    "Raw abilities from getAvailableTypeAbilities:",
    abilities.length
  );

  // Apply filters
  abilities = applyTypeAbilitiesFilters(abilities);

  console.log("Abilities after filters:", abilities.length);

  // Apply sorting
  abilities = sortTypeAbilities(abilities);

  // Build the HTML - preserve the existing h2
  let html = `
    <!-- Filters Section -->
    <div class="type-abilities-filter">
      <div class="filter-row">
        <div class="filter-group">
          <label for="filterTier">Filter by Tier:</label>
          <select id="filterTier" onchange="updateTypeAbilitiesFilters()">
            <option value="all">All Tiers</option>
            ${[1, 2, 3, 4, 5, 6]
              .map(
                (t) =>
                  `<option value="${t}" ${
                    typeAbilitiesFilters.tier == t ? "selected" : ""
                  }>Tier ${t}</option>`
              )
              .join("")}
          </select>
        </div>

        <div class="filter-group">
          <label for="filterStat">Filter by Stat:</label>
          <select id="filterStat" onchange="updateTypeAbilitiesFilters()">
            <option value="all">All Stats</option>
            <option value="Might" ${
              typeAbilitiesFilters.stat === "Might" ? "selected" : ""
            }>Might</option>
            <option value="Speed" ${
              typeAbilitiesFilters.stat === "Speed" ? "selected" : ""
            }>Speed</option>
            <option value="Intellect" ${
              typeAbilitiesFilters.stat === "Intellect" ? "selected" : ""
            }>Intellect</option>
            <option value="None" ${
              typeAbilitiesFilters.stat === "None" ? "selected" : ""
            }>No Stat Cost</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="filterStress">Filter by Stress:</label>
          <select id="filterStress" onchange="updateTypeAbilitiesFilters()">
            <option value="all">All Stress Levels</option>
            <option value="0" ${
              typeAbilitiesFilters.stress == 0 ? "selected" : ""
            }>No Stress</option>
            <option value="1" ${
              typeAbilitiesFilters.stress == 1 ? "selected" : ""
            }>1 Stress</option>
            <option value="2+" ${
              typeAbilitiesFilters.stress === "2+" ? "selected" : ""
            }>2+ Stress</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="sortBy">Sort by:</label>
          <select id="sortBy" onchange="updateTypeAbilitiesFilters()">
            <option value="tier" ${
              typeAbilitiesFilters.sortBy === "tier" ? "selected" : ""
            }>Tier</option>
            <option value="name" ${
              typeAbilitiesFilters.sortBy === "name" ? "selected" : ""
            }>Name</option>
            <option value="stat" ${
              typeAbilitiesFilters.sortBy === "stat" ? "selected" : ""
            }>Stat</option>
            <option value="stress" ${
              typeAbilitiesFilters.sortBy === "stress" ? "selected" : ""
            }>Stress</option>
          </select>
        </div>
      </div>

      <div class="filter-actions">
        <button class="clear-filters-btn" onclick="clearTypeAbilitiesFilters()">Clear Filters</button>
      </div>

      <div class="filter-buttons">
        <span>View:</span>
        <button
          id="typeAbilitiesShowAll"
          class="filter-btn ${
            typeAbilitiesFilters.viewMode === "all" ? "active" : ""
          }"
          onclick="toggleTypeAbilitiesView('all')"
        >
          Show All Available
        </button>
        <button
          id="typeAbilitiesShowSelected"
          class="filter-btn ${
            typeAbilitiesFilters.viewMode === "selected" ? "active" : ""
          }"
          onclick="toggleTypeAbilitiesView('selected')"
        >
          Show Selected Only
        </button>
      </div>
    </div>

    <p id="typeAbilityCounter">Selected: ${
      character.typeAbilitySelections.used
    }/${character.typeAbilitySelections.available}</p>

    <div class="type-abilities-list">
  `;

  if (abilities.length === 0) {
    html += `
      <div class="type-abilities-empty">
        <p>No abilities match your current filters.</p>
      </div>
    `;
  } else {
    abilities.forEach((ability) => {
      // Handle both property name formats (Ability vs name, etc.)
      const abilityName = ability.Ability || ability.name || "Unknown";
      const abilityTier = ability.Tier || ability.tier || 1;
      const abilityStat = ability.Stat || ability.stat || "";
      const abilityPoints =
        ability.Points ||
        ability.points ||
        ability.cost ||
        ability.pointsRequired ||
        "";
      const abilityStress = ability.Stress || ability.stress || 0;
      const abilityDescription =
        ability.Description ||
        ability.description ||
        ability.effect ||
        "No description available.";

      const isSelected = character.selectedTypeAbilities.includes(abilityName);
      const isLocked = character.typeAbilitySelections.confirmed;
      const canSelect =
        !isLocked &&
        (isSelected ||
          character.typeAbilitySelections.used <
            character.typeAbilitySelections.available);

      // Check if it's a supernatural ability - checking the 'supernatural' boolean property
      const isSupernatural = ability.supernatural === true;

      const nameClass = isSupernatural ? "supernatural-ability-name" : "";

      // Build meta string for mobile
      const metaString = `Tier ${abilityTier} • ${
        abilityStat || "No Cost"
      } • ${abilityStress} Stress`;

      // Escape single quotes for onclick handler
      const escapedName = abilityName.replace(/'/g, "\\'");

      html += `
        <div class="type-ability-card ${isSelected ? "selected-ability" : ""}">
          <div class="type-ability-header">
            <div class="ability-select-cell">
              <button
                class="ability-toggle-btn ${isSelected ? "selected" : ""}"
                onclick="toggleTypeAbility('${escapedName}')"
                ${!canSelect && !isSelected ? "disabled" : ""}
              ></button>
            </div>

            <div class="ability-name-cell" data-meta="${metaString}">
              <span class="ability-name ${nameClass}">${abilityName}</span>
            </div>

            <div class="ability-tier-badge">
              <span class="badge-label">Tier</span>
              <span class="badge-value">${abilityTier}</span>
            </div>

            <div class="ability-stat-badge">
              <span class="badge-label">Stat</span>
              <span class="badge-value">${abilityStat || "—"}</span>
            </div>

            <div class="ability-points-badge">
              <span class="badge-label">Cost</span>
              <span class="badge-value">${abilityPoints || "—"}</span>
            </div>

            <div class="ability-stress-badge">
              <span class="badge-label">Stress</span>
              <span class="badge-value">${abilityStress}</span>
            </div>
          </div>

          <div class="type-ability-description">
            <p>${abilityDescription}</p>
          </div>
        </div>
      `;
    });
  }

  html += `</div>`;

  // Find the content div, not the whole section
  const contentDiv = container.querySelector(".type-abilities-content");
  if (contentDiv) {
    // Update just the content, preserve the h2
    const h2 = container.querySelector("h2");
    container.innerHTML = "";
    if (h2) container.appendChild(h2);
    container.insertAdjacentHTML("beforeend", html);
  } else {
    // Fallback: replace entire container content but keep h2
    const h2 = container.querySelector("h2");
    const h2Text = h2 ? h2.outerHTML : "<h2>Type Abilities</h2>";
    container.innerHTML = h2Text + html;
  }

  updateTypeAbilityCounter();
  updateTypeAbilityConfirmButton();
}

function applyTypeAbilitiesFilters(abilities) {
  let filtered = [...abilities];

  // View mode filter (all vs selected)
  if (typeAbilitiesFilters.viewMode === "selected") {
    filtered = filtered.filter((ability) => {
      const abilityName = ability.Ability || ability.name;
      return character.selectedTypeAbilities.includes(abilityName);
    });
  }

  // Tier filter
  if (typeAbilitiesFilters.tier !== "all") {
    filtered = filtered.filter((ability) => {
      const tier = ability.Tier || ability.tier;
      return parseInt(tier) === parseInt(typeAbilitiesFilters.tier);
    });
  }

  // Stat filter
  if (typeAbilitiesFilters.stat !== "all") {
    if (typeAbilitiesFilters.stat === "None") {
      filtered = filtered.filter((ability) => {
        const stat = ability.Stat || ability.stat;
        return !stat || stat === "";
      });
    } else {
      filtered = filtered.filter((ability) => {
        const stat = ability.Stat || ability.stat;
        return stat === typeAbilitiesFilters.stat;
      });
    }
  }

  // Stress filter
  if (typeAbilitiesFilters.stress !== "all") {
    if (typeAbilitiesFilters.stress === "0") {
      filtered = filtered.filter((ability) => {
        const stress = ability.Stress || ability.stress;
        return !stress || parseInt(stress) === 0;
      });
    } else if (typeAbilitiesFilters.stress === "1") {
      filtered = filtered.filter((ability) => {
        const stress = ability.Stress || ability.stress;
        return parseInt(stress || 0) === 1;
      });
    } else if (typeAbilitiesFilters.stress === "2+") {
      filtered = filtered.filter((ability) => {
        const stress = ability.Stress || ability.stress;
        return parseInt(stress || 0) >= 2;
      });
    }
  }

  return filtered;
}

function sortTypeAbilities(abilities) {
  const sortBy = typeAbilitiesFilters.sortBy;

  return abilities.sort((a, b) => {
    switch (sortBy) {
      case "tier":
        const tierA = a.Tier || a.tier || 1;
        const tierB = b.Tier || b.tier || 1;
        return parseInt(tierA) - parseInt(tierB);
      case "name":
        const nameA = a.Ability || a.name || "";
        const nameB = b.Ability || b.name || "";
        return nameA.localeCompare(nameB);
      case "stat":
        const statA = a.Stat || a.stat || "ZZZ";
        const statB = b.Stat || b.stat || "ZZZ";
        return statA.localeCompare(statB);
      case "stress":
        const stressA = a.Stress || a.stress || 0;
        const stressB = b.Stress || b.stress || 0;
        return parseInt(stressA) - parseInt(stressB);
      default:
        return 0;
    }
  });
}

function updateTypeAbilitiesFilters() {
  typeAbilitiesFilters.tier =
    document.getElementById("filterTier")?.value || "all";
  typeAbilitiesFilters.stat =
    document.getElementById("filterStat")?.value || "all";
  typeAbilitiesFilters.stress =
    document.getElementById("filterStress")?.value || "all";
  typeAbilitiesFilters.sortBy =
    document.getElementById("sortBy")?.value || "tier";

  renderTypeAbilitiesTable();
}

function clearTypeAbilitiesFilters() {
  typeAbilitiesFilters = {
    tier: "all",
    stat: "all",
    stress: "all",
    sortBy: "tier",
    viewMode: typeAbilitiesFilters.viewMode, // Keep view mode
  };

  renderTypeAbilitiesTable();
}

function toggleTypeAbilitiesView(mode) {
  typeAbilitiesFilters.viewMode = mode;
  renderTypeAbilitiesTable();
}

function toggleTypeAbility(abilityName) {
  // Check if abilities are locked
  if (character.typeAbilitySelections.confirmed) {
    alert("Type abilities have been confirmed and cannot be changed.");
    return;
  }

  const isSelected = character.selectedTypeAbilities.includes(abilityName);

  if (isSelected) {
    // Deselect
    character.selectedTypeAbilities = character.selectedTypeAbilities.filter(
      (name) => name !== abilityName
    );
    character.typeAbilitySelections.used--;
  } else {
    // Check if can select more
    if (
      character.typeAbilitySelections.used >=
      character.typeAbilitySelections.available
    ) {
      alert(
        `You can only select ${character.typeAbilitySelections.available} Type abilities.`
      );
      return;
    }

    // Select
    character.selectedTypeAbilities.push(abilityName);
    character.typeAbilitySelections.used++;
  }

  renderTypeAbilitiesTable();
}

function updateTypeAbilityCounter() {
  const counter = document.getElementById("typeAbilityCounter");
  if (counter) {
    counter.textContent = `Selected: ${character.typeAbilitySelections.used}/${character.typeAbilitySelections.available}`;
  }
}

// Update confirm button visibility/state
function updateTypeAbilityConfirmButton() {
  const confirmBtn = document.getElementById("confirmTypeAbilitiesBtn");
  if (!confirmBtn) return;

  const required = character.typeAbilitySelections.available;
  const selected = character.typeAbilitySelections.used;
  const isConfirmed = character.typeAbilitySelections.confirmed;

  if (isConfirmed) {
    confirmBtn.textContent = "✓ Abilities Confirmed";
    confirmBtn.disabled = true;
    confirmBtn.style.background = "#555";
  } else if (selected === required && required > 0) {
    confirmBtn.textContent = `Confirm ${selected} Type Abilities`;
    confirmBtn.disabled = false;
    confirmBtn.style.background = "#317e30";
  } else if (required === 0) {
    confirmBtn.textContent = "No Abilities to Select Yet";
    confirmBtn.disabled = true;
    confirmBtn.style.background = "#555";
  } else {
    confirmBtn.textContent = `Select ${required - selected} More Abilities`;
    confirmBtn.disabled = true;
    confirmBtn.style.background = "#555";
  }
}

// Confirm and lock Type Abilities
function confirmTypeAbilities() {
  const required = character.typeAbilitySelections.available;
  const selected = character.typeAbilitySelections.used;

  if (selected < required) {
    alert(`Please select ${required} Type abilities before confirming.`);
    return;
  }

  const confirmation = confirm(
    `Confirm your ${selected} Type ability selections?\n\n` +
      `Selected abilities:\n${character.selectedTypeAbilities.join("\n")}\n\n` +
      `Once confirmed, you cannot change these selections without GM approval.`
  );

  if (confirmation) {
    character.typeAbilitySelections.confirmed = true;

    renderTypeAbilitiesTable();

    alert(
      "Type abilities confirmed!\n\n" +
        "Your selections have been locked in.\n" +
        "You can now proceed with character creation."
    );
  }
}

//  Unlock abilities when granting new selections
function grantTypeAbilitySelections(count) {
  character.typeAbilitySelections.available += count;
  character.typeAbilitySelections.confirmed = false;

  console.log(
    `Granted ${count} Type ability selections. Total available: ${character.typeAbilitySelections.available}`
  );

  renderTypeAbilitiesTable();
}

// ==================== FOCUS ABILITIES TABLE MANAGEMENT ==================== //

// Track selected focus abilities
if (!character.selectedFocusAbilities) {
  character.selectedFocusAbilities = [];
}

// Track tier 3 and tier 6 choices
if (!character.focusTierChoices) {
  character.focusTierChoices = {
    tier3: null, // Will store the chosen ability name
    tier6: null, // Will store the chosen ability name
  };
}

// Track extra focus ability selections available
if (!character.extraFocusAbilitySelections) {
  character.extraFocusAbilitySelections = {
    available: 0,
    used: 0,
  };
}

// ==================== FOCUS ABILITIES ==================== //

function applyFocusAbilityPoolIncrease(ability) {
  console.log("=== applyFocusAbilityPoolIncrease called ===");
  console.log("Ability:", ability);
  console.log("EdgeIncrease:", ability.EdgeIncrease);
  console.log("EdgeIncreaseStat:", ability.EdgeIncreaseStat);
  console.log("PoolIncrease:", ability.PoolIncrease);
  console.log("PoolStats:", ability.PoolStats);

  // Check for Edge increases first
  if (ability.EdgeIncrease && ability.EdgeIncrease > 0) {
    const edgeIncrease = ability.EdgeIncrease;
    const stats = ability.EdgeIncreaseStat;

    console.log(">>> Edge increase detected:", edgeIncrease, "Stats:", stats);

    if (!stats || (Array.isArray(stats) && stats.length === 0)) {
      console.log("ERROR: No stats specified for edge increase");
      return;
    }

    // If single stat, apply immediately
    if (Array.isArray(stats) && stats.length === 1) {
      const stat = stats[0];
      console.log(`>>> Applying +${edgeIncrease} to ${stat} Edge`);
      console.log(`>>> Current ${stat} Edge:`, character.edge[stat]);

      character.edge[stat] += edgeIncrease;

      console.log(`>>> New ${stat} Edge:`, character.edge[stat]);

      const edgeElement = document.getElementById(`${stat.toLowerCase()}Edge`);
      if (edgeElement) {
        edgeElement.textContent = character.edge[stat];
        console.log(`>>> Updated DOM element for ${stat} Edge`);
      } else {
        console.log(
          `ERROR: Could not find DOM element ${stat.toLowerCase()}Edge`
        );
      }

      alert(
        `${ability.Ability} granted!\n\n+${edgeIncrease} to ${stat} Edge\n\nYour ${stat} Edge is now ${character.edge[stat]}`
      );
      return;
    }

    // Multiple stats - show allocation UI for Edge
    if (Array.isArray(stats) && stats.length > 1) {
      console.log(">>> Showing edge allocation UI for multiple stats");
      showFocusEdgeAllocationUI(ability, stats, edgeIncrease);
      return;
    }
  }

  // Check for Pool increases
  if (!ability.PoolIncrease || ability.PoolIncrease <= 0) {
    console.log("No pool increase for this ability");
    return;
  }

  const poolIncrease = ability.PoolIncrease;
  const stats = ability.PoolStats;

  console.log(">>> Pool increase detected:", poolIncrease, "Stats:", stats);

  // If no stats specified, skip
  if (!stats || (Array.isArray(stats) && stats.length === 0)) {
    console.log("ERROR: No stats specified for pool increase");
    return;
  }

  // If single stat, apply immediately
  if (Array.isArray(stats) && stats.length === 1) {
    const stat = stats[0];
    console.log(`>>> Applying +${poolIncrease} to ${stat} Pool`);
    console.log(`>>> Current ${stat} Pool:`, character.stats[stat]);

    character.stats[stat] += poolIncrease;
    character.currentPools[stat] += poolIncrease;

    console.log(`>>> New ${stat} Pool:`, character.stats[stat]);

    const maxElement = document.getElementById(`${stat.toLowerCase()}Max`);
    const poolElement = document.getElementById(`${stat.toLowerCase()}Pool`);

    if (maxElement) maxElement.textContent = character.stats[stat];
    if (poolElement) poolElement.textContent = character.currentPools[stat];

    alert(
      `${ability.Ability} granted!\n\n+${poolIncrease} to ${stat} Pool\n\nYour ${stat} Pool is now ${character.stats[stat]}`
    );
    return;
  }

  // Multiple stats - show allocation UI
  if (Array.isArray(stats) && stats.length > 1) {
    console.log(">>> Showing pool allocation UI for multiple stats");
    showFocusPoolAllocationUI(ability, stats, poolIncrease);
  }
}

// Create UI for allocating pool increases across multiple stats:

function showFocusPoolAllocationUI(ability, stats, totalPoints) {
  // Check if UI already exists
  if (document.getElementById("focusPoolAllocation")) {
    document.getElementById("focusPoolAllocation").remove();
  }

  const characterTab = document.querySelector("#character");

  if (!characterTab) {
    console.error("Character tab not found");
    return;
  }

  // Create allocation tracking
  const allocation = {};
  stats.forEach((stat) => {
    allocation[stat] = 0;
  });

  const allocationUI = document.createElement("div");
  allocationUI.id = "focusPoolAllocation";
  allocationUI.className = "allocation-ui";
  allocationUI.style.cssText = `
    background: #2a2a2a;
    border: 2px solid #9c27b0;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    order: 4;
  `;

  allocationUI.innerHTML = `
    <h3 style="color: #9c27b0; margin-top: 0;">Focus Ability: ${
      ability.Ability
    }</h3>
    <p style="color: #ddd; margin-bottom: 15px;">
      This ability grants you <strong style="color: #9c27b0;">${totalPoints} points</strong> to allocate among the following stat pools.
    </p>
    <p style="color: #ddd; margin-bottom: 20px;">
      Points Remaining: <strong style="color: #9c27b0; font-size: 1.2em;"><span id="focusPoolPointsRemaining">${totalPoints}</span></strong>
    </p>

    <div style="display: flex; flex-direction: column; gap: 15px;">
      ${stats
        .map(
          (stat) => `
        <div style="background: #1a1a1a; padding: 15px; border-radius: 6px; border: 1px solid #444;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <label style="color: #ddd; font-weight: bold;">${stat}:</label>
            <span style="color: #9c27b0; font-size: 1.1em; font-weight: bold;">
              <span id="focusPool${stat}Allocated">0</span> points
            </span>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button 
              onclick="adjustFocusPoolAllocation('${stat}', -1)"
              style="
                background: #d32f2f;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
              "
            >
              −
            </button>
            <button 
              onclick="adjustFocusPoolAllocation('${stat}', 1)"
              style="
                background: #4CAF50;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
              "
            >
              +
            </button>
          </div>
        </div>
      `
        )
        .join("")}
    </div>

    <div style="margin-top: 20px;">
      <button 
        class="confirm-button" 
        id="confirmFocusPoolAllocation" 
        onclick="confirmFocusPoolAllocation('${ability.Ability}')"
        style="
          width: 100%;
          background: #9c27b0;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        "
        disabled
      >
        Allocate All Points First
      </button>
    </div>
  `;

  // Store allocation data on the UI element
  allocationUI.dataset.stats = JSON.stringify(stats);
  allocationUI.dataset.totalPoints = totalPoints;
  allocationUI.dataset.allocation = JSON.stringify(allocation);

  // Insert into Character tab
  const statAllocationUI = document.getElementById("statAllocation");
  const firstSection = characterTab.querySelector(".section");

  if (statAllocationUI && statAllocationUI.style.display !== "none") {
    statAllocationUI.insertAdjacentElement("afterend", allocationUI);
  } else if (firstSection) {
    characterTab.insertBefore(allocationUI, firstSection);
  } else {
    characterTab.insertBefore(allocationUI, characterTab.firstChild);
  }

  console.log("Focus pool allocation UI shown");
}

// Adjust allocation for a specific stat:

function adjustFocusPoolAllocation(stat, change) {
  const allocationUI = document.getElementById("focusPoolAllocation");

  if (!allocationUI) return;

  const totalPoints = parseInt(allocationUI.dataset.totalPoints);
  const allocation = JSON.parse(allocationUI.dataset.allocation);

  // Calculate current total allocated
  const currentTotal = Object.values(allocation).reduce(
    (sum, val) => sum + val,
    0
  );

  // Check if we can make this change
  if (change > 0 && currentTotal >= totalPoints) {
    // Can't allocate more than total
    return;
  }

  if (change < 0 && allocation[stat] <= 0) {
    // Can't go below 0
    return;
  }

  // Apply change
  allocation[stat] += change;

  // Update display
  const allocatedDisplay = document.getElementById(`focusPool${stat}Allocated`);
  if (allocatedDisplay) {
    allocatedDisplay.textContent = allocation[stat];
  }

  // Update remaining points
  const newTotal = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  const remaining = totalPoints - newTotal;

  const remainingDisplay = document.getElementById("focusPoolPointsRemaining");
  if (remainingDisplay) {
    remainingDisplay.textContent = remaining;
  }

  // Update confirm button
  const confirmBtn = document.getElementById("confirmFocusPoolAllocation");
  if (confirmBtn) {
    if (remaining === 0) {
      confirmBtn.textContent = "Confirm Allocation";
      confirmBtn.disabled = false;
    } else {
      confirmBtn.textContent = `Allocate ${remaining} More Point${
        remaining !== 1 ? "s" : ""
      } First`;
      confirmBtn.disabled = true;
    }
  }

  // Store updated allocation
  allocationUI.dataset.allocation = JSON.stringify(allocation);

  console.log("Allocation updated:", allocation, "Remaining:", remaining);
}

// Confirm and apply the allocation:
function confirmFocusPoolAllocation(abilityName) {
  const allocationUI = document.getElementById("focusPoolAllocation");

  if (!allocationUI) return;

  const allocation = JSON.parse(allocationUI.dataset.allocation);
  const totalPoints = parseInt(allocationUI.dataset.totalPoints);

  // Verify all points are allocated
  const allocated = Object.values(allocation).reduce(
    (sum, val) => sum + val,
    0
  );

  if (allocated !== totalPoints) {
    alert("Please allocate all points before confirming.");
    return;
  }

  const confirmation = confirm(
    `Confirm pool allocation for ${abilityName}?\n\n` +
      Object.entries(allocation)
        .filter(([_, val]) => val > 0)
        .map(([stat, val]) => `${stat}: +${val}`)
        .join("\n") +
      `\n\nThis cannot be changed once confirmed.`
  );

  if (!confirmation) return;

  // Apply allocation
  Object.entries(allocation).forEach(([stat, points]) => {
    if (points > 0) {
      character.stats[stat] += points;
      character.currentPools[stat] += points;

      const maxElement = document.getElementById(`${stat.toLowerCase()}Max`);
      const poolElement = document.getElementById(`${stat.toLowerCase()}Pool`);

      if (maxElement) maxElement.textContent = character.stats[stat];
      if (poolElement) poolElement.textContent = character.currentPools[stat];

      console.log(`${stat} increased by ${points}`);
    }
  });

  // Remove UI
  allocationUI.remove();

  alert(
    `Pool increase from ${abilityName} applied!\n\n` +
      Object.entries(allocation)
        .filter(([_, val]) => val > 0)
        .map(
          ([stat, val]) =>
            `${stat} Pool: +${val} (now ${character.stats[stat]})`
        )
        .join("\n")
  );
}

function getAvailableFocusAbilities() {
  const focus1 = character.focus1;
  const focus2 = character.focus2;
  const playerTier = character.tier || 1;

  if (!focus1) {
    return [];
  }

  // Check if focusAbilities is loaded
  if (typeof focusAbilities === "undefined") {
    console.error("focusAbilities is not loaded!");
    return [];
  }

  // Get abilities for focus1 and focus2 (if exists)
  let abilities = focusAbilities.filter(
    (ability) =>
      (ability.Focus === focus1 || (focus2 && ability.Focus === focus2)) &&
      parseInt(ability.Tier) <= playerTier
  );

  return abilities;
}

function chooseFocusTierAbility(tier, abilityName) {
  const choiceKey = `tier${tier}`;

  const confirmation = confirm(
    `Choose "${abilityName}" as your Tier ${tier} Focus ability?\n\n` +
      `This choice is permanent and cannot be changed.`
  );

  if (confirmation) {
    character.focusTierChoices[choiceKey] = abilityName;

    renderFocusAbilitiesTable();

    alert(
      `You have chosen "${abilityName}" as your Tier ${tier} Focus ability!`
    );

    // Find the ability data
    const abilityData = focusAbilities.find(
      (a) =>
        a.Ability === abilityName &&
        a.Focus === character.focus1 &&
        parseInt(a.Tier) === tier
    );

    if (abilityData && (abilityData.PoolIncrease || abilityData.EdgeIncrease)) {
      console.log("Stat increase detected for:", abilityName);
      console.log("Full ability data:", abilityData);

      // Create unique key
      const abilityKey = `${character.focus1}_${abilityName}_T${tier}`;

      // Initialize tracking if needed
      if (!character.appliedFocusPoolIncreases) {
        character.appliedFocusPoolIncreases = [];
      }

      // Check if already applied
      if (!character.appliedFocusPoolIncreases.includes(abilityKey)) {
        // Mark as applied
        character.appliedFocusPoolIncreases.push(abilityKey);

        // Apply the increase
        setTimeout(() => {
          applyFocusAbilityPoolIncrease(abilityData);
        }, 500);
      } else {
        console.log("Already applied:", abilityKey);
      }
    }
  }
}

function selectExtraFocusAbility(abilityName) {
  if (
    character.extraFocusAbilitySelections.used >=
    character.extraFocusAbilitySelections.available
  ) {
    alert("You have no extra Focus ability selections available!");
    return;
  }

  const confirmation = confirm(
    `Select "${abilityName}" as an extra Focus ability?\n\n` +
      `This will use one of your extra Focus ability selections.`
  );

  if (confirmation) {
    character.selectedFocusAbilities.push(abilityName);
    character.extraFocusAbilitySelections.used++;

    renderFocusAbilitiesTable();

    alert(`You have selected "${abilityName}" as an extra Focus ability!`);

    // Check if this ability grants a pool or edge increase
    const abilityData = focusAbilities.find(
      (a) => a.Ability === abilityName && a.Focus === character.focus1
    );

    if (abilityData && (abilityData.PoolIncrease || abilityData.EdgeIncrease)) {
      console.log("Stat increase detected for:", abilityName);
      console.log("PoolIncrease:", abilityData.PoolIncrease);
      console.log("EdgeIncrease:", abilityData.EdgeIncrease);
      console.log("EdgeIncreaseStat:", abilityData.EdgeIncreaseStat);

      // Apply or show allocation UI for pool/edge increase
      setTimeout(() => {
        applyFocusAbilityPoolIncrease(abilityData);
      }, 500);
    }
  }
}

function grantExtraFocusAbilitySelection() {
  character.extraFocusAbilitySelections.available++;
  renderFocusAbilitiesTable();

  alert(
    `You can now select 1 additional Focus ability!\n\n` +
      `Look for abilities marked "Select as Extra" in the Focus Abilities table.`
  );
}

function updateFocusAbilityCounter() {
  const counter = document.getElementById("focusAbilityCounter");
  if (counter) {
    let text = `Tier 1 & 2: Auto-gained`;

    if (character.tier >= 3) {
      const tier3Choice = character.focusTierChoices.tier3;
      text += ` | Tier 3: ${tier3Choice || "Not chosen"}`;
    }

    if (character.tier >= 6) {
      const tier6Choice = character.focusTierChoices.tier6;
      text += ` | Tier 6: ${tier6Choice || "Not chosen"}`;
    }

    if (character.extraFocusAbilitySelections.available > 0) {
      text += ` | Extra: ${character.extraFocusAbilitySelections.used}/${character.extraFocusAbilitySelections.available}`;
    }

    counter.textContent = text;
  }
}

function checkAllFocusAbilitiesForPoolIncreases() {
  console.log("=== Checking all focus abilities for pool/edge increases ===");
  console.log("Current tier:", character.tier);
  console.log("Focus:", character.focus1);

  // Initialize tracking if needed
  if (!character.appliedFocusPoolIncreases) {
    character.appliedFocusPoolIncreases = [];
    console.log("Initialized appliedFocusPoolIncreases array");
  }

  console.log("Already applied:", character.appliedFocusPoolIncreases);

  const availableAbilities = getAvailableFocusAbilities();

  console.log("Available abilities:", availableAbilities.length);

  availableAbilities.forEach((ability) => {
    const tier = parseInt(ability.Tier);
    console.log(`\n--- Checking: ${ability.Ability} (Tier ${tier}) ---`);

    const isAutoGained = tier !== 3 && tier !== 6;

    // Check if this is a chosen ability for tier 3 or 6
    const isChosenTier3 =
      tier === 3 && character.focusTierChoices?.tier3 === ability.Ability;
    const isChosenTier6 =
      tier === 6 && character.focusTierChoices?.tier6 === ability.Ability;
    const isChosen = isChosenTier3 || isChosenTier6;

    const isExtra = character.selectedFocusAbilities?.includes(ability.Ability);

    console.log(`  Auto-gained: ${isAutoGained}`);
    console.log(`  Chosen (tier 3): ${isChosenTier3}`);
    console.log(`  Chosen (tier 6): ${isChosenTier6}`);
    console.log(`  Extra selected: ${isExtra}`);
    console.log(`  Has PoolIncrease: ${ability.PoolIncrease || 0}`);
    console.log(`  Has EdgeIncrease: ${ability.EdgeIncrease || 0}`);

    // Only proceed if ability should be active AND has a stat increase
    const shouldBeActive = isAutoGained || isChosen || isExtra;
    const hasStatIncrease =
      (ability.PoolIncrease && ability.PoolIncrease > 0) ||
      (ability.EdgeIncrease && ability.EdgeIncrease > 0);

    if (!shouldBeActive) {
      console.log(`  ✗ SKIP: Not active for current character`);
      return;
    }

    if (!hasStatIncrease) {
      console.log(`  ✗ SKIP: No pool or edge increase`);
      return;
    }

    // Create unique key - include focus name to avoid conflicts
    const abilityKey = `${character.focus1}_${ability.Ability}_T${tier}`;
    console.log(`  Unique key: ${abilityKey}`);

    if (character.appliedFocusPoolIncreases.includes(abilityKey)) {
      console.log(`  ✗ SKIP: Already applied`);
      return;
    }

    console.log(`  ✓✓✓ APPLYING: ${ability.Ability}`);

    // Mark as applied FIRST (before showing UI or applying)
    character.appliedFocusPoolIncreases.push(abilityKey);

    console.log(`  Marked as applied:`, abilityKey);
    console.log(`  Updated list:`, character.appliedFocusPoolIncreases);

    // Apply the increase
    applyFocusAbilityPoolIncrease(ability);
  });

  console.log("\n=== Pool/Edge increase check complete ===");
  console.log("Final applied list:", character.appliedFocusPoolIncreases);
}

// Check for and display temporary stat boost abilities
function updateTemporaryStatBoosts() {
  const container = document.getElementById("temporaryBoostContainer");
  if (!container) return;

  container.innerHTML = "";

  // Collect abilities from both Type Abilities and Avatar Powers
  const selectedTypeAbilities = character.selectedTypeAbilities || [];
  const selectedAvatarPowers = character.selectedAvatarPowers || [];

  const typeAbilitiesWithBoosts = selectedTypeAbilities
    .map((abilityName) => {
      return ABILITIES_DATA.find((a) => a.name === abilityName);
    })
    .filter((ability) => {
      return (
        ability &&
        (ability.EdgeBonusStat ||
          ability.PoolBonusStat ||
          ability.EdgeBonus ||
          ability.PoolBonus)
      );
    });

  const avatarPowersWithBoosts = selectedAvatarPowers
    .map((powerName) => {
      return AVATAR_POWERS.find((p) => p.name === powerName);
    })
    .filter((power) => {
      return (
        power &&
        (power.EdgeBonusStat ||
          power.PoolBonusStat ||
          power.EdgeBonus ||
          power.PoolBonus ||
          power.EdgeBonusStats ||
          power.PoolBonusStats)
      );
    });

  // Combine both arrays
  const abilitiesWithBoosts = [
    ...typeAbilitiesWithBoosts,
    ...avatarPowersWithBoosts,
  ];

  if (abilitiesWithBoosts.length === 0) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";

  // Create toggle for each ability/power with temporary boosts
  abilitiesWithBoosts.forEach((ability) => {
    const boostCard = document.createElement("div");
    boostCard.className = "temporary-boost-card";
    boostCard.style.cssText = `
      background: #2a2a2a;
      border: 2px solid #317e30;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
    `;

    // Get boost details (handle both naming conventions)
    let boostDescription = "";
    const edgeStat = ability.EdgeBonusStat || ability.EdgeBonusStats || "";
    const edgeBonus = ability.EdgeBonus || 0;
    const poolStat = ability.PoolBonusStat || ability.PoolBonusStats || "";
    const poolBonus = ability.PoolBonus || 0;

    // Build description
    if (edgeStat && edgeBonus) {
      const stats = edgeStat.split("/");
      const bonuses = String(edgeBonus).split("/");
      stats.forEach((stat, index) => {
        const bonus = bonuses[index] || bonuses[0];
        boostDescription += `+${bonus.trim()} ${stat.trim()} Edge<br>`;
      });
    }

    if (poolStat && poolBonus) {
      const stats = poolStat.split("/");
      const bonuses = String(poolBonus).split("/");
      stats.forEach((stat, index) => {
        const bonus = bonuses[index] || bonuses[0];
        boostDescription += `+${bonus.trim()} ${stat.trim()} Pool<br>`;
      });
    }

    // Check if currently active
    if (!character.activeTemporaryBoosts) {
      character.activeTemporaryBoosts = {};
    }
    const isActive = character.activeTemporaryBoosts[ability.name] || false;

    // Determine if this is an Avatar Power
    const isAvatarPower = ability.fear !== undefined;
    const sourceLabel = isAvatarPower
      ? `Avatar Power: ${ability.fear}`
      : "Type Ability";

    boostCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
            <h4 style="color: #4CAF50; margin: 0;">${ability.name}</h4>
            <span style="color: #888; font-size: 0.8em; font-style: italic;">${sourceLabel}</span>
          </div>
          <p style="margin: 0 0 10px 0; color: #ddd; font-size: 0.9em;">${
            ability.description
          }</p>
          <div style="color: #FFD700; font-weight: bold;">
            ${boostDescription}
          </div>
          <div style="margin-top: 8px; color: #888; font-size: 0.85em;">
            ${
              ability.stat
                ? `Cost: ${ability.pointsRequired || ability.cost} ${
                    ability.stat
                  }`
                : ability.cost
                ? `Cost: ${ability.cost} points`
                : "No cost"
            }
            ${ability.stress ? ` | Stress: ${ability.stress}` : ""}
          </div>
        </div>
        <div style="text-align: center; margin-left: 20px;">
          <button 
            id="toggleBoost_${ability.name.replace(/\s/g, "_")}"
            onclick="toggleTemporaryBoost('${ability.name.replace(
              /'/g,
              "\\'"
            )}')"
            class="button ${isActive ? "primary-button" : "secondary-button"}"
            style="padding: 12px 24px; font-size: 1em; min-width: 120px; ${
              isActive ? "background: #4CAF50;" : "background: #555;"
            }"
          >
            ${isActive ? "✓ Active" : "Activate"}
          </button>
          ${
            isActive
              ? `<div style="color: #4CAF50; margin-top: 5px; font-size: 0.85em;">Currently Active</div>`
              : ""
          }
        </div>
      </div>
    `;

    container.appendChild(boostCard);
  });
}

// Function to toggle temporary boosts
function toggleTemporaryBoost(abilityName) {
  // Search in both Type Abilities and Avatar Powers
  let ability = ABILITIES_DATA.find((a) => a.name === abilityName);
  if (!ability) {
    ability = AVATAR_POWERS.find((p) => p.name === abilityName);
  }

  if (!ability) {
    alert("Ability not found!");
    return;
  }

  // Initialize tracking
  if (!character.activeTemporaryBoosts) {
    character.activeTemporaryBoosts = {};
  }

  const isCurrentlyActive =
    character.activeTemporaryBoosts[abilityName] || false;

  if (isCurrentlyActive) {
    // Deactivate
    const confirmation = confirm(
      `Deactivate ${abilityName}?\n\n` +
        `This will remove the temporary stat bonuses.`
    );

    if (!confirmation) return;

    character.activeTemporaryBoosts[abilityName] = false;

    // Remove bonuses
    applyTemporaryBoostModifiers(ability, false);

    alert(`${abilityName} deactivated.\n\nTemporary bonuses removed.`);
  } else {
    // Activate - check costs first
    const cost = ability.pointsRequired || ability.cost || 0;
    const statName = ability.stat;

    if (cost && statName) {
      const statPool = character[statName.toLowerCase() + "Pool"];
      const currentPool = statPool?.current || 0;

      if (currentPool < cost) {
        alert(
          `Not enough ${statName} points!\n\n` +
            `Required: ${cost}\n` +
            `Current: ${currentPool}`
        );
        return;
      }
    }

    const confirmation = confirm(
      `Activate ${abilityName}?\n\n` +
        `${ability.description}\n\n` +
        `${
          cost
            ? `Cost: ${cost}${statName ? " " + statName : " points"}`
            : "No cost"
        }\n` +
        `${ability.stress ? `Stress: ${ability.stress}` : ""}\n\n` +
        `Remember to deactivate when the effect expires!`
    );

    if (!confirmation) return;

    // Deduct costs
    if (cost && statName) {
      const statKey = statName.toLowerCase() + "Pool";
      character[statKey].current -= cost;
    } else if (cost) {
      // For abilities that just have a cost without a specific stat
      // This is a fallback - you may want to handle this differently
      console.warn(`Ability ${abilityName} has cost but no stat specified`);
    }

    if (ability.stress) {
      adjustStress(ability.stress);
    }

    character.activeTemporaryBoosts[abilityName] = true;

    // Apply bonuses
    applyTemporaryBoostModifiers(ability, true);

    alert(
      `${abilityName} activated!\n\n` +
        `Temporary bonuses applied.\n\n` +
        `Don't forget to deactivate when done!`
    );
  }

  // Refresh displays
  updateTemporaryStatBoosts();
  updateStatDisplay();
  updateEdgeDisplay();
}

// Function to apply or remove temporary modifiers
function applyTemporaryBoostModifiers(ability, apply) {
  const modifier = apply ? 1 : -1;

  // Handle Edge bonuses (both naming conventions)
  const edgeStat = ability.EdgeBonusStat || ability.EdgeBonusStats || "";
  const edgeBonus = ability.EdgeBonus || 0;

  if (edgeStat && edgeBonus) {
    const stats = edgeStat.split("/");
    const bonuses = String(edgeBonus).split("/");

    stats.forEach((stat, index) => {
      const statName = stat.trim().toLowerCase();
      const bonus = parseInt(bonuses[index]?.trim() || bonuses[0]);

      if (character[statName + "Edge"] !== undefined) {
        character[statName + "Edge"] += bonus * modifier;
      }
    });
  }

  // Handle Pool bonuses (both naming conventions)
  const poolStat = ability.PoolBonusStat || ability.PoolBonusStats || "";
  const poolBonus = ability.PoolBonus || 0;

  if (poolStat && poolBonus) {
    const stats = poolStat.split("/");
    const bonuses = String(poolBonus).split("/");

    stats.forEach((stat, index) => {
      const statName = stat.trim().toLowerCase();
      const bonus = parseInt(bonuses[index]?.trim() || bonuses[0]);
      const poolKey = statName + "Pool";

      if (character[poolKey]) {
        // Adjust max pool
        character[poolKey].max += bonus * modifier;

        // Also adjust current if activating (gives the bonus immediately)
        if (apply) {
          character[poolKey].current += bonus;
        } else {
          // When deactivating, don't let current exceed new max
          character[poolKey].current = Math.min(
            character[poolKey].current,
            character[poolKey].max
          );
        }
      }
    });
  }
}

console.log("✓ Temporary stat boost system added");

function diagnoseTypeAbilities() {
  console.log("\n=== TYPE ABILITIES DIAGNOSTIC ===\n");

  // Check all possible variable names
  console.log(
    "1. Checking for typeAbilities:",
    typeof typeAbilities !== "undefined"
  );
  console.log(
    "2. Checking for ABILITIES_DATA:",
    typeof ABILITIES_DATA !== "undefined"
  );
  console.log(
    "3. Checking for abilitiesData:",
    typeof window.abilitiesData !== "undefined"
  );

  // List all global variables that contain 'abilit'
  console.log("\n4. All ability-related globals:");
  Object.keys(window)
    .filter((k) => k.toLowerCase().includes("abilit"))
    .forEach((key) => {
      const value = window[key];
      console.log(
        `   - ${key}:`,
        Array.isArray(value) ? `Array(${value.length})` : typeof value
      );
    });

  // Check what's in the abilities.js file
  console.log("\n5. Checking character object:");
  console.log("   - Type:", character.type);
  console.log("   - Tier:", character.tier);
  console.log("   - Identity confirmed:", character.identityConfirmed);

  // Try to render
  console.log("\n6. Attempting to get available abilities...");
  const abilities = getAvailableTypeAbilities();
  console.log(`   Found ${abilities.length} abilities`);

  if (abilities.length > 0) {
    console.log("\n7. Sample abilities:");
    abilities.slice(0, 3).forEach((a, i) => {
      console.log(
        `   ${i + 1}. ${a.Ability || a.name} (Tier ${a.Tier || a.tier})`
      );
    });
  }

  console.log("\n=== END DIAGNOSTIC ===\n");
}
