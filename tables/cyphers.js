const CYPHERS_DATA = [
  {
    name: "Another twist",
    action: "Instant",
    level: "1d6",
    effect:
      "Important problems require elevated focus. One die roll of your choosing gets rerolled.",
  },
  {
    name: "Big picture",
    action: "One Action",
    level: "1d6 + 2",
    effect:
      "Everything seems more vivid. For one hour per cypher level, you know when any movement occurs within short range and when large creatures or objects move within long range. You also know the number and size of the creatures or objects in motion.",
  },
  {
    name: "Binary",
    action: "Instant",
    level: "1d6 + 2",
    effect:
      "You correctly guess the PIN code allowing access to a phone, door lock, debit card, and so on, or you guess the alphanumeric passcode for a laptop, website, or similar situation, as long as the level of the object or program is equal to or less than this cypher’s level.",
  },
  {
    name: "Body builder",
    action: "One Action",
    level: "1d6 + 2",
    effect:
      "Drawing on your inner reserves, you add 1 to your Might Edge for one hour (or 2 if the cypher is level 5 or higher).",
    EdgeBonusStat: "Might",
    EdgeBonus: "if (cypherLevel >= 5) 2 else 1",
  },
  {
    name: "Breathing room",
    action: "Instant",
    level: "1d6 + 1",
    effect:
      "As part of a physical action on your part (an attack, an 'accidental' bump, a startling shout, pushing by on the way to somewhere else, etc), you force an NPC within range whose level is lower than this cypher's level to drop whatever they are holding.",
  },
  {
    name: "Burning desire",
    action: "Instant",
    level: "1d6",
    effect:
      "This particular predicament allows you to use 1 level of Stress as an asset on your action without incurring a GM intrusion, as normally happens.",
  },
  {
    name: "Cheating death",
    action: "Instant",
    level: "10",
    effect:
      "The circumstances were horrific but not fatal. If you reach the last step on the damage track, you go into a near-death coma for a week rather than dying. You have a serious scar even after you recover.",
  },
  {
    name: "Curiosity",
    action: "One Action",
    level: "1d6 + 2",
    effect:
      "You reflect on excellence, adding 1 to your Intellect Edge for one hour (or 2 if this cypher’s level is 5 or higher).",
    EdgeBonusStat: "Intellect",
    EdgeBonus: "if (cypherLevel >= 5) 2 else 1",
  },
  {
    name: "Dance through the maze",
    action: "One Action",
    level: "1d6",
    effect:
      "If you can imagine it, you can become it. All your tasks involving manual dexterity—such as pickpocketing, lockpicking, juggling, operating on a patient, defusing a bomb, and so on—are eased by one step for one hour, or two steps if this cypher's level is 5 or higher.",
  },
  {
    name: "Deathly silent and still",
    action: "Instant",
    level: "1d6",
    effect:
      "You hide so well (assuming there is some way to conceal yourself) that absolutely no one is aware of you for one round.",
  },
  {
    name: "Desperate effort",
    action: "Instant",
    level: "1d6",
    effect:
      "You're in the flow, gaining one free level of Effort to one task without spending points from a Pool. The level of Effort provided by this cypher does not count toward the maximum amount of Effort you can normally apply to one task.",
  },
  {
    name: "Eye contact",
    action: "Instant",
    level: "1d6 + 4",
    effect:
      "You convey simple information to a known ally who can see you using only expression, gestures, or references. Only you and your ally understand what is being communicated. The limit of the message is about one word per level of the cypher.",
  },
  {
    name: "Flee The Hunt!",
    action: "Instant",
    level: "1d6",
    effect:
      "If you're being chased, you get away. The pursuer eventually gives up (based on the circumstances). However, if the pursuer is given the opportunity—such as you returning—they may give chase again, and this time it is resolved normally.",
  },
  {
    name: "Gift of The Piper",
    action: "Instant",
    level: "1d6",
    effect:
      "Seeing your chance, you take an immediate additional action on your turn.",
  },
  {
    name: "Guess you had to be there",
    action: "One Action",
    level: "1d6",
    effect:
      "You recall any one experience you've ever had. The experience can be no longer than one minute per cypher level, but the recall is perfect.",
  },
  {
    name: "Gut feeling",
    action: "One Action",
    level: "1d6 + 4",
    effect:
      "When faced with a choice between two known options, you pick the most correct one based on the circumstances. The gut feeling doesn't work if neither choice is the correct one.",
  },
  {
    name: "Hard shoulder",
    action: "Instant",
    level: "1d6 + 4",
    effect:
      "Skill or blind luck allows you to avoid a single attack from your attacker if their level is lower than the cypher's level. You suffer no damage or effect.",
  },
  {
    name: "Help from a stranger",
    action: "One Action",
    level: "1d6",
    effect:
      "You suddenly remember that you brought—or were given—a necessary item not recorded on your character sheet. Alternatively, you know how to cobble together a makeshift replacement in a minute’s time.",
  },
  {
    name: "Implore The Flesh",
    action: "One Action",
    level: "1d6 + 2",
    effect:
      "Rolling your shoulders and centering your breath, you regain a number of points equal to this cypher’s level to your Speed Pool.",
    PoolGain: "Speed",
  },
  {
    name: "Jigsaw solver",
    action: "One Action",
    level: "1d6",
    effect:
      "Hardly anything gets past you. All your tasks involving intelligent deduction—such as playing chess, inferring a connection between clues, solving a mathematical problem, finding a bug in code, and so on—are eased by two steps for one hour.",
  },
  {
    name: "Last words",
    action: "One Action",
    level: "1d6",
    effect:
      "If you spend a minute or so speaking to nearby allies, talking about the importance of what you’re about to attempt, how strength comes from unity, how everyone working together creates something greater than its parts, and similar themes, you and your allies lose Stress in an amount equal to the cypher level.",
  },
  {
    name: "Learn from The Web",
    action: "One Action",
    level: "1d6",
    effect:
      "Sometimes all it takes is focus. For the next day, you are effectively trained in a predetermined skill (or two skills if this cypher’s level is 5 or higher). The skill could be anything (including something specific to the operation of a particular device), or roll a d00 to choose a common skill.",
  },
  {
    name: "Lesson of The Boneturner",
    action: "One Action",
    level: "10",
    effect:
      "If you reach the second-to-last step on the damage track (debilitated) and survive the experience, you find renewed purpose during your recovery. When you’re hale again, you gain a character advancement step—skill training, +4 points to add to your Pools, +1 to Effort, or +1 to Edge—without having to spend 4 XP.",
  },
  {
    name: "Librarian's pupil",
    action: "One Action",
    level: "1d6",
    effect:
      "You are dramatically but temporarily inspired, allowing you to ease one specific kind of physical action by three steps. Once activated, this boost can be used a number of times equal to the cypher level, but only within a twenty-four-hour period. The boost takes effect each time the action is performed. For example, a level 3 cypher boosts the first three times that action is attempted. Roll a d00 to determine the action.",
  },
  {
    name: "Like an Avatar",
    action: "Instant",
    level: "1d6 + 2",
    effect:
      "Sometimes everything falls perfectly into place. Treat your action as if you had rolled a natural 20.",
  },
  {
    name: "Meat",
    action: "One Action",
    level: "1d6",
    effect:
      "You psych yourself up, reducing the Stress you suffer from physical injury by 1 for one hour per cypher level. You still suffer Stress from mental shock or despair normally.",
  },
  {
    name: "Nemesis",
    action: "One Action",
    level: "1d6 + 1",
    effect:
      "Your actions and/or words are especially startling. One NPC within immediate range whose level is lower than the cypher level decides to leave, using their next five rounds to move away quickly.",
  },
  {
    name: "Nightfall",
    action: "One Action",
    level: "1d6",
    effect:
      "Determined to keep going, you use senses other than sight to get by for one hour per cypher level. You aren’t hindered on tasks to perceive or attack in dark conditions.",
  },
  {
    name: "Observer effect",
    action: "One Action",
    level: "1d6",
    effect:
      "When you look around an immediate area, if there are any hidden clues significant to the current investigation, you notice them.",
  },
  {
    name: "Of The Beholding",
    action: "One Action",
    level: "1d6",
    effect:
      "Feeling especially alert, you have an asset to perception tasks for one hour per cypher level.",
  },
  {
    name: "Of The Flesh",
    action: "One Action",
    level: "1d6",
    effect:
      "Your body embraces fight instead of flight. All your noncombat tasks involving raw strength—such as breaking down a door, lifting a heavy boulder, forcing open elevator doors, competing in a weightlifting competition, and so on—are eased by two steps for one hour.",
  },
  {
    name: "Panopticon",
    action: "Instant",
    level: "1d6",
    effect:
      "Fear is a great motivator. You memorize everything you see for thirty seconds per cypher level and store what you see permanently in your long-term memory. This cypher is useful for watching someone pick a specific lock, enter a complex code, or do something else that happens quickly.",
  },
  {
    name: "Personal space",
    action: "One Action",
    level: "1d6 + 4",
    effect:
      "Flinching isn’t always bad. For the next day, you have an asset to Speed defense rolls.",
  },
  {
    name: "Risen wind",
    action: "One Action",
    level: "1d6 + 2",
    effect:
      "You catch your second wind, regaining a number of points equal to this cypher’s level to your Might Pool.",
    PoolGain: "Might",
  },
  {
    name: "Sculptor's tool",
    action: "Instant",
    level: "1d6",
    effect:
      "The tool feels so comfortable in your hand that you have an additional asset for any one task using it, even if that means exceeding the normal limit of two assets.",
  },
  {
    name: "Show must go on",
    action: "One Action",
    level: "1d6",
    effect:
      "You spot an untended ladder, hard hat, clipboard and pen, cleaning cart and apron, or whatever is appropriate to the circumstances that, once obtained, allow you and up to two allies to slip into a building without drawing attention. If your entrance is challenged by guards or others monitoring the area, you and your allies’ disguise and/or associated deception tasks are eased by two steps. The benefits of this cypher usually last for several hours.",
  },
  {
    name: "Smell of blood",
    action: "Instant",
    level: "1d6",
    effect:
      "Outraged, inspired, or fueled by desperate need, your attack deals extra damage equal to this cypher’s level.",
  },
  {
    name: "Spiral's luck",
    action: "Instant",
    level: "1d6",
    effect:
      "Luck sometimes swings your way, and an attack that would normally inflict a serious injury on you gives 2 points of Stress instead.",
  },
  {
    name: "Squirm",
    action: "Instant",
    level: "1d6",
    effect:
      "An adrenaline jolt eases the action you are taking by three steps.",
  },
  {
    name: "Stare into The Vast",
    action: "One Action",
    level: "1d6 + 2",
    effect:
      "Stilling your racing thoughts, you regain a number of points equal to this cypher’s level to your Intellect Pool.",
    PoolGain: "Intellect",
  },
  {
    name: "Strange music",
    action: "One Action",
    level: "1d6",
    effect:
      "You take a moment to center yourself, and you lose an amount of Stress equal to this cypher’s level.",
  },
  {
    name: "Taking stock",
    action: "One Action",
    level: "1d6 + 2",
    effect:
      "Putting together subtle clues and things you’ve seen and learned, you can ask the GM one question and get a general answer. The GM assigns a level to the question, so the more obscure the answer, the more difficult the task. Generally, knowledge that you could find by looking somewhere other than your current location is level 1, and obscure knowledge of the past is level 7.",
  },
  {
    name: "Thought for the day",
    action: "One Action",
    level: "1d6",
    effect:
      "You remember a pertinent detail regarding the current situation. The detail must be something that can be learned by normal research.",
  },
  {
    name: "Thrill of the chase",
    action: "One Action",
    level: "1d6",
    effect:
      "The situation demands haste. For one minute, you can move a long distance instead of a short distance as an action.",
  },
  {
    name: "Tightrope",
    action: "One Action",
    level: "1d6 + 2",
    effect:
      "Galvanized by your plight, you add 1 to your Speed Edge for one hour (or 2 if the cypher is level 5 or higher).",
    EdgeBonusStat: "Speed",
    EdgeBonus: "if (cypherLevel >= 5) 2 else 1",
  },
  {
    name: "Uncanny valley",
    action: "Instant",
    level: "1d6 + 3",
    effect:
      "After talking with someone for at least a couple of rounds, you have a better understanding of what they would need to hear to find your deception or persuasion more believable and/or credible, easing a deception or persuasion task by three steps.",
  },
  {
    name: "Watcher's know-how",
    action: "One Action",
    level: "1d6",
    effect:
      "You know where to look or who to ask to find a significant piece of information. The GM might provide multiple options. This can be used when you start research or while you’re searching for clues. For example, if you want to know if anyone’s been in an apartment in the past 24 hours, the GM might say that you can look at the carpet to see if it’s trodden upon, or that you can speak to the building manager to view the footage from the security cameras in the hallway.",
  },
  {
    name: "Weaver's encouragement",
    action: "One Action",
    level: "1d6",
    effect:
      "Your encouraging words and presence motivate someone next to you, granting them an asset on their next task. You encourage up to three characters at once if this cypher’s level is 5 or higher.",
  },
  {
    name: "Well-being",
    action: "One Action",
    level: "1d6",
    effect:
      "You’re jacked up on a cocktail of fear and adrenaline. For one round per cypher level, you can act as if one step higher on the damage track than you actually are, as long as you are not dead.",
  },
  {
    name: "What we all ignore",
    action: "One Action",
    level: "1d6",
    effect:
      "Determined not to let things get to you, for one hour per cypher level, you reduce the Stress you suffer from mental shock or despair by 1 each time it occurs. You still suffer Stress from physical injury normally.",
  },
  {
    name: "What we lost",
    action: "Instant",
    level: "1d6 + 3",
    effect:
      "You brush past someone, coming away with something from their pocket, bag, or other container, assuming they’re carrying anything. This cypher eases a pickpocketing task by two steps, or four steps if the cypher is level 7 or higher.",
  },
  {
    name: "Words of the puppeteer",
    action: "Instant",
    level: "1d6",
    effect:
      "Determined not to fail, you gain an additional asset for any one task involving verbal interaction, even if that means exceeding the normal limit of two assets.",
  },
];
const CYPHERS_ROLLEFFECT = [
  { range: "01-10", cypher: "Learn from The Web", result: "Melee attacks" },
  { range: "11-20", cypher: "Learn from The Web", result: "Ranged attacks" },
  {
    range: "21-40",
    cypher: "Learn from The Web",
    result:
      "One type of academic or esoteric lore (biology, history, occultism, and so on)",
  },
  { range: "41-50", cypher: "Learn from The Web", result: "Researching" },
  { range: "51-60", cypher: "Learn from The Web", result: "Forensics" },
  { range: "61-70", cypher: "Learn from The Web", result: "Persuasion" },
  { range: "71-75", cypher: "Learn from The Web", result: "Mechanics" },
  { range: "76-80", cypher: "Learn from The Web", result: "Speed defense" },
  { range: "81-85", cypher: "Learn from The Web", result: "Intellect defense" },
  { range: "86-90", cypher: "Learn from The Web", result: "Swimming" },
  { range: "91-95", cypher: "Learn from The Web", result: "Psychology" },
  { range: "96-00", cypher: "Learn from The Web", result: "Stealth" },

  { range: "01-15", cypher: "Librarian's pupil", result: "Melee attack" },
  { range: "16-30", cypher: "Librarian's pupil", result: "Ranged attack" },
  { range: "31-40", cypher: "Librarian's pupil", result: "Speed defense" },
  { range: "41-50", cypher: "Librarian's pupil", result: "Might defense" },
  { range: "51-60", cypher: "Librarian's pupil", result: "Intellect defense" },
  { range: "61-68", cypher: "Librarian's pupil", result: "Gymnastics" },
  { range: "69-76", cypher: "Librarian's pupil", result: "Endurance" },
  { range: "77-84", cypher: "Librarian's pupil", result: "Driving" },
  {
    range: "85-92",
    cypher: "Librarian's pupil",
    result: "Equipment operation",
  },
  { range: "93-94", cypher: "Librarian's pupil", result: "Stealth" },
  { range: "95-96", cypher: "Librarian's pupil", result: "Initiative" },
  { range: "97-98", cypher: "Librarian's pupil", result: "Perception" },
  { range: "99-99", cypher: "Librarian's pupil", result: "Performance" },
  { range: "00-00", cypher: "Librarian's pupil", result: "Tracking" },
];
