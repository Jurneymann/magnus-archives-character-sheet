# The Magnus Archives Character Sheet

An interactive digital character sheet for **The Magnus Archives Roleplaying Game** by Monte Cook Games.

## ⚠️ Disclaimer

This is a fan-made project based on:

- **The Magnus Archives** podcast by [Rusty Quill](https://rustyquill.com)
- **The Magnus Archives Roleplaying Game** by [Monte Cook Games](https://www.montecookgames.com/store/product/the-magnus-archives-roleplaying-game/)

This project has **no official affiliation** with either Rusty Quill or Monte Cook Games.

**You will need the complete ruleset** from Monte Cook Games to play: https://www.montecookgames.com/store/product/the-magnus-archives-roleplaying-game/

## Features

### Core Character Management

- **Character Creation & Stats**: Full stat tracking (Might, Speed, Intellect) with Pools and Edge
- **Skills & Abilities**: Comprehensive skill system with training levels and ability management
- **Inventory System**: Items and weapons tracking
- **Experience & Advancement**: XP tracking and character progression
- **Stress System**: Integrated stress tracking with visual indicators

### Advanced Calculators

- **Action Calculator**: Roll d20 or d6 with automatic difficulty calculation, assets, effort, and edge application
- **Attack Calculator**: Combat rolls with damage calculation and multiple attack types
- **Defense Calculator**: Defensive rolls with stress calculation and armor effects
- **Integrated 3D Dice Roller**: 3D animated dice with physics (d6, d20)
- **Manual Input Option**: Enter physical dice rolls for hybrid gameplay

### Avatar Powers System (Password Protected)

- **Entity Selection**: Choose from 14 Fears
- **Power Management**: Universal and entity-specific powers with cost and stress tracking
- **Tethered Power**: Select one entity-specific power to use alongside universal abilities
- **Automatic Resource Tracking**: Intellect pool deduction and stress application when using powers

### User Interface

- **Tab-Based Navigation**: Organized sections for Character, Background, Abilities, Equipment, Calculators, and Avatar
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-Save**: Character data automatically saved to browser localStorage
- **Import/Export**: Save character files and share with others
- **Print-Friendly**: Clean print layout for physical reference

## How to Run

### Option 1: Simple File Opening

1. Download or clone this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)
3. Start creating your character!

### Option 2: Local Web Server (Recommended for full functionality)

1. Download or clone this repository
2. Use a local web server:
   - **VS Code**: Install "Live Server" extension and click "Go Live"
   - **Python**: Run `python -m http.server 5500` in the project directory
   - **Node.js**: Run `npx http-server -p 5500`
3. Open `http://localhost:5500/index.html` in your browser

> **Note**: The 3D dice roller works best with a local web server due to browser security restrictions.

## 🔑 Avatar Tab Access

The Avatar Powers tab is **password-protected** to prevent accidental spoilers for players who haven't reached the Avatar stage in their campaign.

### Accessing the Avatar Tab

1. Click on the "Avatar" tab
2. Enter the password when prompted
3. Default password: `avatar`

### Changing the Password

Game Masters can customize the password to control access:

1. Open `functions/avatar.js` in a text editor
2. Find line 5:
   ```javascript
   const AVATAR_PASSWORD = "avatar"; // <-- Change this to set your password
   ```
3. Change `"avatar"` to your desired password
4. Save the file

**Requirements for Avatar Tab:**

- Character must Tier 4 or higher
- Character must have accumulated 10 levels of Stress from Supernatural Sources
- Characters must have at least one Supernatural Ability
- Password must be entered correctly

## 📁 Project Structure

```
Magnus Archives Character Sheet/
├── index.html                       # Main character sheet
├── styles.css                       # All styling
├── functions/
│   ├── main.js                     # Core character data and initialization
│   ├── tabs.js                     # Tab navigation system
│   ├── avatar.js                   # Avatar powers system
│   ├── calculators.js              # Action, Attack, Defense calculators
│   ├── dice-roller.js              # 3D dice integration
│   ├── equipment.js                # Inventory management
│   ├── abilities.js                # Abilities and skills
│   ├── import-export.js            # Save/load functionality
│   └── global.js                   # Global function exports
├── dice-main/                       # 3D dice roller library
└── assets/                          # Images and resources
```

## 🎨 Credits & Assets

### Art & Design

- Entities tarot design elements by [kruk-art.tumblr.com](https://kruk-art.tumblr.com)

### 3D Dice Roller

- Dice roller system by [Sarah Rosanna Busch](https://sarahrosannabusch.ca/)
- Based on work by Anton Natarov
- Uses [three.js](https://github.com/mrdoob/three.js/) and [cannon.js](https://github.com/schteppe/cannon.js)
- Sound effects from [Nicovideo Commons](http://commons.nicovideo.jp/material/nc93322)

### Game System

- **The Magnus Archives** podcast by Rusty Quill
- **The Magnus Archives Roleplaying Game** by Monte Cook Games
- Cypher System mechanics by Monte Cook Games

## 📜 License

This project is **free to use** for personal, non-commercial purposes.

This is a fan project and is not endorsed by or affiliated with:

- Rusty Quill
- Monte Cook Games
- The Magnus Archives

All rights to The Magnus Archives IP belong to Rusty Quill.
All rights to the Cypher System and game mechanics belong to Monte Cook Games.

## 🐛 Known Issues & Future Plans

### Current Limitations

- Dice roller requires local web server for full functionality
- Browser localStorage has size limits (use export feature for backups)
- Some mobile browsers may have rendering quirks

### Planned Features

- [ ] Campaign notes section
- [ ] Bonuses from purchased Abilities appear in calculator

## 🤝 Contributing

This is a personal fan project, but suggestions and feedback are welcome! Feel free to:

- Open issues for bugs or feature requests
- Fork the project for your own modifications
- Share your customizations with the community

## 📧 Contact

For questions or feedback about this character sheet implementation, please open an issue on this repository.

For questions about **The Magnus Archives podcast**, visit [Rusty Quill](https://rustyquill.com).

For questions about **the roleplaying game rules**, visit [Monte Cook Games](https://www.montecookgames.com).

---

**Enjoy creating your character and investigating the horrors that lurk in the dark!** 👁️‍🗨️

_"The Archivist sees you."_
