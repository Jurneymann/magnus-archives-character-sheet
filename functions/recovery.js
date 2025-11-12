// ==================== RECOVERY SECTION ==================== //

// Initialize recovery section
function initializeRecoverySection() {
  updateRecoveryDisplay();
}

function updateRecoveryFormulas() {
  const tier = character.tier || 1;
  const bonus = character.recoveryBonus || 0;

  // Update formula displays
  const tierValue = document.getElementById("recoveryTierValue");
  const bonusValueFormula = document.getElementById(
    "recoveryBonusValueFormula"
  );
  const tierBreakdown = document.getElementById("recoveryTierBreakdown");
  const bonusBreakdown = document.getElementById("recoveryBonusBreakdown");

  if (tierValue) tierValue.textContent = tier;
  if (bonusValueFormula) bonusValueFormula.textContent = bonus;
  if (tierBreakdown) tierBreakdown.textContent = tier;
  if (bonusBreakdown)
    bonusBreakdown.textContent = bonus > 0 ? `+${bonus}` : "+0";

  console.log("Recovery formulas updated - Tier:", tier, "Bonus:", bonus);
}

// Update recovery display
function updateRecoveryDisplay() {
  if (!character.recoveryRolls) {
    character.recoveryRolls = {
      action: false,
      tenMinutes: false,
      oneHour: false,
      tenHours: false,
    };
  }

  const recoveryTypes = ["action", "tenMinutes", "oneHour", "tenHours"];

  recoveryTypes.forEach((type) => {
    const card = document.getElementById(`recoveryCard-${type}`);
    const btn = document.getElementById(`recoveryBtn-${type}`);
    const badge = document.getElementById(`statusBadge-${type}`);

    if (card && btn && badge) {
      const isUsed = character.recoveryRolls[type];

      if (isUsed) {
        card.classList.add("used");
        btn.disabled = true;
        btn.textContent = "Used";
        badge.textContent = "Used";
        badge.className = "recovery-status used";
      } else {
        card.classList.remove("used");
        btn.disabled = false;
        btn.textContent = "Use Recovery Roll";
        badge.textContent = "Available";
        badge.className = "recovery-status available";
      }
    }
  });

  console.log("Recovery display updated:", character.recoveryRolls);
}

// Roll recovery using 3D dice roller
function performRecovery(recoveryType) {
  console.log("=== performRecovery START ===");
  console.log("performRecovery called with type:", recoveryType);

  // Check if this recovery has already been used
  if (!character.recoveryRolls) {
    character.recoveryRolls = {
      action: false,
      tenMinutes: false,
      oneHour: false,
      tenHours: false,
    };
  }

  if (character.recoveryRolls[recoveryType]) {
    alert("This recovery roll has already been used today!");
    return;
  }

  // Recovery type names for display
  const recoveryNames = {
    action: "Action Recovery",
    tenMinutes: "Short Rest (10 Minutes)",
    oneHour: "Long Rest (1 Hour)",
    tenHours: "Full Rest (10 Hours)",
  };

  console.log("About to call showDiceRoller with callback");

  // Show the 3D dice roller for d6
  showDiceRoller("d6", function (roll) {
    console.log("=== CALLBACK EXECUTED ===");
    console.log("Dice roll result:", roll);
    console.log("Recovery type:", recoveryType);
    console.log("Recovery name:", recoveryNames[recoveryType]);

    // Callback when dice roll is accepted
    processRecoveryRoll(roll, recoveryType, recoveryNames[recoveryType]);
  });

  console.log("showDiceRoller called, waiting for user to roll");
  console.log("=== performRecovery END ===");
}

// Process the recovery roll result
function processRecoveryRoll(roll, recoveryType, recoveryName) {
  console.log("=== processRecoveryRoll START ===");
  console.log(`Processing recovery roll: ${roll} for ${recoveryType}`);

  // Get recovery bonus and tier
  const recoveryBonus = character.recoveryBonus || 0;
  const tier = character.tier || 1;

  // Calculate total recovery
  const totalRecovery = roll + recoveryBonus + tier;

  console.log(
    "Roll:",
    roll,
    "Bonus:",
    recoveryBonus,
    "Tier:",
    tier,
    "Total:",
    totalRecovery
  );

  console.log("About to call showRecoveryDistributionDialog");

  // Show recovery distribution dialog
  showRecoveryDistributionDialog(
    totalRecovery,
    recoveryType,
    roll,
    recoveryBonus,
    tier,
    recoveryName
  );

  console.log("=== processRecoveryRoll END ===");
}

// Show recovery distribution dialog
function showRecoveryDistributionDialog(
  totalRecovery,
  recoveryType,
  roll,
  recoveryBonus,
  tier,
  recoveryName
) {
  console.log("=== showRecoveryDistributionDialog START ===");

  // Calculate stress reduction based on rest duration
  let stressReduction = 0;
  if (recoveryType === "oneHour") {
    stressReduction = 1;
  } else if (recoveryType === "tenHours") {
    stressReduction = 10;
  }

  // Create modal
  const modal = document.createElement("div");
  modal.className = "dice-modal";
  modal.style.display = "flex";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  modal.style.zIndex = "10001"; // Higher than dice roller (10000)
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  // Get current and max pools
  const mightCurrent =
    character.mightPool?.current || character.currentPools?.Might || 0;
  const mightMax = character.mightPool?.max || character.stats?.Might || 0;
  const speedCurrent =
    character.speedPool?.current || character.currentPools?.Speed || 0;
  const speedMax = character.speedPool?.max || character.stats?.Speed || 0;
  const intellectCurrent =
    character.intellectPool?.current || character.currentPools?.Intellect || 0;
  const intellectMax =
    character.intellectPool?.max || character.stats?.Intellect || 0;

  console.log("Recovery Dialog - Current Pools:", {
    might: `${mightCurrent}/${mightMax}`,
    speed: `${speedCurrent}/${speedMax}`,
    intellect: `${intellectCurrent}/${intellectMax}`,
  });

  modal.innerHTML = `
    <div class="dice-modal-content-compact" style="max-width: 650px;">
      <div class="dice-modal-header">
        <h2 style="font-size: 1.3em;">Recovery: ${recoveryName}</h2>
        <button class="dice-modal-close" onclick="this.closest('.dice-modal').remove()">&times;</button>
      </div>
      
      <div class="dice-modal-body-compact">
        <!-- Main Grid: Bonuses on Left, Stats on Right -->
        <div style="display: grid; grid-template-columns: 200px 1fr; gap: 15px;">
          
          <!-- Left Column: Recovery Info & Bonuses -->
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <!-- Roll Result -->
            <div style="background: #1a1a1a; padding: 12px; border-radius: 6px; border: 1px solid #317e30; text-align: center;">
              <div style="color: #888; font-size: 0.85em; margin-bottom: 4px;">Roll Result</div>
              <div style="color: #4CAF50; font-size: 1.8em; font-weight: bold;">${totalRecovery}</div>
              <div style="color: #888; font-size: 0.8em; margin-top: 4px;">
                🎲 ${roll} + ${recoveryBonus} (bonus) + ${tier} (tier)
              </div>
            </div>

            <!-- Points Remaining -->
            <div style="background: #1a1a1a; padding: 12px; border-radius: 6px; border: 1px solid #FFD700; text-align: center;">
              <div style="color: #888; font-size: 0.85em; margin-bottom: 4px;">Remaining</div>
              <div id="recoveryPointsRemaining" style="color: #FFD700; font-weight: bold; font-size: 1.8em;">${totalRecovery}</div>
              <div style="color: #888; font-size: 0.8em; margin-top: 4px;">points</div>
            </div>

            ${
              stressReduction > 0
                ? `
            <!-- Stress Reduction -->
            <div style="background: #1a1a1a; padding: 12px; border-radius: 6px; border: 1px solid #FFD700; text-align: center;">
              <div style="color: #888; font-size: 0.85em; margin-bottom: 4px;">Rest Benefit</div>
              <div style="color: #4CAF50; font-size: 1.5em; font-weight: bold;">-${stressReduction}</div>
              <div style="color: #888; font-size: 0.8em; margin-top: 4px;">Stress</div>
            </div>
            `
                : ""
            }
          </div>

          <!-- Right Column: Stat Distribution -->
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <!-- Might -->
            <div style="background: #2a2a2a; padding: 10px; border-radius: 6px; border: 1px solid #444;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="color: #F44336; font-weight: bold; font-size: 1em;">Might</span>
                <span style="color: ${
                  mightCurrent >= mightMax ? "#4CAF50" : "#888"
                }; font-size: 0.85em; font-weight: bold;">${mightCurrent}/${mightMax}</span>
              </div>
              <div style="display: flex; gap: 6px; align-items: center;">
                <button onclick="adjustRecoveryDistribution('might', -1)" class="recovery-adjust-btn" style="width: 35px; height: 35px; font-size: 1.2em;">−</button>
                <input type="number" id="recoveryMight" value="0" min="0" max="${totalRecovery}" readonly 
                  style="flex: 1; text-align: center; background: #1a1a1a; border: 2px solid #F44336; border-radius: 4px; color: #fff; font-size: 1.1em; font-weight: bold; padding: 6px;">
                <button onclick="adjustRecoveryDistribution('might', 1)" class="recovery-adjust-btn" style="width: 35px; height: 35px; font-size: 1.2em;">+</button>
              </div>
              ${
                mightCurrent >= mightMax
                  ? '<div style="color: #4CAF50; font-size: 0.75em; text-align: center; margin-top: 4px;">At Maximum</div>'
                  : ""
              }
            </div>

            <!-- Speed -->
            <div style="background: #2a2a2a; padding: 10px; border-radius: 6px; border: 1px solid #444;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="color: #2196F3; font-weight: bold; font-size: 1em;">Speed</span>
                <span style="color: ${
                  speedCurrent >= speedMax ? "#4CAF50" : "#888"
                }; font-size: 0.85em; font-weight: bold;">${speedCurrent}/${speedMax}</span>
              </div>
              <div style="display: flex; gap: 6px; align-items: center;">
                <button onclick="adjustRecoveryDistribution('speed', -1)" class="recovery-adjust-btn" style="width: 35px; height: 35px; font-size: 1.2em;">−</button>
                <input type="number" id="recoverySpeed" value="0" min="0" max="${totalRecovery}" readonly 
                  style="flex: 1; text-align: center; background: #1a1a1a; border: 2px solid #2196F3; border-radius: 4px; color: #fff; font-size: 1.1em; font-weight: bold; padding: 6px;">
                <button onclick="adjustRecoveryDistribution('speed', 1)" class="recovery-adjust-btn" style="width: 35px; height: 35px; font-size: 1.2em;">+</button>
              </div>
              ${
                speedCurrent >= speedMax
                  ? '<div style="color: #4CAF50; font-size: 0.75em; text-align: center; margin-top: 4px;">At Maximum</div>'
                  : ""
              }
            </div>

            <!-- Intellect -->
            <div style="background: #2a2a2a; padding: 10px; border-radius: 6px; border: 1px solid #444;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="color: #9C27B0; font-weight: bold; font-size: 1em;">Intellect</span>
                <span style="color: ${
                  intellectCurrent >= intellectMax ? "#4CAF50" : "#888"
                }; font-size: 0.85em; font-weight: bold;">${intellectCurrent}/${intellectMax}</span>
              </div>
              <div style="display: flex; gap: 6px; align-items: center;">
                <button onclick="adjustRecoveryDistribution('intellect', -1)" class="recovery-adjust-btn" style="width: 35px; height: 35px; font-size: 1.2em;">−</button>
                <input type="number" id="recoveryIntellect" value="0" min="0" max="${totalRecovery}" readonly 
                  style="flex: 1; text-align: center; background: #1a1a1a; border: 2px solid #9C27B0; border-radius: 4px; color: #fff; font-size: 1.1em; font-weight: bold; padding: 6px;">
                <button onclick="adjustRecoveryDistribution('intellect', 1)" class="recovery-adjust-btn" style="width: 35px; height: 35px; font-size: 1.2em;">+</button>
              </div>
              ${
                intellectCurrent >= intellectMax
                  ? '<div style="color: #4CAF50; font-size: 0.75em; text-align: center; margin-top: 4px;">At Maximum</div>'
                  : ""
              }
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 10px; margin-top: 15px;">
          <button 
            class="button secondary-button" 
            onclick="this.closest('.dice-modal').remove()"
            style="flex: 1; padding: 10px;"
          >
            Cancel
          </button>
          <button 
            class="button primary-button" 
            onclick="confirmRecoveryDistribution('${recoveryType}', ${totalRecovery}, ${stressReduction})"
            style="flex: 2; padding: 10px; font-size: 1em;"
          >
            ✓ Confirm Recovery
          </button>
        </div>
      </div>
    </div>
  `;

  console.log("Appending modal to body...");
  document.body.appendChild(modal);
  console.log("Modal appended. Checking if visible...");
  console.log("Modal display:", modal.style.display);
  console.log("Modal z-index:", modal.style.zIndex);

  // Force reflow
  modal.offsetHeight;

  console.log("Modal should now be visible");

  // Store the total for validation
  window.currentRecoveryTotal = totalRecovery;
  window.currentRecoveryStressReduction = stressReduction;
  window.currentRecoveryPools = {
    might: { current: mightCurrent, max: mightMax },
    speed: { current: speedCurrent, max: speedMax },
    intellect: { current: intellectCurrent, max: intellectMax },
  };

  console.log("Recovery pools stored:", window.currentRecoveryPools);
  console.log("=== showRecoveryDistributionDialog END ===");
}

// Adjust recovery distribution
function adjustRecoveryDistribution(stat, amount) {
  console.log(`Adjusting ${stat} by ${amount}`);

  const mightInput = document.getElementById("recoveryMight");
  const speedInput = document.getElementById("recoverySpeed");
  const intellectInput = document.getElementById("recoveryIntellect");
  const remainingSpan = document.getElementById("recoveryPointsRemaining");

  if (!mightInput || !speedInput || !intellectInput || !remainingSpan) {
    console.error("Could not find recovery input elements");
    return;
  }

  let mightValue = parseInt(mightInput.value) || 0;
  let speedValue = parseInt(speedInput.value) || 0;
  let intellectValue = parseInt(intellectInput.value) || 0;

  console.log("Current values:", { mightValue, speedValue, intellectValue });

  // Adjust the specified stat
  if (stat === "might") {
    mightValue = Math.max(0, mightValue + amount);
  } else if (stat === "speed") {
    speedValue = Math.max(0, speedValue + amount);
  } else if (stat === "intellect") {
    intellectValue = Math.max(0, intellectValue + amount);
  }

  // Calculate new total
  const newTotal = mightValue + speedValue + intellectValue;

  console.log("New total:", newTotal, "Max:", window.currentRecoveryTotal);

  // Check if within limits
  if (newTotal > window.currentRecoveryTotal) {
    console.log("Exceeds total recovery points");
    return; // Don't allow exceeding total
  }

  // Check pool caps (how many points each pool can actually receive)
  const pools = window.currentRecoveryPools;
  const mightCap = pools.might.max - pools.might.current;
  const speedCap = pools.speed.max - pools.speed.current;
  const intellectCap = pools.intellect.max - pools.intellect.current;

  console.log("Pool caps:", { mightCap, speedCap, intellectCap });

  if (
    mightValue > mightCap ||
    speedValue > speedCap ||
    intellectValue > intellectCap
  ) {
    console.log("Exceeds pool cap");
    return; // Don't allow exceeding pool maximum
  }

  // Update inputs
  mightInput.value = mightValue;
  speedInput.value = speedValue;
  intellectInput.value = intellectValue;

  // Update remaining
  const remaining = window.currentRecoveryTotal - newTotal;
  remainingSpan.textContent = remaining;

  // Update remaining color
  if (remaining === 0) {
    remainingSpan.style.color = "#4CAF50"; // Green when fully allocated
  } else {
    remainingSpan.style.color = "#FFD700"; // Gold when points remain
  }

  console.log("Distribution updated - Remaining:", remaining);
}

// Confirm recovery distribution
function confirmRecoveryDistribution(
  recoveryType,
  totalRecovery,
  stressReduction = 0
) {
  console.log("Confirming recovery distribution");

  const mightInput = document.getElementById("recoveryMight");
  const speedInput = document.getElementById("recoverySpeed");
  const intellectInput = document.getElementById("recoveryIntellect");

  if (!mightInput || !speedInput || !intellectInput) {
    console.error("Missing inputs:", {
      mightInput: !!mightInput,
      speedInput: !!speedInput,
      intellectInput: !!intellectInput,
    });
    alert("Error: Could not find distribution inputs.");
    return;
  }

  const mightValue = parseInt(mightInput.value) || 0;
  const speedValue = parseInt(speedInput.value) || 0;
  const intellectValue = parseInt(intellectInput.value) || 0;

  const distributedTotal = mightValue + speedValue + intellectValue;

  console.log("Distributed:", {
    mightValue,
    speedValue,
    intellectValue,
    distributedTotal,
  });

  // Check if at least some points are allocated
  if (distributedTotal === 0) {
    alert("Please allocate at least some recovery points before confirming.");
    return;
  }

  // Check if trying to allocate more than rolled
  if (distributedTotal > totalRecovery) {
    alert(`You cannot allocate more than ${totalRecovery} recovery points.`);
    return;
  }

  const unusedPoints = totalRecovery - distributedTotal;

  if (unusedPoints > 0) {
    const pools = window.currentRecoveryPools;
    const allPoolsMaxed =
      pools.might.current + mightValue >= pools.might.max &&
      pools.speed.current + speedValue >= pools.speed.max &&
      pools.intellect.current + intellectValue >= pools.intellect.max;

    if (!allPoolsMaxed) {
      const confirmation = confirm(
        `You have ${unusedPoints} unallocated recovery point(s).\n\n` +
          `Are you sure you want to proceed?\n\n` +
          `(These points will be lost)`
      );
      if (!confirmation) return;
    }
  }

  console.log("Character structure before recovery:", {
    mightPool: character.mightPool,
    currentPools: character.currentPools,
    stats: character.stats,
  });

  // Apply recovery to pools - handle both character structures
  if (mightValue > 0) {
    if (character.mightPool) {
      character.mightPool.current = Math.min(
        character.mightPool.max,
        character.mightPool.current + mightValue
      );
      console.log("Updated mightPool:", character.mightPool);
    }
    if (character.currentPools) {
      character.currentPools.Might = Math.min(
        character.stats.Might,
        character.currentPools.Might + mightValue
      );
      console.log("Updated currentPools.Might:", character.currentPools.Might);
    }
  }

  if (speedValue > 0) {
    if (character.speedPool) {
      character.speedPool.current = Math.min(
        character.speedPool.max,
        character.speedPool.current + speedValue
      );
      console.log("Updated speedPool:", character.speedPool);
    }
    if (character.currentPools) {
      character.currentPools.Speed = Math.min(
        character.stats.Speed,
        character.currentPools.Speed + speedValue
      );
      console.log("Updated currentPools.Speed:", character.currentPools.Speed);
    }
  }

  if (intellectValue > 0) {
    if (character.intellectPool) {
      character.intellectPool.current = Math.min(
        character.intellectPool.max,
        character.intellectPool.current + intellectValue
      );
      console.log("Updated intellectPool:", character.intellectPool);
    }
    if (character.currentPools) {
      character.currentPools.Intellect = Math.min(
        character.stats.Intellect,
        character.currentPools.Intellect + intellectValue
      );
      console.log(
        "Updated currentPools.Intellect:",
        character.currentPools.Intellect
      );
    }
  }

  // Apply stress reduction from rest
  if (stressReduction > 0) {
    if (typeof adjustStress === "function") {
      adjustStress(-stressReduction);
    } else {
      character.stress = Math.max(0, (character.stress || 0) - stressReduction);
    }
  }

  // Mark this recovery roll as used
  if (!character.recoveryRolls) {
    character.recoveryRolls = {
      action: false,
      tenMinutes: false,
      oneHour: false,
      tenHours: false,
    };
  }

  character.recoveryRolls[recoveryType] = true;

  console.log("Recovery applied, updating displays");
  console.log("Character structure after recovery:", {
    mightPool: character.mightPool,
    currentPools: character.currentPools,
  });

  // Update displays - try multiple update functions
  updateRecoveryDisplay();

  // Update stat pools display
  if (typeof updateStatDisplay === "function") {
    console.log("Calling updateStatDisplay");
    updateStatDisplay();
  }

  // Also try updating UI directly
  if (typeof updateUI === "function") {
    console.log("Calling updateUI");
    updateUI();
  }

  // Update stress display
  if (typeof updateStressDisplay === "function") {
    console.log("Calling updateStressDisplay");
    updateStressDisplay();
  }

  // Directly update pool display elements as backup
  updatePoolDisplayDirect();

  // Close modal
  const modal = document.querySelector(".dice-modal");
  if (modal) modal.remove();

  // Show success message
  let message = "Recovery complete!\n\n";
  if (mightValue > 0) message += `Might: +${mightValue}\n`;
  if (speedValue > 0) message += `Speed: +${speedValue}\n`;
  if (intellectValue > 0) message += `Intellect: +${intellectValue}\n`;
  if (stressReduction > 0)
    message += `\nStress: -${stressReduction} (rest benefit)\n`;
  if (unusedPoints > 0)
    message += `\n${unusedPoints} point(s) unused (pools at maximum)`;

  alert(message);
}

function updatePoolDisplayDirect() {
  console.log("Directly updating pool displays");

  // Update Might display
  const mightCurrent =
    character.mightPool?.current || character.currentPools?.Might || 0;
  const mightMax = character.mightPool?.max || character.stats?.Might || 0;

  const mightCurrentElement = document.getElementById("mightPool");
  const mightMaxElement = document.getElementById("mightMax");

  if (mightCurrentElement) {
    mightCurrentElement.textContent = mightCurrent;
    console.log("Updated mightPool display to:", mightCurrent);
  }
  if (mightMaxElement) {
    mightMaxElement.textContent = mightMax;
  }

  // Update Speed display
  const speedCurrent =
    character.speedPool?.current || character.currentPools?.Speed || 0;
  const speedMax = character.speedPool?.max || character.stats?.Speed || 0;

  const speedCurrentElement = document.getElementById("speedPool");
  const speedMaxElement = document.getElementById("speedMax");

  if (speedCurrentElement) {
    speedCurrentElement.textContent = speedCurrent;
    console.log("Updated speedPool display to:", speedCurrent);
  }
  if (speedMaxElement) {
    speedMaxElement.textContent = speedMax;
  }

  // Update Intellect display
  const intellectCurrent =
    character.intellectPool?.current || character.currentPools?.Intellect || 0;
  const intellectMax =
    character.intellectPool?.max || character.stats?.Intellect || 0;

  const intellectCurrentElement = document.getElementById("intellectPool");
  const intellectMaxElement = document.getElementById("intellectMax");

  if (intellectCurrentElement) {
    intellectCurrentElement.textContent = intellectCurrent;
    console.log("Updated intellectPool display to:", intellectCurrent);
  }
  if (intellectMaxElement) {
    intellectMaxElement.textContent = intellectMax;
  }
}

// Reset all recovery rolls
function resetRecovery() {
  const confirmation = confirm(
    "Reset all recovery rolls?\n\n" +
      "This will mark all 4 recovery rolls as available again.\n\n" +
      "Use this at the start of a new day."
  );

  if (!confirmation) return;

  character.recoveryRolls = {
    action: false,
    tenMinutes: false,
    oneHour: false,
    tenHours: false,
  };

  updateRecoveryDisplay();

  alert("All recovery rolls have been reset and are now available!");
}

function updateStatDisplay() {
  console.log("updateStatDisplay called");

  // Get current and max values from character - handle both structures
  const mightCurrent =
    character.mightPool?.current || character.currentPools?.Might || 0;
  const mightMax = character.mightPool?.max || character.stats?.Might || 0;
  const speedCurrent =
    character.speedPool?.current || character.currentPools?.Speed || 0;
  const speedMax = character.speedPool?.max || character.stats?.Speed || 0;
  const intellectCurrent =
    character.intellectPool?.current || character.currentPools?.Intellect || 0;
  const intellectMax =
    character.intellectPool?.max || character.stats?.Intellect || 0;

  console.log("Stat values:", {
    might: `${mightCurrent}/${mightMax}`,
    speed: `${speedCurrent}/${speedMax}`,
    intellect: `${intellectCurrent}/${intellectMax}`,
  });

  // Update Might
  const mightMaxElement = document.getElementById("mightMax");
  const mightPoolElement = document.getElementById("mightPool");
  if (mightMaxElement) {
    mightMaxElement.textContent = mightMax;
    console.log("Updated mightMax element");
  }
  if (mightPoolElement) {
    mightPoolElement.textContent = mightCurrent;
    console.log("Updated mightPool element");
  }

  // Update Speed
  const speedMaxElement = document.getElementById("speedMax");
  const speedPoolElement = document.getElementById("speedPool");
  if (speedMaxElement) {
    speedMaxElement.textContent = speedMax;
    console.log("Updated speedMax element");
  }
  if (speedPoolElement) {
    speedPoolElement.textContent = speedCurrent;
    console.log("Updated speedPool element");
  }

  // Update Intellect
  const intellectMaxElement = document.getElementById("intellectMax");
  const intellectPoolElement = document.getElementById("intellectPool");
  if (intellectMaxElement) {
    intellectMaxElement.textContent = intellectMax;
    console.log("Updated intellectMax element");
  }
  if (intellectPoolElement) {
    intellectPoolElement.textContent = intellectCurrent;
    console.log("Updated intellectPool element");
  }

  console.log("✓ Stat display update complete");
}

function adjustRecoveryBonus(amount) {
  const bonusInput = document.getElementById("recoveryBonus");
  if (!bonusInput) return;

  let currentBonus = parseInt(bonusInput.value) || 0;
  let newBonus = Math.max(0, currentBonus + amount);

  bonusInput.value = newBonus;
  character.recoveryBonus = newBonus;

  updateRecoveryFormulas();
}
