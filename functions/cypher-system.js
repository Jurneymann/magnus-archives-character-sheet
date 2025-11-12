// ==================== CYPHER TABLE MANAGEMENT ==================== //

let assignedCyphers = [];

function initializeCypherTable() {
  // Create header section if it doesn't exist
  const cypherSection = document.querySelector(".cyphers-section");
  if (cypherSection && !document.querySelector(".cypher-section-header")) {
    // Insert header before the table
    const tableContainer = cypherSection.querySelector(
      ".cyphers-table-container"
    );
    if (tableContainer) {
      tableContainer.insertAdjacentHTML("beforebegin", headerHTML);
    }
  }

  renderCypherTable();
}

function renderCypherTable() {
  const tbody = document.getElementById("cyphersTableBody");
  tbody.innerHTML = "";

  const totalSlots = character.cypherSlots || 0;

  if (totalSlots === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align: center; color: #666; padding: 20px;">No cypher slots available. Lock in your character identity first.</td></tr>';
    updateDrawCypherButton();
    return;
  }

  // Create card-style rows for all slots
  for (let i = 0; i < totalSlots; i++) {
    const cypher = assignedCyphers[i];
    const row = document.createElement("tr");
    row.className = "cypher-card-row";

    if (cypher) {
      // Filled card
      row.innerHTML = `
        <td colspan="4" class="cypher-card-cell">
          <div class="cypher-card">
            <div class="cypher-card-header">
              <h3 class="cypher-name">${cypher.name}</h3>
            </div>
            <div class="cypher-card-meta">
              <span class="cypher-action">${cypher.action}</span>
              <span class="cypher-divider">|</span>
              <span class="cypher-level">Level ${cypher.level}</span>
            </div>
            <div class="cypher-card-effect">
              ${cypher.effect}
            </div>
            <div class="cypher-card-footer">
              <button class="use-cypher-btn" onclick="removeCypher(${i})">
                Use / Discard Cypher
              </button>
            </div>
          </div>
        </td>
      `;
    } else {
      // Empty card
      row.innerHTML = `
        <td colspan="4" class="cypher-card-cell">
          <div class="cypher-card cypher-card-empty">
            <div class="cypher-empty-content">
              <span class="cypher-empty-text">Empty Cypher Slot</span>
            </div>
          </div>
        </td>
      `;
    }

    tbody.appendChild(row);
  }

  updateDrawCypherButton();
}

function drawCypher() {
  // Check if there are any empty slots
  const emptySlotIndex = assignedCyphers.findIndex(
    (c, i) => i < character.cypherSlots && !c
  );

  if (
    emptySlotIndex === -1 &&
    assignedCyphers.length >= character.cypherSlots
  ) {
    alert(
      "All cypher slots are full! Use or discard a cypher before drawing a new one."
    );
    return;
  }

  if (typeof CYPHERS_DATA === "undefined" || CYPHERS_DATA.length === 0) {
    alert("Cypher data not loaded! Make sure cyphers.js is loaded.");
    console.error("CYPHERS_DATA:", typeof CYPHERS_DATA);
    return;
  }

  // Get random cypher
  const randomIndex = Math.floor(Math.random() * CYPHERS_DATA.length);
  const template = CYPHERS_DATA[randomIndex];

  console.log("=== DRAWING CYPHER ===");
  console.log("Template:", template);
  console.log("Template properties:", Object.keys(template));

  // Create cypher object - BASE PROPERTIES FIRST
  const cypher = {
    name: template.name,
    action: template.action,
    level: template.level,
    effect: template.effect,
  };

  console.log("Base cypher created:", cypher);

  // EXPLICITLY add optional properties
  if (template.EdgeBonusStat) {
    cypher.EdgeBonusStat = template.EdgeBonusStat;
    console.log("✓ Added EdgeBonusStat:", template.EdgeBonusStat);
  }

  if (template.EdgeBonus) {
    cypher.EdgeBonus = template.EdgeBonus;
    console.log("✓ Added EdgeBonus:", template.EdgeBonus);
  }

  if (template.PoolGain) {
    cypher.PoolGain = template.PoolGain;
    console.log("✓ Added PoolGain:", template.PoolGain);
  } else {
    console.log("✗ Template has no PoolGain property");
  }

  if (template.Characteristic) {
    cypher.Characteristic = template.Characteristic;
    console.log("✓ Added Characteristic:", template.Characteristic);
  }

  console.log("Final cypher object:", cypher);
  console.log("Final cypher properties:", Object.keys(cypher));

  // Roll for level if it's dice notation
  if (cypher.level && cypher.level.includes("d")) {
    const oldLevel = cypher.level;
    cypher.level = rollCypherLevel(cypher.level);
    console.log(`Rolled level: ${oldLevel} → ${cypher.level}`);
  }

  // Calculate Edge bonus if applicable
  if (cypher.EdgeBonusStat && cypher.EdgeBonus) {
    const level = parseInt(cypher.level);
    cypher.calculatedEdgeBonus = level >= 5 ? 2 : 1;
    console.log(
      `✓ Calculated Edge Bonus: +${cypher.calculatedEdgeBonus} ${cypher.EdgeBonusStat} Edge`
    );
  }

  // Add to first empty slot
  if (emptySlotIndex !== -1) {
    assignedCyphers[emptySlotIndex] = cypher;
  } else {
    assignedCyphers.push(cypher);
  }

  console.log("Cypher added to assignedCyphers");
  console.log("=== DRAWING COMPLETE ===");

  renderCypherTable();

  // Check for special cyphers
  if (
    cypher.name === "Librarian's pupil" ||
    cypher.name === "Learn from The Web"
  ) {
    showCypherRollEffectTable(cypher.name);
  } else {
    hideCypherRollEffectTable();
  }

  // Show notification
  let notificationText = `Drew cypher: ${cypher.name} (Level ${cypher.level})`;
  if (cypher.calculatedEdgeBonus) {
    notificationText += `\n\nEdge Bonus: +${cypher.calculatedEdgeBonus} ${cypher.EdgeBonusStat} Edge`;
  }
  if (cypher.PoolGain) {
    notificationText += `\n\nPool Restoration: +${cypher.level} ${cypher.PoolGain} Pool`;
  }
  alert(notificationText);

  // Update temporary boosts display
  updateCypherBoosts();
}

function showCypherRollEffectTable(cypherName) {
  console.log("showCypherRollEffectTable called with:", cypherName);

  const rollEffectSection = document.getElementById("cypherRollEffectSection");

  if (!rollEffectSection) {
    console.error("✗ cypherRollEffectSection element not found in HTML!");
    alert(
      "Error: Roll effect section not found. Please check the HTML structure."
    );
    return;
  }

  console.log("✓ Roll effect section found");

  // Check if CYPHERS_ROLLEFFECT is loaded
  if (typeof CYPHERS_ROLLEFFECT === "undefined") {
    console.error("✗ CYPHERS_ROLLEFFECT is not loaded!");
    alert(
      "Error: Roll effect data not loaded. Please check that cyphers.js is loaded."
    );
    return;
  }

  console.log(
    "✓ CYPHERS_ROLLEFFECT loaded with",
    CYPHERS_ROLLEFFECT.length,
    "entries"
  );

  // Filter effects for this specific cypher
  const relevantEffects = CYPHERS_ROLLEFFECT.filter(
    (effect) => effect.cypher === cypherName
  );

  console.log(
    "✓ Found",
    relevantEffects.length,
    "relevant effects for",
    cypherName
  );

  if (relevantEffects.length === 0) {
    console.warn("✗ No effects found for cypher:", cypherName);
    console.log("Available cyphers in CYPHERS_ROLLEFFECT:", [
      ...new Set(CYPHERS_ROLLEFFECT.map((e) => e.cypher)),
    ]);
    hideCypherRollEffectTable();
    return;
  }

  // Build the table
  let tableHTML = `
    <h3 style="color: #317e30; margin-top: 0;">${cypherName} - Roll Effect</h3>
    <p style="color: #ddd; margin-bottom: 15px;">
      Roll d00 (d100) to determine the specific effect:
    </p>
    <button 
      class="button primary-button" 
      onclick="rollCypherEffect()"
      style="margin-bottom: 15px; padding: 10px 20px;"
    >
      🎲 Roll for Effect
    </button>
    <table class="abilities-table" style="width: 100%;">
      <thead>
        <tr>
          <th style="width: 15%; text-align: center;">Roll (d00)</th>
          <th>Effect</th>
        </tr>
      </thead>
      <tbody id="cypherRollEffectTableBody">
  `;

  relevantEffects.forEach((effect, index) => {
    tableHTML += `
      <tr id="cypherEffectRow_${index}">
        <td style="text-align: center; font-weight: bold;">${effect.range}</td>
        <td>${effect.result}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  rollEffectSection.innerHTML = tableHTML;
  rollEffectSection.style.display = "block";

  console.log("✓ Table HTML inserted and displayed");
}

function hideCypherRollEffectTable() {
  const rollEffectSection = document.getElementById("cypherRollEffectSection");
  if (rollEffectSection) {
    rollEffectSection.style.display = "none";
    rollEffectSection.innerHTML = "";
  }
}

function rollCypherEffect() {
  // Roll d00 (1-100, displayed as 01-00)
  const roll = Math.floor(Math.random() * 100) + 1;
  const displayRoll = roll === 100 ? "00" : roll.toString().padStart(2, "0");

  // Find which effect this roll corresponds to
  const tbody = document.getElementById("cypherRollEffectTableBody");
  if (!tbody) return;

  const rows = tbody.querySelectorAll("tr");

  // Clear previous highlights
  rows.forEach((row) => {
    row.style.backgroundColor = "";
    row.style.color = "";
  });

  // Find and highlight the matching row
  let matchedEffect = null;
  rows.forEach((row, index) => {
    const rangeCell = row.cells[0];
    const rangeText = rangeCell.textContent.trim();

    // Parse range (e.g., "01-10", "96-00")
    const [min, max] = rangeText.split("-").map((n) => {
      const num = parseInt(n);
      return num === 0 ? 100 : num; // Convert "00" to 100
    });

    if (roll >= min && roll <= max) {
      // Highlight this row
      row.style.backgroundColor = "#317e30";
      row.style.color = "#fff";
      row.style.fontWeight = "bold";
      matchedEffect = row.cells[1].textContent;

      // Scroll into view
      row.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // Show result notification
  if (matchedEffect) {
    alert(
      `Roll: ${displayRoll}\n\n` +
        `Effect: ${matchedEffect}\n\n` +
        `The highlighted row shows your result.`
    );
  }
}

function rollCypherLevel(levelString) {
  // Parse dice notation (e.g., "1d6", "1d6 + 2")
  const parts = levelString.toLowerCase().replace(/\s/g, "").split("+");
  const dicePart = parts[0];
  const bonus = parts[1] ? parseInt(parts[1]) : 0;

  const [count, sides] = dicePart.split("d").map((n) => parseInt(n));

  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }

  return total + bonus;
}

function calculateCypherEdgeBonus(cypher) {
  // Handle the formula: "1 (or 2 if level 5 or higher)"
  const level = parseInt(cypher.level);

  // Check if cypher has conditional bonus logic
  if (typeof cypher.EdgeBonus === "string" && cypher.EdgeBonus.includes("if")) {
    // Parse the condition: assumes format like "if (cypherLevel >= 5) 2 else 1"
    if (level >= 5) {
      return 2;
    } else {
      return 1;
    }
  }

  // If EdgeBonus is a number, use it directly
  if (typeof cypher.EdgeBonus === "number") {
    return cypher.EdgeBonus;
  }

  // Default calculation
  return level >= 5 ? 2 : 1;
}

function updateEdgeDisplay() {
  console.log("updateEdgeDisplay() called");

  // Update Edge display for each stat
  ["Might", "Speed", "Intellect"].forEach((stat) => {
    const edgeEl = document.getElementById(`${stat.toLowerCase()}Edge`);
    const edgeValue =
      character.edge[stat] || character[`${stat.toLowerCase()}Edge`] || 0;

    if (edgeEl) {
      edgeEl.textContent = edgeValue;
      console.log(`✓ Updated ${stat} Edge display to:`, edgeValue);
    } else {
      console.warn(`✗ ${stat} Edge element not found`);
    }
  });

  // Update Edge displays in calculators if they exist
  if (typeof updateCalculatorEdgeValues === "function") {
    updateCalculatorEdgeValues();
  }
}

function updateCypherBoosts() {
  console.log("updateCypherBoosts() called");

  // Check if we're on the stats tab
  const statsTab = document.getElementById("stats");
  if (!statsTab) {
    console.warn("Stats tab not found, skipping cypher boosts update");
    return;
  }

  let container = document.getElementById("cypherBoostContainer");

  if (!container) {
    console.log("Creating cypher boost container");
    const statsSection = document.getElementById("statsSection");

    if (!statsSection) {
      console.warn(
        "statsSection not found, cannot create cypher boost container"
      );
      return;
    }

    const boostContainer = document.createElement("div");
    boostContainer.id = "cypherBoostContainer";
    boostContainer.innerHTML = `
      <div style="margin-top: 30px;">
        <h3 style="color: #FFD700; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">
          Cypher Edge Boosts
        </h3>
        <div id="cypherBoostCards"></div>
      </div>
    `;
    statsSection.appendChild(boostContainer);
    container = boostContainer;
    console.log("✓ Cypher boost container created");
  }

  const cardsContainer =
    document.getElementById("cypherBoostCards") ||
    container.querySelector("#cypherBoostCards");

  if (!cardsContainer) {
    console.error("cypherBoostCards element not found");
    return;
  }

  cardsContainer.innerHTML = "";
  console.log("✓ Cleared cypher boost cards");

  // Get cyphers with Edge bonuses
  const cyphersWithBoosts = assignedCyphers.filter(
    (c, i) =>
      c && i < character.cypherSlots && c.EdgeBonusStat && c.calculatedEdgeBonus
  );

  console.log("Cyphers with boosts:", cyphersWithBoosts.length);

  if (cyphersWithBoosts.length === 0) {
    container.style.display = "none";
    console.log("No cypher boosts to display");
    return;
  }

  container.style.display = "block";
  console.log("✓ Showing cypher boost container");

  // Track active cypher boosts
  if (!character.activeCypherBoosts) {
    character.activeCypherBoosts = {};
    console.log("Initialized activeCypherBoosts");
  }

  cyphersWithBoosts.forEach((cypher, index) => {
    const cypherIndex = assignedCyphers.indexOf(cypher);
    const isActive = character.activeCypherBoosts[cypherIndex] || false;

    console.log(
      `Creating boost card for ${cypher.name} (index ${cypherIndex}, active: ${isActive})`
    );

    const boostCard = document.createElement("div");
    boostCard.className = "temporary-boost-card";
    boostCard.style.cssText = `
      background: #2a2a2a;
      border: 2px solid #FFD700;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
    `;

    boostCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
            <h4 style="color: #FFD700; margin: 0;">${cypher.name}</h4>
            <span style="color: #888; font-size: 0.8em; font-style: italic;">Cypher (Level ${
              cypher.level
            })</span>
          </div>
          <p style="margin: 0 0 10px 0; color: #ddd; font-size: 0.9em;">${
            cypher.effect
          }</p>
          <div style="color: #FFD700; font-weight: bold;">
            +${cypher.calculatedEdgeBonus} ${
      cypher.EdgeBonusStat
    } Edge for 1 hour
          </div>
          <div style="margin-top: 8px; color: #888; font-size: 0.85em;">
            ${cypher.action} | Once used, cypher is consumed
          </div>
        </div>
        <div style="text-align: center; margin-left: 20px;">
          <button 
            id="toggleCypherBoost_${cypherIndex}"
            onclick="toggleCypherBoost(${cypherIndex})"
            class="button ${isActive ? "primary-button" : "secondary-button"}"
            style="padding: 12px 24px; font-size: 1em; min-width: 120px; ${
              isActive
                ? "background: #FFD700; color: #000;"
                : "background: #555;"
            }"
          >
            ${isActive ? "✓ Active" : "Use Cypher"}
          </button>
          ${
            isActive
              ? `<div style="color: #FFD700; margin-top: 5px; font-size: 0.85em;">1 hour remaining</div>
                 <button 
                   onclick="deactivateCypherBoost(${cypherIndex})"
                   class="button secondary-button"
                   style="margin-top: 8px; padding: 6px 12px; font-size: 0.85em;"
                 >
                   Remove Early
                 </button>`
              : ""
          }
        </div>
      </div>
    `;

    cardsContainer.appendChild(boostCard);
  });

  console.log("✓ All cypher boost cards created");
}

function toggleCypherBoost(cypherIndex) {
  const cypher = assignedCyphers[cypherIndex];

  if (!cypher) {
    alert("Cypher not found!");
    return;
  }

  if (!cypher.calculatedEdgeBonus) {
    alert("This cypher does not provide an Edge bonus!");
    return;
  }

  // Initialize activeCypherBoosts if needed
  if (!character.activeCypherBoosts) {
    character.activeCypherBoosts = {};
  }

  const isCurrentlyActive = character.activeCypherBoosts[cypherIndex] || false;

  if (isCurrentlyActive) {
    // Deactivate
    alert(
      `To deactivate this cypher boost, use the "Remove Early" button.\n\n` +
        `This allows you to track the 1-hour duration separately.`
    );
    return;
  }

  // Activate the boost
  const confirmation = confirm(
    `Use ${cypher.name}?\n\n` +
      `${cypher.effect}\n\n` +
      `This will grant +${cypher.calculatedEdgeBonus} ${cypher.EdgeBonusStat} Edge for 1 hour.\n\n` +
      `Current ${cypher.EdgeBonusStat} Edge: ${
        character.edge[cypher.EdgeBonusStat]
      }\n` +
      `After activation: ${
        character.edge[cypher.EdgeBonusStat] + cypher.calculatedEdgeBonus
      }\n\n` +
      `The cypher will be consumed after 1 hour or when you remove the effect.\n\n` +
      `Activate now?`
  );

  if (!confirmation) return;

  // Apply the Edge bonus to character.edge
  const oldEdge = character.edge[cypher.EdgeBonusStat];
  character.edge[cypher.EdgeBonusStat] += cypher.calculatedEdgeBonus;
  const newEdge = character.edge[cypher.EdgeBonusStat];

  console.log(
    `✓ Applied +${cypher.calculatedEdgeBonus} to ${cypher.EdgeBonusStat} Edge`
  );
  console.log(`  - Old Edge: ${oldEdge}`);
  console.log(`  - New Edge: ${newEdge}`);

  // Mark as active
  character.activeCypherBoosts[cypherIndex] = true;

  // Update Edge display
  updateEdgeDisplay();

  // Refresh displays
  updateCypherBoosts();

  alert(
    `${cypher.name} activated!\n\n` +
      `${cypher.EdgeBonusStat} Edge: ${oldEdge} → ${newEdge}\n\n` +
      `Effect will last for 1 hour.\n` +
      `The cypher will be consumed when the effect ends or is removed early.`
  );
}

function deactivateCypherBoost(cypherIndex) {
  const cypher = assignedCyphers[cypherIndex];

  if (!cypher) {
    alert("Cypher not found!");
    return;
  }

  const confirmation = confirm(
    `Remove the Edge boost from ${cypher.name}?\n\n` +
      `Current ${cypher.EdgeBonusStat} Edge: ${
        character.edge[cypher.EdgeBonusStat]
      }\n` +
      `After removal: ${
        character.edge[cypher.EdgeBonusStat] - cypher.calculatedEdgeBonus
      }\n\n` +
      `The cypher will be consumed.\n\n` +
      `Continue?`
  );

  if (!confirmation) return;

  // Remove the Edge bonus from character.edge
  const oldEdge = character.edge[cypher.EdgeBonusStat];
  character.edge[cypher.EdgeBonusStat] -= cypher.calculatedEdgeBonus;
  const newEdge = character.edge[cypher.EdgeBonusStat];

  console.log(
    `✓ Removed +${cypher.calculatedEdgeBonus} from ${cypher.EdgeBonusStat} Edge`
  );
  console.log(`  - Old Edge: ${oldEdge}`);
  console.log(`  - New Edge: ${newEdge}`);

  // Remove from active boosts
  delete character.activeCypherBoosts[cypherIndex];

  // Remove the cypher
  assignedCyphers[cypherIndex] = null;

  // Update Edge display
  updateEdgeDisplay();

  // Refresh displays
  renderCypherTable();
  updateCypherBoosts();

  alert(
    `${cypher.name} effect ended.\n\n` +
      `${cypher.EdgeBonusStat} Edge: ${oldEdge} → ${newEdge}\n\n` +
      `The cypher has been consumed.`
  );

  // Check if any remaining cyphers need the roll table
  const hasRollEffectCypher = assignedCyphers.some(
    (c) =>
      c && (c.name === "Librarian's pupil" || c.name === "Learn from The Web")
  );

  if (!hasRollEffectCypher) {
    hideCypherRollEffectTable();
  }
}

function updateEdgeDisplay() {
  console.log("updateEdgeDisplay() called");

  // Update Edge display for each stat
  ["Might", "Speed", "Intellect"].forEach((stat) => {
    const edgeEl = document.getElementById(`${stat.toLowerCase()}Edge`);
    const edgeValue = character.edge[stat];

    if (edgeEl) {
      edgeEl.textContent = edgeValue;
      console.log(`✓ Updated ${stat} Edge display to:`, edgeValue);
    } else {
      console.warn(`✗ ${stat} Edge element not found`);
    }
  });

  // Also update the calculator dropdowns if they exist and are visible
  updateCalculatorEdgeValues();
}

function updateCalculatorEdgeValues() {
  // Attack Calculator Edge
  const attackEdgeSelect = document.getElementById("attackEdgeSelect");
  if (attackEdgeSelect && typeof updateAttackCalculator === "function") {
    console.log("Refreshing Attack Calculator Edge values");
    // The calculator will read from character.edge when it updates
    updateAttackCalculator();
  }

  // Defend Calculator Edge
  const defendEdgeSelect = document.getElementById("defendEdgeSelect");
  if (defendEdgeSelect && typeof updateDefendCalculator === "function") {
    console.log("Refreshing Defend Calculator Edge values");
    updateDefendCalculator();
  }

  // Action Calculator Edge
  const actionEdgeSelect = document.getElementById("actionStatPoolEdgeSelect");
  if (actionEdgeSelect && typeof updateActionCalculator === "function") {
    console.log("Refreshing Action Calculator Edge values");
    updateActionCalculator();
  }

  // Ability Calculator Edge
  const abilityEdgeSelect = document.getElementById("abilityEdgeSelect");
  if (abilityEdgeSelect && typeof updateAbilityCalculator === "function") {
    console.log("Refreshing Ability Calculator Edge values");
    updateAbilityCalculator();
  }
}

function removeCypher(index) {
  const cypher = assignedCyphers[index];

  console.log("=== removeCypher() called ===");
  console.log("Index:", index);
  console.log("Cypher:", cypher);

  if (!cypher) {
    console.log("No cypher found at this index");
    return;
  }

  console.log("Cypher properties:", {
    name: cypher.name,
    level: cypher.level,
    hasPoolGain: !!cypher.PoolGain,
    PoolGain: cypher.PoolGain,
    hasEdgeBonusStat: !!cypher.EdgeBonusStat,
    EdgeBonusStat: cypher.EdgeBonusStat,
    allKeys: Object.keys(cypher),
  });

  // Check if this cypher has an active boost
  if (character.activeCypherBoosts && character.activeCypherBoosts[index]) {
    console.log("Cypher has active boost - blocking removal");
    alert(
      `This cypher's effect is currently active!\n\n` +
        `You must deactivate the boost before discarding the cypher.\n\n` +
        `Use the "Remove Early" button in the Cypher Edge Boosts section.`
    );
    return;
  }

  // Check if this cypher has a PoolGain effect
  if (cypher.PoolGain) {
    console.log("=== POOL GAIN DETECTED ===");
    const poolName = cypher.PoolGain;
    const restoreAmount = parseInt(cypher.level);
    const currentPool = character.currentPools[poolName];
    const maxPool = character.stats[poolName];
    const actualRestore = Math.min(restoreAmount, maxPool - currentPool);

    console.log("Pool restoration details:", {
      poolName,
      restoreAmount,
      currentPool,
      maxPool,
      actualRestore,
      poolIsFull: currentPool >= maxPool,
    });

    if (currentPool >= maxPool) {
      console.log("Pool is at maximum - no restoration possible");
      // Pool is already full
      const confirmation = confirm(
        `Use "${cypher.name}"?\n\n` +
          `${cypher.effect}\n\n` +
          `This cypher would restore ${restoreAmount} ${poolName} Pool points, but your ${poolName} Pool is already at maximum (${maxPool}).\n\n` +
          `No points will be restored. Continue anyway?`
      );

      if (!confirmation) {
        console.log("User cancelled");
        return;
      }

      // Remove cypher without restoration
      assignedCyphers[index] = null;
      renderCypherTable();
      updateCypherBoosts();

      console.log("Cypher removed without restoration");
      alert(`${cypher.name} used (no effect - pool was already full).`);
    } else {
      console.log("Pool can be restored - showing confirmation");
      // Pool can be restored
      const confirmation = confirm(
        `Use "${cypher.name}"?\n\n` +
          `${cypher.effect}\n\n` +
          `This will restore ${actualRestore} ${poolName} Pool point${
            actualRestore !== 1 ? "s" : ""
          }.\n\n` +
          `Current ${poolName} Pool: ${currentPool}/${maxPool}\n` +
          `After use: ${currentPool + actualRestore}/${maxPool}\n\n` +
          `Continue?`
      );

      if (!confirmation) {
        console.log("User cancelled");
        return;
      }

      console.log("User confirmed - restoring pool");

      // Restore pool points
      const oldPool = character.currentPools[poolName];
      character.currentPools[poolName] = currentPool + actualRestore;
      const newPool = character.currentPools[poolName];

      console.log(`Pool restoration: ${oldPool} → ${newPool}`);

      // Update display
      const poolElement = document.getElementById(
        `${poolName.toLowerCase()}Pool`
      );

      console.log("Pool element:", poolElement);

      if (poolElement) {
        poolElement.textContent = character.currentPools[poolName];
        console.log(
          "✓ Updated pool display to:",
          character.currentPools[poolName]
        );
      } else {
        console.error("✗ Pool element not found!");
      }

      // Remove cypher
      assignedCyphers[index] = null;
      renderCypherTable();
      updateCypherBoosts();

      console.log("✓ Pool restored successfully");

      alert(
        `${cypher.name} used!\n\n` +
          `Restored ${actualRestore} point${
            actualRestore !== 1 ? "s" : ""
          } to ${poolName} Pool.\n\n` +
          `${poolName} Pool: ${currentPool} → ${character.currentPools[poolName]}`
      );
    }
  } else {
    console.log("No PoolGain property - treating as normal cypher");
    // Normal cypher without PoolGain - just discard
    const confirmation = confirm(
      `Are you sure you want to use/discard "${cypher.name}"?`
    );

    if (!confirmation) {
      console.log("User cancelled");
      return;
    }

    assignedCyphers[index] = null;
    renderCypherTable();
    updateCypherBoosts();

    console.log("Cypher discarded");
  }

  // Check if any remaining cyphers need the roll table
  const hasRollEffectCypher = assignedCyphers.some(
    (c) =>
      c && (c.name === "Librarian's pupil" || c.name === "Learn from The Web")
  );

  if (!hasRollEffectCypher) {
    hideCypherRollEffectTable();
  }

  console.log("=== removeCypher() complete ===");
}

function updateDrawCypherButton() {
  const button = document.querySelector(".draw-cypher-btn");
  if (!button) return;

  const hasEmptySlot =
    assignedCyphers.length < character.cypherSlots ||
    assignedCyphers.some((c, i) => i < character.cypherSlots && !c);

  button.disabled = !hasEmptySlot || character.cypherSlots === 0;

  // Update slots display
  const filledSlots = assignedCyphers.filter(
    (c, i) => i < character.cypherSlots && c
  ).length;
  document.getElementById("cypherSlotsUsed").textContent = filledSlots;
}

// ==================== SUMMARY & DISPLAY UPDATES ==================== //

function updateSummary() {
  // Count trained skills - check if skillsData exists
  const trainedSkills =
    typeof skillsData !== "undefined"
      ? skillsData.filter((s) => s.skill && s.ability).length
      : 0;

  // Update abilities count - check if element exists first
  const abilitiesCountEl = document.getElementById("abilitiesCount");
  if (abilitiesCountEl && typeof selectedAbilities !== "undefined") {
    abilitiesCountEl.textContent = selectedAbilities.length;
  }

  // Update skills count - check if element exists first
  const skillsCountEl = document.getElementById("skillsCount");
  if (skillsCountEl) {
    skillsCountEl.textContent = trainedSkills;
  }

  // Update cypher count - check if element exists first
  const cypherCountEl = document.getElementById("cypherCount");
  if (cypherCountEl) {
    cypherCountEl.textContent = character.cypherSlots || 0;
  }

  // Only call updateSelectedDisplay if it exists
  if (typeof updateSelectedDisplay === "function") {
    updateSelectedDisplay();
  }
}

function updateSelectedDisplay() {
  // Check if selectedAbilities exists
  if (typeof selectedAbilities === "undefined") {
    return;
  }

  // Update abilities display - check if element exists first
  const abilitiesDisplay = document.getElementById("selectedAbilitiesDisplay");
  if (abilitiesDisplay) {
    if (selectedAbilities.length > 0) {
      abilitiesDisplay.innerHTML = selectedAbilities
        .map(
          (ability, idx) => `
        <div class="selected-item-display">
          <span class="item-name">${ability.name}</span>
          <span class="item-meta">Tier ${ability.tier || character.tier}</span>
          <button class="remove-btn" onclick="removeAbility(${idx})">Remove</button>
        </div>
      `
        )
        .join("");
    } else {
      abilitiesDisplay.innerHTML =
        '<p class="empty-state">No abilities selected yet</p>';
    }
  }

  // Update cyphers display - check if element exists first
  const cyphersDisplay = document.getElementById("selectedCyphersDisplay");
  if (cyphersDisplay) {
    cyphersDisplay.innerHTML =
      '<p class="empty-state">Cypher selection coming soon</p>';
  }
}

function debugCypherBoosts() {
  console.log("=== CYPHER BOOSTS DEBUG ===");
  console.log("Character cypher slots:", character.cypherSlots);
  console.log("Assigned cyphers:", assignedCyphers);
  console.log("Active cypher boosts:", character.activeCypherBoosts);

  const cyphersWithBoosts = assignedCyphers.filter(
    (c, i) =>
      c && i < character.cypherSlots && c.EdgeBonusStat && c.calculatedEdgeBonus
  );

  console.log("Cyphers with Edge bonuses:", cyphersWithBoosts);

  cyphersWithBoosts.forEach((cypher, idx) => {
    console.log(`Cypher ${idx}:`, {
      name: cypher.name,
      level: cypher.level,
      EdgeBonusStat: cypher.EdgeBonusStat,
      calculatedEdgeBonus: cypher.calculatedEdgeBonus,
      isActive: character.activeCypherBoosts[assignedCyphers.indexOf(cypher)],
    });
  });

  // Force update
  console.log("Forcing updateCypherBoosts()...");
  updateCypherBoosts();
}
