# Contributing to The Magnus Archives Character Sheet

First off, thank you for considering contributing to this project!

This is a fan-made project for The Magnus Archives RPG community, and contributions from fellow fans and developers are always welcome.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

---

## Code of Conduct

### Our Pledge

This project is built for and by fans of The Magnus Archives. We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:

- Experience level
- Gender identity and expression
- Sexual orientation
- Disability
- Personal appearance
- Body size
- Race
- Ethnicity
- Age
- Religion
- Nationality

### Our Standards

**Positive behaviors include:**

- Being respectful and considerate
- Accepting constructive criticism gracefully
- Focusing on what's best for the community
- Showing empathy towards others
- Respecting spoiler warnings for The Magnus Archives

**Unacceptable behaviors include:**

- Harassment, trolling, or insulting comments
- Publishing others' private information
- Unsolicited spoilers for The Magnus Archives podcast
- Any conduct that would be inappropriate in a professional setting

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Found a bug? Help us squash it!

**Before submitting a bug report:**

1. Check the [Known Issues](CHANGELOG.md#known-issues) section
2. Search existing [GitHub Issues](https://github.com/Jurneymann/magnus-archives-character-sheet/issues)
3. Try to reproduce the bug in a clean browser session

**When submitting a bug report, include:**

- **Clear descriptive title**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Browser and version** (e.g., Chrome 120, Firefox 121)
- **Operating system** (Windows, Mac, Linux)
- **Console errors** (press F12 to open Developer Tools)
- **Character data** (if relevant and willing to share)

**Bug Report Template:**

```markdown
## Bug Description

A clear description of what the bug is.

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Environment

- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Character Sheet Version: [e.g., 1.0.0]

## Additional Context

Any other relevant information, screenshots, or console errors.
```

---

### 💡 Suggesting Features

Have an idea for a new feature? We'd love to hear it!

**Before submitting a feature request:**

1. Check the [Planned Features](CHANGELOG.md#planned-features) list
2. Search existing feature requests in Issues
3. Consider if it fits the scope of the project

**When suggesting a feature, include:**

- **Clear use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - What other approaches did you think about?
- **Screenshots/mockups** - Visual examples help!
- **Rulebook reference** - Does this relate to official game rules?

**Feature Request Template:**

```markdown
## Feature Description

A clear description of the feature you'd like to see.

## Use Case

Why would this feature be useful? What problem does it solve?

## Proposed Implementation

How do you envision this working?

## Alternatives

What alternative solutions have you considered?

## Additional Context

Screenshots, mockups, or rulebook references.
```

---

### 🔧 Contributing Code

Want to contribute code? Fantastic!

**Types of contributions we're looking for:**

- Bug fixes
- New features
- Performance improvements
- UI/UX enhancements
- Documentation updates
- Test coverage
- Accessibility improvements
- Mobile responsiveness fixes

---

## Getting Started

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- A code editor (VS Code recommended)
- Git installed on your system
- A GitHub account
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Setting Up Your Development Environment

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/magnus-archives-character-sheet.git
   cd magnus-archives-character-sheet
   ```

3. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

4. **Set up local development**

   - Open the project in your code editor
   - Use a local web server (see README.md for options)
   - Open `CharacterSheetHTML.html` in your browser

5. **Make your changes**

   - Write your code
   - Test thoroughly
   - Follow the style guidelines below

6. **Commit your changes**

   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

7. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Wait for review

---

## Development Guidelines

### Project Structure

```
Magnus Archives Character Sheet/
├── CharacterSheetHTML.html     # Main HTML file
├── styles.css                  # All styles
├── functions/
│   ├── main.js                # Character data & initialization
│   ├── tabs.js                # Tab navigation
│   ├── avatar.js              # Avatar powers
│   ├── calculators.js         # Action/Attack/Defense calculators
│   ├── dice-roller.js         # 3D dice system
│   ├── equipment.js           # Inventory management
│   ├── abilities.js           # Abilities & skills
│   ├── import-export.js       # Save/load functionality
│   └── global.js              # Global exports
├── dice-main/                 # Third-party dice roller
└── assets/                    # Images & resources
```

### Code Organization

- **Keep functions modular** - One function, one purpose
- **Use descriptive names** - `calculateTotalDamage()` not `calc()`
- **Comment complex logic** - Explain the "why", not just the "what"
- **Avoid global variables** - Use closures or module patterns
- **Handle errors gracefully** - Always check for null/undefined

### Testing Your Changes

**Before submitting a PR, test:**

1. **Core Functionality**

   - Create a new character from scratch
   - Modify existing stats
   - Use all calculators
   - Roll dice (both 3D and manual)
   - Import/export character data

2. **Avatar System**

   - Select different entities
   - Choose tethered powers
   - Use powers and verify resource deduction

3. **Cross-Browser Testing**

   - Test in Chrome
   - Test in Firefox
   - Test in Edge/Safari if possible

4. **Responsive Design**

   - Test on desktop (1920x1080)
   - Test on tablet (768x1024)
   - Test on mobile (375x667)

5. **Data Persistence**

   - Refresh the page - does data persist?
   - Export and import - does everything work?
   - Clear localStorage - does it handle empty state?

6. **Console Errors**
   - Open DevTools (F12)
   - Check for JavaScript errors
   - Verify no warnings in console

---

## Submitting Changes

### Pull Request Process

1. **Update documentation** if needed

   - Update README.md for new features
   - Add entry to CHANGELOG.md
   - Update inline code comments

2. **Ensure no breaking changes**

   - Existing characters should still load
   - All current features should work
   - Backwards compatibility is important

3. **Follow the PR template**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing

   How did you test these changes?

   ## Screenshots

   If applicable, add screenshots

   ## Checklist

   - [ ] Code follows style guidelines
   - [ ] Tested in multiple browsers
   - [ ] No console errors
   - [ ] Documentation updated
   - [ ] CHANGELOG.md updated
   ```

4. **Wait for review**

   - Maintainer will review your PR
   - May request changes
   - Be patient and responsive

5. **Address feedback**

   - Make requested changes
   - Push updates to your branch
   - PR will automatically update

6. **Merge!**
   - Once approved, your PR will be merged
   - Your contribution will be credited
   - Thank you! 🎉

---

## Style Guidelines

### JavaScript

**Follow these conventions:**

```javascript
// Use camelCase for variables and functions
let characterName = "Jonathan Sims";
function calculateEdgeCost(baseCost, edgeValue) {}

// Use PascalCase for classes (if any)
class CharacterSheet {}

// Use UPPER_SNAKE_CASE for constants
const MAX_STAT_POOL = 20;
const AVATAR_PASSWORD = "avatar";

// Use meaningful names
// Good:
function applyDamageToPool(damage, poolType) {}
// Bad:
function apply(d, p) {}

// Add comments for complex logic
// Calculate final cost after Edge reduction
const finalCost = Math.max(0, baseCost - edgeValue);

// Use strict equality
if (value === 10) {
} // Good
if (value == 10) {
} // Bad

// Handle null/undefined
if (element) {
  element.style.display = "none";
}

// Use template literals
console.log(`Character ${name} has ${xp} XP`);

// Consistent formatting
function doSomething() {
  if (condition) {
    // code
  } else {
    // code
  }
}
```

### CSS

**Follow these conventions:**

```css
/* Use kebab-case for class names */
.character-stat-pool {
}

/* Use meaningful class names */
/* Good: */
.avatar-power-card {
}
/* Bad: */
.apc {
}

/* Group related properties */
.button {
  /* Positioning */
  position: relative;
  display: flex;

  /* Box model */
  padding: 10px;
  margin: 5px;

  /* Visual */
  background: #333;
  border: 1px solid #666;

  /* Typography */
  font-size: 1em;
  color: white;

  /* Misc */
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Comment sections clearly */
/* ==================== DICE ROLLER STYLES ==================== */

/* Use consistent spacing */
.selector {
  property: value;
}

/* Mobile-first responsive design */
@media (max-width: 768px) {
  .element {
    /* Mobile styles */
  }
}
```

### HTML

**Follow these conventions:**

```html
<!-- Use semantic HTML -->
<section class="character-stats">
  <header>
    <h2>Statistics</h2>
  </header>
  <article>
    <!-- content -->
  </article>
</section>

<!-- Use meaningful IDs and classes -->
<div id="characterNameInput" class="form-input-field">
  <!-- Self-closing tags for void elements -->
  <input type="text" />
  <img src="image.png" alt="Description" />

  <!-- Proper indentation (2 spaces) -->
  <div>
    <p>Content</p>
  </div>

  <!-- Include accessibility attributes -->
  <button aria-label="Roll dice">Roll</button>
  <input type="number" aria-describedby="help-text" />
</div>
```

### Commit Messages

**Use clear, descriptive commit messages:**

```bash
# Format: Type: Brief description

# Types:
Add:    # New feature
Fix:    # Bug fix
Update: # Modify existing feature
Remove: # Delete feature/code
Docs:   # Documentation only
Style:  # Formatting, no code change
Refactor: # Code restructuring

# Examples:
git commit -m "Add: Avatar power selection system"
git commit -m "Fix: Dice roller manual input visibility issue"
git commit -m "Update: Improve mobile responsiveness for calculators"
git commit -m "Docs: Update README with new features"
```

---

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **Pull Requests**: Code contributions and discussions
- **Discussions**: General questions and community chat

### Getting Help

**Need help with your contribution?**

1. Check the [README.md](README.md) for project overview
2. Review existing code for examples
3. Search closed Issues and PRs for similar topics
4. Open a new Issue with the "question" label
5. Be patient - this is a volunteer project!

### Recognition

All contributors will be recognized in:

- GitHub contributors page
- Special mention in release notes
- Eternal gratitude from the community 👁️‍🗨️

---

## Legal

### Licensing

By contributing, you agree that your contributions will be licensed under the MIT License.

### Intellectual Property

Remember that this is a fan project:

- The Magnus Archives IP belongs to Rusty Quill
- Game mechanics belong to Monte Cook Games
- Contribute only original code or properly licensed code
- Do not include copyrighted game content without permission

### Attribution

- Credit third-party code/assets properly
- Maintain existing attribution comments
- Add your name to contributors list if desired

---

## Questions?

**Still have questions about contributing?**

- Open an Issue with the "question" label
- Check if your question is answered in the [README](README.md)
- Review past Issues and PRs for similar discussions

---

## Thank You! 🎉

Thank you for taking the time to contribute to this project. Every contribution, no matter how small, helps make this character sheet better for the entire Magnus Archives RPG community.

**Statement ends.** 👁️‍🗨️

_Ceaseless Watcher, turn your gaze upon these contributors._

---

**Project Maintainer:** [@Jurneymann](https://github.com/Jurneymann)

**Repository:** https://github.com/Jurneymann/magnus-archives-character-sheet
