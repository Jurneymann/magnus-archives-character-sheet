// ==================== GLOBAL SCOPE ASSIGNMENTS ==================== //

console.log("Loading global scope assignments...");

// Character Management
window.confirmIdentity = confirmIdentity;
window.updateCharacterStatement = updateCharacterStatement;
window.updateXP = updateXP;
window.updateXPDisplay = updateXPDisplay;
window.addXP = addXP;
window.addQuickXP = addQuickXP;

// Connections
window.addConnectionRow = addConnectionRow;
window.removeConnectionRow = removeConnectionRow;
window.updateConnectionRow = updateConnectionRow;

// Character Arcs
window.populateCharacterArcSelect = populateCharacterArcSelect;
window.updateArcDescription = updateArcDescription;
window.saveArcNotes = saveArcNotes;
window.selectCharacterArc = selectCharacterArc;
window.completeCharacterArc = completeCharacterArc;
window.updateCharacterArcDisplay = updateCharacterArcDisplay;
window.initializeCharacterArcs = initializeCharacterArcs;

// Stat Allocation
window.allocatePoint = allocatePoint;
window.confirmStatAllocation = confirmStatAllocation;
window.applyDescriptorBonuses = applyDescriptorBonuses;
window.allocateDescriptorPoint = allocateDescriptorPoint;
window.confirmDescriptorAllocation = confirmDescriptorAllocation;
window.checkAllFocusAbilitiesForPoolIncreases =
  checkAllFocusAbilitiesForPoolIncreases;

console.log("✓ Auto-check for Focus ability pool increases added");

console.log("✓ Descriptor bonus allocation functions added");

// Abilities
window.confirmTypeAbilities = confirmTypeAbilities;
window.chooseFocusTierAbility = chooseFocusTierAbility;
window.selectExtraFocusAbility = selectExtraFocusAbility;
window.grantExtraFocusAbility = grantExtraFocusAbility;
window.toggleTypeAbility = toggleTypeAbility;
window.toggleTemporaryBoost = toggleTemporaryBoost;
window.updateTemporaryStatBoosts = updateTemporaryStatBoosts;
window.diagnoseTypeAbilities = diagnoseTypeAbilities;
window.diagnoseExtraFocusAbilities = diagnoseExtraFocusAbilities;

// Recovery System
window.adjustRecoveryBonus = adjustRecoveryBonus;
window.updateRecoveryFormulas = updateRecoveryFormulas;
window.initializeRecoverySection = initializeRecoverySection;
window.updateRecoveryDisplay = updateRecoveryDisplay;
window.performRecovery = performRecovery;
window.processRecoveryRoll = processRecoveryRoll;
window.showRecoveryDistributionDialog = showRecoveryDistributionDialog;
window.adjustRecoveryDistribution = adjustRecoveryDistribution;
window.confirmRecoveryDistribution = confirmRecoveryDistribution;
window.updatePoolDisplayDirect = updatePoolDisplayDirect;
window.resetRecovery = resetRecovery;
window.updateStatDisplay = updateStatDisplay;

// Dice Roller
window.initializeDiceBox = initializeDiceBox;
window.showDiceRoller = showDiceRoller;
window.rollDice = rollDice;
window.rerollDice = rerollDice;
window.acceptDiceRoll = acceptDiceRoll;
window.closeDiceRoller = closeDiceRoller;
window.testDiceRoller = testDiceRoller;

// Quick Dice Rolls
window.quickRollD6 = quickRollD6;
window.quickRollD20 = quickRollD20;

// Manual dice roll functions
window.submitManualD6 = submitManualD6;
window.submitManualD20 = submitManualD20;
window.submitManualRoll = submitManualRoll;

// Avatar System
window.unlockAvatarTab = unlockAvatarTab;
window.populateEntitySelect = populateEntitySelect;
window.updateEntityDescription = updateEntityDescription;
window.confirmEntityChoice = confirmEntityChoice;
window.updateAvatarPostCommitmentDisplay = updateAvatarPostCommitmentDisplay;
window.selectTetheredPower = selectTetheredPower;
window.changeTetheredPower = changeTetheredPower;
window.checkAvatarRequirements = checkAvatarRequirements;
window.updateAvatarTabVisibility = updateAvatarTabVisibility;
window.initializeAvatarTab = initializeAvatarTab;
window.closeAvatarPasswordOverlay = closeAvatarPasswordOverlay;
window.useAvatarPower = useAvatarPower;

// Action Calculator
window.initializeActionCalculator = initializeActionCalculator;
window.updateActionCalculator = updateActionCalculator;

window.calculateActionResult = calculateActionResult;
window.calculateStatPoolCost = calculateStatPoolCost;
window.calculateStatPoolCostWithValue = calculateStatPoolCostWithValue;
window.confirmAction = confirmAction;
window.clearActionCalculator = clearActionCalculator;

// Attack Calculator
window.initializeAttackCalculator = initializeAttackCalculator;
window.updateAttackCalculator = updateAttackCalculator;

window.calculateAttackHit = calculateAttackHit;
window.calculateAttackDamage = calculateAttackDamage;
window.updateDamageBonusDisplay = updateDamageBonusDisplay;
window.comparePvPRolls = comparePvPRolls;
window.confirmAttack = confirmAttack;
window.clearAttackCalculator = clearAttackCalculator;
window.getHeavyWeaponHindrance = getHeavyWeaponHindrance;

// Defend Calculator
window.initializeDefendCalculator = initializeDefendCalculator;
window.updateDefendCalculator = updateDefendCalculator;

window.calculateDefendHit = calculateDefendHit;
window.updateDefendStressDisplay = updateDefendStressDisplay;
window.calculateDefendResult = calculateDefendResult;
window.comparePvPDefendRolls = comparePvPDefendRolls;
window.confirmDefend = confirmDefend;
window.clearDefendCalculator = clearDefendCalculator;

// Ability Calculator
window.initializeAbilityCalculator = initializeAbilityCalculator;
window.updateAbilityCalculator = updateAbilityCalculator;
window.confirmAbilityUsage = confirmAbilityUsage;
window.clearAbilityCalculator = clearAbilityCalculator;
window.onAbilityStatChange = onAbilityStatChange;

console.log("✓ Ability Usage Calculator functions added");

// Equipment Management
window.toggleEquipmentInfo = toggleEquipmentInfo;
window.addWeaponRow = addWeaponRow;
window.addItemRow = addItemRow;
window.toggleWeaponsView = toggleWeaponsView;
window.toggleItemsView = toggleItemsView;
window.addWeaponFromList = addWeaponFromList;
window.addItemFromList = addItemFromList;
window.removeWeapon = removeWeapon;
window.removeItem = removeItem;
window.saveNewWeapon = saveNewWeapon;
window.cancelNewWeapon = cancelNewWeapon;
window.saveNewItem = saveNewItem;
window.cancelNewItem = cancelNewItem;

// Cypher Management
window.drawCypher = drawCypher;
window.removeCypher = removeCypher;
window.showCypherRollEffectTable = showCypherRollEffectTable;
window.hideCypherRollEffectTable = hideCypherRollEffectTable;
window.rollCypherEffect = rollCypherEffect;
window.updateCypherBoosts = updateCypherBoosts;
window.calculateCypherEdgeBonus = calculateCypherEdgeBonus;
window.toggleCypherBoost = toggleCypherBoost;
window.deactivateCypherBoost = deactivateCypherBoost;
window.updateEdgeDisplay = updateEdgeDisplay;

// Advancements
window.purchaseIncreasePools = purchaseIncreasePools;
window.purchaseIncreaseEdge = purchaseIncreaseEdge;
window.purchaseIncreaseEffort = purchaseIncreaseEffort;
window.purchaseTrainSkill = purchaseTrainSkill;
window.purchaseIncreaseRecovery = purchaseIncreaseRecovery;
window.purchaseExtraFocusAbility = purchaseExtraFocusAbility;
window.purchaseExtraTypeAbility = purchaseExtraTypeAbility;
window.allocateTempPoint = allocateTempPoint;
window.confirmPoolAllocation = confirmPoolAllocation;
window.cancelPoolAllocation = cancelPoolAllocation;
window.confirmEdgeIncrease = confirmEdgeIncrease;
window.cancelEdgeSelection = cancelEdgeSelection;

// Skills Management
window.addSkillRow = addSkillRow;
window.removeSkillRow = removeSkillRow;
window.updateSkillRow = updateSkillRow;
window.toggleTypeAbilitiesView = toggleTypeAbilitiesView;
window.applyDescriptorTrainedSkill = applyDescriptorTrainedSkill;
window.showDescriptorSkillChoice = showDescriptorSkillChoice;
window.confirmDescriptorSkillChoice = confirmDescriptorSkillChoice;
window.addDescriptorSkillToTable = addDescriptorSkillToTable;
window.showDescriptorSuggestions = showDescriptorSuggestions;
window.dismissDescriptorSuggestions = dismissDescriptorSuggestions;
window.autoHideDescriptorSuggestions = autoHideDescriptorSuggestions;
window.updateSkillSelectionCount = updateSkillSelectionCount;
window.addDescriptorCharacteristic = addDescriptorCharacteristic;
window.removeDescriptorCharacteristic = removeDescriptorCharacteristic;
window.checkAllFocusAbilitiesForPoolIncreases =
  checkAllFocusAbilitiesForPoolIncreases;

console.log(
  "✓ Updated descriptor system with multiple skills and characteristics"
);

console.log("✓ Descriptor trained skill functions added");

// Save/Load
window.buildCharacterData = buildCharacterData;
window.loadCharacterFromData = loadCharacterFromData;
window.saveCharacter = saveCharacter;
window.loadCharacter = loadCharacter;
window.saveToJSON = saveCharacter; // Alias for backwards compatibility
window.loadFromJSON = loadCharacter; // Alias for backwards compatibility
window.loadFromLocalStorage = loadFromLocalStorage;
window.resetCharacter = resetCharacter;
window.exportToText = exportToText;
window.autoSave = autoSave;
window.testAutoSave = testAutoSave;
window.showAutoSaveNotification = showAutoSaveNotification;
window.monitorLocalStorage = monitorLocalStorage;

// Damage & Stress
window.setDamageState = setDamageState;
window.changeDamageState = changeDamageState;
window.updateDamageDisplay = updateDamageDisplay;
window.adjustStress = adjustStress;
window.resetStress = resetStress;
window.addSuperStress = addSuperStress;
window.updateStressDisplay = updateStressDisplay;

// Character Options
window.validateCharacterOptions = validateCharacterOptions;
window.updateCharacterBackground = updateCharacterBackground;
window.updateCharacterConnections = updateCharacterConnections;

console.log("✓ All functions assigned to global window scope");
console.log("✓ Dice roll modal functions added to global scope");
console.log("✓ saveCharacter function defined and assigned to window");
console.log("✓ Calculator confirm functions updated and assigned to window");
