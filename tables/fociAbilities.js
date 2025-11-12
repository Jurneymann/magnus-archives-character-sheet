const focusAbilities = [
  {
    Focus: "Carries a Gun",
    Ability: "Gunner",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect: "You inflict 1 additional point of damage with guns. Enabler.",
  },
  {
    Focus: "Carries a Gun",
    Ability: "Practiced With Guns",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are practiced with guns and suffer no penalty when using one. Enabler.",
  },
  {
    Focus: "Carries a Gun",
    Ability: "Careful Shot",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You can spend points from either your Speed Pool or your Intellect Pool to apply levels of Effort to increase your gun damage. Each level of Effort adds 3 points of damage to a successful attack, and if you spend a turn lining up your shot, each level of Effort instead adds 5 points of damage to a successful attack. Enabler.",
  },
  {
    Focus: "Carries a Gun",
    Ability: "Trained Gunner",
    Stat: "Speed",
    Cost: "2",
    Tier: "3",
    Effect:
      "You can choose from one of two benefits. Either you are trained in using guns, or you have the Spray ability (which has a cost of 2 Speed). Enabler.",
  },
  {
    Focus: "Carries a Gun",
    Ability: "Damage Dealer",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "You inflict an additional 3 points of damage with your gun. Enabler.",
  },
  {
    Focus: "Carries a Gun",
    Ability: "Snap Shot",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "You can make two gun attacks as a single action, but the second attack is hindered by two steps. Enabler.",
  },
  {
    Focus: "Carries a Gun",
    Ability: "Arc Spray",
    Stat: "Speed",
    Cost: "3",
    Tier: "5",
    Effect:
      "If a weapon has the ability to fire rapid shots without reloading (usually called a rapid-fire weapon), you can fire your weapon at up to three targets (all next to one another) at once. Make a separate attack roll against each target. Each attack is hindered. Action.",
  },
  {
    Focus: "Carries a Gun",
    Ability: "Special Shot",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "When you hit a target with a gun attack, you can choose to reduce the damage by 1 point but hit the target in a precise spot. Some of the possible effects include (but are not limited to) the following: • You can shoot an object out of someone’s hand. • You can shoot the leg, wing, or other limb it uses to move, reducing its maximum movement speed to immediate for a few days or until it receives expert medical care. • You can shoot a strap holding a backpack, a protective device, or a similarly strapped-on item so that it falls off. Enabler.",
  },
  {
    Focus: "Carries a Gun",
    Ability: "Lethal Damage",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "When you hit with your gun on a standard attack, you inflict an additional 5 points of damage. Enabler.",
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Life Lessons",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "Choose any two noncombat skills. You are trained in those skills. Enabler.",
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Totally Chill",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect: "Your ten-minute recovery roll takes you only one round. Enabler.",
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Skill With Attacks",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "Choose one type of attack in which you are not already trained: light bashing, light bladed, light ranged, medium bashing, medium bladed, medium ranged, heavy bashing, heavy bladed, or heavy ranged. You are trained in attacks using that type of weapon. You can select this ability multiple times. Each time you select it, you must choose a different type of attack. Enabler.",
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Improvise",
    Stat: "Intellect",
    Cost: "2",
    Tier: "3",
    Effect:
      "When you perform a task in which you are not trained, you can improvise to gain an asset on the task. The asset might be a tool you cobble together, a sudden insight into overcoming a problem, or a rush of dumb luck. Enabler.",
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Life Lessons",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "Choose any two noncombat skills. You are trained in those skills. Enabler.",
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Greater Skill With Defense",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "Choose one type of defense task, even one in which you are already trained: Might, Speed, or Intellect. You are trained in defense tasks of that type, or specialized if you are already trained. You can select this ability up to three times. Each time you select it, you must choose a different type of defense task. Enabler.",
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Greater Enhanced Potential",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "You gain 6 points to divide among your stat Pools however you wish. Enabler.",
    PoolStats: ["Might", "Speed", "Intellect"],
    PoolIncrease: 6,
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Drawing on Life’s Experiences",
    Stat: "Intellect",
    Cost: "6",
    Tier: "6",
    Effect:
      "You’ve seen a lot and done a lot, and that experience comes in handy. Ask the GM one question, and you’ll receive a general answer. The GM assigns a level to the question, so the more obscure the answer, the more difficult the task. Generally, knowledge that you could find by looking somewhere other than your current location is level 1, and obscure knowledge of the past is level 7. Action.",
  },
  {
    Focus: "Does a Bit of This and That",
    Ability: "Quick Wits",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "When performing a task that would normally require spending points from your Intellect Pool, you can spend points from your Speed Pool instead. Enabler.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Superb Explorer",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are trained in perception, endurance, and gymnastics tasks. Enabler.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Superb Infiltrator",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect: "You are trained in lockpicking and mechanics. Enabler.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Eyes Adjusted",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You are not hindered in darkness and can see faintly even in utter darkness. Enabler.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Nightstrike",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "When you attack a foe in dim light or darkness, you get a free level of Effort on the attack. Enabler.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Slippery Customer",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "When you apply Effort to tasks involving escaping from bonds, fitting in tight spaces, and other contortionist tasks, you get a free level of Effort on the task. Thanks to your experience, you are also trained in Speed defense tasks. Enabler.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Hard-Won Resilience",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "In your explorations of dark places, you’ve been exposed to all sorts of terrible things and are developing a general resistance. You reduce any Stress you gain, from any source, by 1 point. Enabler.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Dark Explorer",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "You ignore penalties for any action (including fighting) in extremely dim light or in cramped spaces. Because you have the Eyes Adjusted ability, you can act without penalty even in total darkness. You are trained in stealth tasks while in dim or no light. Enabler.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Blinding Attack",
    Stat: "Speed",
    Cost: "3",
    Tier: "6",
    Effect:
      "If you have a source of light, you can use it to make a melee attack against a target. If successful, the attack deals no damage, but the target is blinded for one minute. Action.",
  },
  {
    Focus: "Explores Dark Places",
    Ability: "Dark Flow",
    Stat: "Intellect",
    Cost: "6",
    Tier: "6",
    Effect:
      "For the next hour, you fully immerse yourself in the practice and craft of operating in the dark. When you apply a level of Effort to stealth, lockpicking, endurance, and perception tasks, you get two free levels of Effort on the task, as long as it is done in dim light or in the dark. Action to initiate.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Taking Advantage",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "When your foe is prone, weakened, dazed, stunned, moved down the damage track, or disadvantaged in some other way, your attacks against that foe are eased beyond any other modifications due to the disadvantage. Enabler.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Eye Gouge",
    Stat: "Might",
    Cost: "2",
    Tier: "2",
    Effect:
      "You make an attack against a creature with an eye. The attack is hindered, but if you hit, the creature has trouble seeing for the next hour. During this time, the creature’s tasks that rely on sight (most tasks) are hindered. Action.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Spot Weakness",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "If a creature that you can see has a special weakness, such as a vulnerability to fire, a negative modification to perception, and so on, you know what it is. (Ask and the GM will tell you.) Enabler.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Surprise Attack",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "If attacking from a hidden vantage, with surprise, or before your opponent has acted, you get an asset on the attack. On a successful hit, you inflict 2 additional points of damage. Enabler.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Mind Games",
    Stat: "Intellect",
    Cost: "3",
    Tier: "4",
    Effect:
      "You use lies and trickery, mockery, and perhaps even hateful, obscene language against a foe that can understand you. If successful, the foe is stunned for one round and cannot act, and it is dazed in the following round, during which time its tasks are hindered. Action.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Capable Fighter",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect: "Your attacks deal 1 additional point of damage. Enabler.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Using the Environment",
    Stat: "Intellect",
    Cost: "4",
    Tier: "5",
    Effect:
      "You find some way to use the environment to your advantage in a fight. For the next ten minutes, attack rolls and Speed defense rolls are eased. Action to initiate.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Twisting the Knife",
    Stat: "Might",
    Cost: "4",
    Tier: "6",
    Effect:
      "In a round after successfully striking a foe with a melee weapon, you can opt to automatically deal standard damage to the foe with that same weapon without any modifiers (2 points for a light weapon, 4 points for a medium weapon, or 6 points for a heavy weapon). Action.",
  },
  {
    Focus: "Fights Dirty",
    Ability: "Murderer",
    Stat: "Might",
    Cost: "8+",
    Tier: "6",
    Effect:
      "With a swift and sudden attack, you strike a foe in a vital spot. If the target is level 4 or lower, it is killed outright. For each additional level of Effort you apply, you can increase the level of the target by 1. Action.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Friendly Help",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "If your friend tries a task and fails, they can try again without spending Effort if you help. You provide this advantage to your friend even if you are not trained in the task that they are retrying. Enabler.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Courageous",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are trained in Intellect defense tasks and initiative tasks. Enabler.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Weather the Vicissitudes",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "Helping your friends means being able to stand up to everything the world throws at you. You ignore the first point of Stress you gain in a given day (resets after you take your ten-hour rest). Enabler.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Buddy System",
    Stat: "Intellect",
    Cost: "3",
    Tier: "3",
    Effect:
      "Choose one character standing next to you. That character becomes your buddy for ten minutes. You are trained in all tasks involving finding, healing, interacting with, and protecting your buddy. Also, while you stand next to your buddy, both of you have an asset on Speed defense tasks. You can have only one buddy at a time. Action to initiate.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Skill With Attacks",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "Choose one type of attack in which you are not already trained: light bashing, light bladed, light ranged, medium bashing, medium bladed, medium ranged, heavy bashing, heavy bladed, or heavy ranged. You are trained in attacks using that type of weapon. You can select this ability multiple times. Each time you select it, you must choose a different type of attack. Enabler.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "In Harm’s Way",
    Stat: "Might",
    Cost: "3",
    Tier: "4",
    Effect:
      "When you put your friends before yourself as your action, you ease all defense tasks for all characters you choose that are adjacent to you. This lasts until the end of your next turn. If one of your friends gains Stress during that period, you can choose to take up to half of it (round up) yourself instead. If one of your friends would take a serious injury, you can take it instead, but only if you’re not already impaired or debilitated. Enabler.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Enhanced Physique",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "You gain 3 points to divide among your Might and Speed Pools however you wish. Enabler.",
    PoolStats: ["Might", "Speed"],
    PoolIncrease: 3,
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Inspire Action",
    Stat: "Intellect",
    Cost: "4",
    Tier: "5",
    Effect:
      "If one ally can see and easily understand you, you can instruct them to take an action. If the ally chooses to take that exact action, they can do so as an additional action immediately. Doing so doesn’t interfere with the ally taking a normal action on their turn. Action.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Deep Consideration",
    Stat: "Intellect",
    Cost: "6",
    Tier: "6",
    Effect:
      "When you develop a plan that involves you and your friends working together to accomplish a goal, you can ask the GM one very general question about what is likely to happen if you carry out the plan, and you will get a simple, brief answer. In addition, each of you gains an asset to one roll related to enacting the plan you developed together, as long as you put the plan into action within a few days of the plan’s creation. Action.",
  },
  {
    Focus: "Helps Their Friends",
    Ability: "Skill With Defense",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "Choose one type of defense task in which you are not already trained: Might, Speed, or Intellect. You are trained in defense tasks of that type. Enabler.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Stealthy",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are trained in your choice of two of the following skills: deception, disguise, lockpicking, pickpocketing, or stealth. You can choose this ability multiple times, but you must select different skills each time. Enabler.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Sense Attitudes",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect: "You are trained in discerning motive. Enabler.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Impersonate",
    Stat: "Intellect",
    Cost: "2",
    Tier: "2",
    Effect:
      "For one hour, you alter your voice, posture, and mannerisms, whip together a disguise, and gain an asset on an attempt to impersonate someone else, whether it is a specific individual (Bob the cop) or a general role (a police officer). Action to initiate.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Flight Not Fight",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "If you use your action only to move, all Speed defense tasks are eased. Enabler.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Awareness",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "When you spend a level of Effort on a perception task, you gain a free level Effort to that task. Action.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Skill With Attacks",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "Choose one type of attack in which you are not already trained: light bashing, light bladed, light ranged, medium bashing, medium bladed, medium ranged, heavy bashing, heavy bladed, or heavy ranged. You are trained in attacks using that type of weapon. You can select this ability multiple times. Each time you select it, you must choose a different type of attack. Enabler.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Nearly Invisible",
    Stat: "Speed",
    Cost: "3",
    Tier: "4",
    Effect:
      "For the next ten minutes, you fully immerse yourself in the practice and craft of not being seen. While hiding, you are specialized in stealth and Speed defense tasks. This effect ends if you do something to reveal your presence or position—attacking, using an ability, moving a large object, and so on. If this occurs, you can regain your status by taking an action to hide your position. Action to initiate or reinitiate.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Evasion",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "You’re hard to affect when you don’t want to be affected. You are trained in all defense tasks. Enabler.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Brainwashing",
    Stat: "Intellect",
    Cost: "5+",
    Tier: "6",
    Effect:
      "You use trickery and/or well-spoken lies to make someone else temporarily do as you ask. For one minute, if you succeed on an Intellect attack, you direct the actions of a target you speak to. The target must be level 3 or lower. You can allow them to act freely or override their actions on a case-by-case basis as long as you can see and direct them. If someone challenges the target’s actions (or something else happens that makes the target question your directions), you must succeed on another Intellect attack roll as you verbally attempt to reassure them, or the target stops doing as you say. In addition to the normal options for using Effort, you can use Effort to increase the maximum level of the target or increase the duration by one minute. Thus, to direct the actions of a level 6 target (three levels above the normal limit) or direct a target for four minutes (three minutes above the normal duration), you must apply three levels of Effort. Action to initiate.",
  },
  {
    Focus: "Infiltrates",
    Ability: "Spring Away",
    Stat: "Speed",
    Cost: "5",
    Tier: "6",
    Effect:
      "Whenever you succeed on a Speed defense roll, you can immediately move up to a short distance. You cannot use this ability more than once in a given round. Enabler.",
  },
  {
    Focus: "Leads",
    Ability: "Natural Charisma",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are trained in all social interactions, including persuasion, deception, intimidation, and discerning motive. Enabler.",
  },
  {
    Focus: "Leads",
    Ability: "Good Advice",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "Anyone can help an ally, easing whatever task they’re attempting by one step, or two steps if the helper is trained or specialized in that skill. However, you have the benefit of clarity and wisdom. When you help another character, they gain an additional asset. Enabler.",
  },
  {
    Focus: "Leads",
    Ability: "Enhanced Potential",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You gain 3 points to divide among your stat Pools however you wish. Enabler.",
    PoolStats: ["Might", "Speed", "Intellect"],
    PoolIncrease: 3,
  },
  {
    Focus: "Leads",
    Ability: "Basic Follower",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You gain a level 2 follower. One of their modifications must be persuasion. You can take this ability multiple times, each time gaining another level 2 follower. Enabler.",
  },
  {
    Focus: "Leads",
    Ability: "Advanced Command",
    Stat: "Intellect",
    Cost: "7",
    Tier: "3",
    Effect:
      "If you succeed on an Intellect attack roll, a target within short range obeys any command you give as long as they can hear and understand you. Further, as long as you continue to do nothing but issue commands (taking no other action), you can give that same target a new command. This effect ends when you stop issuing commands or they are out of short range. Action to initiate.",
  },
  {
    Focus: "Leads",
    Ability: "Expert Follower",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "You gain a level 3 follower. They are not restricted on their modifications. You can take this ability multiple times, each time gaining another level 3 follower. Alternatively, you could choose to advance a level 2 follower you already have to level 3 and then gain a new level 2 follower. Enabler.",
  },
  {
    Focus: "Leads",
    Ability: "Captivate or Inspire",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "You can use this ability in one of two ways. Either your words keep the attention of all NPCs of up to level 2 that hear them for as long as you speak, or your words inspire all NPCs that hear them to function as if they were one level higher for the next hour. In either case, you choose which NPCs are affected. If anyone in the crowd is attacked while you’re trying to speak to them, you lose the crowd’s attention. Action to initiate.",
  },
  {
    Focus: "Leads",
    Ability: "Greater Enhanced Potential",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "You gain 6 points to divide among your stat Pools however you wish. Enabler.",
    PoolStats: ["Might", "Speed", "Intellect"],
    PoolIncrease: 6,
  },
  {
    Focus: "Leads",
    Ability: "Band of Followers",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "You gain four level 3 followers. They are not restricted on their modifications. Enabler.",
  },
  {
    Focus: "Leads",
    Ability: "Mind of a Leader",
    Stat: "Intellect",
    Cost: "6",
    Tier: "6",
    Effect:
      "When you develop a course of action to deal with a future situation, you can ask the GM one very general question about what is likely to happen if you carry out the plan, and you will get a simple, brief answer. Action.",
  },
  {
    Focus: "Learns Quickly",
    Ability: "Enhanced Intellect",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect: "You gain 3 points to your Intellect Pool. Enabler.",
    PoolStats: ["Intellect"],
    PoolIncrease: 3,
  },
  {
    Focus: "Learns Quickly",
    Ability: "Picked Up a Few Things",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are trained in any noncombat task in which you do not already have training. Enabler.",
  },
  {
    Focus: "Learns Quickly",
    Ability: "Quick Study",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You learn from repetitive actions. You gain an asset to rolls for similar tasks after the first time (such as operating the same device or making attacks against the same foe). Once you move on to a new task, the familiarity with the old task fades—unless you start doing it again. Enabler.",
  },
  {
    Focus: "Learns Quickly",
    Ability: "Enhanced Intellect Edge",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect: "You gain +1 to your Intellect Edge. Enabler.",
    EdgeIncreaseStat: ["Intellect"],
    EdgeIncrease: 1,
  },
  {
    Focus: "Learns Quickly",
    Ability: "Flex Skill",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "At the beginning of each day, choose one task (other than attacks or defense) on which you will concentrate. For the rest of that day, you’re trained in that task. You can’t use this ability with a skill in which you’re already trained to become specialized. Enabler.",
  },
  {
    Focus: "Learns Quickly",
    Ability: "Hard to Distract",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect: "You are trained in Intellect defense tasks. Enabler.",
  },
  {
    Focus: "Learns Quickly",
    Ability: "Pay It Forward",
    Stat: "Intellect",
    Cost: "3",
    Tier: "4",
    Effect:
      "You can pass on what you’ve learned. When you give another character a suggestion involving their next action that is not an attack, their action is eased for one minute. Action.",
  },
  {
    Focus: "Learns Quickly",
    Ability: "Enhanced Intellect",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect: "You gain 3 points to your Intellect Pool. Enabler.",
    PoolStats: ["Intellect"],
    PoolIncrease: 3,
  },
  {
    Focus: "Learns Quickly",
    Ability: "Learned a Few Things",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "You are trained in two areas of knowledge of your choice, or specialized in one area of knowledge of your choice. Enabler.",
  },
  {
    Focus: "Learns Quickly",
    Ability: "Two Things at Once",
    Stat: "Intellect",
    Cost: "6",
    Tier: "6",
    Effect:
      "You divide your attention and take two separate actions this round. Enabler.",
  },
  {
    Focus: "Learns Quickly",
    Ability: "Skill With Defense",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "Choose one type of defense task in which you are not already trained: Might, Speed, or Intellect. You are trained in defense tasks of that type. Enabler.",
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Fists of Fury",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You inflict 2 additional points of damage with unarmed attacks. Enabler.",
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Wound Tender",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect: "You are trained in healing. Enabler.",
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Protector",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You designate a single character to be your charge. You can change this freely every round, but you can have only one charge at a time. As long as that charge is within immediate range, they gain an asset for Speed defense tasks because you have their back. Enabler.",
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Breaking",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "Your tasks to smash physical objects—doors, containers, and other inanimate objects—are eased. Enabler.",
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Skill With Attacks",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "Choose one type of attack in which you are not already trained: light bashing, light bladed, light ranged, medium bashing, medium bladed, medium ranged, heavy bashing, heavy bladed, or heavy ranged. You are trained in attacks using that type of weapon. You can select this ability multiple times, each time choosing a different type of attack. Enabler.",
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Greater Enhanced Potential",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "You gain 6 points to divide among your stat Pools however you wish. Enabler.",
    PoolStats: ["Might", "Speed", "Intellect"],
    PoolIncrease: 6,
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Knock Out",
    Stat: "Might",
    Cost: "5+",
    Tier: "4",
    Effect:
      "You make a melee attack that inflicts no damage. Instead, if the attack hits, make a second Might-based roll. If successful, a foe of level 3 or lower is knocked unconscious for one minute. For each level of Effort used, you can affect one higher level of foe, or you can extend the duration for an additional minute. Action.",
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Mastery With Attacks",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "Choose one type of attack in which you are trained: light bashing, light bladed, light ranged, medium bashing, medium bladed, medium ranged, heavy bashing, heavy bladed, or heavy ranged. You are specialized in attacks using that type of weapon. Enabler. (If you aren’t already trained in a type of attack, select Skill With Attacks, one of the tier 3 choices, to become trained instead of specialized.)",
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Greater Enhanced Might",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect: "You gain 6 points to your Might Pool. Enabler.",
    PoolStats: ["Might"],
    PoolIncrease: 6,
  },
  {
    Focus: "Looks for Trouble",
    Ability: "Lethal Damage",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "Choose one of your existing attacks that inflicts points of damage (depending on your character, this might be a specific weapon, your unarmed attacks, or a supernatural ability). When you hit with that attack, you inflict an additional 5 points of damage. Enabler.",
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Greater Enhanced Speed",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect: "You gain 6 points to your Speed Pool. Enabler.",
    PoolStats: ["Speed"],
    PoolIncrease: 6,
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Balance",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect: "You are trained in gymnastics. Enabler.",
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Grit",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect: "You are trained in endurance tasks. Enabler.",
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Safe Fall",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You gain no Stress from a fall. However, you can still sustain a serious injury on falls over 10 feet (3.5 m). Enabler.",
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Enhanced Speed Edge",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect: "You gain +1 to your Speed Edge. Enabler.",
    EdgeIncreaseStat: ["Speed"],
    EdgeIncrease: 1,
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Greater Enhanced Speed",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect: "You gain 6 points to your Speed Pool. Enabler.",
    PoolStats: ["Speed"],
    PoolIncrease: 6,
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Hard to Hit",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect: "You are trained in Speed defense tasks. Enabler.",
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Quick Strike",
    Stat: "Speed",
    Cost: "4",
    Tier: "4",
    Effect:
      "You make a melee attack with such speed that it is hard for your foe to defend against, and it knocks them off balance. Your attack is eased by two steps, and the foe, if struck, takes normal damage but is dazed so that their tasks are hindered for the next round. Action.",
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Slippery",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "You are eased in any task involving escaping any kind of bond or grasp. Enabler.",
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Perfect Speed Burst",
    Stat: "Speed",
    Cost: "6",
    Tier: "6",
    Effect: "You can take two separate actions this round. Enabler.",
  },
  {
    Focus: "Moves Like a Cat",
    Ability: "Greater Enhanced Speed",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect: "You gain 6 points to your Speed Pool. Enabler.",
    PoolStats: ["Speed"],
    PoolIncrease: 6,
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Fists of Fury",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You inflict 2 additional points of damage with unarmed attacks. Enabler.",
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Scarred and Hardened",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You reduce the Stress you suffer from physical injury by 1. You still suffer Stress from mental shock or despair normally. If you already have this ability thanks to your type, you reduce the Stress you suffer from physical injury by 2. Enabler.",
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Advantage to Disadvantage",
    Stat: "Speed",
    Cost: "3",
    Tier: "2",
    Effect:
      "With a number of quick moves, you make an attack against an armed foe, inflicting damage and disarming them so that their weapon is now in your hands or 10 feet (3.5 m) away on the ground—your choice. This disarming attack is hindered. Action.",
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Unarmed Fighting Style",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect: "You are trained in unarmed attacks. Enabler.",
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Moving Like Water",
    Stat: "Speed",
    Cost: "3",
    Tier: "3",
    Effect:
      "You spin and move so that your defense and attacks are aided by your fluid motion. For one minute, all your attacks and Speed defense tasks gain an asset. Enabler.",
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Greater Enhanced Potential",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "You gain 6 points to divide among your stat Pools however you wish. Enabler.",
    PoolStats: ["Might", "Speed", "Intellect"],
    PoolIncrease: 6,
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Stand Like Iron",
    Stat: "Might",
    Cost: "5",
    Tier: "4",
    Effect:
      "The next attack (in the current encounter) that would normally inflict a serious injury on you gives 2 points of Stress instead. Enabler.",
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Stun Attack",
    Stat: "Speed",
    Cost: "6",
    Tier: "5",
    Effect:
      "You attempt a difficulty 5 Speed task to stun a creature as part of your melee or ranged attack. If you succeed, your attack inflicts its normal damage and stuns the creature for one round, causing it to lose its next turn. If you fail, you still make your normal attack roll, but you don’t stun the opponent if you hit. Action.",
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Master of Unarmed Fighting Style",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "You are specialized in unarmed attacks. If you are already specialized in unarmed attacks, you instead deal 2 additional points of damage with unarmed attacks. Enabler.",
  },
  {
    Focus: "Needs No Weapon",
    Ability: "Lethal Damage",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "When you hit with an unarmed attack, you inflict an additional 5 points of damage. Enabler.",
  },
  {
    Focus: "Never Says Die",
    Ability: "Improved Recovery",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "Your ten-minute recovery roll takes only one action instead, so that your first two recovery rolls are one action, the third is one hour, and the fourth is ten hours. Enabler.",
  },
  {
    Focus: "Never Says Die",
    Ability: "Push on Through",
    Stat: "Might",
    Cost: "2",
    Tier: "1",
    Effect:
      "You ignore the effects of terrain while moving for one hour. Enabler.",
  },
  {
    Focus: "Never Says Die",
    Ability: "Tough",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You can take punishment beyond what others can. You gain an additional step in your damage track between hale and impaired called hurt. Other than being one step closer to impaired, hurt imposes no changes to your character. Enabler.",
  },
  {
    Focus: "Never Says Die",
    Ability: "Stand Like Iron",
    Stat: "Might",
    Cost: "4",
    Tier: "3",
    Effect:
      "The next attack (in the current encounter) that would normally inflict a serious injury on you gives 2 points of Stress instead. Enabler.",
  },
  {
    Focus: "Never Says Die",
    Ability: "Hidden Reserves",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "When you make a recovery roll, you also gain +1 to both your Might Edge and your Speed Edge for ten minutes thereafter. Enabler.",
    EdgeBonusStat: ["Might", "Speed"],
    EdgeBonus: 1,
  },
  {
    Focus: "Never Says Die",
    Ability: "Outlast the Foe",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "If you have been in combat for five full rounds, you have an asset for all tasks in the remainder of the combat, and you deal 1 additional point of damage per attack. Enabler.",
  },
  {
    Focus: "Never Says Die",
    Ability: "Not Dead Yet",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "When you are debilitated, you can still act as though you are impaired. You are still only one step away from death, however. Enabler.",
  },
  {
    Focus: "Never Says Die",
    Ability: "Final Defiance",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "When you would normally be dead, you instead remain conscious and active for one more round plus one additional round each time you succeed on a difficulty 5 Might task. During these rounds, you are debilitated. Enabler.",
  },
  {
    Focus: "Never Says Die",
    Ability: "Ignore Affliction",
    Stat: "Might",
    Cost: "5",
    Tier: "6",
    Effect:
      "If you are affected by an unwanted condition or affliction (such as disease, paralysis, mind control, broken limb, and so on, but not Stress or moving down the damage track), you can ignore it and act as if it does not affect you for one hour. Action.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Online Research",
    Stat: "Intellect",
    Cost: "1",
    Tier: "1",
    Effect:
      "All research tasks are eased if you have access to the internet. Enabler.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Tech Skill",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are trained in your choice of one of the following skills: electronics, engineering, programming, or researching. Enabler.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Hacking",
    Stat: "Intellect",
    Cost: "3",
    Tier: "2",
    Effect:
      "You can impersonate someone else online. This might allow you access to their information, funds, credit cards, or alert authorities to criminal activity. Easier tasks might include discovering addresses, daily activities, or current locations. Enabler.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Online Contacts",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "You have three contacts that you know virtually (but not in real life). Choose an area of expertise for each contact. When you have online access, you can ask them questions about their area of expertise and get an in-depth answer within an hour. Enabler.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Crowdsourcing",
    Stat: "Intellect",
    Cost: "3",
    Tier: "3",
    Effect:
      "You put out a question or request for information online and let others help answer it. Waiting up to 24 hours, you ease any information-related task (including research) by two steps. Action to initiate.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Deep Dive",
    Stat: "Intellect",
    Cost: "6",
    Tier: "4",
    Effect:
      "By accessing the internet, you can ask the GM one question and get a general answer. The GM assigns a level to the question, so the more obscure the answer, the more difficult the task. Action.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Better Hacking",
    Stat: "Intellect",
    Cost: "5",
    Tier: "5",
    Effect:
      "If you have electronic access to a system, you can attempt to take control of it, including cameras, security systems, locks, tracking, emails, databases, etc. Difficulty depends on system protections. Action.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Read It Somewhere",
    Stat: "Intellect",
    Cost: "6",
    Tier: "6",
    Effect:
      "With a round’s concentration, you call up obscure facts you read somewhere on the internet, easing the task you attempt on the following round by three steps. Action.",
  },
  {
    Focus: "Practically Lives Online",
    Ability: "Brain Food",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect: "You gain 6 points to your Intellect Pool. Enabler.",
    PoolStats: ["Intellect"],
    PoolIncrease: 6,
  },
  {
    Focus: "Runs Away",
    Ability: "Go Defensive",
    Stat: "Intellect",
    Cost: "1",
    Tier: "1",
    Effect:
      "When you wish, while in combat, you can enter a state of heightened awareness of threat. While in this state, you can’t use points from your Intellect Pool, but you gain +1 to your Speed Edge and two assets to Speed defense tasks. This effect lasts as long as you wish or until you attack a foe or no combat is in range. You can’t enter it again until after a recovery roll. Enabler.",
    Edge: ["Speed"],
    EdgeBonus: 1,
  },
  {
    Focus: "Runs Away",
    Ability: "Enhanced Speed",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect: "You gain 3 points to your Speed Pool. Enabler.",
    PoolStats: ["Speed"],
    PoolIncrease: 3,
  },
  {
    Focus: "Runs Away",
    Ability: "Quick to Flee",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect: "You are trained in stealth and gymnastics. Enabler.",
  },
  {
    Focus: "Runs Away",
    Ability: "Incredible Running Speed",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "You move much farther than normal in a round. As part of another action, you can move up to a long distance. As an action, you can move up to 200 feet (60 m), or up to 500 feet (150 m) with a successful difficulty 4 Speed-based roll. Enabler.",
  },
  {
    Focus: "Runs Away",
    Ability: "Greater Enhanced Speed",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect: "You gain 6 points to your Speed Pool. Enabler.",
    PoolStats: ["Speed"],
    PoolIncrease: 6,
  },
  {
    Focus: "Runs Away",
    Ability: "Increasing Determination",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "If you fail at a noncombat physical task and retry, you don’t have to apply a level of Effort for retrying, but the task is still eased. If you fail again, you gain no special benefits. Enabler.",
  },
  {
    Focus: "Runs Away",
    Ability: "Quick Wits",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "When performing a task that would normally require points from your Intellect Pool, you can spend points from your Speed Pool instead. Enabler.",
  },
  {
    Focus: "Runs Away",
    Ability: "Go to Ground",
    Stat: "Speed",
    Cost: "4",
    Tier: "5",
    Effect:
      "You move up to a long distance and attempt to hide. You gain an asset on the stealth task to blend in, disappear, or otherwise escape the senses of everyone previously aware of your presence. Action.",
  },
  {
    Focus: "Runs Away",
    Ability: "Burst of Escape",
    Stat: "Speed",
    Cost: "5",
    Tier: "6",
    Effect:
      "You can take two separate actions this round, as long as one of them is to hide or to move in a direction that is not toward a foe. Enabler.",
  },
  {
    Focus: "Runs Away",
    Ability: "Skill With Defense",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "Choose one type of defense task in which you are not already trained: Might, Speed, or Intellect. You are trained in defense tasks of that type. Enabler.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "Investigate",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You can spend points from your Might, Speed, or Intellect Pool to apply levels of Effort to any Intellect-based task. Enabler.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "Sleuth",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect: "You are trained in perception. Enabler.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "Out of Harm’s Way",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect: "You are trained in Speed defense tasks. Enabler.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "You Studied",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "You are trained in two areas of knowledge of your choice (not physical or combat-related) or specialized in one area. Enabler.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "Skill With Attacks",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "Choose one type of attack in which you are not already trained. You are trained in attacks using that type of weapon. Can be selected multiple times, choosing a different type each time. Enabler.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "Draw Conclusion",
    Stat: "Intellect",
    Cost: "3",
    Tier: "4",
    Effect:
      "After careful observation and investigation lasting a few minutes, succeed on a difficulty 3 Intellect task to learn a pertinent fact. Each additional use is hindered by one step. Difficulty resets after 10 hours rest. Action.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "Defuse Situation",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "Using verbal distraction or similar evasion and a successful Intellect attack roll, prevent a living foe from attacking anyone or anything for one round. Action.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "Seize the Initiative",
    Stat: "Intellect",
    Cost: "5",
    Tier: "6",
    Effect:
      "Within one minute of successfully using Draw Conclusion, take one additional, immediate action out of turn. Can’t use again until after 10 hours rest. Enabler.",
  },
  {
    Focus: "Solves Mysteries",
    Ability: "Greater Skill With Defense",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "Choose one type of defense task, even one in which you are already trained: Might, Speed, or Intellect. You are trained in defense tasks of that type, or specialized if already trained. Can select up to three times, each time choosing a different type. Enabler.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Authority",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "Your air of authority is an asset for all social interactions. Some people may react negatively, hindering interactions. Enabler.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Driver",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect: "You are trained in driving. Enabler.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Armed Response",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are practiced with guns and suffer no penalty when using one. Enabler.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Command",
    Stat: "Intellect",
    Cost: "3",
    Tier: "2",
    Effect:
      "Issue a simple command to one target within short range who can understand you. The target attempts to carry out the command as its next action if you succeed on an Intellect attack. The command cannot inflict direct harm and is limited to one action. The target can still defend itself and attack if able. Action.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Cool Under Fire",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect: "You are trained in Speed defense tasks. Enabler.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Insider",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "You have access to information known only to law enforcement, including case details, identities, and missing persons information. Enabler.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Rapid Attack",
    Stat: "Speed",
    Cost: "3",
    Tier: "4",
    Effect:
      "Once per round, you can make an additional attack with your gun. Enabler.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Encouraging Presence",
    Stat: "Intellect",
    Cost: "2",
    Tier: "5",
    Effect:
      "For one minute, allies within short range gain an asset on defense rolls. Action.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Skill With Defense",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect:
      "Choose one type of defense task in which you are not already trained: Might, Speed, or Intellect. You are trained in defense tasks of that type. Enabler.",
  },
  {
    Focus: "Wears a Badge",
    Ability: "Greater Enhanced Might or Speed",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "You gain 6 points to your Might Pool, or 6 points to your Speed Pool, or split 6 points between them. Enabler.",
    PoolStats: ["Might", "Speed"],
    PoolIncrease: 6,
  },
  {
    Focus: "Wears a Badge",
    Ability: "Close to the Chief",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "You are well-respected by the chief of police. Gain access to case files, backup, and assistance, with discretion. Enabler.",
  },
  {
    Focus: "Works the Back Alleys",
    Ability: "Stealthy",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "You are trained in your choice of two skills: deception, discerning motive, disguise, lockpicking, pickpocketing, or stealth. You can select this multiple times, choosing different skills each time. Enabler.",
  },
  {
    Focus: "Works the Back Alleys",
    Ability: "Underworld Contacts",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect:
      "You know many people in communities that engage in illegal activities. They may recognize you as a peer and might owe you a favor. Work with GM to define 3–4 underworld contacts. Enabler.",
  },
  {
    Focus: "Works the Back Alleys",
    Ability: "Pull a Fast One",
    Stat: "Intellect",
    Cost: "3",
    Tier: "3",
    Effect:
      "When running a con, picking a pocket, tricking a dupe, sneaking something by a guard, etc., you gain an asset on the task. Enabler.",
  },
  {
    Focus: "Works the Back Alleys",
    Ability: "I Know a Guy",
    Stat: "Intellect",
    Cost: "4",
    Tier: "3",
    Effect:
      "You can call upon a contact from the underworld for solutions to difficult challenges, typically requiring 3–7 days to set up. They may want payment or a favor. Enabler.",
  },
  {
    Focus: "Works the Back Alleys",
    Ability: "Master Thief",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect: "You are trained in gymnastics and lockpicking. Enabler.",
  },
  {
    Focus: "Works the Back Alleys",
    Ability: "Dirty Fighter",
    Stat: "Speed",
    Cost: "2",
    Tier: "5",
    Effect:
      "You distract, blind, annoy, hamper, or otherwise interfere with a foe, hindering their attacks and defenses for one minute. Action.",
  },
  {
    Focus: "Works the Back Alleys",
    Ability: "Alley Rat",
    Stat: "Intellect",
    Cost: "6",
    Tier: "6",
    Effect:
      "While in a city, you find or create a significant shortcut, secret entrance, or emergency escape route. Requires a successful Intellect action. Action.",
  },
  {
    Focus: "Works the Back Alleys",
    Ability: "All-Out Con",
    Stat: "Intellect",
    Cost: "7",
    Tier: "6",
    Effect:
      "You add three free levels of Effort to the next task you attempt. Can’t be used again until after a ten-hour recovery. Action.",
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Knowledge Is Power",
    Stat: "",
    Cost: "",
    Tier: "1",
    Effect:
      "Choose two noncombat skills in which you are not trained. You are trained in those skills. Enabler.",
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Greater Enhanced Intellect",
    Stat: "",
    Cost: "",
    Tier: "2",
    Effect: "You gain 6 points to your Intellect Pool. Enabler.",
    PoolStats: ["Intellect"],
    PoolIncrease: 6,
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Applying Your Knowledge",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "When you help another character undertake any action that you’re untrained in, you are treated as if you are trained in it (granting two assets to their task instead of one). Action.",
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Flex Skill",
    Stat: "",
    Cost: "",
    Tier: "3",
    Effect:
      "At the beginning of each day, choose one task (other than attacks or defense) on which you will concentrate. For the rest of that day, you’re trained in that task. Cannot be used with a skill in which you’re already trained to become specialized. Enabler.",
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Knowledge Is Power",
    Stat: "",
    Cost: "",
    Tier: "4",
    Effect:
      "Choose two noncombat skills in which you are not trained. You are trained in those skills. Enabler.",
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Knowing the Unknown",
    Stat: "Intellect",
    Cost: "6",
    Tier: "4",
    Effect:
      "By accessing appropriate resources, you can ask the GM one question and get a general answer. GM assigns a difficulty level (1–7). Gaining knowledge of the future is impossible. Action.",
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Greater Enhanced Intellect",
    Stat: "",
    Cost: "",
    Tier: "5",
    Effect: "You gain 6 points to your Intellect Pool. Enabler.",
    PoolStats: ["Intellect"],
    PoolIncrease: 6,
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Tower of Intellect",
    Stat: "",
    Cost: "",
    Tier: "6",
    Effect:
      "You are trained in Intellect defense tasks. If already trained, you are specialized instead. Also gain Knowledge Is Power (choose two noncombat skills you are not trained in). Enabler.",
  },
  {
    Focus: "Would Rather Be Reading",
    Ability: "Credible Hypothesis",
    Stat: "Intellect",
    Cost: "4",
    Tier: "6",
    Effect:
      "Examine an area and learn precise, useful details about the past if you succeed on a difficulty 3 Intellect-based roll. Ask the GM up to four questions; each requires its own roll. Action. Also gain Knowledge Is Power (choose two noncombat skills).",
  },
];
