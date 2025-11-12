// ==================== ACTION CALCULATOR ==================== //

// Initialize the action calculator
function initializeActionCalculator() {
  // Populate difficulty dropdown
  const difficultySelect = document.getElementById("actionDifficulty");
  if (difficultySelect) {
    // Clear existing options except the first one
    difficultySelect.innerHTML =
      '<option value="">-- Select Difficulty --</option>';

    // Check if DIFFICULTY array is loaded
    if (typeof DIFFICULTY === "undefined") {
      console.error("DIFFICULTY array is not loaded!");
      return;
    }

    DIFFICULTY.forEach((diff) => {
      const option = document.createElement("option");
      option.value = diff.difficulty;
      option.textContent = `${diff.difficulty} - ${diff.description}`;
      difficultySelect.appendChild(option);
    });
  }

  // Set max effort
  const effortInput = document.getElementById("actionEffort");
  const effortMax = document.getElementById("actionEffortMax");
  if (effortInput && effortMax) {
    effortInput.max = character.effort || 1;
    effortMax.textContent = character.effort || 1;
  }

  // Initialize calculator
  updateActionCalculator();
}

function getHeavyWeaponModifier() {
  const type = character.type;

  if (!type) return 0;

  const typeDefaults = {
    Investigator: { HeavyWeapons: "Inability" },
    Protector: { HeavyWeapons: "Ability" },
    Elocutionist: { HeavyWeapons: "Inability" },
    Occultist: { HeavyWeapons: "Inability" },
  };

  const typeData = typeDefaults[type];

  if (!typeData) return 0;

  // Check if character has the Heavy Weapons Ability (purchased as advancement or from Type)
  const hasHeavyWeaponAbility =
    character.selectedTypeAbilities?.includes("Heavy Weapons") ||
    typeData.HeavyWeapons === "Ability";

  if (hasHeavyWeaponAbility) {
    return 0; // No modifier - can use heavy weapons normally
  }

  // Has inability - hinders by 1 step
  return 1; // Increases difficulty/opponent level by 1
}

// Store the current action cost for confirmation
let currentActionCost = {
  stat: null,
  cost: 0,
};

// Update action calculator displays
function updateActionCalculator() {
  // Get input values
  const difficulty =
    parseInt(document.getElementById("actionDifficulty")?.value) || 0;
  const stat = document.getElementById("actionStat")?.value || "";
  const training =
    parseInt(document.getElementById("actionTraining")?.value) || 0;
  const effort = parseInt(document.getElementById("actionEffort")?.value) || 0;
  const special =
    parseInt(document.getElementById("actionSpecial")?.value) || 0;

  // Update difficulty description
  const diffDesc = document.getElementById("actionDifficultyDesc");
  if (diffDesc && difficulty >= 0) {
    const diffData = DIFFICULTY.find((d) => d.difficulty === difficulty);
    diffDesc.textContent = diffData ? `(${diffData.description})` : "";
  }

  // Update Edge display
  const edgeDisplay = document.getElementById("actionEdgeDisplay");
  if (edgeDisplay && stat) {
    const statCapitalized = stat.charAt(0).toUpperCase() + stat.slice(1);
    const edge = character.edge?.[statCapitalized] || 0;
    edgeDisplay.textContent = edge;
  } else if (edgeDisplay) {
    edgeDisplay.textContent = "--";
  }

  // Update training effect
  const trainingEffect = document.getElementById("actionTrainingEffect");
  if (trainingEffect) {
    if (training === 1) {
      trainingEffect.textContent = "Eases task by 1 step";
    } else if (training === 2) {
      trainingEffect.textContent = "Eases task by 2 steps";
    } else if (training === -1) {
      trainingEffect.textContent = "Hinders task by 1 step";
    } else {
      trainingEffect.textContent = "No modification";
    }
  }

  // Update max effort display
  const effortMax = document.getElementById("actionEffortMax");
  if (effortMax) {
    effortMax.textContent = character.effort || 1;
  }

  // Calculate eased difficulty
  const stressLevel = getStressLevel();
  const easedDifficulty = Math.max(
    0,
    difficulty + stressLevel - training - effort - special
  );

  // Update eased difficulty display
  const easedDiffDisplay = document.getElementById("actionEasedDifficulty");
  if (easedDiffDisplay) {
    easedDiffDisplay.textContent = easedDifficulty;
  }

  // Calculate target number
  const targetNumber = easedDifficulty * 3;

  // Update target number display
  const targetDisplay = document.getElementById("actionTargetNumber");
  if (targetDisplay) {
    targetDisplay.textContent = targetNumber;
  }

  // Enable/disable roll button
  const rollBtn = document.getElementById("actionRollBtn");
  if (rollBtn) {
    rollBtn.disabled = !difficulty || !stat;
  }

  // Hide previous results
  const resultsDiv = document.getElementById("actionResults");
  const diceResultRow = document.getElementById("actionDiceResultRow");
  const confirmSection = document.getElementById("actionConfirmSection");

  if (resultsDiv) resultsDiv.style.display = "none";
  if (diceResultRow) diceResultRow.style.display = "none";
  if (confirmSection) confirmSection.style.display = "none";
}

// Get current stress level modifier
function getStressLevel() {
  const stress = character.stress || 0;

  // Stress Level = Stress Points ÷ 3 (rounded down)
  // 0-2 stress = 0 stress levels (no penalty)
  // 3-5 stress = 1 stress level (+1 difficulty)
  // 6-8 stress = 2 stress levels (+2 difficulty)
  // 9-11 stress = 3 stress levels (+3 difficulty)
  // etc.

  return Math.floor(stress / 3);
}

// Roll action dice
function rollActionDice() {
  // Get current values
  const difficulty =
    parseInt(document.getElementById("actionDifficulty")?.value) || 0;
  const stat = document.getElementById("actionStat")?.value || "";
  const effort = parseInt(document.getElementById("actionEffort")?.value) || 0;
  const targetNumber =
    parseInt(document.getElementById("actionTargetNumber")?.textContent) || 0;

  if (!difficulty || !stat) {
    alert("Please select a difficulty and stat before rolling.");
    return;
  }

  // Show dice roller and pass callback
  showDiceRoller("d20", (roll) => {
    processDiceRoll("action", roll, targetNumber, stat, effort);
  });
}

// Add unified roll processing function:

function processDiceRoll(calculatorType, roll, targetNumber, stat, effort) {
  // Display dice result
  let diceResultRow, diceResult;

  if (calculatorType === "action") {
    diceResultRow = document.getElementById("actionDiceResultRow");
    diceResult = document.getElementById("actionDiceResult");
  } else if (calculatorType === "attack") {
    diceResultRow = document.getElementById("attackDiceResultRow");
    diceResult = document.getElementById("attackDiceResult");
  } else if (calculatorType === "defend") {
    diceResultRow = document.getElementById("defendDiceResultRow");
    diceResult = document.getElementById("defendDiceResult");
  }

  if (diceResultRow && diceResult) {
    diceResult.textContent = roll;
    diceResultRow.style.display = "table-row";
  }

  // Store roll and call appropriate calculator function
  if (calculatorType === "action") {
    calculateActionResult(roll, targetNumber, stat, effort);
  } else if (calculatorType === "attack") {
    currentAttackData.roll = roll;
    currentAttackData.stat = stat;
    currentAttackData.effort = effort;

    const opponentType =
      document.getElementById("attackOpponentType")?.value || "player-npc";
    const opponentLevel =
      parseInt(document.getElementById("attackOpponentLevel")?.value) || 0;
    const weapon = document.getElementById("attackWeapon")?.value || "";
    const special =
      parseInt(document.getElementById("attackSpecial")?.value) || 0;

    calculateAttackHit(
      roll,
      opponentType,
      opponentLevel,
      weapon,
      effort,
      special
    );
  } else if (calculatorType === "defend") {
    currentDefendData.roll = roll;
    currentDefendData.stat = stat;
    currentDefendData.effort = effort;

    const opponentType =
      document.getElementById("defendOpponentType")?.value || "player-npc";
    const opponentLevel =
      parseInt(document.getElementById("defendOpponentLevel")?.value) || 0;
    const cooperative =
      document.getElementById("defendCooperative")?.value || "none";
    const special =
      parseInt(document.getElementById("defendSpecial")?.value) || 0;

    currentDefendData.cooperative = cooperative;

    calculateDefendHit(
      roll,
      opponentType,
      opponentLevel,
      effort,
      cooperative,
      special
    );
  }
}

// Calculate and display action result
function calculateActionResult(roll, targetNumber, stat, effort) {
  const resultsDiv = document.getElementById("actionResults");
  const successBox = document.getElementById("actionSuccessBox");
  const successText = document.getElementById("actionSuccessText");
  const costText = document.getElementById("actionCostText");
  const confirmSection = document.getElementById("actionConfirmSection");

  if (!resultsDiv || !successBox || !successText || !costText) return;

  // Determine success/failure
  let resultMessage = "";
  let boxClass = "";

  // Check for critical failure
  if (roll === 1) {
    resultMessage = "CRITICAL FAILURE!";
    boxClass = "critical";
  }
  // Check for critical success or natural 19/20
  else if (roll === 20) {
    resultMessage = "CRITICAL SUCCESS!<br>Major Effect Bonus!";
    boxClass = "success critical";
  } else if (roll === 19) {
    const damageTrack = character.damageTrack || "hale";
    if (damageTrack !== "impaired" && damageTrack !== "debilitated") {
      resultMessage =
        roll >= targetNumber
          ? "Action Succeeds!<br>Natural 19 - Minor Effect Bonus!"
          : "Action Fails!<br>(But Natural 19 - Minor Effect Bonus!)";
      boxClass = roll >= targetNumber ? "success" : "failure";
    } else {
      resultMessage =
        roll >= targetNumber ? "Action Succeeds!" : "Action Fails!";
      boxClass = roll >= targetNumber ? "success" : "failure";
    }
  }
  // Regular success/failure
  else {
    resultMessage = roll >= targetNumber ? "Action Succeeds!" : "Action Fails!";
    boxClass = roll >= targetNumber ? "success" : "failure";
  }

  successText.innerHTML = resultMessage;
  successBox.className = `result-box ${boxClass}`;

  // Calculate stat pool cost
  const { costMessage, actualCost } = calculateStatPoolCostWithValue(
    stat,
    effort
  );
  costText.innerHTML = costMessage;

  // Store the cost for later confirmation
  currentActionCost = {
    stat: stat,
    cost: actualCost,
  };

  // Show results
  resultsDiv.style.display = "grid";

  // Show confirm button
  if (confirmSection) {
    confirmSection.style.display = "block";
  }
}

function calculateStatPoolCostWithValue(stat, effort) {
  if (effort === 0) {
    return {
      costMessage: `No reduction from ${capitalizeFirstLetter(stat)} pool.`,
      actualCost: 0,
    };
  }

  const statCapitalized = stat.charAt(0).toUpperCase() + stat.slice(1);
  const edge = character.edge?.[statCapitalized] || 0;
  const damageState = character.damageState || "hale";
  let cost;

  // Check if impaired or debilitated - Effort costs +1 more
  if (damageState === "impaired" || damageState === "debilitated") {
    // 4 for first Effort, 3 for each additional
    cost = 4 + 3 * (effort - 1);
  } else {
    // 3 for first Effort, 2 for each additional
    cost = 3 + 2 * (effort - 1);
  }

  // Subtract Edge
  const actualCost = Math.max(0, cost - edge);

  // Build cost message with breakdown
  let costBreakdown = "";
  if (damageState === "impaired" || damageState === "debilitated") {
    if (effort === 1) {
      costBreakdown = `4 points (3 base + 1 ${damageState})`;
    } else {
      costBreakdown = `4 (first) + ${3 * (effort - 1)} (${
        effort - 1
      } additional) = ${cost} points`;
    }
  } else {
    if (effort === 1) {
      costBreakdown = "3 points";
    } else {
      costBreakdown = `3 (first) + ${2 * (effort - 1)} (${
        effort - 1
      } additional) = ${cost} points`;
    }
  }

  const costMessage =
    `Reduce ${capitalizeFirstLetter(
      stat
    )} pool by <strong>${actualCost} points</strong>.<br>` +
    `(${effort} Effort = ${costBreakdown}, minus ${edge} Edge)`;

  return { costMessage, actualCost };
}

// Keep the old function for backward compatibility:
function calculateStatPoolCost(stat, effort) {
  const result = calculateStatPoolCostWithValue(stat, effort);
  return result.costMessage;
}

// Add the new confirmAction function:

function confirmAction() {
  console.log("=== CONFIRMING ACTION ===");

  // Always proceed even if no cost
  const stat = currentActionCost.stat;
  const cost = currentActionCost.cost;

  if (!stat || cost === 0) {
    // No cost to apply, just acknowledge
    alert("Action acknowledged!\n\nNo stat points spent.");
    clearActionCalculator();
    return;
  }

  console.log(`Applying action cost: ${cost} ${stat} points`);

  // Ensure currentPools exists
  if (!character.currentPools) {
    console.error("character.currentPools is undefined! Initializing...");
    character.currentPools = {
      Might: character.stats?.Might || 0,
      Speed: character.stats?.Speed || 0,
      Intellect: character.stats?.Intellect || 0,
    };
  }

  // Get current pool value
  const statKey = stat.charAt(0).toUpperCase() + stat.slice(1);
  const currentPool = character.currentPools[statKey] || 0;
  const newPool = Math.max(0, currentPool - cost);

  // Update character pools
  character.currentPools[statKey] = newPool;

  console.log(`${statKey} pool: ${currentPool} -> ${newPool}`);

  // Update the display
  updateStatDisplay();

  // Show confirmation
  alert(
    `Action confirmed!\n\n` +
      `${cost} ${statKey} points spent.\n` +
      `${statKey} pool: ${currentPool} → ${newPool}`
  );

  // Clear the calculator
  clearActionCalculator();
}

// Add function to clear/reset the calculator:
function clearActionCalculator() {
  // Reset form inputs
  document.getElementById("actionDifficulty").value = "";
  document.getElementById("actionStat").value = "";
  document.getElementById("actionTraining").value = "0";
  document.getElementById("actionEffort").value = "0";
  document.getElementById("actionSpecial").value = "0";

  // Clear displays
  document.getElementById("actionDifficultyDesc").textContent = "";
  document.getElementById("actionEdgeDisplay").textContent = "--";
  document.getElementById("actionTrainingEffect").textContent =
    "No modification";
  document.getElementById("actionEasedDifficulty").textContent = "--";
  document.getElementById("actionTargetNumber").textContent = "--";

  // Hide results
  const resultsDiv = document.getElementById("actionResults");
  const diceResultRow = document.getElementById("actionDiceResultRow");
  const confirmSection = document.getElementById("actionConfirmSection");

  if (resultsDiv) resultsDiv.style.display = "none";
  if (diceResultRow) diceResultRow.style.display = "none";
  if (confirmSection) confirmSection.style.display = "none";

  // Reset stored cost
  currentActionCost = {
    stat: null,
    cost: 0,
  };

  // Update calculator to refresh button states
  updateActionCalculator();
}

// ==================== ATTACKING CALCULATOR ==================== //

// Store current attack data
let currentAttackData = {
  stat: null,
  cost: 0,
  damage: 0,
  roll: 0,
  hit: false,
};

// Initialize attacking calculator
function initializeAttackCalculator() {
  const weaponSelect = document.getElementById("attackWeapon");
  if (!weaponSelect) {
    console.log("Attack weapon select not found");
    return;
  }

  console.log("Initializing attack calculator...");
  console.log("Character weapons:", character.weapons);

  // Clear and add default options
  weaponSelect.innerHTML = `
    <option value="">-- Select Weapon --</option>
    <option value="unarmed">Unarmed (Light - 2 damage)</option>
    <option value="improvised">Improvised (Light - 2 damage)</option>
  `;

  // Add ALL weapons from character's inventory
  if (character.weapons && character.weapons.length > 0) {
    console.log("Adding weapons to dropdown:", character.weapons.length);

    character.weapons.forEach((weapon) => {
      console.log("Adding weapon:", weapon.Item, weapon.Damage);

      const option = document.createElement("option");
      option.value = `weapon_${weapon.Item}`;
      option.textContent = `${weapon.Item} (${weapon.Damage})`;
      option.dataset.damage = weapon.Damage;
      weaponSelect.appendChild(option);
    });
  } else {
    console.log("No weapons in inventory");
  }

  // Set max effort
  const effortInput = document.getElementById("attackEffort");
  const effortMax = document.getElementById("attackEffortMax");
  if (effortInput && effortMax) {
    effortInput.max = character.effort || 1;
    effortMax.textContent = character.effort || 1;
  }

  updateAttackCalculator();

  console.log("Attack calculator initialized");
}

function updateAttackCalculator() {
  const opponentType =
    document.getElementById("attackOpponentType")?.value || "player-npc";
  const opponentLevel =
    parseInt(document.getElementById("attackOpponentLevel")?.value) || 0;
  const stat = document.getElementById("attackStat")?.value || "";
  const weapon = document.getElementById("attackWeapon")?.value || "";
  const effort = parseInt(document.getElementById("attackEffort")?.value) || 0;
  const special =
    parseInt(document.getElementById("attackSpecial")?.value) || 0;

  // Update opponent info based on type
  const opponentInfo = document.getElementById("attackOpponentInfo");
  const opponentLevelRow = document.getElementById("attackOpponentLevelRow");
  const opponentHealthRow = document.getElementById("attackOpponentHealthRow");

  if (opponentType === "player-player") {
    if (opponentLevelRow) opponentLevelRow.style.display = "none";
    if (opponentHealthRow) opponentHealthRow.style.display = "none";
    if (opponentInfo)
      opponentInfo.textContent = "PvP - roll first, then compare";
  } else if (opponentType === "attacking-objects") {
    const opponentLevelLabel = document.getElementById(
      "attackOpponentLevelLabel"
    );
    if (opponentLevelLabel) opponentLevelLabel.textContent = "Object Level:";
    if (opponentLevelRow) opponentLevelRow.style.display = "table-row";
    if (opponentHealthRow) opponentHealthRow.style.display = "none";
    if (opponentInfo) opponentInfo.textContent = "Damaging inanimate objects";
  } else {
    const opponentLevelLabel = document.getElementById(
      "attackOpponentLevelLabel"
    );
    if (opponentLevelLabel) opponentLevelLabel.textContent = "Opponent Level:";
    if (opponentLevelRow) opponentLevelRow.style.display = "table-row";
    if (opponentHealthRow) opponentHealthRow.style.display = "table-row";
    if (opponentInfo)
      opponentInfo.textContent =
        opponentType === "npc-npc"
          ? "NPC attacking NPC"
          : "Standard combat encounter";
  }

  // Update Edge display
  const edgeDisplay = document.getElementById("attackEdgeDisplay");
  if (edgeDisplay && stat) {
    const statCapitalized = stat.charAt(0).toUpperCase() + stat.slice(1);
    const edge = character.edge?.[statCapitalized] || 0;
    edgeDisplay.textContent = edge;
  } else if (edgeDisplay) {
    edgeDisplay.textContent = "--";
  }

  // Update weapon damage display
  const weaponDamageDisplay = document.getElementById("attackWeaponDamage");
  if (weaponDamageDisplay && weapon) {
    const damageInfo = getWeaponDamage(weapon);
    weaponDamageDisplay.textContent = `${damageInfo.type} (${damageInfo.damage})`;
  } else if (weaponDamageDisplay) {
    weaponDamageDisplay.textContent = "--";
  }

  // Update max effort
  const effortMax = document.getElementById("attackEffortMax");
  if (effortMax) {
    effortMax.textContent = character.effort || 1;
  }

  // For PvP, don't calculate target number yet
  if (opponentType === "player-player") {
    const modifiedDisplay = document.getElementById("attackModifiedValue");
    if (modifiedDisplay) {
      modifiedDisplay.textContent = "Roll first to calculate";
    }

    const targetDisplay = document.getElementById("attackTargetNumber");
    if (targetDisplay) {
      targetDisplay.textContent = "--";
    }

    const targetDifficultyDisplay = document.getElementById(
      "attackTargetDifficulty"
    );
    if (targetDifficultyDisplay) {
      targetDifficultyDisplay.textContent = "--";
    }

    // Enable roll button if stat and weapon selected
    const rollBtn = document.getElementById("attackRollBtn");
    if (rollBtn) {
      rollBtn.disabled = !stat || !weapon;
    }
  } else {
    // Calculate easing/hindering effects for non-PvP
    const weaponEase = getWeaponAttackBonus(weapon);

    // Check for heavy weapon hindrance
    const weaponInfo = getWeaponDamage(weapon);
    let heavyWeaponHindrance = 0;

    if (weaponInfo.category === "heavy") {
      heavyWeaponHindrance = getHeavyWeaponModifier();
    }

    const totalEase = weaponEase + effort + special - heavyWeaponHindrance;

    // Apply easing to opponent level
    const stressLevel = getStressLevel();
    const easedOpponentLevel = Math.max(
      0,
      opponentLevel - totalEase + stressLevel
    );

    // Display modified attack value with breakdown
    const modifiedDisplay = document.getElementById("attackModifiedValue");
    if (modifiedDisplay) {
      let displayText = `Level ${opponentLevel}`;

      if (weaponEase > 0) displayText += ` - ${weaponEase} light`;
      if (heavyWeaponHindrance > 0)
        displayText += ` + ${heavyWeaponHindrance} heavy penalty`;
      if (effort > 0) displayText += ` - ${effort} effort`;
      if (special !== 0)
        displayText += ` ${special > 0 ? "-" : "+"} ${Math.abs(
          special
        )} special`;
      displayText += ` + ${stressLevel} stress = ${easedOpponentLevel}`;

      modifiedDisplay.textContent = displayText;
    }

    // Calculate target number from eased opponent level
    const targetNumber = easedOpponentLevel * 3;

    const targetDifficultyDisplay = document.getElementById(
      "attackTargetDifficulty"
    );
    if (targetDifficultyDisplay) {
      targetDifficultyDisplay.textContent = easedOpponentLevel;
    }

    const targetDisplay = document.getElementById("attackTargetNumber");
    if (targetDisplay) {
      targetDisplay.textContent = targetNumber;
    }

    // Enable/disable roll button
    const rollBtn = document.getElementById("attackRollBtn");
    if (rollBtn) {
      rollBtn.disabled = !opponentLevel || !stat || !weapon;
    }
  }

  // Hide previous results
  const hitSection = document.getElementById("attackHitSection");
  const resultsDiv = document.getElementById("attackResults");
  const diceResultRow = document.getElementById("attackDiceResultRow");
  const confirmSection = document.getElementById("attackConfirmSection");

  if (hitSection) hitSection.style.display = "none";
  if (resultsDiv) resultsDiv.style.display = "none";
  if (diceResultRow) diceResultRow.style.display = "none";
  if (confirmSection) confirmSection.style.display = "none";
}

// Check for heavy weapon hindrance
function getHeavyWeaponHindrance(weaponValue) {
  // Protectors are never hindered by heavy weapons
  if (character.type === "Protector") {
    return 0;
  }

  // Check if the weapon is heavy
  const damageInfo = getWeaponDamage(weaponValue);

  if (damageInfo.category === "heavy") {
    return 1; // Hinder by 1 step (adds 1 to difficulty)
  }

  return 0;
}

// Update attack calculator displays
window.updateDamageBonusDisplay = updateDamageBonusDisplay;

// Get weapon damage information
function getWeaponDamage(weaponValue) {
  if (!weaponValue) return { type: "None", damage: 0, category: "none" };

  if (weaponValue === "unarmed" || weaponValue === "improvised") {
    return { type: "Light", damage: 2, category: "light" };
  }

  // Check if it's from character's weapons
  if (weaponValue.startsWith("weapon_")) {
    const weaponName = weaponValue.replace("weapon_", "");
    const weapon = character.weapons?.find((w) => w.Item === weaponName);

    if (weapon && weapon.Damage) {
      const damageStr = weapon.Damage.toLowerCase();
      if (damageStr.includes("light") || damageStr === "2") {
        return { type: "Light", damage: 2, category: "light" };
      } else if (damageStr.includes("medium") || damageStr === "4") {
        return { type: "Medium", damage: 4, category: "medium" };
      } else if (damageStr.includes("heavy") || damageStr === "6") {
        return { type: "Heavy", damage: 6, category: "heavy" };
      }
      // Try to parse as number
      const damageNum = parseInt(damageStr);
      if (!isNaN(damageNum)) {
        if (damageNum <= 2)
          return { type: "Light", damage: 2, category: "light" };
        if (damageNum <= 4)
          return { type: "Medium", damage: 4, category: "medium" };
        return { type: "Heavy", damage: 6, category: "heavy" };
      }
    }
  }

  return { type: "Unknown", damage: 2, category: "light" };
}

// Get weapon attack bonus (+1 for light weapons)
function getWeaponAttackBonus(weaponValue) {
  // Unarmed and Improvised don't ease attacks even though they're light weapons
  if (weaponValue === "unarmed" || weaponValue === "improvised") {
    return 0;
  }

  const damageInfo = getWeaponDamage(weaponValue);
  return damageInfo.category === "light" ? 1 : 0;
}

// Roll attack dice
function rollAttackDice() {
  const opponentType =
    document.getElementById("attackOpponentType")?.value || "player-npc";
  const opponentLevel =
    parseInt(document.getElementById("attackOpponentLevel")?.value) || 0;
  const stat = document.getElementById("attackStat")?.value || "";
  const weapon = document.getElementById("attackWeapon")?.value || "";
  const effort = parseInt(document.getElementById("attackEffort")?.value) || 0;
  const special =
    parseInt(document.getElementById("attackSpecial")?.value) || 0;

  // Different validation for PvP vs non-PvP
  if (opponentType === "player-player") {
    if (!stat || !weapon) {
      alert("Please select a stat and weapon before rolling.");
      return;
    }
  } else {
    if (!opponentLevel || !stat || !weapon) {
      alert("Please fill in all required fields before rolling.");
      return;
    }
  }

  // Calculate target number for display purposes
  let targetNumber = 0;
  if (opponentType !== "player-player") {
    const weaponEase = getWeaponAttackBonus(weapon);

    // Check for heavy weapon hindrance
    const weaponInfo = getWeaponDamage(weapon);
    let heavyWeaponHindrance = 0;

    if (weaponInfo.category === "heavy") {
      heavyWeaponHindrance = getHeavyWeaponModifier();
    }

    const totalEase = weaponEase + effort + special - heavyWeaponHindrance;
    const stressLevel = getStressLevel();
    const easedOpponentLevel = Math.max(
      0,
      opponentLevel - totalEase + stressLevel
    );
    targetNumber = easedOpponentLevel * 3;
  }

  // Show dice roller and pass callback
  showDiceRoller("d20", (roll) => {
    processDiceRoll("attack", roll, targetNumber, stat, effort);
  });
}

// Calculate if attack hits
function calculateAttackHit(
  roll,
  opponentType,
  opponentLevel,
  weapon,
  effort,
  special
) {
  // Special handling for PvP
  if (opponentType === "player-player") {
    const weaponEase = getWeaponAttackBonus(weapon);

    // Check for heavy weapon hindrance
    const weaponInfo = getWeaponDamage(weapon);
    let heavyWeaponHindrance = 0;

    if (weaponInfo.category === "heavy") {
      heavyWeaponHindrance = getHeavyWeaponModifier();
    }

    const totalModifier = weaponEase + effort + special - heavyWeaponHindrance;
    const stressLevel = getStressLevel();

    const playerTotal = roll + totalModifier - stressLevel;

    // Store player's roll info
    currentAttackData.playerTotal = playerTotal;
    currentAttackData.roll = roll;

    // Show opponent roll input
    showOpponentRollInput(playerTotal, roll, totalModifier, stressLevel);
    return;
  }

  // Normal handling for non-PvP
  const weaponEase = getWeaponAttackBonus(weapon);

  // Check for heavy weapon hindrance
  const weaponInfo = getWeaponDamage(weapon);
  let heavyWeaponHindrance = 0;

  if (weaponInfo.category === "heavy") {
    heavyWeaponHindrance = getHeavyWeaponModifier();
  }

  const totalModifier = weaponEase + effort + special - heavyWeaponHindrance;
  const stressLevel = getStressLevel();
  const easedOpponentLevel = Math.max(
    0,
    opponentLevel - totalModifier + stressLevel
  );

  const targetNumber = easedOpponentLevel * 3;

  const hit = roll >= targetNumber;
  currentAttackData.hit = hit;

  const damageTrack = character.damageTrack || "hale";
  const canHaveEffects =
    damageTrack !== "impaired" &&
    damageTrack !== "debilitated" &&
    damageTrack !== "dead";

  let specialEffect = "";
  if (roll === 19 && canHaveEffects) {
    specialEffect = " + Minor Effect";
  } else if (roll === 20 && canHaveEffects) {
    specialEffect = " + Major Effect (Critical!)";
  }

  if (hit) {
    // Show hit section with damage inputs
    const hitSection = document.getElementById("attackHitSection");
    const hitBox = document.getElementById("attackHitBox");

    if (hitSection && hitBox) {
      hitBox.className =
        roll === 20 ? "result-box success critical" : "result-box success";

      let calculationText = `(${
        opponentType === "attacking-objects" ? "Object" : "Opponent"
      } Level ${opponentLevel}`;

      if (weaponEase > 0) calculationText += ` - ${weaponEase} light`;
      if (heavyWeaponHindrance > 0)
        calculationText += ` + ${heavyWeaponHindrance} heavy penalty`;
      if (effort > 0) calculationText += ` - ${effort} effort`;
      if (special !== 0)
        calculationText += ` ${special > 0 ? "-" : "+"} ${Math.abs(
          special
        )} special`;
      calculationText += ` + ${stressLevel} stress = Level ${easedOpponentLevel})`;

      hitBox.innerHTML = `
        <h4>Attack Hits!${specialEffect}</h4>
        <p>
          Roll: ${roll} vs Target: ${targetNumber}<br>
          ${calculationText}<br>
          <strong>Hit!</strong>
        </p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
          <table class="calculator-table" style="margin: 0;">
            <tbody>
              <!-- Damage Bonuses from Abilities -->
              <tr>
                <td class="calculator-label" style="width: 40%;">
                  Damage Bonuses (Abilities):
                </td>
                <td class="calculator-input" style="width: 30%;">
                  <input 
                    type="number" 
                    id="attackDamageBonus" 
                    value="0" 
                    min="0"
                    oninput="updateDamageBonusDisplay()"
                  />
                </td>
                <td class="calculator-info" style="width: 30%;">
                  From skills/abilities
                </td>
              </tr>

              <!-- Additional Effort for Damage -->
              <tr>
                <td class="calculator-label">
                  Additional Effort (Damage):
                </td>
                <td class="calculator-input">
                  <input 
                    type="number" 
                    id="attackDamageEffort" 
                    value="0" 
                    min="0"
                    max="6"
                    oninput="updateDamageBonusDisplay()"
                  />
                </td>
                <td class="calculator-info">
                  +3 damage per Effort (Max: <span id="attackDamageEffortMax">${
                    character.effort || 1
                  }</span>)
                </td>
              </tr>

              <!-- Damage Preview -->
              <tr class="calculator-result-row">
                <td class="calculator-label">
                  Bonus Damage Preview:
                </td>
                <td class="calculator-display" colspan="2">
                  <span id="attackBonusDamagePreview">0</span>
                </td>
              </tr>

              <!-- Calculate Button -->
              <tr>
                <td colspan="3" class="calculator-action">
                  <button 
                    class="button primary-button calculator-roll-btn" 
                    onclick="calculateAttackDamage()"
                    id="calculateDamageBtn"
                  >
                    Calculate Total Damage
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      hitSection.style.display = "block";

      // Initialize damage inputs
      const damageEffort = document.getElementById("attackDamageEffort");
      const damageEffortMax = document.getElementById("attackDamageEffortMax");
      if (damageEffort) {
        damageEffort.value = 0;
        damageEffort.max = character.effort || 1;
      }
      if (damageEffortMax) {
        damageEffortMax.textContent = character.effort || 1;
      }

      updateDamageBonusDisplay();
    }
  } else {
    // Attack misses - show final results immediately
    showAttackMiss(
      roll,
      targetNumber,
      opponentLevel,
      easedOpponentLevel,
      totalModifier,
      stressLevel,
      weaponEase,
      heavyWeaponHindrance
    );
  }
}

// Add new function to show opponent roll input for PvP:
function showOpponentRollInput(
  playerTotal,
  playerRoll,
  easeBonus,
  stressLevel
) {
  const hitSection = document.getElementById("attackHitSection");
  const hitBox = document.getElementById("attackHitBox");

  if (!hitSection || !hitBox) return;

  hitBox.className = "result-box";
  hitBox.innerHTML = `
    <h4>Your Attack Roll</h4>
    <p>
      Roll: ${playerRoll} + Ease: ${easeBonus} - Stress: ${stressLevel} = <strong>${playerTotal}</strong>
    </p>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
      <h4>Enter Opponent's Roll Total</h4>
      <p style="color: #888; font-size: 0.9em; margin-bottom: 10px;">
        Enter the opponent's total attack roll (their d20 + modifiers)
      </p>
      <div style="display: flex; gap: 10px; align-items: center;">
        <input 
          type="number" 
          id="pvpOpponentRoll" 
          placeholder="Opponent's total..."
          min="1"
          style="flex: 1; padding: 10px; background: #2a2a2a; border: 2px solid #317e30; border-radius: 4px; color: #fff; font-size: 1em;"
        />
        <button 
          class="button primary-button" 
          onclick="comparePvPRolls()"
          style="padding: 10px 20px;"
        >
          Compare Rolls
        </button>
      </div>
    </div>
  `;

  hitSection.style.display = "block";
}

// Add new function to compare PvP rolls:
function comparePvPRolls() {
  console.log("comparePvPRolls called"); // Debug log

  const opponentRollInput = document.getElementById("pvpOpponentRoll");

  if (!opponentRollInput) {
    console.error("pvpOpponentRoll input not found!");
    alert("Error: Input field not found. Please try again.");
    return;
  }

  const opponentRoll = parseInt(opponentRollInput.value) || 0;

  if (opponentRoll === 0) {
    alert("Please enter the opponent's roll total first.");
    return;
  }

  const playerTotal = currentAttackData.playerTotal;

  if (!playerTotal) {
    console.error("Player total not found in currentAttackData");
    alert("Error: Player roll data not found. Please roll again.");
    return;
  }

  const hit = playerTotal > opponentRoll;

  currentAttackData.hit = hit;
  currentAttackData.opponentRoll = opponentRoll;

  if (hit) {
    // Player wins - show damage input
    const hitSection = document.getElementById("attackHitSection");
    const hitBox = document.getElementById("attackHitBox");

    if (hitSection && hitBox) {
      const roll = currentAttackData.roll;
      const damageTrack = character.damageTrack || "hale";
      const canHaveEffects =
        damageTrack !== "impaired" && damageTrack !== "debilitated";

      let specialEffect = "";
      if (roll === 19 && canHaveEffects) specialEffect = " + Minor Effect";
      if (roll === 20 && canHaveEffects)
        specialEffect = " + Major Effect (Critical!)";

      hitBox.className =
        roll === 20 ? "result-box success critical" : "result-box success";
      hitBox.innerHTML = `
        <h4>Attack Hits!${specialEffect}</h4>
        <p>
          Your Roll: <strong>${playerTotal}</strong> vs Opponent's Roll: ${opponentRoll}<br>
          <strong>You win!</strong>
        </p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
          <table class="calculator-table" style="margin: 0;">
            <tbody>
              <!-- Damage Bonuses from Abilities -->
              <tr>
                <td class="calculator-label" style="width: 40%;">
                  Damage Bonuses (Abilities):
                </td>
                <td class="calculator-input" style="width: 30%;">
                  <input 
                    type="number" 
                    id="attackDamageBonus" 
                    value="0" 
                    min="0"
                    oninput="updateDamageBonusDisplay()"
                  />
                </td>
                <td class="calculator-info" style="width: 30%;">
                  From skills/abilities
                </td>
              </tr>

              <!-- Additional Effort for Damage -->
              <tr>
                <td class="calculator-label">
                  Additional Effort (Damage):
                </td>
                <td class="calculator-input">
                  <input 
                    type="number" 
                    id="attackDamageEffort" 
                    value="0" 
                    min="0"
                    max="6"
                    oninput="updateDamageBonusDisplay()"
                  />
                </td>
                <td class="calculator-info">
                  +3 damage per Effort (Max: <span id="attackDamageEffortMax">${
                    character.effort || 1
                  }</span>)
                </td>
              </tr>

              <!-- Damage Preview -->
              <tr class="calculator-result-row">
                <td class="calculator-label">
                  Bonus Damage Preview:
                </td>
                <td class="calculator-display" colspan="2">
                  <span id="attackBonusDamagePreview">0</span>
                </td>
              </tr>

              <!-- Calculate Button -->
              <tr>
                <td colspan="3" class="calculator-action">
                  <button 
                    class="button primary-button calculator-roll-btn" 
                    onclick="calculateAttackDamage()"
                    id="calculateDamageBtn"
                  >
                    Calculate Total Damage
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      // Initialize damage effort max
      const damageEffort = document.getElementById("attackDamageEffort");
      const damageEffortMax = document.getElementById("attackDamageEffortMax");
      if (damageEffort) {
        damageEffort.value = 0;
        damageEffort.max = character.effort || 1;
      }
      if (damageEffortMax) {
        damageEffortMax.textContent = character.effort || 1;
      }

      updateDamageBonusDisplay();
    }
  } else {
    // Player loses - show miss
    showPvPMiss(playerTotal, opponentRoll);
  }
}

// Add function to show PvP miss:
function showPvPMiss(playerTotal, opponentRoll) {
  const resultsDiv = document.getElementById("attackResults");
  const outcomeBox = document.getElementById("attackOutcomeBox");
  const outcomeText = document.getElementById("attackOutcomeText");
  const damageBox = document.getElementById("attackDamageBox");
  const damageText = document.getElementById("attackDamageText");
  const costBox = document.getElementById("attackCostBox");
  const costText = document.getElementById("attackCostText");
  const confirmSection = document.getElementById("attackConfirmSection");

  if (!resultsDiv) return;

  // Outcome
  const roll = currentAttackData.roll;
  outcomeBox.className =
    roll === 1 ? "result-box failure critical" : "result-box failure";
  outcomeText.innerHTML = `
    Your Roll: ${playerTotal} vs Opponent's Roll: <strong>${opponentRoll}</strong><br>
    <strong>${roll === 1 ? "CRITICAL MISS!" : "Attack Misses!"}</strong><br>
    <span style="color: #888;">Opponent rolled higher</span>
  `;

  // No damage
  damageBox.className = "result-box";
  damageText.textContent = "No damage dealt (opponent rolled higher)";

  // Calculate cost
  const { costMessage, actualCost } = calculateStatPoolCostWithValue(
    currentAttackData.stat,
    currentAttackData.effort
  );
  costText.innerHTML = costMessage;

  currentAttackData.cost = actualCost;
  currentAttackData.damage = 0;

  // Hide hit section
  const hitSection = document.getElementById("attackHitSection");
  if (hitSection) hitSection.style.display = "none";

  // Show results
  resultsDiv.style.display = "grid";
  confirmSection.style.display = "block";
}

// Show attack miss results
function showAttackMiss(
  roll,
  targetNumber,
  opponentLevel,
  easedOpponentLevel,
  totalModifier,
  stressLevel,
  weaponEase = 0,
  heavyWeaponHindrance = 0
) {
  const resultsDiv = document.getElementById("attackResults");
  const outcomeBox = document.getElementById("attackOutcomeBox");
  const outcomeText = document.getElementById("attackOutcomeText");
  const damageBox = document.getElementById("attackDamageBox");
  const damageText = document.getElementById("attackDamageText");
  const costBox = document.getElementById("attackCostBox");
  const costText = document.getElementById("attackCostText");
  const confirmSection = document.getElementById("attackConfirmSection");

  if (!resultsDiv) return;

  // Build calculation text
  let calculationText = `(Opponent Level ${opponentLevel}`;

  if (weaponEase > 0) calculationText += ` - ${weaponEase} light`;
  if (heavyWeaponHindrance > 0)
    calculationText += ` + ${heavyWeaponHindrance} heavy penalty`;

  const effort = currentAttackData.effort || 0;
  const special =
    parseInt(document.getElementById("attackSpecial")?.value) || 0;

  if (effort > 0) calculationText += ` - ${effort} effort`;
  if (special !== 0)
    calculationText += ` ${special > 0 ? "-" : "+"} ${Math.abs(
      special
    )} special`;
  calculationText += ` + ${stressLevel} stress = Level ${easedOpponentLevel})`;

  // Outcome
  outcomeBox.className =
    roll === 1 ? "result-box failure critical" : "result-box failure";
  outcomeText.innerHTML = `
    Roll: ${roll} vs Target: ${targetNumber}<br>
    ${calculationText}<br>
    <strong>${roll === 1 ? "CRITICAL MISS!" : "Attack Misses!"}</strong>
  `;

  // No damage
  damageBox.className = "result-box";
  damageText.textContent = "No damage dealt (attack missed)";

  // Calculate cost
  const { costMessage, actualCost } = calculateStatPoolCostWithValue(
    currentAttackData.stat,
    currentAttackData.effort
  );
  costText.innerHTML = costMessage;

  currentAttackData.cost = actualCost;
  currentAttackData.damage = 0;

  // Show results
  resultsDiv.style.display = "grid";
  confirmSection.style.display = "block";
}

// Calculate attack damage (called when user clicks Calculate Damage button)
function calculateAttackDamage() {
  const roll = currentAttackData.roll;
  const weapon = document.getElementById("attackWeapon")?.value || "";
  const abilityBonus =
    parseInt(document.getElementById("attackDamageBonus")?.value) || 0;
  const damageEffort =
    parseInt(document.getElementById("attackDamageEffort")?.value) || 0;
  const opponentType =
    document.getElementById("attackOpponentType")?.value || "player-npc";

  // Get base weapon damage
  const weaponInfo = getWeaponDamage(weapon);
  let totalDamage = weaponInfo.damage + abilityBonus + damageEffort * 3;

  // Add roll bonuses (if not impaired/debilitated)
  const damageTrack = character.damageTrack || "hale";
  if (damageTrack !== "impaired" && damageTrack !== "debilitated") {
    if (roll === 17) totalDamage += 1;
    if (roll === 18) totalDamage += 2;
  }

  currentAttackData.damage = totalDamage;
  currentAttackData.damageEffort = damageEffort; // Store for cost calculation

  // Show final results
  showAttackDamageResults(
    totalDamage,
    weaponInfo,
    abilityBonus,
    damageEffort,
    opponentType,
    roll
  );
}

function updateDamageBonusDisplay() {
  const abilityBonus =
    parseInt(document.getElementById("attackDamageBonus")?.value) || 0;
  const damageEffort =
    parseInt(document.getElementById("attackDamageEffort")?.value) || 0;

  // Calculate bonus damage (3 per Effort)
  const effortBonus = damageEffort * 3;
  const totalBonus = abilityBonus + effortBonus;

  // Update preview
  const preview = document.getElementById("attackBonusDamagePreview");
  if (preview) {
    let previewText = "";
    if (abilityBonus > 0) previewText += `${abilityBonus} (abilities)`;
    if (effortBonus > 0) {
      if (previewText) previewText += " + ";
      previewText += `${effortBonus} (${damageEffort} Effort)`;
    }
    if (previewText) previewText += ` = ${totalBonus}`;
    else previewText = "0";

    preview.textContent = previewText;
  }
}

// Show attack damage results
function showAttackDamageResults(
  totalDamage,
  weaponInfo,
  abilityBonus,
  damageEffort,
  opponentType,
  roll
) {
  const resultsDiv = document.getElementById("attackResults");
  const outcomeBox = document.getElementById("attackOutcomeBox");
  const outcomeText = document.getElementById("attackOutcomeText");
  const damageBox = document.getElementById("attackDamageBox");
  const damageText = document.getElementById("attackDamageText");
  const costBox = document.getElementById("attackCostBox");
  const costText = document.getElementById("attackCostText");
  const confirmSection = document.getElementById("attackConfirmSection");

  if (!resultsDiv) return;

  // Determine special effect
  const damageTrack = character.damageTrack || "hale";
  const canHaveEffects =
    damageTrack !== "impaired" && damageTrack !== "debilitated";
  let specialEffect = "";
  if (roll === 19 && canHaveEffects) specialEffect = " (Minor Effect)";
  if (roll === 20 && canHaveEffects)
    specialEffect = " (Major Effect - Critical!)";

  // Outcome
  outcomeBox.className =
    roll === 20 ? "result-box success critical" : "result-box success";
  outcomeText.innerHTML = `<strong>Attack Hits!${specialEffect}</strong>`;

  // Damage breakdown
  let damageBreakdown = `Base Weapon Damage: ${weaponInfo.damage}`;
  if (abilityBonus > 0)
    damageBreakdown += `<br>Ability Bonuses: +${abilityBonus}`;
  if (damageEffort > 0)
    damageBreakdown += `<br>Damage Effort (${damageEffort}): +${
      damageEffort * 3
    }`;
  if (roll === 17 && canHaveEffects) damageBreakdown += `<br>Roll 17 Bonus: +1`;
  if (roll === 18 && canHaveEffects) damageBreakdown += `<br>Roll 18 Bonus: +2`;

  damageBox.className = "result-box success";

  // Different damage display based on opponent type
  if (opponentType === "attacking-objects") {
    let objectDamage = "";
    if (totalDamage === 1) objectDamage = "One Step Down the Damage Track";
    else if (totalDamage <= 3) objectDamage = "Two Steps Down the Damage Track";
    else objectDamage = "Three Steps Down the Damage Track";

    damageText.innerHTML = `
      ${damageBreakdown}<br>
      <strong>Total: ${totalDamage} damage</strong><br>
      <br>
      <strong>Object Effect: ${objectDamage}</strong>
    `;
  } else if (opponentType === "player-player") {
    const damageTrackMoves = totalDamage >= 4 ? 1 : 0;

    damageText.innerHTML = `
      ${damageBreakdown}<br>
      <strong>Total: ${totalDamage} damage</strong><br>
      <br>
      Inflicted as <strong>${totalDamage} Stress</strong><br>
      ${
        damageTrackMoves > 0
          ? `<strong>Move 1 step down Damage Track</strong>`
          : "No Damage Track movement"
      }
    `;
  } else {
    damageText.innerHTML = `
      ${damageBreakdown}<br>
      <strong>Total: ${totalDamage} damage</strong><br>
      <br>
      Reduce opponent's health by ${totalDamage} points
    `;
  }

  // Calculate total cost (attack effort + damage effort)
  const attackEffort = currentAttackData.effort || 0;
  const totalEffort = attackEffort + damageEffort;

  const { costMessage, actualCost } = calculateStatPoolCostWithValue(
    currentAttackData.stat,
    totalEffort
  );
  costBox.className = "result-box";

  // Add breakdown of effort types
  let effortBreakdown = "";
  if (attackEffort > 0 && damageEffort > 0) {
    effortBreakdown = `<br><small>(${attackEffort} Attack Effort + ${damageEffort} Damage Effort = ${totalEffort} Total)</small>`;
  } else if (attackEffort > 0) {
    effortBreakdown = `<br><small>(${attackEffort} Attack Effort)</small>`;
  } else if (damageEffort > 0) {
    effortBreakdown = `<br><small>(${damageEffort} Damage Effort)</small>`;
  }

  costText.innerHTML = costMessage + effortBreakdown;

  currentAttackData.cost = actualCost;

  // Show results
  resultsDiv.style.display = "grid";
  confirmSection.style.display = "block";

  // Hide hit section
  const hitSection = document.getElementById("attackHitSection");
  if (hitSection) hitSection.style.display = "none";
}

// Confirm attack and apply costs
function confirmAttack() {
  console.log("=== CONFIRMING ATTACK ===");

  const stat = currentAttackData.stat;
  const cost = currentAttackData.cost;
  const damage = currentAttackData.damage || 0;

  if (!stat || cost === 0) {
    // No cost to apply, just acknowledge
    const message =
      damage > 0
        ? `Attack acknowledged!\n\nNo stat points spent.\n${damage} damage dealt.`
        : `Attack acknowledged!\n\nNo stat points spent.\nNo damage dealt (missed).`;
    alert(message);
    clearAttackCalculator();
    return;
  }

  console.log(`Applying attack cost: ${cost} ${stat} points`);
  console.log(`Damage dealt: ${damage}`);

  // Ensure currentPools exists
  if (!character.currentPools) {
    console.error("character.currentPools is undefined! Initializing...");
    character.currentPools = {
      Might: character.stats?.Might || 0,
      Speed: character.stats?.Speed || 0,
      Intellect: character.stats?.Intellect || 0,
    };
  }

  // Get current pool value
  const statKey = stat.charAt(0).toUpperCase() + stat.slice(1);
  const currentPool = character.currentPools[statKey] || 0;
  const newPool = Math.max(0, currentPool - cost);

  // Update character pools
  character.currentPools[statKey] = newPool;

  console.log(`${statKey} pool: ${currentPool} -> ${newPool}`);

  // Update the display
  updateStatDisplay();

  // Show confirmation with damage info
  alert(
    `Attack confirmed!\n\n` +
      `${cost} ${statKey} points spent.\n` +
      `${damage} damage dealt to opponent.\n\n` +
      `${statKey} pool: ${currentPool} → ${newPool}`
  );

  // Clear the calculator
  clearAttackCalculator();
}

// Clear attack calculator
function clearAttackCalculator() {
  // Reset form inputs
  const opponentType = document.getElementById("attackOpponentType");
  const opponentLevel = document.getElementById("attackOpponentLevel");
  const opponentHealth = document.getElementById("attackOpponentHealth");
  const stat = document.getElementById("attackStat");
  const weapon = document.getElementById("attackWeapon");
  const effort = document.getElementById("attackEffort");
  const special = document.getElementById("attackSpecial");
  const damageBonus = document.getElementById("attackDamageBonus");
  const damageEffort = document.getElementById("attackDamageEffort");

  if (opponentType) opponentType.value = "player-npc";
  if (opponentLevel) opponentLevel.value = "";
  if (opponentHealth) opponentHealth.value = "";
  if (stat) stat.value = "";
  if (weapon) weapon.value = "";
  if (effort) effort.value = "0";
  if (special) special.value = "0";
  if (damageBonus) damageBonus.value = "0";
  if (damageEffort) damageEffort.value = "0";

  // Clear PvP opponent roll input
  const pvpOpponentRoll = document.getElementById("pvpOpponentRoll");
  if (pvpOpponentRoll) pvpOpponentRoll.value = "";

  // Clear displays
  const edgeDisplay = document.getElementById("attackEdgeDisplay");
  const weaponDamageDisplay = document.getElementById("attackWeaponDamage");
  const modifiedDisplay = document.getElementById("attackModifiedValue");
  const targetDisplay = document.getElementById("attackTargetNumber");
  const targetDifficultyDisplay = document.getElementById(
    "attackTargetDifficulty"
  );
  const bonusDamagePreview = document.getElementById(
    "attackBonusDamagePreview"
  );

  if (edgeDisplay) edgeDisplay.textContent = "--";
  if (weaponDamageDisplay) weaponDamageDisplay.textContent = "--";
  if (modifiedDisplay) modifiedDisplay.textContent = "--";
  if (targetDisplay) targetDisplay.textContent = "--";
  if (targetDifficultyDisplay) targetDifficultyDisplay.textContent = "--";
  if (bonusDamagePreview) bonusDamagePreview.textContent = "0";

  // Hide results sections
  const hitSection = document.getElementById("attackHitSection");
  const resultsDiv = document.getElementById("attackResults");
  const diceResultRow = document.getElementById("attackDiceResultRow");
  const confirmSection = document.getElementById("attackConfirmSection");

  if (hitSection) hitSection.style.display = "none";
  if (resultsDiv) resultsDiv.style.display = "none";
  if (diceResultRow) diceResultRow.style.display = "none";
  if (confirmSection) confirmSection.style.display = "none";

  // Reset stored data
  currentAttackData = {
    stat: null,
    cost: 0,
    damage: 0,
    roll: 0,
    hit: false,
    effort: 0,
    damageEffort: 0,
    playerTotal: 0,
    opponentRoll: 0,
  };

  // Update calculator to refresh UI
  updateAttackCalculator();
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ==================== DEFENDING CALCULATOR ==================== //

// Store current defend data
let currentDefendData = {
  stat: null,
  cost: 0,
  stress: 0,
  roll: 0,
  hit: false,
  effort: 0,
  cooperative: "none",
};

// Initialize defending calculator
function initializeDefendCalculator() {
  // Set max effort
  const effortInput = document.getElementById("defendEffort");
  const effortMax = document.getElementById("defendEffortMax");
  if (effortInput && effortMax) {
    effortInput.max = character.effort || 1;
    effortMax.textContent = character.effort || 1;
  }

  updateDefendCalculator();
}

// Update defend calculator displays
function updateDefendCalculator() {
  const opponentType =
    document.getElementById("defendOpponentType")?.value || "player-npc";
  const opponentLevel =
    parseInt(document.getElementById("defendOpponentLevel")?.value) || 0;
  const stat = document.getElementById("defendStat")?.value || "";
  const effort = parseInt(document.getElementById("defendEffort")?.value) || 0;
  const cooperative =
    document.getElementById("defendCooperative")?.value || "none";
  const special =
    parseInt(document.getElementById("defendSpecial")?.value) || 0;

  // Update opponent info based on type
  const opponentInfo = document.getElementById("defendOpponentInfo");
  const opponentLevelRow = document.getElementById("defendOpponentLevelRow");

  if (opponentType === "player-player") {
    if (opponentLevelRow) opponentLevelRow.style.display = "none";
    if (opponentInfo)
      opponentInfo.textContent = "PvP - roll first, then compare";
  } else {
    if (opponentLevelRow) opponentLevelRow.style.display = "table-row";
    if (opponentInfo)
      opponentInfo.textContent =
        opponentType === "npc-npc"
          ? "NPC defending against NPC"
          : "Defending against an attack";
  }

  // Update Edge display
  const edgeDisplay = document.getElementById("defendEdgeDisplay");
  if (edgeDisplay && stat) {
    const statCapitalized = stat.charAt(0).toUpperCase() + stat.slice(1);
    const edge = character.edge?.[statCapitalized] || 0;
    edgeDisplay.textContent = edge;
  } else if (edgeDisplay) {
    edgeDisplay.textContent = "--";
  }

  // Update max effort
  const effortMax = document.getElementById("defendEffortMax");
  if (effortMax) {
    effortMax.textContent = character.effort || 1;
  }

  // Update cooperative action effect
  const cooperativeEffect = document.getElementById("defendCooperativeEffect");
  if (cooperativeEffect) {
    switch (cooperative) {
      case "distraction":
        cooperativeEffect.textContent = "Eases defense by 1";
        break;
      case "draw":
        cooperativeEffect.textContent = "Hinders defense by 2 (drawing attack)";
        break;
      case "take":
        cooperativeEffect.textContent = "Auto-hit! +1 stress taken";
        break;
      default:
        cooperativeEffect.textContent = "No assistance";
    }
  }

  // For PvP, don't calculate target number yet
  if (opponentType === "player-player") {
    const modifiedDisplay = document.getElementById("defendModifiedValue");
    if (modifiedDisplay) {
      modifiedDisplay.textContent = "Roll first to calculate";
    }

    const targetDisplay = document.getElementById("defendTargetNumber");
    if (targetDisplay) {
      targetDisplay.textContent = "--";
    }

    const targetDifficultyDisplay = document.getElementById(
      "defendTargetDifficulty"
    );
    if (targetDifficultyDisplay) {
      targetDifficultyDisplay.textContent = "--";
    }

    // Enable roll button if stat selected
    const rollBtn = document.getElementById("defendRollBtn");
    if (rollBtn) {
      rollBtn.disabled = !stat;
    }
  } else {
    // Calculate easing/hindering effects for non-PvP
    let totalModifier = effort + special;

    // Cooperative action modifiers
    if (cooperative === "distraction") {
      totalModifier += 1; // Ease by 1
    } else if (cooperative === "draw") {
      totalModifier -= 2; // Hinder by 2
    }

    // Apply to opponent level
    const stressLevel = getStressLevel();
    const modifiedOpponentLevel = Math.max(
      0,
      opponentLevel - totalModifier + stressLevel
    );

    // Display modified defense value
    const modifiedDisplay = document.getElementById("defendModifiedValue");
    if (modifiedDisplay) {
      const displayText = `Level ${opponentLevel} - ${
        totalModifier >= 0 ? totalModifier : `(${totalModifier})`
      } ease + ${stressLevel} stress = ${modifiedOpponentLevel}`;
      modifiedDisplay.textContent = displayText;
    }

    // Calculate target number
    const targetNumber = modifiedOpponentLevel * 3;

    const targetDifficultyDisplay = document.getElementById(
      "defendTargetDifficulty"
    );
    if (targetDifficultyDisplay) {
      targetDifficultyDisplay.textContent = modifiedOpponentLevel;
    }

    const targetDisplay = document.getElementById("defendTargetNumber");
    if (targetDisplay) {
      if (cooperative === "take") {
        targetDisplay.textContent = "Auto-Hit";
      } else {
        targetDisplay.textContent = targetNumber;
      }
    }

    // Enable/disable roll button
    const rollBtn = document.getElementById("defendRollBtn");
    if (rollBtn) {
      rollBtn.disabled = !opponentLevel || !stat;
    }
  }

  // Hide previous results
  const successSection = document.getElementById("defendSuccessSection");
  const hitSection = document.getElementById("defendHitSection");
  const resultsDiv = document.getElementById("defendResults");
  const diceResultRow = document.getElementById("defendDiceResultRow");
  const confirmSection = document.getElementById("defendConfirmSection");

  if (successSection) successSection.style.display = "none";
  if (hitSection) hitSection.style.display = "none";
  if (resultsDiv) resultsDiv.style.display = "none";
  if (diceResultRow) diceResultRow.style.display = "none";
  if (confirmSection) confirmSection.style.display = "none";
}

// Roll defend dice
function rollDefendDice() {
  const opponentType =
    document.getElementById("defendOpponentType")?.value || "player-npc";
  const opponentLevel =
    parseInt(document.getElementById("defendOpponentLevel")?.value) || 0;
  const stat = document.getElementById("defendStat")?.value || "";
  const effort = parseInt(document.getElementById("defendEffort")?.value) || 0;
  const cooperative =
    document.getElementById("defendCooperative")?.value || "none";
  const special =
    parseInt(document.getElementById("defendSpecial")?.value) || 0;

  // Different validation for PvP vs non-PvP
  if (opponentType === "player-player") {
    if (!stat) {
      alert("Please select a stat before rolling.");
      return;
    }
  } else {
    if (!opponentLevel || !stat) {
      alert("Please fill in all required fields before rolling.");
      return;
    }
  }

  // Calculate target number for display purposes
  let targetNumber = 0;
  if (opponentType !== "player-player" && cooperative !== "take") {
    let totalModifier = effort + special;
    if (cooperative === "distraction") {
      totalModifier += 1;
    } else if (cooperative === "draw") {
      totalModifier -= 2;
    }
    const stressLevel = getStressLevel();
    const modifiedOpponentLevel = Math.max(
      0,
      opponentLevel - totalModifier + stressLevel
    );
    targetNumber = modifiedOpponentLevel * 3;
  }

  // Show dice roller and pass callback
  showDiceRoller("d20", (roll) => {
    processDiceRoll("defend", roll, targetNumber, stat, effort);
  });
}

// Calculate if defense succeeds or attack hits
function calculateDefendHit(
  roll,
  opponentType,
  opponentLevel,
  effort,
  cooperative,
  special
) {
  // Special handling for PvP
  if (opponentType === "player-player") {
    // Calculate player's total
    let totalModifier = effort + special;

    if (cooperative === "distraction") {
      totalModifier += 1;
    } else if (cooperative === "draw") {
      totalModifier -= 2;
    }

    const stressLevel = getStressLevel();
    const playerTotal = roll + totalModifier - stressLevel;

    // Store player's roll info
    currentDefendData.playerTotal = playerTotal;
    currentDefendData.roll = roll;

    // Show opponent roll input
    showDefendOpponentRollInput(playerTotal, roll, totalModifier, stressLevel);
    return;
  }

  // Check for "Take the Attack" - auto-hit
  if (cooperative === "take") {
    showDefendAutoHit();
    return;
  }

  // Normal handling for non-PvP (both Player vs NPC AND NPC vs NPC)
  let totalModifier = effort + special;

  if (cooperative === "distraction") {
    totalModifier += 1;
  } else if (cooperative === "draw") {
    totalModifier -= 2;
  }

  const stressLevel = getStressLevel();
  const modifiedOpponentLevel = Math.max(
    0,
    opponentLevel - totalModifier + stressLevel
  );

  const targetNumber = modifiedOpponentLevel * 3;

  const success = roll >= targetNumber;
  currentDefendData.hit = !success; // Hit means defense failed

  const damageTrack = character.damageTrack || "hale";
  const canHaveEffects =
    damageTrack !== "impaired" &&
    damageTrack !== "debilitated" &&
    damageTrack !== "dead";

  if (success) {
    // Defense succeeds - no damage
    showDefendSuccess(
      roll,
      targetNumber,
      opponentLevel,
      modifiedOpponentLevel,
      totalModifier,
      stressLevel
    );
  } else {
    // Defense fails - show stress input
    showDefendFailure(
      roll,
      targetNumber,
      opponentLevel,
      modifiedOpponentLevel,
      totalModifier,
      stressLevel
    );
  }
}

// Show defense success
function showDefendSuccess(
  roll,
  targetNumber,
  opponentLevel,
  modifiedLevel,
  totalModifier,
  stressLevel
) {
  const successSection = document.getElementById("defendSuccessSection");
  const successBox = document.getElementById("defendSuccessBox");
  const successText = document.getElementById("defendSuccessText");

  if (!successSection || !successBox || !successText) return;

  const damageTrack = character.damageTrack || "hale";
  const canHaveEffects =
    damageTrack !== "impaired" && damageTrack !== "debilitated";

  let specialEffect = "";
  if (roll === 19 && canHaveEffects) specialEffect = " + Minor Effect";
  if (roll === 20 && canHaveEffects)
    specialEffect = " + Major Effect (Critical!)";

  successBox.className =
    roll === 20 ? "result-box success critical" : "result-box success";
  successText.innerHTML = `
    Roll: ${roll} vs Target: ${targetNumber}<br>
    (Opponent Level ${opponentLevel} - ${
    totalModifier >= 0 ? totalModifier : `(${totalModifier})`
  } ease + ${stressLevel} stress = Effective Level ${modifiedLevel})<br>
    <strong>Defense Succeeds!${specialEffect}</strong><br>
    <span style="color: #888;">No damage taken</span>
  `;

  successSection.style.display = "block";

  // Show final results
  showDefendNoStress(roll, targetNumber);
}

// Show defense failure - need stress input
function showDefendFailure(
  roll,
  targetNumber,
  opponentLevel,
  modifiedLevel,
  totalModifier,
  stressLevel
) {
  const hitSection = document.getElementById("defendHitSection");
  const hitBox = document.getElementById("defendHitBox");

  if (!hitSection || !hitBox) return;

  const damageTrack = character.damageTrack || "hale";

  hitBox.className =
    roll === 1 ? "result-box failure critical" : "result-box failure";
  hitBox.innerHTML = `
    <h4>Defense Failed!</h4>
    <p>
      Roll: ${roll} vs Target: ${targetNumber}<br>
      (Opponent Level ${opponentLevel} - ${
    totalModifier >= 0 ? totalModifier : `(${totalModifier})`
  } ease + ${stressLevel} stress = Effective Level ${modifiedLevel})<br>
      <strong>${
        roll === 1 ? "CRITICAL FAILURE!" : "Defense Fails!"
      }</strong><br>
      <span style="color: #888;">Attack hits - enter stress taken below</span>
    </p>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
      <table class="calculator-table" style="margin: 0">
        <tbody>
          <!-- Stress Taken -->
          <tr>
            <td class="calculator-label" style="width: 40%">
              Stress Taken:
            </td>
            <td class="calculator-input" style="width: 30%">
              <input
                type="number"
                id="defendStressTaken"
                value="0"
                min="0"
                oninput="updateDefendStressDisplay()"
              />
            </td>
            <td class="calculator-info" style="width: 30%">
              <span id="defendStressInfo">Enter stress received</span>
            </td>
          </tr>

          <!-- Stress Preview -->
          <tr class="calculator-result-row">
            <td class="calculator-label">
              Damage Track Effect:
            </td>
            <td class="calculator-display" colspan="2">
              <span id="defendDamageTrackEffect">--</span>
            </td>
          </tr>

          <!-- Calculate Button -->
          <tr>
            <td colspan="3" class="calculator-action">
              <button
                class="button primary-button calculator-roll-btn"
                onclick="calculateDefendResult()"
                id="calculateDefendBtn"
              >
                Calculate Defense Result
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  hitSection.style.display = "block";

  // Initialize stress input
  const stressInput = document.getElementById("defendStressTaken");
  if (stressInput) {
    stressInput.value = 0;
  }

  // Set hit state
  currentDefendData.hit = true;

  updateDefendStressDisplay();
}

// Show auto-hit from "Take the Attack"
function showDefendAutoHit() {
  const hitSection = document.getElementById("defendHitSection");
  const hitBox = document.getElementById("defendHitBox");

  if (!hitSection || !hitBox) return;

  hitBox.className = "result-box failure";
  hitBox.innerHTML = `
    <h4>Taking the Attack!</h4>
    <p>
      <strong>Attack automatically hits</strong><br>
      <span style="color: #888;">You are intercepting the attack meant for an ally</span><br>
      <span style="color: #ff6b6b;"><strong>+1 additional stress from taking the attack</strong></span>
    </p>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
      <table class="calculator-table" style="margin: 0">
        <tbody>
          <!-- Stress Taken -->
          <tr>
            <td class="calculator-label" style="width: 40%">
              Stress Taken:
            </td>
            <td class="calculator-input" style="width: 30%">
              <input
                type="number"
                id="defendStressTaken"
                value="0"
                min="0"
                oninput="updateDefendStressDisplay()"
              />
            </td>
            <td class="calculator-info" style="width: 30%">
              <span id="defendStressInfo">+1 from taking attack</span>
            </td>
          </tr>

          <!-- Stress Preview -->
          <tr class="calculator-result-row">
            <td class="calculator-label">
              Damage Track Effect:
            </td>
            <td class="calculator-display" colspan="2">
              <span id="defendDamageTrackEffect">--</span>
            </td>
          </tr>

          <!-- Calculate Button -->
          <tr>
            <td colspan="3" class="calculator-action">
              <button
                class="button primary-button calculator-roll-btn"
                onclick="calculateDefendResult()"
                id="calculateDefendBtn"
              >
                Calculate Defense Result
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  hitSection.style.display = "block";

  // Initialize stress input
  const stressInput = document.getElementById("defendStressTaken");
  if (stressInput) {
    stressInput.value = 0;
  }

  // Set hit state
  currentDefendData.hit = true;

  // Initialize the display
  updateDefendStressDisplay();
}

// Update stress display
function updateDefendStressDisplay() {
  const stressInput = document.getElementById("defendStressTaken");
  const stressInfo = document.getElementById("defendStressInfo");
  const damageTrackEffect = document.getElementById("defendDamageTrackEffect");

  if (!stressInput || !stressInfo || !damageTrackEffect) return;

  let stress = parseInt(stressInput.value) || 0;

  // Add +1 if "Take the Attack"
  const cooperative = currentDefendData.cooperative;
  if (cooperative === "take") {
    stress += 1;
    stressInfo.textContent = `+1 from taking attack = ${stress} total`;
  } else {
    stressInfo.textContent = "Enter stress received";
  }

  // Show damage track effect
  if (stress >= 4) {
    damageTrackEffect.textContent = "Move 1 step down Damage Track";
    damageTrackEffect.style.color = "#ff6b6b";
  } else if (stress > 0) {
    damageTrackEffect.textContent = "No Damage Track movement";
    damageTrackEffect.style.color = "#ffd700";
  } else {
    damageTrackEffect.textContent = "--";
    damageTrackEffect.style.color = "#ddd";
  }
}

// Calculate defense result (after stress input)
function calculateDefendResult() {
  const stressInput = document.getElementById("defendStressTaken");
  let stress = parseInt(stressInput?.value) || 0;

  // Add +1 if "Take the Attack"
  const cooperative = currentDefendData.cooperative;
  if (cooperative === "take") {
    stress += 1;
  }

  if (stress === 0) {
    alert("Please enter the stress taken from the attack.");
    return;
  }

  currentDefendData.stress = stress;

  // Show final results
  showDefendFinalResults(stress);
}

// Show final defense results with stress
function showDefendFinalResults(stress) {
  const resultsDiv = document.getElementById("defendResults");
  const outcomeBox = document.getElementById("defendOutcomeBox");
  const outcomeText = document.getElementById("defendOutcomeText");
  const stressBox = document.getElementById("defendStressBox");
  const stressText = document.getElementById("defendStressText");
  const costBox = document.getElementById("defendCostBox");
  const costText = document.getElementById("defendCostText");
  const confirmSection = document.getElementById("defendConfirmSection");

  if (!resultsDiv) return;

  const roll = currentDefendData.roll;
  const cooperative = currentDefendData.cooperative;

  // Outcome
  outcomeBox.className =
    roll === 1 ? "result-box failure critical" : "result-box failure";

  if (cooperative === "take") {
    outcomeText.innerHTML = `<strong>Took the Attack for an Ally!</strong><br>Attack automatically hits`;
  } else {
    outcomeText.innerHTML = `<strong>${
      roll === 1 ? "Critical Failure!" : "Defense Failed!"
    }</strong><br>Attack hits`;
  }

  // Stress & Damage
  stressBox.className = "result-box failure";
  const damageTrackMove = stress >= 4 ? 1 : 0;

  let stressBreakdown = `<strong>${stress} Stress taken</strong>`;
  if (cooperative === "take") {
    stressBreakdown += `<br><small>(Includes +1 from taking the attack)</small>`;
  }

  if (damageTrackMove > 0) {
    stressBreakdown += `<br><br><span style="color: #ff6b6b;"><strong>Move 1 step down Damage Track</strong></span>`;
  } else {
    stressBreakdown += `<br><br>No Damage Track movement`;
  }

  stressText.innerHTML = stressBreakdown;

  // Calculate cost
  const { costMessage, actualCost } = calculateStatPoolCostWithValue(
    currentDefendData.stat,
    currentDefendData.effort
  );
  costBox.className = "result-box";
  costText.innerHTML = costMessage;

  // Store cost and stress
  currentDefendData.cost = actualCost;
  currentDefendData.stress = stress;

  // Hide hit section
  const hitSection = document.getElementById("defendHitSection");
  if (hitSection) hitSection.style.display = "none";

  // Show results and confirm button
  resultsDiv.style.display = "grid";
  confirmSection.style.display = "block";
}

// Show no stress results (defense succeeded)
function showDefendNoStress(roll, targetNumber) {
  const resultsDiv = document.getElementById("defendResults");
  const outcomeBox = document.getElementById("defendOutcomeBox");
  const outcomeText = document.getElementById("defendOutcomeText");
  const stressBox = document.getElementById("defendStressBox");
  const stressText = document.getElementById("defendStressText");
  const costBox = document.getElementById("defendCostBox");
  const costText = document.getElementById("defendCostText");
  const confirmSection = document.getElementById("defendConfirmSection");

  if (!resultsDiv) return;

  const damageTrack = character.damageTrack || "hale";
  const canHaveEffects =
    damageTrack !== "impaired" && damageTrack !== "debilitated";

  let specialEffect = "";
  if (roll === 19 && canHaveEffects) specialEffect = " + Minor Effect";
  if (roll === 20 && canHaveEffects)
    specialEffect = " + Major Effect (Critical!)";

  // Outcome
  outcomeBox.className =
    roll === 20 ? "result-box success critical" : "result-box success";
  outcomeText.innerHTML = `<strong>Defense Succeeds!${specialEffect}</strong><br>Attack misses`;

  // No stress
  stressBox.className = "result-box success";
  stressText.textContent = "No stress taken (defense succeeded)";

  // Calculate cost
  const { costMessage, actualCost } = calculateStatPoolCostWithValue(
    currentDefendData.stat,
    currentDefendData.effort
  );
  costBox.className = "result-box";
  costText.innerHTML = costMessage;

  currentDefendData.cost = actualCost;
  currentDefendData.stress = 0;

  // Hide success section
  const successSection = document.getElementById("defendSuccessSection");
  if (successSection) successSection.style.display = "none";

  // Show results
  resultsDiv.style.display = "grid";
  confirmSection.style.display = "block";
}

// Show opponent roll input for PvP
function showDefendOpponentRollInput(
  playerTotal,
  playerRoll,
  totalModifier,
  stressLevel
) {
  const hitSection = document.getElementById("defendHitSection");
  const hitBox = document.getElementById("defendHitBox");

  if (!hitSection || !hitBox) return;

  hitBox.className = "result-box";
  hitBox.innerHTML = `
    <h4>Your Defense Roll</h4>
    <p>
      Roll: ${playerRoll} + Modifiers: ${totalModifier} - Stress: ${stressLevel} = <strong>${playerTotal}</strong>
    </p>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
      <h4>Enter Opponent's Attack Roll Total</h4>
      <p style="color: #888; font-size: 0.9em; margin-bottom: 10px;">
        Enter the opponent's total attack roll (their d20 + modifiers)
      </p>
      <div style="display: flex; gap: 10px; align-items: center;">
        <input 
          type="number" 
          id="pvpDefendOpponentRoll" 
          placeholder="Opponent's total..."
          min="1"
          style="flex: 1; padding: 10px; background: #2a2a2a; border: 2px solid #317e30; border-radius: 4px; color: #fff; font-size: 1em;"
        />
        <button 
          class="button primary-button" 
          onclick="comparePvPDefendRolls()"
          style="padding: 10px 20px;"
        >
          Compare Rolls
        </button>
      </div>
    </div>
  `;

  hitSection.style.display = "block";
}

// Compare PvP defense rolls
function comparePvPDefendRolls() {
  const opponentRollInput = document.getElementById("pvpDefendOpponentRoll");
  const opponentRoll = parseInt(opponentRollInput?.value) || 0;

  if (opponentRoll === 0) {
    alert("Please enter the opponent's roll total first.");
    return;
  }

  const playerTotal = currentDefendData.playerTotal;
  const success = playerTotal > opponentRoll; // Higher roll wins

  currentDefendData.hit = !success;
  currentDefendData.opponentRoll = opponentRoll;

  if (success) {
    // Player wins defense - no damage
    showPvPDefendSuccess(playerTotal, opponentRoll);
  } else {
    // Player loses - take damage
    showPvPDefendFailure(playerTotal, opponentRoll);
  }
}

// Show PvP defense success
function showPvPDefendSuccess(playerTotal, opponentRoll) {
  const resultsDiv = document.getElementById("defendResults");
  const outcomeBox = document.getElementById("defendOutcomeBox");
  const outcomeText = document.getElementById("defendOutcomeText");
  const stressBox = document.getElementById("defendStressBox");
  const stressText = document.getElementById("defendStressText");
  const costBox = document.getElementById("defendCostBox");
  const costText = document.getElementById("defendCostText");
  const confirmSection = document.getElementById("defendConfirmSection");

  if (!resultsDiv) return;

  const roll = currentDefendData.roll;

  // Outcome
  outcomeBox.className =
    roll === 20 ? "result-box success critical" : "result-box success";
  outcomeText.innerHTML = `
    Your Roll: <strong>${playerTotal}</strong> vs Opponent's Roll: ${opponentRoll}<br>
    <strong>You win! Defense Succeeds!</strong><br>
    <span style="color: #888;">Opponent's attack misses</span>
  `;

  // No stress
  stressBox.className = "result-box success";
  stressText.textContent = "No stress taken (defense succeeded)";

  // Calculate cost
  const { costMessage, actualCost } = calculateStatPoolCostWithValue(
    currentDefendData.stat,
    currentDefendData.effort
  );
  costBox.className = "result-box";
  costText.innerHTML = costMessage;

  currentDefendData.cost = actualCost;
  currentDefendData.stress = 0;

  // Hide hit section
  const hitSection = document.getElementById("defendHitSection");
  if (hitSection) hitSection.style.display = "none";

  // Show results
  resultsDiv.style.display = "grid";
  confirmSection.style.display = "block";
}

// Show PvP defense failure - need stress input
function showPvPDefendFailure(playerTotal, opponentRoll) {
  const hitSection = document.getElementById("defendHitSection");
  const hitBox = document.getElementById("defendHitBox");

  if (!hitSection || !hitBox) return;

  const roll = currentDefendData.roll;

  hitBox.className =
    roll === 1 ? "result-box failure critical" : "result-box failure";
  hitBox.innerHTML = `
    <h4>Defense Failed!</h4>
    <p>
      Your Roll: ${playerTotal} vs Opponent's Roll: <strong>${opponentRoll}</strong><br>
      <strong>${
        roll === 1 ? "CRITICAL FAILURE!" : "Opponent rolled higher"
      }</strong><br>
      <span style="color: #888;">Attack hits - enter stress taken below</span>
    </p>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
      <table class="calculator-table" style="margin: 0">
        <tbody>
          <!-- Stress Taken -->
          <tr>
            <td class="calculator-label" style="width: 40%">
              Stress Taken:
            </td>
            <td class="calculator-input" style="width: 30%">
              <input
                type="number"
                id="defendStressTaken"
                value="0"
                min="0"
                oninput="updateDefendStressDisplay()"
              />
            </td>
            <td class="calculator-info" style="width: 30%">
              <span id="defendStressInfo">Enter stress received</span>
            </td>
          </tr>

          <!-- Stress Preview -->
          <tr class="calculator-result-row">
            <td class="calculator-label">
              Damage Track Effect:
            </td>
            <td class="calculator-display" colspan="2">
              <span id="defendDamageTrackEffect">--</span>
            </td>
          </tr>

          <!-- Calculate Button -->
          <tr>
            <td colspan="3" class="calculator-action">
              <button
                class="button primary-button calculator-roll-btn"
                onclick="calculateDefendResult()"
                id="calculateDefendBtn"
              >
                Calculate Defense Result
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  hitSection.style.display = "block";

  updateDefendStressDisplay();
}

// Confirm defense and apply effects
function confirmDefend() {
  console.log("=== CONFIRMING DEFENSE ===");

  const stat = currentDefendData.stat;
  const cost = currentDefendData.cost;
  const stressTaken = currentDefendData.stress || 0;

  if (!stat || cost === 0) {
    // No cost to apply, just acknowledge
    const message =
      stressTaken > 0
        ? `Defense acknowledged!\n\nNo stat points spent.\n${stressTaken} stress taken.`
        : `Defense acknowledged!\n\nNo stat points spent.\nNo stress taken.`;
    alert(message);

    // Apply stress even if no cost
    if (stressTaken > 0) {
      const oldStress = character.stress || 0;
      character.stress = oldStress + stressTaken;
      console.log(`Stress: ${oldStress} -> ${character.stress}`);
      updateStressDisplay();
    }

    clearDefendCalculator();
    return;
  }

  console.log(`Applying defense cost: ${cost} ${stat} points`);
  console.log(`Stress taken: ${stressTaken}`);

  // Ensure currentPools exists
  if (!character.currentPools) {
    console.error("character.currentPools is undefined! Initializing...");
    character.currentPools = {
      Might: character.stats?.Might || 0,
      Speed: character.stats?.Speed || 0,
      Intellect: character.stats?.Intellect || 0,
    };
  }

  // Get current pool value
  const statKey = stat.charAt(0).toUpperCase() + stat.slice(1);
  const currentPool = character.currentPools[statKey] || 0;
  const newPool = Math.max(0, currentPool - cost);

  // Update character pools
  character.currentPools[statKey] = newPool;

  console.log(`${statKey} pool: ${currentPool} -> ${newPool}`);

  // Apply stress if any
  if (stressTaken > 0) {
    const oldStress = character.stress || 0;
    character.stress = oldStress + stressTaken;
    console.log(`Stress: ${oldStress} -> ${character.stress}`);

    // Update stress display
    updateStressDisplay();
  }

  // Update the stat display
  updateStatDisplay();

  // Show confirmation
  let message = `Defense confirmed!\n\n${cost} ${statKey} points spent.\n`;

  if (stressTaken > 0) {
    message += `${stressTaken} stress taken.\n`;
  }

  message += `\n${statKey} pool: ${currentPool} → ${newPool}`;

  alert(message);

  // Clear the calculator
  clearDefendCalculator();
}

// Clear defend calculator
function clearDefendCalculator() {
  // Reset form inputs
  const opponentType = document.getElementById("defendOpponentType");
  const opponentLevel = document.getElementById("defendOpponentLevel");
  const stat = document.getElementById("defendStat");
  const effort = document.getElementById("defendEffort");
  const cooperative = document.getElementById("defendCooperative");
  const special = document.getElementById("defendSpecial");
  const stressTaken = document.getElementById("defendStressTaken");

  if (opponentType) opponentType.value = "player-npc";
  if (opponentLevel) opponentLevel.value = "";
  if (stat) stat.value = "";
  if (effort) effort.value = "0";
  if (cooperative) cooperative.value = "none";
  if (special) special.value = "0";
  if (stressTaken) stressTaken.value = "0";

  // Clear PvP opponent roll input
  const pvpOpponentRoll = document.getElementById("pvpDefendOpponentRoll");
  if (pvpOpponentRoll) pvpOpponentRoll.value = "";

  // Clear displays
  const edgeDisplay = document.getElementById("defendEdgeDisplay");
  const modifiedDisplay = document.getElementById("defendModifiedValue");
  const targetDisplay = document.getElementById("defendTargetNumber");
  const targetDifficultyDisplay = document.getElementById(
    "defendTargetDifficulty"
  );
  const cooperativeEffect = document.getElementById("defendCooperativeEffect");
  const stressInfo = document.getElementById("defendStressInfo");
  const damageTrackEffect = document.getElementById("defendDamageTrackEffect");

  if (edgeDisplay) edgeDisplay.textContent = "--";
  if (modifiedDisplay) modifiedDisplay.textContent = "--";
  if (targetDisplay) targetDisplay.textContent = "--";
  if (targetDifficultyDisplay) targetDifficultyDisplay.textContent = "--";
  if (cooperativeEffect) cooperativeEffect.textContent = "No assistance";
  if (stressInfo) stressInfo.textContent = "Enter stress received";
  if (damageTrackEffect) damageTrackEffect.textContent = "--";

  // Hide results sections
  const successSection = document.getElementById("defendSuccessSection");
  const hitSection = document.getElementById("defendHitSection");
  const resultsDiv = document.getElementById("defendResults");
  const diceResultRow = document.getElementById("defendDiceResultRow");
  const confirmSection = document.getElementById("defendConfirmSection");

  if (successSection) successSection.style.display = "none";
  if (hitSection) hitSection.style.display = "none";
  if (resultsDiv) resultsDiv.style.display = "none";
  if (diceResultRow) diceResultRow.style.display = "none";
  if (confirmSection) confirmSection.style.display = "none";

  // Reset stored data
  currentDefendData = {
    stat: null,
    cost: 0,
    stress: 0,
    roll: 0,
    hit: false,
    effort: 0,
    cooperative: "none",
    playerTotal: 0,
    opponentRoll: 0,
  };

  // Update calculator to refresh UI
  updateDefendCalculator();
}

// ==================== ABILITY USAGE CALCULATOR ==================== //

// Store current ability usage data
let currentAbilityData = {
  abilityName: null,
  abilityType: null,
  stat: null,
  cost: 0,
  stress: 0,
  confirmedCost: null,
  edge: 0,
  actualCost: 0,
};

// Initialize ability usage calculator
function initializeAbilityCalculator() {
  populateAbilityDropdown();
  updateAbilityCalculator();
}

// Populate ability dropdown with player's abilities that have costs
function populateAbilityDropdown() {
  const abilitySelect = document.getElementById("abilitySelect");

  if (!abilitySelect) return;

  // Clear existing options
  abilitySelect.innerHTML = '<option value="">-- Select Ability --</option>';

  // Get player's selected Type abilities
  if (
    character.selectedTypeAbilities &&
    character.selectedTypeAbilities.length > 0
  ) {
    const typeGroup = document.createElement("optgroup");
    typeGroup.label = "Type Abilities";

    character.selectedTypeAbilities.forEach((abilityName) => {
      const ability = ABILITIES_DATA.find((a) => a.name === abilityName);

      if (
        ability &&
        ability.pointsRequired &&
        ability.pointsRequired !== "—" &&
        ability.pointsRequired !== "0"
      ) {
        const option = document.createElement("option");
        option.value = `type_${abilityName}`;
        option.textContent = `${abilityName} (Type - ${ability.pointsRequired} pts)`;
        option.dataset.type = "type";
        option.dataset.name = abilityName;
        typeGroup.appendChild(option);
      }
    });

    if (typeGroup.children.length > 0) {
      abilitySelect.appendChild(typeGroup);
    }
  }

  // Get player's Focus abilities (auto-gained and chosen)
  const focusAbilities = [];

  // Get all available focus abilities
  const availableFocusAbilities = getAvailableFocusAbilities();

  availableFocusAbilities.forEach((ability) => {
    const tier = parseInt(ability.Tier);
    const isAutoGained = tier !== 3 && tier !== 6;
    const isChosen =
      (tier === 3 && character.focusTierChoices?.tier3 === ability.Ability) ||
      (tier === 6 && character.focusTierChoices?.tier6 === ability.Ability);
    const isExtra = character.selectedFocusAbilities?.includes(ability.Ability);

    if (isAutoGained || isChosen || isExtra) {
      if (ability.Cost && ability.Cost !== "—" && ability.Cost !== "0") {
        focusAbilities.push(ability);
      }
    }
  });

  if (focusAbilities.length > 0) {
    const focusGroup = document.createElement("optgroup");
    focusGroup.label = "Focus Abilities";

    focusAbilities.forEach((ability) => {
      const option = document.createElement("option");
      option.value = `focus_${ability.Ability}`;
      option.textContent = `${ability.Ability} (Focus - ${ability.Cost})`;
      option.dataset.type = "focus";
      option.dataset.name = ability.Ability;
      focusGroup.appendChild(option);
    });

    abilitySelect.appendChild(focusGroup);
  }
}

// Update ability calculator displays
function updateAbilityCalculator() {
  const abilityValue = document.getElementById("abilitySelect")?.value || "";
  const confirmedCost =
    parseInt(document.getElementById("abilityConfirmedCost")?.value) || null;

  if (!abilityValue) {
    // Clear all displays
    clearAbilityDisplay();
    return;
  }

  // Parse ability selection
  const [type, ...nameParts] = abilityValue.split("_");
  const abilityName = nameParts.join("_");

  let abilityData = null;

  if (type === "type") {
    abilityData = ABILITIES_DATA.find((a) => a.name === abilityName);
  } else if (type === "focus") {
    const focusAbilities = getAvailableFocusAbilities();
    abilityData = focusAbilities.find((a) => a.Ability === abilityName);
  }

  if (!abilityData) {
    clearAbilityDisplay();
    return;
  }

  // Update effect description
  const effectDisplay = document.getElementById("abilityEffect");
  if (effectDisplay) {
    if (type === "type") {
      effectDisplay.value =
        abilityData.description || "No description available.";
    } else {
      effectDisplay.value = abilityData.Effect || "No description available.";
    }
  }

  // Get stat(s)
  let statOptions = [];
  if (type === "type") {
    const statStr = abilityData.stat || "";
    if (statStr.includes("/")) {
      statOptions = statStr.split("/").map((s) => s.trim());
    } else if (statStr) {
      statOptions = [statStr];
    }
  } else {
    const statStr = abilityData.Stat || "";
    if (statStr.includes("/")) {
      statOptions = statStr.split("/").map((s) => s.trim());
    } else if (statStr) {
      statOptions = [statStr];
    }
  }

  // // Update stat selector
  const statSelect = document.getElementById("abilityStat");
  const statRow = document.getElementById("abilityStatRow");

  if (statOptions.length === 0) {
    // No stat required
    if (statRow) statRow.style.display = "none";
    currentAbilityData.stat = null;
  } else if (statOptions.length === 1) {
    // Single stat - show as read-only
    if (statRow) statRow.style.display = "table-row";
    if (statSelect) {
      statSelect.innerHTML = `<option value="${statOptions[0]}">${statOptions[0]}</option>`;
      statSelect.disabled = true;
      currentAbilityData.stat = statOptions[0];
    }
  } else {
    // Multiple stats - allow selection
    if (statRow) statRow.style.display = "table-row";
    if (statSelect) {
      statSelect.innerHTML = '<option value="">-- Choose Stat --</option>';
      statOptions.forEach((stat) => {
        const option = document.createElement("option");
        option.value = stat;
        option.textContent = stat;
        statSelect.appendChild(option);
      });
      statSelect.disabled = false;

      // Set to previously selected value if it exists and is valid
      const previousSelection = currentAbilityData.stat;
      if (previousSelection && statOptions.includes(previousSelection)) {
        statSelect.value = previousSelection;
        currentAbilityData.stat = previousSelection;
      } else {
        // Default to first option if nothing selected
        if (statOptions.length > 0) {
          statSelect.value = statOptions[0];
          currentAbilityData.stat = statOptions[0];
        } else {
          currentAbilityData.stat = null;
        }
      }
    }
  }

  // Get the selected stat for edge display
  const selectedStat = statSelect?.value || statOptions[0] || null;

  // Update Edge display
  const edgeDisplay = document.getElementById("abilityEdge");
  if (edgeDisplay && selectedStat) {
    const edge = character.edge?.[selectedStat] || 0;
    edgeDisplay.textContent = edge;
    currentAbilityData.edge = edge;
  } else if (edgeDisplay) {
    edgeDisplay.textContent = "--";
    currentAbilityData.edge = 0;
  }

  // Get base cost
  let baseCost = 0;
  if (type === "type") {
    baseCost = parseInt(abilityData.pointsRequired) || 0;
  } else {
    const costStr = abilityData.Cost || "0";
    baseCost = parseInt(costStr) || 0;
  }

  // Display base cost
  const costDisplay = document.getElementById("abilityCost");
  if (costDisplay) {
    costDisplay.textContent = baseCost;
  }

  // Get stress
  let stress = 0;
  if (type === "type") {
    stress = parseInt(abilityData.stress) || 0;
  } else {
    stress = 0; // Focus abilities typically don't have stress listed
  }

  const stressDisplay = document.getElementById("abilityStress");
  if (stressDisplay) {
    stressDisplay.textContent = stress;
  }

  // Calculate actual cost
  const finalCost = confirmedCost !== null ? confirmedCost : baseCost;
  const actualCost = Math.max(0, finalCost - currentAbilityData.edge);

  // Store data
  currentAbilityData.abilityName = abilityName;
  currentAbilityData.abilityType = type;
  currentAbilityData.stat = selectedStat;
  currentAbilityData.cost = baseCost;
  currentAbilityData.stress = stress;
  currentAbilityData.confirmedCost = confirmedCost;
  currentAbilityData.actualCost = actualCost;

  // Update confirmation display
  updateAbilityCostConfirmation();
}

function onAbilityStatChange() {
  const statSelect = document.getElementById("abilityStat");
  const selectedStat = statSelect?.value;

  if (!selectedStat) return;

  // Update current data
  currentAbilityData.stat = selectedStat;

  // Update edge display
  const edgeDisplay = document.getElementById("abilityEdge");
  if (edgeDisplay) {
    const edge = character.edge?.[selectedStat] || 0;
    edgeDisplay.textContent = edge;
    currentAbilityData.edge = edge;
  }

  // Recalculate actual cost
  const confirmedCost =
    parseInt(document.getElementById("abilityConfirmedCost")?.value) || null;
  const finalCost =
    confirmedCost !== null ? confirmedCost : currentAbilityData.cost;
  const actualCost = Math.max(0, finalCost - currentAbilityData.edge);

  currentAbilityData.actualCost = actualCost;

  // Update confirmation display
  updateAbilityCostConfirmation();
}

// Update the cost confirmation display
function updateAbilityCostConfirmation() {
  const confirmSection = document.getElementById("abilityConfirmSection");
  const confirmBox = document.getElementById("abilityCostConfirmBox");
  const confirmText = document.getElementById("abilityCostConfirmText");

  if (!confirmSection || !confirmBox || !confirmText) return;

  if (!currentAbilityData.stat) {
    confirmSection.style.display = "none";
    return;
  }

  const finalCost =
    currentAbilityData.confirmedCost !== null
      ? currentAbilityData.confirmedCost
      : currentAbilityData.cost;

  let costBreakdown = `Base Cost: ${currentAbilityData.cost}`;

  if (
    currentAbilityData.confirmedCost !== null &&
    currentAbilityData.confirmedCost !== currentAbilityData.cost
  ) {
    costBreakdown += `<br>Adjusted Cost: ${currentAbilityData.confirmedCost}`;
  }

  costBreakdown += `<br>Edge (${currentAbilityData.stat}): -${currentAbilityData.edge}`;
  costBreakdown += `<br><strong>Actual Cost: ${currentAbilityData.actualCost} ${currentAbilityData.stat} points</strong>`;

  if (currentAbilityData.stress > 0) {
    costBreakdown += `<br><br><span style="color: #ff6b6b;">Stress: +${currentAbilityData.stress}</span>`;
  }

  confirmText.innerHTML = costBreakdown;
  confirmBox.className = "result-box";
  confirmSection.style.display = "block";
}

// Clear ability display
function clearAbilityDisplay() {
  const effectDisplay = document.getElementById("abilityEffect");
  const statRow = document.getElementById("abilityStatRow");
  const edgeDisplay = document.getElementById("abilityEdge");
  const costDisplay = document.getElementById("abilityCost");
  const stressDisplay = document.getElementById("abilityStress");
  const confirmedCostInput = document.getElementById("abilityConfirmedCost");
  const confirmSection = document.getElementById("abilityConfirmSection");

  if (effectDisplay) effectDisplay.value = "";
  if (statRow) statRow.style.display = "none";
  if (edgeDisplay) edgeDisplay.textContent = "--";
  if (costDisplay) costDisplay.textContent = "--";
  if (stressDisplay) stressDisplay.textContent = "--";
  if (confirmedCostInput) confirmedCostInput.value = "";
  if (confirmSection) confirmSection.style.display = "none";

  currentAbilityData = {
    abilityName: null,
    abilityType: null,
    stat: null,
    cost: 0,
    stress: 0,
    confirmedCost: null,
    edge: 0,
    actualCost: 0,
  };
}

// Confirm and use ability
function confirmAbilityUsage() {
  const { abilityName, stat, actualCost, stress } = currentAbilityData;

  if (!abilityName || !stat) {
    alert("Please select an ability first.");
    return;
  }

  const currentPool = character.currentPools[stat] || 0;

  if (actualCost > currentPool) {
    const confirmation = confirm(
      `Warning: This ability costs ${actualCost} ${stat} points, but you only have ${currentPool} ${stat} remaining.\n\n` +
        `Using this ability will reduce your ${stat} pool to 0.\n\n` +
        `Continue?`
    );

    if (!confirmation) return;
  }

  // Deduct cost from stat pool
  const newPool = Math.max(0, currentPool - actualCost);
  character.currentPools[stat] = newPool;

  // Update display
  const poolElement = document.getElementById(`${stat.toLowerCase()}Pool`);
  if (poolElement) {
    poolElement.textContent = newPool;
  }

  // Add stress if applicable
  if (stress > 0) {
    const currentStress = character.stress || 0;
    const newStress = currentStress + stress;
    character.stress = newStress;

    const stressDisplay = document.getElementById("stressPoints");
    if (stressDisplay) {
      stressDisplay.textContent = newStress;
    }

    updateStressLevel();

    // Move down damage track if stress >= 4
    if (stress >= 4) {
      changeDamageState(1);
    }
  }

  // Show confirmation
  let message = `Ability Used: ${abilityName}\n\n`;
  message += `${actualCost} ${stat} points deducted.\n`;
  message += `New ${stat}: ${newPool} / ${character.stats[stat]}\n`;

  if (stress > 0) {
    message += `\n+${stress} Stress taken`;
    if (stress >= 4) {
      message += `\nMoved 1 step down Damage Track`;
    }
  }

  alert(message);

  // Clear calculator
  clearAbilityCalculator();
}

// Clear ability calculator
function clearAbilityCalculator() {
  const abilitySelect = document.getElementById("abilitySelect");
  const confirmedCostInput = document.getElementById("abilityConfirmedCost");

  if (abilitySelect) abilitySelect.value = "";
  if (confirmedCostInput) confirmedCostInput.value = "";

  clearAbilityDisplay();
  updateAbilityCalculator();
}

// ==================== QUICK DICE ROLLS ==================== //

// Quick roll d6
function quickRollD6() {
  showDiceRoller("d6", (result) => {
    // Just show an alert with the result
    alert(`You rolled a d6: ${result}`);
  });
}

// Quick roll d20
function quickRollD20() {
  showDiceRoller("d20", (result) => {
    // Just show an alert with the result
    alert(`You rolled a d20: ${result}`);
  });
}
