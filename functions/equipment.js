// ==================== EQUIPMENT TABLE MANAGEMENT ==================== //

let weaponsViewMode = "all";
let itemsViewMode = "all";
let weaponsViewManuallySet = false;
let itemsViewManuallySet = false;
let weaponsData = [];
let itemsData = [];
let weaponIdCounter = 0;
let itemIdCounter = 0;

if (!character.weapons) {
  character.weapons = [];
}

if (!character.items) {
  character.items = [];
}

function toggleEquipmentInfo() {
  const infoContent = document.getElementById("equipmentInfoContent");
  const toggleBtn = document.getElementById("equipmentInfoToggle");

  if (!infoContent || !toggleBtn) return;

  const isHidden = infoContent.style.display === "none";

  if (isHidden) {
    infoContent.style.display = "block";
    toggleBtn.textContent = "Hide Equipment Information";
  } else {
    infoContent.style.display = "none";
    toggleBtn.textContent = "Show Equipment Information";
  }
}

function initializeEquipmentTables() {
  renderWeaponsTable();
  renderItemsTable();
}

function getValueColor(value) {
  const colorMap = {
    Inexpensive: "#ffffff",
    "Moderately Priced": "#4CAF50",
    Expensive: "#2196F3",
    "Very Expensive": "#9c27b0",
    Priceless: "#f44336",
    Exorbitant: "#ff9800",
  };
  return colorMap[value] || "#ffffff";
}

// ========== WEAPONS ========== //

function addWeaponRow() {
  const tbody = document.getElementById("weaponsTableBody");
  if (!tbody) return;

  // Check if there's already an add row
  if (document.getElementById("addWeaponRow")) {
    alert("Please complete or cancel the current weapon entry first.");
    return;
  }

  // Ensure "show all" while the add row is open (don't touch manuallySet — preserve player's explicit choice)
  weaponsViewMode = "all";
  updateWeaponsButtonStyles();

  // Create new row with input fields
  const row = document.createElement("tr");
  row.id = "addWeaponRow";
  row.style.backgroundColor = "#2a2a2a";

  row.innerHTML = `
    <td style="text-align: center;">
      <button class="button primary-button" onclick="saveNewWeapon()" style="padding: 5px 10px; font-size: 0.9em;">Save</button>
    </td>
    <td>
      <input 
        type="text" 
        id="newWeaponName" 
        placeholder="Weapon name..."
        style="width: 100%; padding: 5px; background: #1a1a1a; border: 1px solid #317e30; color: #fff; border-radius: 4px;"
      />
    </td>
    <td>
      <select 
        id="newWeaponValue"
        style="width: 100%; padding: 5px; background: #1a1a1a; border: 1px solid #317e30; color: #fff; border-radius: 4px;"
      >
        <option value="">-- Select Value --</option>
        <option value="Inexpensive">Inexpensive</option>
        <option value="Moderately Priced">Moderately Priced</option>
        <option value="Expensive">Expensive</option>
        <option value="Very Expensive">Very Expensive</option>
        <option value="Exorbitant">Exorbitant</option>
        <option value="Priceless">Priceless</option>
      </select>
    </td>
    <td>
      <select 
        id="newWeaponDamage"
        style="width: 100%; padding: 5px; background: #1a1a1a; border: 1px solid #317e30; color: #fff; border-radius: 4px;"
      >
        <option value="">-- Select Damage --</option>
        <option value="Light - 2">Light (2 damage)</option>
        <option value="Medium - 4">Medium (4 damage)</option>
        <option value="Heavy - 6">Heavy (6 damage)</option>
      </select>
    </td>
    <td>
      <input 
        type="text" 
        id="newWeaponNotes" 
        placeholder="Notes (range, properties)..."
        style="width: 100%; padding: 5px; background: #1a1a1a; border: 1px solid #317e30; color: #fff; border-radius: 4px;"
      />
    </td>
    <td style="text-align: center;">
      <button class="remove-skill-btn" onclick="cancelNewWeapon()">Cancel</button>
    </td>
  `;

  // Insert at top of table
  tbody.insertBefore(row, tbody.firstChild);

  // Focus on name input
  setTimeout(() => {
    const nameInput = document.getElementById("newWeaponName");
    if (nameInput) nameInput.focus();
  }, 100);
}

function saveNewWeapon() {
  const nameInput = document.getElementById("newWeaponName");
  const valueSelect = document.getElementById("newWeaponValue");
  const damageSelect = document.getElementById("newWeaponDamage");
  const notesInput = document.getElementById("newWeaponNotes");

  const name = nameInput?.value.trim() || "";
  const value = valueSelect?.value || "";
  const damage = damageSelect?.value || "";
  const notes = notesInput?.value.trim() || "";

  if (!name) {
    alert("Please enter a weapon name.");
    nameInput?.focus();
    return;
  }

  if (!value) {
    alert("Please select a value.");
    valueSelect?.focus();
    return;
  }

  if (!damage) {
    alert("Please select damage type.");
    damageSelect?.focus();
    return;
  }

  // Create weapon object
  const newWeapon = {
    Item: name,
    Value: value,
    Damage: damage,
    Notes: notes,
  };

  // Add to character's weapons
  if (!character.weapons) {
    character.weapons = [];
  }
  character.weapons.push(newWeapon);

  console.log("Weapon added:", newWeapon);
  console.log("Total weapons:", character.weapons.length);

  // Remove the add row
  const addRow = document.getElementById("addWeaponRow");
  if (addRow) addRow.remove();

  // Re-render table
  renderWeaponsTable();

  // Update attack calculator dropdown
  initializeAttackCalculator();

  alert(`"${name}" added to your weapons!`);
}

function cancelNewWeapon() {
  const addRow = document.getElementById("addWeaponRow");
  if (addRow) addRow.remove();
  renderWeaponsTable();
}

function removeWeapon(weaponName) {
  const confirmation = confirm(`Remove "${weaponName}" from your weapons?`);

  if (!confirmation) return;

  // Remove from character weapons
  character.weapons = character.weapons.filter((w) => w.Item !== weaponName);

  console.log("Weapon removed:", weaponName);
  console.log("Remaining weapons:", character.weapons.length);

  // Keep showing all while player is actively modifying inventory
  weaponsViewMode = "all";
  weaponsViewManuallySet = true;

  // Re-render
  renderWeaponsTable();

  // Update attack calculator dropdown
  initializeAttackCalculator();

  alert(`"${weaponName}" removed.`);
}

function addWeaponFromList(weaponName) {
  const weapon = WEAPONS_DATA.find((w) => w.Item === weaponName);

  if (!weapon) {
    alert("Weapon not found!");
    return;
  }

  // Initialize weapons array if needed
  if (!character.weapons) {
    character.weapons = [];
  }

  // Add to character's weapons
  character.weapons.push({ ...weapon });

  console.log("Weapon added from list:", weapon.Item);
  console.log("Total weapons:", character.weapons.length);

  // Keep showing all while player is actively adding items
  weaponsViewMode = "all";
  weaponsViewManuallySet = true;

  // Re-render
  renderWeaponsTable();

  // Update attack calculator dropdown
  initializeAttackCalculator();

  alert(`Added "${weapon.Item}" to your weapons!`);
}

function updateWeaponsButtonStyles() {
  const allBtn = document.getElementById("weaponsShowAll");
  const selectedBtn = document.getElementById("weaponsShowSelected");
  if (allBtn && selectedBtn) {
    allBtn.style.background = weaponsViewMode === "all" ? "#317e30" : "#555";
    selectedBtn.style.background =
      weaponsViewMode === "selected" ? "#317e30" : "#555";
    allBtn.classList.toggle("active", weaponsViewMode === "all");
    selectedBtn.classList.toggle("active", weaponsViewMode === "selected");
  }
}

function renderWeaponsTable() {
  const tbody = document.getElementById("weaponsTableBody");
  if (!tbody) return;

  // Auto-determine view mode unless manually overridden or add row is open
  const addRowOpen = !!document.getElementById("addWeaponRow");
  if (!weaponsViewManuallySet && !addRowOpen) {
    weaponsViewMode =
      character.weapons && character.weapons.length > 0 ? "selected" : "all";
  }
  updateWeaponsButtonStyles();

  tbody.innerHTML = "";

  // Filter based on view mode
  let weaponsToShow = character.weapons || [];

  if (weaponsViewMode === "selected" && weaponsToShow.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #888;">No weapons in inventory. Switch to "Show All" to add weapons from the list.</td></tr>';
    return;
  }

  // Show character's weapons first
  if (character.weapons && character.weapons.length > 0) {
    character.weapons.forEach((weapon) => {
      const row = document.createElement("tr");
      const valueColor = getValueColor(weapon.Value);

      row.innerHTML = `
        <td style="text-align: center; color: #4CAF50; font-size: 1.2em;">✓</td>
        <td>${weapon.Item}</td>
        <td style="color: ${valueColor}; font-weight: bold; text-align: center;">${weapon.Value}</td>
        <td style="text-align: center;">${weapon.Damage}</td>
        <td style="font-size: 0.9em;">${weapon.Notes}</td>
        <td style="text-align: center;">
          <button class="remove-skill-btn" onclick="removeWeapon('${weapon.Item}')">Remove</button>
        </td>
      `;

      row.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
      tbody.appendChild(row);
    });
  }

  // If "Show All" mode, also show available weapons from WEAPONS_DATA
  if (weaponsViewMode === "all") {
    WEAPONS_DATA.forEach((weapon) => {
      // Skip if already in character's weapons
      const alreadyHas = character.weapons?.some((w) => w.Item === weapon.Item);
      if (alreadyHas) return;

      const row = document.createElement("tr");
      const valueColor = getValueColor(weapon.Value);

      row.innerHTML = `
        <td style="text-align: center;">
          <button class="button primary-button" onclick="addWeaponFromList('${weapon.Item}')" style="padding: 5px 10px; font-size: 0.9em;">Add</button>
        </td>
        <td>${weapon.Item}</td>
        <td style="color: ${valueColor}; font-weight: bold; text-align: center;">${weapon.Value}</td>
        <td style="text-align: center;">${weapon.Damage}</td>
        <td style="font-size: 0.9em;">${weapon.Notes}</td>
        <td></td>
      `;

      tbody.appendChild(row);
    });
  }

  if (tbody.children.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #888;">No weapons available. Click "+ Add Custom Weapon" to create a custom weapon.</td></tr>';
  }
}

function toggleWeaponsView(mode) {
  weaponsViewMode = mode;
  weaponsViewManuallySet = true;
  renderWeaponsTable();
}

// ========== ITEMS ========== //

function addItemRow() {
  const tbody = document.getElementById("itemsTableBody");
  if (!tbody) return;

  // Check if there's already an add row
  if (document.getElementById("addItemRow")) {
    alert("Please complete or cancel the current item entry first.");
    return;
  }

  // Ensure "show all" while the add row is open (don't touch manuallySet — preserve player's explicit choice)
  itemsViewMode = "all";
  updateItemsButtonStyles();

  // Create new row with input fields
  const row = document.createElement("tr");
  row.id = "addItemRow";
  row.style.backgroundColor = "#2a2a2a";

  row.innerHTML = `
    <td style="text-align: center;">
      <button class="button primary-button" onclick="saveNewItem()" style="padding: 5px 10px; font-size: 0.9em;">Save</button>
    </td>
    <td>
      <input 
        type="text" 
        id="newItemName" 
        placeholder="Item name..."
        style="width: 100%; padding: 5px; background: #1a1a1a; border: 1px solid #317e30; color: #fff; border-radius: 4px;"
      />
    </td>
    <td>
      <select 
        id="newItemValue"
        style="width: 100%; padding: 5px; background: #1a1a1a; border: 1px solid #317e30; color: #fff; border-radius: 4px;"
      >
        <option value="">-- Select Value --</option>
        <option value="Inexpensive">Inexpensive</option>
        <option value="Moderately Priced">Moderately Priced</option>
        <option value="Expensive">Expensive</option>
        <option value="Very Expensive">Very Expensive</option>
        <option value="Exorbitant">Exorbitant</option>
        <option value="Priceless">Priceless</option>
      </select>
    </td>
    <td>
      <input 
        type="text" 
        id="newItemNotes" 
        placeholder="Notes..."
        style="width: 100%; padding: 5px; background: #1a1a1a; border: 1px solid #317e30; color: #fff; border-radius: 4px;"
      />
    </td>
    <td style="text-align: center;">
      <button class="remove-skill-btn" onclick="cancelNewItem()">Cancel</button>
    </td>
  `;

  // Insert at top of table
  tbody.insertBefore(row, tbody.firstChild);

  // Focus on name input
  setTimeout(() => {
    const nameInput = document.getElementById("newItemName");
    if (nameInput) nameInput.focus();
  }, 100);
}

function saveNewItem() {
  const nameInput = document.getElementById("newItemName");
  const valueSelect = document.getElementById("newItemValue");
  const notesInput = document.getElementById("newItemNotes");

  const name = nameInput?.value.trim() || "";
  const value = valueSelect?.value || "";
  const notes = notesInput?.value.trim() || "";

  if (!name) {
    alert("Please enter an item name.");
    nameInput?.focus();
    return;
  }

  if (!value) {
    alert("Please select a value.");
    valueSelect?.focus();
    return;
  }

  // Create item object
  const newItem = {
    Item: name,
    Value: value,
    Notes: notes,
  };

  // Add to character's items
  character.items.push(newItem);

  // Remove the add row
  const addRow = document.getElementById("addItemRow");
  if (addRow) addRow.remove();

  // Re-render table
  renderItemsTable();

  alert(`"${name}" added to your items!`);
}

function cancelNewItem() {
  const addRow = document.getElementById("addItemRow");
  if (addRow) addRow.remove();
  renderItemsTable();
}

function removeItem(itemName) {
  const confirmation = confirm(`Remove "${itemName}" from your items?`);

  if (!confirmation) return;

  // Remove from character items
  character.items = character.items.filter((i) => i.Item !== itemName);

  // Keep showing all while player is actively modifying inventory
  itemsViewMode = "all";
  itemsViewManuallySet = true;

  // Re-render
  renderItemsTable();

  alert(`"${itemName}" removed.`);
}

function addItemFromList(itemName) {
  const item = ITEMS_DATA.find((i) => i.Item === itemName);

  if (!item) {
    alert("Item not found!");
    return;
  }

  // Add to character's items
  character.items.push({ ...item });

  // Keep showing all while player is actively adding items
  itemsViewMode = "all";
  itemsViewManuallySet = true;

  // Re-render
  renderItemsTable();

  alert(`Added "${item.Item}" to your items!`);
}

function updateItemsButtonStyles() {
  const allBtn = document.getElementById("itemsShowAll");
  const selectedBtn = document.getElementById("itemsShowSelected");
  if (allBtn && selectedBtn) {
    allBtn.style.background = itemsViewMode === "all" ? "#317e30" : "#555";
    selectedBtn.style.background =
      itemsViewMode === "selected" ? "#317e30" : "#555";
    allBtn.classList.toggle("active", itemsViewMode === "all");
    selectedBtn.classList.toggle("active", itemsViewMode === "selected");
  }
}

function renderItemsTable() {
  const tbody = document.getElementById("itemsTableBody");
  if (!tbody) return;

  // Auto-determine view mode unless manually overridden or add row is open
  const addRowOpen = !!document.getElementById("addItemRow");
  if (!itemsViewManuallySet && !addRowOpen) {
    itemsViewMode =
      character.items && character.items.length > 0 ? "selected" : "all";
  }
  updateItemsButtonStyles();

  tbody.innerHTML = "";

  // Filter based on view mode
  let itemsToShow = character.items || [];

  if (itemsViewMode === "selected" && itemsToShow.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #888;">No items in inventory. Switch to "Show All" to add items from the list.</td></tr>';
    return;
  }

  // Show character's items first
  if (character.items && character.items.length > 0) {
    character.items.forEach((item) => {
      const row = document.createElement("tr");
      const valueColor = getValueColor(item.Value);

      row.innerHTML = `
        <td style="text-align: center; color: #4CAF50; font-size: 1.2em;">✓</td>
        <td>${item.Item}</td>
        <td style="color: ${valueColor}; font-weight: bold; text-align: center;">${item.Value}</td>
        <td style="font-size: 0.9em;">${item.Notes}</td>
        <td style="text-align: center;">
          <button class="remove-skill-btn" onclick="removeItem('${item.Item}')">Remove</button>
        </td>
      `;

      row.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
      tbody.appendChild(row);
    });
  }

  // If "Show All" mode, also show available items from ITEMS_DATA
  if (itemsViewMode === "all") {
    ITEMS_DATA.forEach((item) => {
      // Skip if already in character's items
      const alreadyHas = character.items?.some((i) => i.Item === item.Item);
      if (alreadyHas) return;

      const row = document.createElement("tr");
      const valueColor = getValueColor(item.Value);

      row.innerHTML = `
        <td style="text-align: center;">
          <button class="button primary-button" onclick="addItemFromList('${item.Item}')" style="padding: 5px 10px; font-size: 0.9em;">Add</button>
        </td>
        <td>${item.Item}</td>
        <td style="color: ${valueColor}; font-weight: bold; text-align: center;">${item.Value}</td>
        <td style="font-size: 0.9em;">${item.Notes}</td>
        <td></td>
      `;

      tbody.appendChild(row);
    });
  }

  if (tbody.children.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #888;">No items available. Click "+ Add Custom Item" to create a custom item.</td></tr>';
  }
}

function toggleItemsView(mode) {
  itemsViewMode = mode;
  itemsViewManuallySet = true;
  renderItemsTable();
}
