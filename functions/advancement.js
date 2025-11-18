// ==================== CHARACTER ADVANCEMENT SYSTEM ==================== //

// ========== REQUIRED ADVANCEMENTS ========== //

function purchaseIncreasePools() {
  const COST = 4;
  console.log("purchaseIncreasePools called");

  if (!canPurchaseAdvancement("increasePools")) return;

  if (spendXP(COST, "Increase stat Pools by 4 points")) {
    character.currentTierAdvancements.increasePools = true;
    character.pendingPoolPoints = 4;
    character.advancementsPurchasedThisTier++;

    // Show pool allocation UI
    showPoolAllocationUI(4);

    updateAdvancementDisplay();
    checkTierAdvancement();
  }
}

function purchaseIncreaseEdge() {
  const COST = 4;
  console.log("purchaseIncreaseEdge called");

  if (!canPurchaseAdvancement("increaseEdge")) return;

  if (spendXP(COST, "Increase one Edge by 1")) {
    character.currentTierAdvancements.increaseEdge = true;
    character.advancementsPurchasedThisTier++;

    // Show edge selection UI
    switchToTab("stats");
    enableEdgeSelection();

    updateAdvancementDisplay();
    checkTierAdvancement();
  }
}

function purchaseIncreaseEffort() {
  const COST = 4;
  console.log("purchaseIncreaseEffort called");

  if (!canPurchaseAdvancement("increaseEffort")) return;

  if (spendXP(COST, "Increase Effort by 1")) {
    character.currentTierAdvancements.increaseEffort = true;
    character.advancementsPurchasedThisTier++;

    // Automatically increase effort
    character.effort = (parseInt(character.effort) || 1) + 1;
    const effortDisplay = document.getElementById("effortLevel");
    if (effortDisplay) {
      effortDisplay.textContent = character.effort;
    }

    alert(`Effort increased to ${character.effort}!`);

    updateAdvancementDisplay();
    checkTierAdvancement();
  }
}

function purchaseTrainSkill() {
  const COST = 4;
  console.log("purchaseTrainSkill called");

  if (!canPurchaseAdvancement("trainSkill")) return;

  if (spendXP(COST, "Train or Specialize in a skill")) {
    character.currentTierAdvancements.trainSkill = true;
    character.advancementsPurchasedThisTier++;
    character.pendingSkillTraining = true;

    // Show skill training UI
    showSkillTrainingUI();

    updateAdvancementDisplay();
    checkTierAdvancement();
  }
}

// ========== OPTIONAL ADVANCEMENTS ========== //

// Helper function to check if an optional advancement has already been purchased
function hasOptionalAdvancement() {
  return (
    character.currentTierAdvancements.increaseRecovery ||
    character.currentTierAdvancements.extraFocusAbility ||
    character.currentTierAdvancements.extraTypeAbility
  );
}

function purchaseIncreaseRecovery() {
  const COST = 4;
  console.log("purchaseIncreaseRecovery called");

  // Check if another optional advancement has already been purchased
  if (hasOptionalAdvancement()) {
    alert(
      "You have already purchased an optional advancement this tier!\n\n" +
        "You can only purchase ONE optional advancement per tier.\n\n" +
        "Optional advancements purchased this tier:\n" +
        (character.currentTierAdvancements.increaseRecovery
          ? "• Increase Recovery\n"
          : "") +
        (character.currentTierAdvancements.extraFocusAbility
          ? "• Extra Focus Ability\n"
          : "") +
        (character.currentTierAdvancements.extraTypeAbility
          ? "• Extra Type Ability\n"
          : "")
    );
    return;
  }

  if (!canPurchaseAdvancement("increaseRecovery")) return;

  if (spendXP(COST, "Increase recovery rolls by +1")) {
    character.currentTierAdvancements.increaseRecovery = true;
    character.advancementsPurchasedThisTier++;

    // Automatically increase recovery bonus
    character.recoveryBonus = (character.recoveryBonus || 0) + 1;

    // Update the display
    const recoveryBonusDisplay = document.getElementById(
      "recoveryBonusDisplay"
    );
    if (recoveryBonusDisplay) {
      recoveryBonusDisplay.textContent = `+${character.recoveryBonus}`;
    }

    alert(`Recovery rolls now have a +${character.recoveryBonus} bonus!`);

    updateAdvancementDisplay();
    updateAdvancementButtons();
    checkTierAdvancement();
  }
}

function purchaseExtraFocusAbility() {
  const COST = 4;
  console.log("purchaseExtraFocusAbility called");

  // Check if another optional advancement has already been purchased
  if (hasOptionalAdvancement()) {
    alert(
      "You have already purchased an optional advancement this tier!\n\n" +
        "You can only purchase ONE optional advancement per tier.\n\n" +
        "Optional advancements purchased this tier:\n" +
        (character.currentTierAdvancements.increaseRecovery
          ? "• Increase Recovery\n"
          : "") +
        (character.currentTierAdvancements.extraFocusAbility
          ? "• Extra Focus Ability\n"
          : "") +
        (character.currentTierAdvancements.extraTypeAbility
          ? "• Extra Type Ability\n"
          : "")
    );
    return;
  }

  if (!canPurchaseAdvancement("extraFocusAbility")) return;

  if (spendXP(COST, "Gain an extra Focus ability")) {
    character.currentTierAdvancements.extraFocusAbility = true;
    character.advancementsPurchasedThisTier++;

    // Grant 1 additional Focus ability selection
    if (typeof grantExtraFocusAbility === "function") {
      grantExtraFocusAbility();
    } else {
      console.error("grantExtraFocusAbility function not found!");
    }

    alert(
      "Extra Focus ability purchased!\n\n" +
        "You can now select an additional Focus ability from your Focus."
    );

    updateAdvancementDisplay();
    updateAdvancementButtons();
    checkTierAdvancement();
  }
}

function purchaseExtraTypeAbility() {
  const COST = 4;
  console.log("purchaseExtraTypeAbility called");

  // Check if another optional advancement has already been purchased
  if (hasOptionalAdvancement()) {
    alert(
      "You have already purchased an optional advancement this tier!\n\n" +
        "You can only purchase ONE optional advancement per tier.\n\n" +
        "Optional advancements purchased this tier:\n" +
        (character.currentTierAdvancements.increaseRecovery
          ? "• Increase Recovery\n"
          : "") +
        (character.currentTierAdvancements.extraFocusAbility
          ? "• Extra Focus Ability\n"
          : "") +
        (character.currentTierAdvancements.extraTypeAbility
          ? "• Extra Type Ability\n"
          : "")
    );
    return;
  }

  if (!canPurchaseAdvancement("extraTypeAbility")) return;

  if (spendXP(COST, "Gain an extra Type ability")) {
    character.currentTierAdvancements.extraTypeAbility = true;
    character.advancementsPurchasedThisTier++;

    // Grant 1 additional Type ability selection
    if (typeof grantTypeAbilitySelections === "function") {
      grantTypeAbilitySelections(1);
    }

    alert(
      "Extra Type ability purchased!\n\n" +
        "You can now select 1 additional Type ability."
    );

    updateAdvancementDisplay();
    updateAdvancementButtons();
    checkTierAdvancement();
  }
}

// ========== XP MANAGEMENT ========== //

function addXP(amount) {
  // Ensure both values are numbers
  const currentXP = parseInt(character.xp) || 0;
  const addAmount = parseInt(amount) || 0;

  character.xp = currentXP + addAmount;

  updateXPDisplay();

  alert(`Added ${addAmount} XP!\n\nCurrent XP: ${character.xp}`);
}

function addQuickXP(amount) {
  addXP(amount);
  alert(`Added ${amount} XP! Total XP: ${character.xp}`);
}

function updateXP(value) {
  // Ensure XP is never negative
  const numValue = parseInt(value) || 0;
  character.xp = Math.max(0, numValue);

  const xpInput = document.getElementById("xp");
  if (xpInput) {
    xpInput.value = character.xp;
    // Add min attribute to the input field
    xpInput.min = 0;
  }

  // Update any other XP displays if they exist
  const xpDisplays = document.querySelectorAll(".xp-display, #xpDisplay");
  xpDisplays.forEach((display) => {
    display.textContent = character.xp;
  });

  // Update advancement buttons
  updateAdvancementButtons();
}

function updateXPDisplay() {
  // Ensure XP is a valid number
  if (
    isNaN(character.xp) ||
    character.xp === undefined ||
    character.xp === null
  ) {
    character.xp = 0;
  }
  character.xp = Math.max(0, parseInt(character.xp) || 0);

  const xpInput = document.getElementById("xp");
  if (xpInput) {
    xpInput.value = character.xp;
    xpInput.min = 0;
  }

  // Update any other XP displays if they exist
  const xpDisplays = document.querySelectorAll(".xp-display, #xpDisplay");
  xpDisplays.forEach((display) => {
    display.textContent = character.xp;
  });

  // Update advancement buttons
  if (typeof updateAdvancementButtons === "function") {
    updateAdvancementButtons();
  }
}

// ==================== Stat Allocation ==================== //
let statBonuses = { Might: 0, Speed: 0, Intellect: 0 };
let pointsToAllocate = 6;
let statsConfirmed = false;

function allocatePoint(stat, amount) {
  if (statsConfirmed) return;

  const newValue = statBonuses[stat] + amount;
  const newTotal = pointsToAllocate - amount;

  if (newValue >= 0 && newTotal >= 0) {
    statBonuses[stat] = newValue;
    pointsToAllocate = newTotal;

    document.getElementById(`${stat.toLowerCase()}Bonus`).textContent =
      newValue;
    document.getElementById("pointsRemaining").textContent = pointsToAllocate;

    document.getElementById("confirmStats").disabled = pointsToAllocate > 0;
  }
}

function confirmStatAllocation() {
  if (statsConfirmed || pointsToAllocate > 0) return;

  const confirmation = confirm(
    "Are you sure you want to confirm your stat allocation?\n" +
      "This will permanently increase your stat pools."
  );

  if (confirmation) {
    statsConfirmed = true;

    ["Might", "Speed", "Intellect"].forEach((stat) => {
      const currentMax = parseInt(
        document.getElementById(`${stat.toLowerCase()}Max`).textContent
      );
      const bonus = statBonuses[stat];
      const newMax = currentMax + bonus;

      document.getElementById(`${stat.toLowerCase()}Max`).textContent = newMax;
      document.getElementById(`${stat.toLowerCase()}Pool`).textContent = newMax;

      character.stats[stat] = newMax;
      character.currentPools[stat] = newMax;
    });

    document.getElementById("statAllocation").style.display = "none";

    // Auto-hide descriptor suggestions only if Tier 2+
    setTimeout(() => {
      autoHideDescriptorSuggestions();
    }, 500);

    // Show alert with tier-specific message about descriptor suggestions
    const tierMessage =
      character.tier >= 2
        ? ""
        : "\n\nNote: Descriptor suggestions will remain visible until you manually dismiss them (or reach Tier 2).";

    alert(
      "Stat allocation confirmed! Your stat pools have been increased." +
        tierMessage
    );

    // Hide the stat allocation UI
    const statAllocationUI = document.getElementById("statAllocation");
    if (statAllocationUI) {
      statAllocationUI.style.display = "none";
    }

    statsConfirmed = true;
  }
}
