// Magnus Archives Character Sheet - Main Script

// Character Sheet Application
(function () {
  "use strict";

  // State management
  const state = {
    character: {
      name: "",
      descriptor: "",
      type: "",
      focus1: "",
      focus2: "",
      tier: 1,
      xp: 0,
      effort: 1,
      cypherSlots: 0,
      stress: 0,
      superStress: 0,
      damage: "Hale",
      stats: { Might: 0, Speed: 0, Intellect: 0 },
      edge: { Might: 0, Speed: 0, Intellect: 0 },
      currentPools: { Might: 0, Speed: 0, Intellect: 0 },
      recovery: { rec1: false, rec2: false, rec3: false, rec4: false },
      background: "",
      connections: "",
      equipment: { basic: "", org: "", additional: "" },
    },
    characterConfirmed: false,
    statsConfirmed: false,
    statBonuses: { Might: 0, Speed: 0, Intellect: 0 },
    pointsToAllocate: 6,
    damageIndex: 0,
    skillsData: [],
    selectedAbilities: [],
  };

  // Initialize app
  function init() {
    initializeTabs();
    initializeAbilitiesAndSkills();
    attachEventListeners();
    updateUI();
  }

  function attachEventListeners() {
    // Character identity
    document
      .getElementById("charName")
      .addEventListener("input", updateCharacterStatement);
    document
      .getElementById("descriptor")
      .addEventListener("change", updateCharacterStatement);
    // ... etc
  }

  function updateUI() {
    updateCharacterStatement();
    updateDamageUI();
    updateAdvancementButtons();
  }

  // Export public API
  window.CharacterSheet = {
    init,
    state,
    // ... public methods
  };

  // Auto-initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// ==================== Tab Navigation ==================== //
function initializeTabs() {
  console.log("Initializing tab system...");

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  console.log(`Found ${tabButtons.length} tab buttons`);
  console.log(`Found ${tabContents.length} tab contents`);

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");
      console.log(`Switching to tab: ${targetTab}`);

      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.style.display = "none";
      });

      // Show target tab content
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
        targetContent.style.display = "block";
        console.log(`✓ Switched to ${targetTab} tab`);
      } else {
        console.error(`✗ Tab content not found: ${targetTab}`);
      }
    });
  });

  // Make sure first tab is active on load
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
    tabContents[0].style.display = "block";
    console.log("✓ Tab system initialized");
  }
}

function initializeTabSwitching() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", function () {
      const tabID = this.getAttribute("data-tab");

      // Hide all tab contents
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      // Remove active class from all buttons
      document.querySelectorAll(".tab-button").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Show selected tab
      const selectedTab = document.getElementById(tabID);
      if (selectedTab) {
        selectedTab.classList.add("active");
      }

      // Add active class to clicked button
      this.classList.add("active");

      // Tab-specific initialization
      if (tabID === "stats") {
        console.log("Switched to Stats tab - initializing displays");

        // Update cypher boosts display
        if (typeof updateCypherBoosts === "function") {
          try {
            updateCypherBoosts();
            console.log("✓ Cypher boosts updated");
          } catch (error) {
            console.error("Error updating cypher boosts:", error);
          }
        }

        // Update temporary stat boosts display
        if (typeof updateTemporaryStatBoosts === "function") {
          try {
            updateTemporaryStatBoosts();
            console.log("✓ Temporary stat boosts updated");
          } catch (error) {
            console.error("Error updating temporary stat boosts:", error);
          }
        }
      }

      // Avatar tab initialization
      if (tabID === "avatar") {
        if (typeof initializeAvatarTab === "function") {
          initializeAvatarTab();
        }
      }

      // Calculators tab initialization
      if (tabID === "calculators") {
        console.log(
          "Switched to Calculators tab - initializing all calculators"
        );

        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          // Initialize all calculators
          if (typeof initializeAllCalculators === "function") {
            try {
              initializeAllCalculators();
              console.log("✓ All calculators initialized");
            } catch (error) {
              console.error("Error initializing calculators:", error);
            }
          } else {
            // Fallback: Initialize each calculator individually
            console.log(
              "initializeAllCalculators not found, initializing individually..."
            );

            if (typeof initializeActionCalculator === "function") {
              try {
                initializeActionCalculator();
                console.log("✓ Action calculator initialized");
              } catch (error) {
                console.error("Error initializing action calculator:", error);
              }
            }

            if (typeof initializeAttackCalculator === "function") {
              try {
                initializeAttackCalculator();
                console.log("✓ Attack calculator initialized");
              } catch (error) {
                console.error("Error initializing attack calculator:", error);
              }
            }

            if (typeof initializeDefendCalculator === "function") {
              try {
                initializeDefendCalculator();
                console.log("✓ Defend calculator initialized");
              } catch (error) {
                console.error("Error initializing defend calculator:", error);
              }
            }

            if (typeof initializeAbilityCalculator === "function") {
              try {
                initializeAbilityCalculator();
                console.log("✓ Ability calculator initialized");
              } catch (error) {
                console.error("Error initializing ability calculator:", error);
              }
            } else {
              console.error(
                "✗ initializeAbilityCalculator function not found!"
              );
            }
          }
        }, 100); // Small delay to ensure DOM is ready
      }
    });
  });
}

// Make sure this is called when the page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("Initializing tab switching...");
  initializeTabSwitching();
});

// ==================== INITIALIZATION ==================== //

// ==================== CHARACTER DATA INITIALIZATION ==================== //

if (!character.advancementsPurchasedThisTier) {
  character.advancementsPurchasedThisTier = 0;
}

if (!character.usedRecoveryRolls) {
  character.usedRecoveryRolls = [];
}

if (!character.tier) {
  character.tier = 1;
}

if (!character.typeAbilities) {
  character.typeAbilities = [];
}

character.pendingPoolPoints = 0;
character.pendingSkillTraining = false;
character.pendingEdgeIncrease = false;
character.recoveryBonus = character.recoveryBonus || 0;

// Track which advancements have been purchased this tier
character.currentTierAdvancements = character.currentTierAdvancements || {
  increasePools: false,
  increaseEdge: false,
  increaseEffort: false,
  trainSkill: false,
  // Optional advancements
  increaseRecovery: false,
  extraFocusAbility: false,
  extraTypeAbility: false,
};

function initializeAbilitiesAndSkills() {
  renderSkillsTable();
  renderTypeAbilitiesTable();
  renderFocusAbilitiesTable();
  initializeCypherTable();
}

// ==================== SINGLE DOM CONTENT LOADED EVENT ==================== //
document.addEventListener("DOMContentLoaded", () => {
  // Initialize basic functions
  if (typeof updateAdvancementButtons === "function") {
    updateAdvancementButtons();
  }

  if (typeof initializeTabs === "function") {
    initializeTabs();
  }

  if (typeof initializeAbilitiesAndSkills === "function") {
    initializeAbilitiesAndSkills();
  }

  if (typeof initializeConnectionsTable === "function") {
    initializeConnectionsTable();
  }

  if (typeof initializeEquipmentTables === "function") {
    initializeEquipmentTables();
  }

  if (typeof updateAvatarTabVisibility === "function") {
    updateAvatarTabVisibility();
  }

  // Only update summary if both the function and elements exist
  if (
    typeof updateSummary === "function" &&
    document.getElementById("abilitiesCount")
  ) {
    try {
      updateSummary();
    } catch (error) {
      console.warn("Could not update summary:", error);
    }
  }

  // Initialize advancement display after a short delay to ensure DOM is ready
  setTimeout(() => {
    if (typeof updateAdvancementDisplay === "function") {
      try {
        updateAdvancementDisplay();
      } catch (error) {
        console.warn("Could not update advancement display:", error);
      }
    }
  }, 500);
});

function updateEquipment(type, value) {
  character.equipment = character.equipment || {};
  character.equipment[type] = value;
}

// Initialization code to run when the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeCharacterArcs();
  updateCharacterStatement();
  validateCharacterOptions();
  // Update character statement if identity is confirmed
  if (character.identityConfirmed) {
    updateCharacterStatement();
    applyTypeDefaults();
  }

  // Ensure XP is initialized as a number
  if (
    character.xp === undefined ||
    character.xp === null ||
    isNaN(character.xp)
  ) {
    character.xp = 0;
  }
  // Initialize the XP display
  updateXPDisplay();

  // Initialize temporary stat boosts display
  if (typeof updateTemporaryStatBoosts === "function") {
    updateTemporaryStatBoosts();
  }

  // Initialize cypher boosts display
  console.log("Initializing cypher boosts on page load...");
  if (typeof updateCypherBoosts === "function") {
    try {
      // Check if there are any cyphers with Edge bonuses
      if (
        typeof assignedCyphers !== "undefined" &&
        assignedCyphers.length > 0
      ) {
        const cyphersWithBoosts = assignedCyphers.filter(
          (c, i) =>
            c &&
            i < character.cypherSlots &&
            c.EdgeBonusStat &&
            c.calculatedEdgeBonus
        );

        console.log(
          `Found ${cyphersWithBoosts.length} cyphers with Edge bonuses`
        );

        if (cyphersWithBoosts.length > 0) {
          // Wait a bit for the Stats tab to be ready
          setTimeout(() => {
            updateCypherBoosts();
            console.log("✓ Cypher boosts initialized on page load");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error initializing cypher boosts:", error);
    }
  }

  // Initialize cypher pool gains display
  console.log("Initializing cypher pool gains on page load...");
  if (typeof updateCypherPoolGains === "function") {
    try {
      if (
        typeof assignedCyphers !== "undefined" &&
        assignedCyphers.length > 0
      ) {
        const cyphersWithPoolGain = assignedCyphers.filter(
          (c, i) => c && i < character.cypherSlots && c.PoolGain
        );

        console.log(
          `Found ${cyphersWithPoolGain.length} cyphers with pool restoration`
        );

        if (cyphersWithPoolGain.length > 0) {
          setTimeout(() => {
            updateCypherPoolGains();
            console.log("✓ Cypher pool gains initialized on page load");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error initializing cypher pool gains:", error);
    }
  }
});
