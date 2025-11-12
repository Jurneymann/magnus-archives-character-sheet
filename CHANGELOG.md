# Changelog

All notable changes to The Magnus Archives Character Sheet project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-11

### Initial Release 🎉

The first public release of The Magnus Archives Character Sheet - a complete digital character management system for The Magnus Archives Roleplaying Game.

### Added

#### Core Character System

- Full character stat tracking (Might, Speed, Intellect)
- Stat pools with current/maximum values
- Edge system for all three stats
- Effort tracking and application
- Experience points (XP) tracking
- Character advancement system
- Tier progression
- Recovery roll tracking

#### Skills & Abilities

- Comprehensive skill list with training levels (Inability, Trained, Specialized)
- Ability cost tracking (Pool type and amount)
- Ability descriptions and notes

#### Equipment & Inventory

- Weapon management with damage tracking
- General equipment inventory
- Cyphers system

#### Background & Character Details

- Character name, descriptor, type, focus, and tier
- Background story section
- Arc tracking
- Death/injury notes

#### Stress System

- Visual stress tracker with 10 levels
- Color-coded stress indicators
- Automatic stress calculation in combat
- Stress consequences tracking
- Integration with Avatar powers

#### Calculators & Dice Rolling

**Action Calculator**

- d20 rolling for standard actions
- Difficulty level selection (0-10)
- Effort application with Edge calculation
- Automatic success/failure determination

**Attack Calculator**

- Multiple attack types for Might, Speed and Intellect
- Weapon damage tracking
- Critical hits on dice rolls
- Damage calculation with modifiers
- Effort and Edge integration

**Defense Calculator**

- Defense rolls against attacks
- Effort expenditure for defense
- Edge calculation for cost reduction

**3D Dice Roller**

- 3D animated physics-based dice
- Support for d6, d20
- Realistic dice rolling animations
- Sound effects for dice rolls
- Manual input option for physical dice
- Reroll functionality
- Accept/reject roll options

#### Avatar Powers System

- Password-protected tab for spoiler prevention
- 14 Fear entities to choose from
- Universal powers available to all Avatars
- Entity-specific powers
- Tethered power selection system
- Power cost tracking (Intellect pool deduction)
- Stress application when using powers
- Power descriptions and effects
- Visual power cards with badges

#### User Interface & Experience

- Tab-based navigation system
- Responsive design for desktop and mobile
- Clean, thematic Magnus Archives styling
- Collapsible sections for better organization
- Visual feedback for all interactions
- Hover effects and animations
- Print-friendly layout

#### Data Management

- Export character to JSON file
- Import character from file
- Data validation and error handling
- Backup and restore functionality

### Technical Features

- Pure vanilla JavaScript (no framework dependencies)
- Modular code structure with separate function files
- Efficient DOM manipulation
- Event delegation for better performance
- Comprehensive error handling and logging
- Console debugging tools
- Cross-browser compatibility

### Third-Party Integrations

- Three.js for 3D dice rendering
- Cannon.js for physics simulation
- Custom dice roller by Sarah Rosanna Busch
- Artwork by kruk-art

### Documentation

- Comprehensive README with installation instructions
- Avatar password configuration guide
- Feature overview and usage instructions
- Credits and licensing information
- Known issues and future plans

---

## [Unreleased]

### Planned Features

- [ ] Campaign notes section
- [ ] Relationship tracking system
- [ ] Session tracker
- [ ] PDF export functionality

### Known Issues

- 3D dice roller requires local web server for full functionality
- Browser localStorage size limitations
- Manual input section visibility quirks in some edge cases
- Some mobile browsers may have minor rendering differences

---

## Version History

### [1.0.0] - 2025-11-11

- Initial public release

---

## How to Update

1. Download the latest release from GitHub
2. **Backup your character data** using the Export function
3. Replace the old files with the new version
4. Import your character data using the Import function
5. Verify all data loaded correctly

## Reporting Issues

Found a bug or have a feature request? Please open an issue on the GitHub repository:
https://github.com/Jurneymann/magnus-archives-character-sheet

---

**The Archivist sees all changes.** 👁️‍🗨️

_Statement ends._
