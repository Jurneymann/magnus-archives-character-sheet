// ========== HELPER FUNCTIONS ========== //

function canPurchaseAdvancement(advancementType) {
  console.log("Checking if can purchase:", advancementType);
  console.log("Current advancements:", character.currentTierAdvancements);

  // Check if already purchased this tier
  if (character.currentTierAdvancements[advancementType]) {
    alert("You have already purchased this advancement this tier!");
    return false;
  }

  // Check if have enough XP
  if (character.xp < 4) {
    alert("Not enough XP! Advancements cost 4 XP each.");
    return false;
  }

  return true;
}

function spendXP(cost, description) {
  const currentXP = parseInt(character.xp) || 0;
  const costAmount = parseInt(cost) || 0;

  if (currentXP < costAmount) {
    alert(
      `Not enough XP! You need ${costAmount} XP but only have ${currentXP} XP.`
    );
    return false;
  }

  const confirmation = confirm(
    `Spend ${costAmount} XP to: ${description}\n\n` +
      `Current XP: ${currentXP}\n` +
      `After purchase: ${currentXP - costAmount}\n\n` +
      `Confirm?`
  );

  if (confirmation) {
    character.xp = Math.max(0, currentXP - costAmount);
    updateXPDisplay();
    return true;
  }

  return false;
}

function checkTierAdvancement() {
  // Count required advancements
  const requiredAdvancements = [
    character.currentTierAdvancements.increasePools,
    character.currentTierAdvancements.increaseEdge,
    character.currentTierAdvancements.increaseEffort,
    character.currentTierAdvancements.trainSkill,
  ].filter(Boolean).length;

  // Count optional advancements
  const optionalAdvancements = [
    character.currentTierAdvancements.increaseRecovery,
    character.currentTierAdvancements.extraFocusAbility,
    character.currentTierAdvancements.extraTypeAbility,
  ].filter(Boolean).length;

  console.log("Checking tier advancement:", {
    requiredAdvancements,
    optionalAdvancements,
    currentTier: character.tier,
  });

  const requiredComplete = requiredAdvancements >= 4;
  const optionalComplete = optionalAdvancements >= 1;

  if (requiredComplete && optionalComplete) {
    const confirmation = confirm(
      `Congratulations! You have completed all requirements for tier advancement!\n\n` +
        `Required Advancements: ${requiredAdvancements}/4 ✓\n` +
        `Optional Advancements: ${optionalAdvancements}/1 ✓\n\n` +
        `You are ready to advance from Tier ${character.tier} to Tier ${
          character.tier + 1
        }!\n\n` +
        `Advance now?`
    );

    if (confirmation) {
      advanceTier();
    }
  }

  updateAdvancementDisplay();
}

function advanceTier() {
  const currentTier = parseInt(character.tier) || 1;

  if (currentTier >= 6) {
    alert("You are already at maximum tier (6)!");
    return;
  }

  const newTier = currentTier + 1;

  console.log(`Advancing from Tier ${currentTier} to Tier ${newTier}`);

  // Update tier
  character.tier = newTier;

  // Update cypher slots based on new tier
  const oldCypherSlots = character.cypherSlots;
  const newCypherSlots = getCypherSlotsForTier(newTier, character.type);
  character.cypherSlots = newCypherSlots;

  console.log(`Cypher slots: ${oldCypherSlots} → ${newCypherSlots}`);

  // Update cypher slots display
  const cypherSlotsDisplay = document.getElementById("cypherSlotsDisplay");
  if (cypherSlotsDisplay) {
    cypherSlotsDisplay.textContent = newCypherSlots;
  }

  // Reset tier advancements
  character.currentTierAdvancements = {
    increasePools: false,
    increaseEdge: false,
    increaseEffort: false,
    trainSkill: false,
    increaseRecovery: false,
    extraFocusAbility: false,
    extraTypeAbility: false,
  };
  character.advancementsPurchasedThisTier = 0;

  // Update tier display
  const tierDisplays = document.querySelectorAll("#tierDisplay");
  tierDisplays.forEach((display) => {
    display.textContent = newTier;
  });

  // Grant 2 additional Type ability selections
  if (typeof grantTypeAbilitySelections === "function") {
    grantTypeAbilitySelections(2);
  }

  // Update cypher table to show new slots
  if (typeof renderCypherTable === "function") {
    renderCypherTable();
  }

  // Update advancement buttons and display
  updateAdvancementDisplay();
  updateAdvancementButtons();

  // Update character sheet UI
  if (typeof updateCharacterSheetUI === "function") {
    updateCharacterSheetUI();
  }

  // Update recovery formulas
  if (typeof updateRecoveryFormulas === "function") {
    updateRecoveryFormulas();
  }

  // Initialize character arcs
  if (typeof initializeCharacterArcs === "function") {
    initializeCharacterArcs();
  }

  // Refresh ability tables if they exist
  if (typeof renderTypeAbilitiesTable === "function") {
    renderTypeAbilitiesTable();
  }
  if (typeof renderFocusAbilitiesTable === "function") {
    renderFocusAbilitiesTable();
  }
  checkAvatarRequirements();
  updateAvatarTabVisibility();

  // Show notification
  alert(
    `🎉 Advanced to Tier ${newTier}!\n\n` +
      `Tier ${currentTier} → Tier ${newTier}\n\n` +
      `Changes:\n` +
      `• Cypher Slots: ${oldCypherSlots} → ${newCypherSlots}\n` +
      `• 2 new Type ability selections available\n` +
      `• Advancement progress reset\n\n` +
      `You can now purchase Tier ${newTier} advancements!\n\n` +
      `Requirements for next tier:\n` +
      `- All 4 required advancements (Pools, Edge, Effort, Skill)\n` +
      `- 1 optional advancement (Recovery, Focus Ability, or Type Ability)`
  );

  console.log("Tier advancement complete:", {
    newTier,
    newCypherSlots,
    advancementsPurchased: character.advancementsPurchasedThisTier,
  });
}
// Character options validation
function validateCharacterOptions() {
  const confirmBtn = document.getElementById("confirmIdentityBtn");
  const name = document.getElementById("charName").value;
  const descriptor = document.getElementById("descriptor").value;
  const type = document.getElementById("type").value;
  const focus1 = document.getElementById("focus1").value;

  if (confirmBtn && !character.identityConfirmed) {
    if (name && descriptor && type && focus1) {
      confirmBtn.textContent = "Confirm Character Identity";
      confirmBtn.disabled = false;
    } else {
      confirmBtn.textContent = "Fill in all required fields (*)";
      confirmBtn.disabled = true;
    }
  }
}

function updateStressLevel() {
  const stress = character.stress || 0;
  const level = Math.floor(stress / 3);

  character.stressLevel = level;

  const stressLevelDisplay = document.getElementById("stressLevel");
  if (stressLevelDisplay) {
    stressLevelDisplay.textContent = level;
  }

  return level;
}

function displayCharacterData(data) {
  const outputElement = document.getElementById("output");
  const detailsElement = outputElement?.closest("details");

  if (outputElement) {
    outputElement.textContent = data;

    // Auto-open the details section if closed
    if (detailsElement && !detailsElement.open) {
      detailsElement.open = true;
    }
  }
}

// ========== UI HELPER FUNCTIONS ========== //

function showPoolAllocationUI(totalPoints) {
  // Check if UI already exists
  if (document.getElementById("poolAllocation")) {
    document.getElementById("poolAllocation").remove();
  }

  const statsTab = document.querySelector("#stats");

  if (!statsTab) {
    console.error("Stats tab not found");
    return;
  }

  // Create allocation tracking
  const allocation = {
    Might: 0,
    Speed: 0,
    Intellect: 0,
  };

  let remainingPoints = totalPoints;

  const allocationUI = document.createElement("div");
  allocationUI.id = "poolAllocation";
  allocationUI.className = "pool-allocation-ui";

  allocationUI.innerHTML = `
    <div class="pool-allocation-header">
      <h3>Allocate Pool Points</h3>
      <p>
        You have <strong>${totalPoints} points</strong> to distribute among your stat pools.<br>
        Increase your pools to make your character more resilient.
      </p>
    </div>

    <div class="pool-points-remaining">
      <span class="points-label">Points Remaining</span>
      <span class="points-value" id="poolPointsRemaining">${remainingPoints}</span>
    </div>

    <div class="pool-allocation-grid">
      <!-- Might Pool Card -->
      <div class="pool-allocation-card might-pool">
        <div class="pool-card-header">
          <label>Might</label>
          <span class="pool-allocated" id="poolMightAllocated">0</span>
        </div>
        <div class="pool-card-controls">
          <button 
            class="pool-adjust-btn" 
            onclick="adjustPoolAllocation('Might', -1)"
            id="poolMightMinus"
          >
            −
          </button>
          <button 
            class="pool-adjust-btn" 
            onclick="adjustPoolAllocation('Might', 1)"
            id="poolMightPlus"
          >
            +
          </button>
        </div>
      </div>

      <!-- Speed Pool Card -->
      <div class="pool-allocation-card speed-pool">
        <div class="pool-card-header">
          <label>Speed</label>
          <span class="pool-allocated" id="poolSpeedAllocated">0</span>
        </div>
        <div class="pool-card-controls">
          <button 
            class="pool-adjust-btn" 
            onclick="adjustPoolAllocation('Speed', -1)"
            id="poolSpeedMinus"
          >
            −
          </button>
          <button 
            class="pool-adjust-btn" 
            onclick="adjustPoolAllocation('Speed', 1)"
            id="poolSpeedPlus"
          >
            +
          </button>
        </div>
      </div>

      <!-- Intellect Pool Card -->
      <div class="pool-allocation-card intellect-pool">
        <div class="pool-card-header">
          <label>Intellect</label>
          <span class="pool-allocated" id="poolIntellectAllocated">0</span>
        </div>
        <div class="pool-card-controls">
          <button 
            class="pool-adjust-btn" 
            onclick="adjustPoolAllocation('Intellect', -1)"
            id="poolIntellectMinus"
          >
            −
          </button>
          <button 
            class="pool-adjust-btn" 
            onclick="adjustPoolAllocation('Intellect', 1)"
            id="poolIntellectPlus"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <div class="pool-allocation-footer">
      <button 
        class="pool-confirm-btn" 
        id="confirmPoolAllocation" 
        onclick="confirmPoolAllocation()"
        disabled
      >
        Allocate All Points First
      </button>
    </div>
  `;

  // Store allocation data on the UI element
  allocationUI.dataset.allocation = JSON.stringify(allocation);
  allocationUI.dataset.totalPoints = totalPoints;
  allocationUI.dataset.remainingPoints = remainingPoints;

  // Insert into Stats tab at the top
  const statsSection = statsTab.querySelector(".section");
  if (statsSection) {
    statsTab.insertBefore(allocationUI, statsSection);
  } else {
    statsTab.insertBefore(allocationUI, statsTab.firstChild);
  }

  // Scroll to the UI
  allocationUI.scrollIntoView({ behavior: "smooth", block: "start" });

  console.log("Pool allocation UI shown");
}

function adjustPoolAllocation(stat, change) {
  const allocationUI = document.getElementById("poolAllocation");

  if (!allocationUI) return;

  const totalPoints = parseInt(allocationUI.dataset.totalPoints);
  const allocation = JSON.parse(allocationUI.dataset.allocation);
  let remainingPoints = parseInt(allocationUI.dataset.remainingPoints);

  // Check if we can make this change
  if (change > 0 && remainingPoints <= 0) {
    return; // No points left
  }

  if (change < 0 && allocation[stat] <= 0) {
    return; // Can't go below 0
  }

  // Apply change
  allocation[stat] += change;
  remainingPoints -= change;

  // Update displays
  const allocatedDisplay = document.getElementById(`pool${stat}Allocated`);
  if (allocatedDisplay) {
    allocatedDisplay.textContent = allocation[stat];
  }

  const remainingDisplay = document.getElementById("poolPointsRemaining");
  if (remainingDisplay) {
    remainingDisplay.textContent = remainingPoints;
  }

  // Update button states
  const minusBtn = document.getElementById(`pool${stat}Minus`);
  const plusBtn = document.getElementById(`pool${stat}Plus`);

  if (minusBtn) {
    minusBtn.disabled = allocation[stat] <= 0;
  }

  // Disable all plus buttons if no points remaining
  ["Might", "Speed", "Intellect"].forEach((s) => {
    const btn = document.getElementById(`pool${s}Plus`);
    if (btn) {
      btn.disabled = remainingPoints <= 0;
    }
  });

  // Update confirm button
  const confirmBtn = document.getElementById("confirmPoolAllocation");
  if (confirmBtn) {
    if (remainingPoints === 0) {
      confirmBtn.textContent = "Confirm Pool Allocation";
      confirmBtn.disabled = false;
    } else {
      confirmBtn.textContent = `Allocate ${remainingPoints} More Point${
        remainingPoints !== 1 ? "s" : ""
      } First`;
      confirmBtn.disabled = true;
    }
  }

  // Store updated data
  allocationUI.dataset.allocation = JSON.stringify(allocation);
  allocationUI.dataset.remainingPoints = remainingPoints;

  console.log("Allocation updated:", allocation, "Remaining:", remainingPoints);
}

function enablePoolAllocation(points) {
  character.tempPoolAllocation = {
    Might: 0,
    Speed: 0,
    Intellect: 0,
    remaining: points,
  };

  // Check if allocation UI already exists
  if (document.getElementById("tempPoolAllocation")) {
    document.getElementById("tempPoolAllocation").remove();
  }

  // Find the stats section
  const statsSection = document.querySelector("#stats");

  const allocationUI = document.createElement("div");
  allocationUI.id = "tempPoolAllocation";
  allocationUI.className = "allocation-ui";
  allocationUI.style.cssText = `
    background: #2a2a2a;
    border: 2px solid #317e30;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  `;

  allocationUI.innerHTML = `
    <h3 style="color: #317e30; margin-top: 0;">Allocate ${points} Pool Points</h3>
    <p style="color: #ddd;">Points Remaining: <strong style="color: #317e30;"><span id="tempPointsRemaining">${points}</span></strong></p>
    <div class="stat-allocation-controls" style="display: flex; flex-direction: column; gap: 15px;">
      ${["Might", "Speed", "Intellect"]
        .map(
          (stat) => `
        <div class="allocation-row" style="display: flex; align-items: center; justify-content: space-between;">
          <label style="color: #ddd; min-width: 100px;">${stat}:</label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button onclick="allocateTempPoint('${stat}', -1)" style="width: 30px; height: 30px; background: #d32f2f; color: white; border: none; border-radius: 4px; cursor: pointer;">-</button>
            <span id="temp${stat}Allocation" style="color: #317e30; min-width: 30px; text-align: center; font-weight: bold;">0</span>
            <button onclick="allocateTempPoint('${stat}', 1)" style="width: 30px; height: 30px; background: #317e30; color: white; border: none; border-radius: 4px; cursor: pointer;">+</button>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
    <div style="display: flex; gap: 10px; margin-top: 20px;">
      <button class="confirm-button" onclick="confirmPoolAllocation()" style="flex: 1; background: #317e30; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: bold;">Confirm Allocation</button>
      <button class="cancel-button" onclick="cancelPoolAllocation()" style="flex: 1; background: #d32f2f; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: bold;">Cancel</button>
    </div>
  `;

  //  - Insert the allocationUI into the page
  const firstSection = statsSection.querySelector(".section");
  if (firstSection) {
    statsSection.insertBefore(allocationUI, firstSection);
  } else {
    statsSection.insertBefore(allocationUI, statsSection.firstChild);
  }
}

function allocateTempPoint(stat, amount) {
  const newValue = character.tempPoolAllocation[stat] + amount;
  const newRemaining = character.tempPoolAllocation.remaining - amount;

  if (newValue >= 0 && newRemaining >= 0) {
    character.tempPoolAllocation[stat] = newValue;
    character.tempPoolAllocation.remaining = newRemaining;

    document.getElementById(`temp${stat}Allocation`).textContent = newValue;
    document.getElementById("tempPointsRemaining").textContent = newRemaining;
  }
}

function confirmPoolAllocation() {
  const allocationUI = document.getElementById("poolAllocation");

  if (!allocationUI) return;

  const allocation = JSON.parse(allocationUI.dataset.allocation);
  const totalPoints = parseInt(allocationUI.dataset.totalPoints);
  const remainingPoints = parseInt(allocationUI.dataset.remainingPoints);

  // Verify all points are allocated
  if (remainingPoints !== 0) {
    alert("Please allocate all points before confirming.");
    return;
  }

  const confirmation = confirm(
    `Confirm pool point allocation?\n\n` +
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

      console.log(`${stat} pool increased by ${points}`);
    }
  });

  // Remove UI
  allocationUI.remove();

  alert(
    `Pool points allocated!\n\n` +
      Object.entries(allocation)
        .filter(([_, val]) => val > 0)
        .map(
          ([stat, val]) =>
            `${stat} Pool: +${val} (now ${character.stats[stat]})`
        )
        .join("\n")
  );

  // Clear pending flag
  character.pendingPoolPoints = 0;
}

function cancelPoolAllocation() {
  const confirmation = confirm(
    "Are you sure you want to cancel? This will refund your 4 XP."
  );

  if (confirmation) {
    // Refund XP
    character.xp++;
    character.currentTierAdvancements.increasePools = false;
    character.advancementsPurchasedThisTier--;

    // Remove UI
    const allocationUI = document.getElementById("tempPoolAllocation");
    if (allocationUI) {
      allocationUI.remove();
    }
    character.tempPoolAllocation = null;
    character.pendingPoolPoints = 0;

    updateAdvancementDisplay();
  }
}

function enableEdgeSelection() {
  // Check if edge selection UI already exists
  if (document.getElementById("tempEdgeSelection")) {
    document.getElementById("tempEdgeSelection").remove();
  }

  // Find the stats section
  const statsSection = document.querySelector("#stats");

  const edgeSelectionUI = document.createElement("div");
  edgeSelectionUI.id = "tempEdgeSelection";
  edgeSelectionUI.className = "allocation-ui";
  edgeSelectionUI.style.cssText = `
    background: #2a2a2a;
    border: 2px solid #317e30;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  `;

  edgeSelectionUI.innerHTML = `
    <h3 style="color: #317e30; margin-top: 0;">Select Edge to Increase</h3>
    <p style="color: #ddd;">Choose which Edge stat to increase by 1:</p>
    <div style="display: flex; flex-direction: column; gap: 15px; margin: 20px 0;">
      ${["Might", "Speed", "Intellect"]
        .map(
          (stat) => `
        <button 
          onclick="confirmEdgeIncrease('${stat}')" 
          style="
            width: 100%;
            background: #317e30;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1em;
          "
          onmouseover="this.style.background='#3c963b'"
          onmouseout="this.style.background='#317e30'"
        >
          Increase ${stat} Edge (Currently: ${character.edge[stat]})
        </button>
      `
        )
        .join("")}
    </div>
    <button 
      class="cancel-button" 
      onclick="cancelEdgeSelection()" 
      style="
        width: 100%;
        background: #d32f2f;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
      "
    >
      Cancel
    </button>
  `;

  // Insert the UI into the page
  const firstSection = statsSection.querySelector(".section");
  if (firstSection) {
    statsSection.insertBefore(edgeSelectionUI, firstSection);
  } else {
    statsSection.insertBefore(edgeSelectionUI, statsSection.firstChild);
  }
}

function confirmEdgeIncrease(stat) {
  character.edge[stat]++;
  const edgeElement = document.getElementById(`${stat.toLowerCase()}Edge`);
  if (edgeElement) {
    edgeElement.textContent = character.edge[stat];
  }

  // Remove UI
  const edgeSelectionUI = document.getElementById("tempEdgeSelection");
  if (edgeSelectionUI) {
    edgeSelectionUI.remove();
  }

  alert(`${stat} Edge increased to ${character.edge[stat]}!`);
}

function cancelEdgeSelection() {
  const confirmation = confirm(
    "Are you sure you want to cancel? This will refund your 4 XP."
  );

  if (confirmation) {
    // Refund XP
    character.xp++;
    character.currentTierAdvancements.increaseEdge = false;
    character.advancementsPurchasedThisTier--;

    // Remove UI
    const edgeSelectionUI = document.getElementById("tempEdgeSelection");
    if (edgeSelectionUI) {
      edgeSelectionUI.remove();
    }

    updateAdvancementDisplay();
    alert("Edge increase cancelled. 4 XP refunded.");
  }
}

function showSkillTrainingUI() {
  alert(
    "Go to the Skills & Abilities tab to add your trained/specialized skill."
  );
  switchToTab("skills");
}

function switchToTab(tabName) {
  // Trigger tab switch
  const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
  if (tabButton) {
    tabButton.click();
  }
}

function updateAdvancementDisplay() {
  console.log("updateAdvancementDisplay called");

  // Update XP display
  const xpInput = document.getElementById("xp");
  if (xpInput) {
    xpInput.value = character.xp;
  }

  // Update tier display
  const tierDisplays = document.querySelectorAll("#tierDisplay");
  tierDisplays.forEach((display) => {
    display.textContent = character.tier;
  });

  // Update advancement count
  const countDisplay = document.getElementById("advancementCount");
  if (countDisplay) {
    countDisplay.textContent = character.advancementsPurchasedThisTier;
  }

  // Update advancement buttons
  updateAdvancementButtons();
}

function updateAdvancementButtons() {
  const XP_COST = 4;
  console.log("updateAdvancementButtons called");
  console.log("Current XP:", character.xp);
  console.log("Current advancements:", character.currentTierAdvancements);

  const hasXP = character.xp >= XP_COST;

  // Required advancements
  const advancementButtons = {
    increasePoolsBtn: "increasePools",
    increaseEdgeBtn: "increaseEdge",
    increaseEffortBtn: "increaseEffort",
    trainSkillBtn: "trainSkill",
    // Optional
    increaseRecoveryBtn: "increaseRecovery",
    extraFocusAbilityBtn: "extraFocusAbility",
    extraTypeAbilityBtn: "extraTypeAbility",
  };

  Object.entries(advancementButtons).forEach(([btnId, advType]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      const isPurchased = character.currentTierAdvancements[advType];
      btn.disabled = !hasXP || isPurchased;

      if (isPurchased) {
        btn.textContent = "✓ Purchased";
        btn.style.background = "#555";
      } else {
        btn.textContent = "Purchase (4 XP)";
        btn.style.background = "";
      }
    }
  });

  // Disable extra focus if tier < 3
  const extraFocusBtn = document.getElementById("extraFocusAbilityBtn");
  if (extraFocusBtn && character.tier < 3) {
    extraFocusBtn.disabled = true;
    extraFocusBtn.title = "Requires Tier 3+";
  }
}
