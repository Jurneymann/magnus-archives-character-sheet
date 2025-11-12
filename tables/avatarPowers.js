const ENTITY_TAROT_IMAGES = {
  "The Buried": "the_buried.jpg",
  "The Corruption": "the_corruption.jpg",
  "The Dark": "the_dark.jpg",
  "The Desolation": "the_desolation.jpg",
  "The End": "the_end.jpg",
  "The Eye": "the_eye.jpg",
  "The Flesh": "the_flesh.jpg",
  "The Hunt": "the_hunt.jpg",
  "The Lonely": "the_lonely.jpg",
  "The Slaughter": "the_slaughter.jpg",
  "The Spiral": "the_spiral.jpg",
  "The Stranger": "the_stranger.jpg",
  "The Vast": "the_vast.jpg",
  "The Web": "the_web.jpg",
};

const ENTITIES = [
  {
    name: "The Buried",
    description:
      "The weight above is unbearable… until it isn’t. Down here, there is no sound, no expectation — only the still, endless hush of the earth pressing close. You tell yourself it’s a prison, but deep down you know: it’s home.",
  },
  {
    name: "The Corruption",
    description:
      "Something festers beneath your skin. It begins as a blemish — a spot, a sting, a tickle. Then it spreads, warm and alive, until you can’t tell where you end and the rot begins. You’ve begun to understand its purpose: to spread, to consume, to thrive in what others discard.",
  },
  {
    name: "The Dark",
    description:
      "The dark is older than mercy, older than sight. It waits, patient and endless, until you remember that light was never your ally. In the black, you are not lost — you are found, and it has been waiting for you.",
  },
  {
    name: "The Desolation",
    description:
      "Fire does not ask permission; it simply devours. In its blaze, everything false is stripped away, until only pain remains — clean, radiant, true. You are what’s left when the world burns down.",
  },
  {
    name: "The End",
    description:
      "You thought death was an ending. The peace it offers is absolute, cold, and final. You need only stop running. You walk with the quiet certainty of a closing chapter. No matter which path you choose, all roads now lead to stillness, because death is not coming for you. It’s already here.",
  },
  {
    name: "The Eye",
    description:
      "You cannot close your eyes anymore. Truth seeps through lids and walls alike. Every secret revealed, every hidden thing dragged into light. You thought knowing would save you; now you know better.",
  },
  {
    name: "The Flesh",
    description:
      "The body was never a cage — it was clay. Soft. Malleable. Eager. You’ve felt the pulse beneath your skin, begging to be remade. It hurts, yes, but only because you are still resisting the change. You’re not sure what you’re becoming, only that it’s hungry. And you’re starting to like the way it feels.",
  },
  {
    name: "The Hunt",
    description:
      "There is no thought in pursuit, only rhythm. Heartbeat, breath, motion — the world narrowing to the space between you and what flees. The chase is the truth, and you have never felt so alive. You are the predator now.",
  },
  {
    name: "The Lonely",
    description:
      "The noise of others fades until only silence remains. It hurts at first — the emptiness, the ache — but soon you realize it’s cleaner this way. Their voices grate. Their presence clings. You’ve learned that solitude isn’t emptiness: it’s clarity. And every time someone draws close, it feels like a violation. They don't belong in your silence.",
  },
  {
    name: "The Slaughter",
    description:
      "Violence is an old god. It doesn’t whisper — it roars in your veins, a rhythm older than language. You don’t seek cruelty, only the moment when blood and purpose become the same thing.",
  },
  {
    name: "The Spiral",
    description:
      "The world tilts and folds, and meaning slips through your fingers like water. You tell yourself you can find the pattern if you just look hard enough — but the pattern is looking back, and it’s smiling.",
  },
  {
    name: "The Stranger",
    description:
      "You move like them, sound like them, almost feel like them. But you’re not. Not really. You’re just close enough to pass. You could tell them who you are, but wouldn’t that ruin the fun? Every flinch, every uncertain glance is a reminder that they see you, but not quite.And the moment they notice something’s wrong? That’s your favourite part.",
  },
  {
    name: "The Vast",
    description:
      "The sky yawns wide and endless, and the wind sings freedom and doom alike. There is no up, no down, only falling forever. You are adrift in the infinite, and the more you fall, the more you crave the wind’s embrace.",
  },
  {
    name: "The Web",
    description:
      "You see the strands now. Every choice, every movement, every fragile knot. The pattern is perfect, elegant, alive. You thought you were free, but every move you make hums along its threads. The secret isn’t escape — it’s learning which strands to pluck to make the world dance.",
  },
];

const AVATAR_POWERS = [
  {
    name: "Sense Avatar",
    description: `You can identify another Avatar as such if you can perceive them normally and are nearby. 
This normally requires no roll or action on your part. 
An Avatar can attempt to hide their status as an Avatar, but you can still use an action to try to identify them with an Intellect-based task.`,
    cost: 0,
    stress: 0,
    fear: null,
  },
  {
    name: "Sense Supernatural Activity",
    description: `If a supernatural creature, artefact, book, or effect is within immediate range, you can sense its presence. Action.`,
    cost: 2,
    stress: 2,
    fear: null,
  },
  {
    name: "Claustrophobia",
    description:
      "A creature you touch is gripped with the sensation that whatever is near them (the walls of the room, the people around them, trees in a forest) is closing in. They feel suffocation is a serious threat. They suffer 3 points of Stress (3 points of damage if an NPC) and 3 more points of Stress (or 3 points of damage) each round as long as you continue to make successful rolls against them each round. You must use your action each round to concentrate on the effect. Action.",
    cost: 4,
    stress: 3,
    fear: "The Buried",
  },
  {
    name: "Crushing Debt",
    description:
      "A creature you touch is immediately targeted by an apparently real debt-collection agency, either by text, email, or direct contact by an agent. The debt seems credible to the affected creature, and they feel ruinous bankruptcy is imminent, with every other problem they have crowding into their mind. They suffer 3 points of Stress (3 points of damage if an NPC) and 3 more points of Stress (or 3 points of damage) each round as long as you continue to make successful rolls against them each round. You must use your action each round to concentrate on the effect. When the effect ends, the debt collection agency realizes they targeted the character by mistake or stops their attempts to collect the debt for some other reason. Action to initiate.",
    cost: 4,
    stress: 3,
    fear: "The Buried",
  },
  {
    name: "Drown",
    description:
      "A creature you touch who is holding some sort of liquid (such as a cup of tea) or who is within immediate range of even a small amount of liquid suffers an unfortunate accident: their tea goes down wrong, they trip and land face-first into a sink or tub, they fall in a river, or they are otherwise assaulted by water that gets into their lungs. They suffer 3 points of Stress (3 points of damage if an NPC) and 3 more points of Stress (or 3 points of damage) each round as long as you continue to make successful rolls against them each round. You must use your action each round to concentrate on the effect. Action to initiate.",
    cost: 4,
    stress: 3,
    fear: "The Buried",
  },
  {
    name: "Crawling Corruption",
    description:
      "Teeming cockroaches, maggots, or other insects popularly associated with rot burst from a creature’s body at the place where you touch them. They suffer a serious injury (or 6 points of damage if an NPC). Action.",
    cost: 4,
    stress: 3,
    fear: "The Corruption",
  },
  {
    name: "Touch of Decay",
    description:
      "An inanimate object no larger than you that you touch rots and falls apart as if it aged five hundred years in an instant. For example, if the object is wood or cloth, it crumbles to nothing; if it is metal, it likely rusts and corrodes, probably useless; and if it is stone, it might weather a bit, but it changes very little. If you touch a living creature, they suffer a serious injury (or 6 points of damage if an NPC). Action.",
    cost: 4,
    stress: 3,
    fear: "The Corruption",
  },
  {
    name: "Vile Fondness",
    description:
      "A creature you touch gains a sudden attraction to something most consider vile, such as the infectious disease wing of a hospital or a former lover they previously left for being 'toxic.' Targets remain newly enamored for about a day, or until they suffer a serious repercussion from their new fondness. Action.",
    cost: 4,
    stress: 3,
    fear: "The Corruption",
  },
  {
    name: "Blinding Touch",
    description:
      "A creature you touch is blinded for one minute, during which time they suffer 1 point of Stress every few rounds, to a maximum of 3 (3 points of damage if an NPC) from anxiety and/or by accidentally hurting themselves while trying to move without being able to see. Action.",
    cost: 4,
    stress: 3,
    fear: "The Dark",
  },
  {
    name: "Brackish Gloom",
    description:
      "Chill, brackish water pours from you in dark rivulets, creating a small pool of cold, black, salty water on the ground around you. The water doesn’t impede you, but foes’ attacks against you are hindered by two steps while the water persists (up to ten minutes, or until you end the effect or move more than an immediate distance). Action to initiate.",
    cost: 4,
    stress: 3,
    fear: "The Dark",
  },
  {
    name: "The Unseen",
    description:
      "Invisible hands reach out of the shadows or from beneath or around nearby objects, attacking up to five different targets. Targets struck are immobilized with cold and terror for the next two rounds. Action.",
    cost: 4,
    stress: 3,
    fear: "The Dark",
  },
  {
    name: "Candle Flesh",
    description:
      "Your waxy flesh becomes as warm as a burning candle and just as malleable. You spend this round molding your wounds back into shape and ascend one step on the damage track. Action.",
    cost: 4,
    stress: 3,
    fear: "The Desolation",
  },
  {
    name: "Conflagration",
    description:
      "You summon a burst of heat and flame at a spot near you. Everything within an immediate area suffers 5 points of damage (or a serious injury if it is a PC). Flammable objects may catch fire. Action.",
    cost: 4,
    stress: 3,
    fear: "The Desolation",
  },
  {
    name: "Fiery Shimmer",
    description:
      "Your skin glows as if it’s a thin screen between the world and a raging bonfire for one hour. During that period, you gain an extra step on the damage track and are immune to damage from fire or heat. Action.",
    cost: 4,
    stress: 3,
    fear: "The Desolation",
  },
  {
    name: "Deathless Avatar",
    description:
      "If you descend every step on the damage track and die, you come back to life next round on the second-to-last step of the damage track if you have at least 4 Intellect points left, and you spend 4 of them to trigger this ability. Each time you use this ability, reduce your Intellect Pool by 2. Enabler.",
    cost: 4,
    stress: 3,
    fear: "The End",
  },
  {
    name: "The Inevitable",
    description:
      "A creature of level 3 or less that you touch sustains 5 points of damage and 5 more points of damage each round as long as you continue to make successful rolls against them. You must use your action each round to concentrate on the effect. For each additional level of Effort you apply, you can increase the level of the target by 1. Action.",
    cost: 4,
    stress: 3,
    fear: "The End",
  },
  {
    name: "Skull Visage",
    description:
      "Your visage changes, flashing briefly from normal to that of a terrifying animated skull. Up to five targets you choose who can see you are immobilized with fear of imminent death for the next two rounds if they’re affected by your attack. Action.",
    cost: 4,
    stress: 3,
    fear: "The End",
  },
  {
    name: "Hyper Cognizance",
    description:
      "You gain exceptional awareness of everything around you for ten minutes. During that period you can see things that are normally invisible, and attacks or other tasks that rely on sight are eased by two steps. Action to initiate.",
    cost: 4,
    stress: 3,
    fear: "The Eye",
  },
  {
    name: "Modify Memory",
    description:
      "A target within short range you successfully make an Intellect attack against gains a short memory that’s not their own, or a piece of information (or disinformation). Alternatively, you can use this ability to insert visual information up to one round in length into recorded surveillance camera footage. Action.",
    cost: 4,
    stress: 3,
    fear: "The Eye",
  },
  {
    name: "Truth",
    description:
      "You learn a pertinent fact you didn’t already know about a nearby creature, no roll needed. Action.",
    cost: 4,
    stress: 3,
    fear: "The Eye",
  },
  {
    name: "Crawling Form",
    description:
      "You disfigure a creature you touch, causing its limbs to fuse together for at least ten minutes, during which time it can’t move except by squirming and rolling. Action.",
    cost: 4,
    stress: 3,
    fear: "The Flesh",
  },
  {
    name: "Twisted Form",
    description:
      "You disfigure a creature you touch in a way of your choosing. The change is primarily cosmetic, although it is very painful. The creature suffers 4 points of damage (or a serious injury if a PC). It is possible to use this ability to improve (or at least not worsen) the creature’s appearance, but doing so is difficult and requires a full minute of work and an Intellect-based roll on your part with a difficulty of 6. Action (or action to initiate).",
    cost: 4,
    stress: 3,
    fear: "The Flesh",
  },
  {
    name: "Unholy Hunger",
    description:
      "A creature of level 4 or less that you touch takes a hungry bite from their own flesh, taking 3 points of damage and 3 more points of damage each round as long as you continue to make successful rolls against them. You must use your action each round to concentrate on the effect. For each additional level of Effort you apply, you can increase the level of the target by 1. Action to initiate.",
    cost: 4,
    stress: 3,
    fear: "The Flesh",
  },
  {
    name: "Hairy on the Inside",
    description:
      "For ten minutes, your form becomes more bestial and you gain +8 to your Might Pool, +1 to your Might Edge, +2 to your Speed Pool, and +1 to your Speed Edge. While this ability is active, you can’t spend Intellect points for any reason other than to try to change to your normal form before the ten-minute duration is over (a difficulty 2 task). Action to change; action to change back.",
    cost: 4,
    stress: 3,
    fear: "The Hunt",
    PoolBonusStats: "Might" / "Speed",
    PoolBonus: 8 / 2,
    EdgeBonusStats: "Might" / "Speed",
    EdgeBonus: 1 / 1,
  },
  {
    name: "Hunting Scream",
    description:
      "Up to three targets in long range who hear your hunting scream, whistle, song, or other loud utterance who you successfully attack are terrified, freezing in place or running away as fast as they can (your choice) for two rounds. Action.",
    cost: 4,
    stress: 3,
    fear: "The Hunt",
  },
  {
    name: "Stalk and Kill",
    description:
      "You designate a nearby creature as your prey. For the next hour, any task involving finding, following, or attacking your prey is eased. Action.",
    cost: 4,
    stress: 3,
    fear: "The Hunt",
  },
  {
    name: "Call the Crowd",
    description:
      "You summon a lonesome crowd to a barely populated area within a long distance of yourself. The lonesome crowd acts according to its nature but never targets you as a victim. Usually, the crowd disperses within about ten minutes. Action.",
    cost: 4,
    stress: 3,
    fear: "The Lonely",
  },
  {
    name: "The Fog",
    description:
      "You summon a patch of rolling, heavy fog that fills a very long area for one hour. Visibility in the fog is reduced to immediate range. Action.",
    cost: 4,
    stress: 3,
    fear: "The Lonely",
  },
  {
    name: "Isolation",
    description:
      "A creature you touch becomes utterly unaware of anyone around them for one hour. They cannot sense other people or creatures in any way, unless another creature spends a few rounds slapping them and calling their name, or until they take damage. Action.",
    cost: 4,
    stress: 3,
    fear: "The Lonely",
  },
  {
    name: "Fatigue of Battle",
    description:
      "A target you touch suddenly recalls a traumatic event they survived in the past (or someone else’s event, if they have none). This flare-up lasts about a minute, during which time the range of physical and emotional effects hinders their tasks. They also suffer 1 point of Stress every round or two, to a maximum of 4 (4 points of damage if an NPC). Action.",
    cost: 4,
    stress: 3,
    fear: "The Slaughter",
  },
  {
    name: "March to the Pipes",
    description:
      "You produce music (by whistling, singing, or playing an instrument such as bagpipes), causing up to five targets of level 3 or less within long range to move in a regimented fashion in a direction you wish, taking no other actions on their turn. The affected targets continue marching each round as long as you continue to make successful rolls against them. You must use your action each round to concentrate on the effect. For each additional level of Effort you apply, you can increase the level of the targets by 1. Action to initiate. If you attempt to use March to the Pipes to march targets directly to their doom, such as off a cliff, you must make one additional successful roll to compel them onward.",
    cost: 4,
    stress: 3,
    fear: "The Slaughter",
  },
  {
    name: "The Spirit of War",
    description:
      "A creature within short range loses themself to rage and, as their next action, attacks the creature nearest to them (not themselves, and if there are no nearer creatures, they attack you). They use whatever means available to inflict the most harm. For every creature near to them that is already engaged in violent action when this takes effect, another round is added to the duration, up to a total of three rounds. Action.",
    cost: 4,
    stress: 3,
    fear: "The Slaughter",
  },
  {
    name: "Door to Elsewhere",
    description:
      "You access a location you know about by causing one door to appear within immediate range and another door to appear at the location you seek. The doors last for one minute or until you use them to move to the new location as another action. If you can’t create a door, it could be because the location is protected, you don’t know enough about it, or it no longer exists. Action.",
    cost: 4,
    stress: 3,
    fear: "The Spiral",
  },
  {
    name: "Inverted World",
    description:
      "You take control of all the senses of a creature you touch for one minute (six rounds). You make them see, hear, and feel whatever you desire. If the alterations you create are hindering or distracting, their actions are hindered. Otherwise, you can also cause them to suffer 1 point of Stress per round (1 point of damage if they are an NPC) by having them experience something horrific. Action.",
    cost: 4,
    stress: 3,
    fear: "The Spiral",
  },
  {
    name: "Send to the Maze",
    description:
      "A creature of level 3 or less that you touch is banished to the realm of The Spiral for one round, during which time they take 3 points of damage and 3 more points of damage each round as long as you continue to make successful rolls against them. You must use your action each round to concentrate on the effect. For each additional level of Effort you apply, you can increase the level of the target by 1. When the effect ends, the target appears either at the spot from which you banished them, or at a location where you’ve previously encountered them. Action.",
    cost: 4,
    stress: 3,
    fear: "The Spiral",
  },
  {
    name: "Embracing the Unknown",
    description:
      "All creatures within short range become unable to recognize anyone they see, whether friend or enemy. Nothing will allow them to recognize, distinguish, or remember anyone for one round. For each additional level of Effort you apply, you can increase the duration of this effect by one round. Action.",
    cost: 4,
    stress: 3,
    fear: "The Stranger",
  },
  {
    name: "Monstrous Stranger",
    description:
      "Your body elongates for one minute, stretching into a long, thin monster with sticklike limbs that have too many joints. In this form, you are practiced in unarmed combat, your unarmed combat attacks deal +2 points of damage, and your unarmed melee attack actions are eased. Action.",
    cost: 4,
    stress: 3,
    fear: "The Stranger",
  },
  {
    name: "Stranger to Pain",
    description:
      "For one day, you can’t be dazed or stunned by physical attacks and are immune to most poisons and diseases. Action.",
    cost: 4,
    stress: 3,
    fear: "The Stranger",
  },
  {
    name: "Hurl into the Void",
    description:
      "A close creature you designate (one that you can see and can see you) believes they are flung backward and beginning to fall into an infinite abyss. They lose their next action as they struggle and flail about. The experience causes them to suffer 3 points of damage from the shock (3 points of Stress if a PC). Action.",
    cost: 4,
    stress: 3,
    fear: "The Vast",
  },
  {
    name: "Image of a Colossus",
    description:
      "A creature you touch is subject to a vision of an unfathomably, terrifyingly large creature in the distance. The terrified target freezes in place or flees as fast as they can (your choice) this round. They remain frozen or keep fleeing as long as you continue to make a successful roll against them each round. You must use your action each round to concentrate on the effect. Action to initiate.",
    cost: 4,
    stress: 3,
    fear: "The Vast",
  },
  {
    name: "Wings of the Vast",
    description:
      "You are taken up into the sky as suddenly as if plucked into the air by an invisible titan. For the next ten minutes, you can fly a long distance each round. Action.",
    cost: 4,
    stress: 3,
    fear: "The Vast",
  },
  {
    name: "Friend to the Bewebbed",
    description:
      "You summon a bewebbed puppet, which appears within a few rounds (as if it had been lingering somewhere nearby) and does your bidding for the next hour, until you dismiss it, or until it is destroyed. Action.",
    cost: 4,
    stress: 3,
    fear: "The Web",
  },
  {
    name: "Many-eyed Spies",
    description:
      "If you want to know what’s happening at a location you’re familiar with, extra spiders turn up there within the hour. Unless all are found and eliminated, you know what’s happening there for the next day. If your eight-legged spies fail to find the location you want to spy on, it could be because the location is protected, you don’t know enough about it, or it no longer exists. Action.",
    cost: 4,
    stress: 3,
    fear: "The Web",
  },
  {
    name: "Puppet on a String",
    description:
      "You silently (psychically) implant a command in the mind of a creature you touch. You designate an event that will trigger the command that can be summarized in a single, short sentence. When the triggering event occurs, the target must carry out the command to the best of their ability. The command can be fairly intricate and require up to 24 hours to complete, but it cannot involve direct harm to the creature or anyone important to them. It also cannot be something obviously impossible for the target to do. Action.",
    cost: 4,
    stress: 3,
    fear: "The Web",
  },
];
