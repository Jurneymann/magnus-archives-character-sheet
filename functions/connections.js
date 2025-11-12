// ==================== CONNECTIONS TABLE MANAGEMENT ==================== //

let connectionsData = [];
let connectionIdCounter = 0;

// Filter state
const connectionsFilters = {
  searchName: "",
  searchAffiliation: "",
  sortBy: "name", // 'name', 'affiliation', or 'none'
};

function updateCharacterConnections(value) {
  character.connections = value;
}

function addConnectionRow() {
  const newConnection = {
    id: connectionIdCounter++,
    name: "",
    affiliation: "",
    information: "",
  };

  connectionsData.push(newConnection);
  renderConnectionsTable();
}

function removeConnectionRow(id) {
  const connection = connectionsData.find((c) => c.id === id);

  if (
    connection &&
    (connection.name || connection.affiliation || connection.information)
  ) {
    const confirmation = confirm(
      "Are you sure you want to remove this connection?"
    );
    if (!confirmation) return;
  }

  connectionsData = connectionsData.filter((c) => c.id !== id);
  renderConnectionsTable();
}

function updateConnectionRow(id, field, value) {
  const connection = connectionsData.find((c) => c.id === id);
  if (connection) {
    connection[field] = value;
  }
}

function updateConnectionsFilters() {
  const searchName = document.getElementById("connectionsFilterName");
  const searchAffiliation = document.getElementById(
    "connectionsFilterAffiliation"
  );
  const sortBy = document.getElementById("connectionsSortBy");

  if (searchName)
    connectionsFilters.searchName = searchName.value.toLowerCase();
  if (searchAffiliation)
    connectionsFilters.searchAffiliation =
      searchAffiliation.value.toLowerCase();
  if (sortBy) connectionsFilters.sortBy = sortBy.value;

  renderConnectionsTable();
}

function clearConnectionsFilters() {
  connectionsFilters.searchName = "";
  connectionsFilters.searchAffiliation = "";
  connectionsFilters.sortBy = "name";

  const searchName = document.getElementById("connectionsFilterName");
  const searchAffiliation = document.getElementById(
    "connectionsFilterAffiliation"
  );
  const sortBy = document.getElementById("connectionsSortBy");

  if (searchName) searchName.value = "";
  if (searchAffiliation) searchAffiliation.value = "";
  if (sortBy) sortBy.value = "name";

  renderConnectionsTable();
}

function applyConnectionsFilters(connections) {
  let filtered = [...connections];

  // Apply name search filter
  if (connectionsFilters.searchName) {
    filtered = filtered.filter((conn) =>
      conn.name.toLowerCase().includes(connectionsFilters.searchName)
    );
  }

  // Apply affiliation search filter
  if (connectionsFilters.searchAffiliation) {
    filtered = filtered.filter((conn) =>
      conn.affiliation
        .toLowerCase()
        .includes(connectionsFilters.searchAffiliation)
    );
  }

  // Apply sorting
  if (connectionsFilters.sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (connectionsFilters.sortBy === "affiliation") {
    filtered.sort((a, b) => a.affiliation.localeCompare(b.affiliation));
  }

  return filtered;
}

function renderConnectionsTable() {
  const container = document.querySelector(".connections-list");
  if (!container) {
    console.error("Connections list container not found");
    return;
  }

  // Apply filters
  let connections = applyConnectionsFilters(connectionsData);

  // Build HTML
  let html = "";

  if (connections.length === 0) {
    if (connectionsData.length === 0) {
      // No connections at all
      html = `
        <div class="connections-empty">
          <p>No connections added yet.</p>
          <p>Click "Add Connection" below to start building your network.</p>
        </div>
      `;
    } else {
      // No connections match filters
      html = `
        <div class="connections-empty">
          <p>No connections match your current filters.</p>
        </div>
      `;
    }
  } else {
    connections.forEach((connection) => {
      const escapedId = connection.id;

      html += `
        <div class="connection-card">
          <div class="connection-card-header">
            <div class="connection-name-field">
              <label class="connection-field-label">Name</label>
              <input 
                type="text" 
                class="connection-name-input"
                value="${connection.name}" 
                placeholder="Enter name..."
                onchange="updateConnectionRow(${escapedId}, 'name', this.value)"
              />
            </div>

            <div class="connection-affiliation-field">
              <label class="connection-field-label">Affiliation</label>
              <input 
                type="text" 
                class="connection-affiliation-input"
                value="${connection.affiliation}" 
                placeholder="Enter affiliation..."
                onchange="updateConnectionRow(${escapedId}, 'affiliation', this.value)"
              />
            </div>

            <button 
              class="remove-connection-btn" 
              onclick="removeConnectionRow(${escapedId})"
              title="Remove connection"
            >
              Remove
            </button>
          </div>

          <div class="connection-card-body">
            <div class="connection-info-field">
              <label class="connection-field-label">Information</label>
              <textarea 
                class="connection-info-textarea"
                placeholder="Enter information about this connection..."
                onchange="updateConnectionRow(${escapedId}, 'information', this.value)"
              >${connection.information}</textarea>
            </div>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
}

// Initialize connections table on page load
function initializeConnectionsTable() {
  renderConnectionsTable();
}

console.log("✓ Connections system initialized");
