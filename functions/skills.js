// ==================== SKILLS TABLE MANAGEMENT ==================== //

let skillsData = [];

function addSkillRow() {
  const newSkill = {
    id: Date.now(),
    skill: "",
    stat: "",
    ability: "",
  };
  skillsData.push(newSkill);
  renderSkillsTable();
}

function removeSkillRow(id) {
  skillsData = skillsData.filter((skill) => skill.id !== id);
  renderSkillsTable();
  updateSummary();
}

function updateSkillRow(id, field, value) {
  const skill = skillsData.find((s) => s.id === id);
  if (skill) {
    skill[field] = value;
    updateSummary();
  }
}

function renderSkillsTable() {
  const tbody = document.getElementById("skillsTableBody");
  tbody.innerHTML = "";

  if (skillsData.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align: center; color: #666; padding: 20px;">No skills added yet. Click "Add Skill" to begin.</td></tr>';
    return;
  }

  skillsData.forEach((skill) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <select onchange="updateSkillRow(${
          skill.id
        }, 'skill', this.value)" value="${skill.skill}">
          <option value="">-- Select Skill --</option>
          ${
            typeof SKILLS_DATA !== "undefined"
              ? SKILLS_DATA.map(
                  (s) =>
                    `<option value="${s}" ${
                      skill.skill === s ? "selected" : ""
                    }>${s}</option>`
                ).join("")
              : ""
          }
        </select>
      </td>
      <td>
        <select onchange="updateSkillRow(${
          skill.id
        }, 'stat', this.value)" value="${skill.stat}">
          <option value="">-- Select Stat --</option>
          <option value="Might" ${
            skill.stat === "Might" ? "selected" : ""
          }>Might</option>
          <option value="Speed" ${
            skill.stat === "Speed" ? "selected" : ""
          }>Speed</option>
          <option value="Intellect" ${
            skill.stat === "Intellect" ? "selected" : ""
          }>Intellect</option>
        </select>
      </td>
      <td>
        <select onchange="updateSkillRow(${
          skill.id
        }, 'ability', this.value)" value="${skill.ability}">
          <option value="">-- Select Ability --</option>
          <option value="Inability" ${
            skill.ability === "Inability" ? "selected" : ""
          }>Inability</option>
          <option value="Trained" ${
            skill.ability === "Trained" ? "selected" : ""
          }>Trained</option>
          <option value="Specialised" ${
            skill.ability === "Specialised" ? "selected" : ""
          }>Specialised</option>
        </select>
      </td>
      <td>
        <button class="remove-skill-btn" onclick="removeSkillRow(${
          skill.id
        })">Remove</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}
