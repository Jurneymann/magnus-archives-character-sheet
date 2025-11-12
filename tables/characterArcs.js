const CHARACTER_ARCS = [
  {
    name: "Aid a Friend",
    description: `Someone needs your help. When a PC friend takes a character arc, you can select this arc to help them with whatever their arc is (if appropriate). 
The steps and climax depend entirely on their chosen arc. If the friend is an NPC, the steps and climax are lifted from another arc appropriate to whatever they seek to do. It’s difficult, but possible, to aid a friend with an arc even if that friend is unwilling to accept (or is ignorant of) your help. 
The cost and rewards for a character with this arc are the same as those described in the original character arc.`,
  },
  {
    name: "Assist an Organisation",
    description: `You set out to accomplish something that will further an organization. You’re probably allied with them, you work for them, or they are rewarding you for your help in some fashion. 
If this arc is selected in respect to the organization that the PCs work for (perhaps the Magnus Institute), the arc should cover a specific task, so that it can have an obvious beginning, middle, and end.`,
  },
  {
    name: "Avenge",
    description: `Someone close to you or important to you in some way has been wronged.
The most overt version of this arc would be to avenge someone’s death. Avenging is different than revenge, as revenge is personal—you are the wronged party. But in the Avenge character arc, you are avenging a wrong done to someone else.`,
  },
  {
    name: "Birth",
    description: `You are becoming a parent. 
The Birth character arc assumes you already have a partner or a surrogate. If you want your character to find a romantic partner or spouse, you can use the Romance arc. And of course, nonhuman characters might reproduce in other ways. 
This arc is usually followed by the Raise a Child arc.`,
  },
  {
    name: "Build",
    description: `You are going to build a physical structure—a house, a workshop, a lab, and so on. This arc would also cover renovating an existing structure or substantially adding to one. 
You might be hiring builders or contractors to help or do the work for you, but working with them is still a part of your arc. For instance, a character might decide that the institute employing them needs a dedicated MRI machine to check for signs of a new kind of corruption. 
In some situations, the PCs might be forced to set up their own base of operations if they discover that the organization they conduct investigations for has been compromised.`,
  },
  {
    name: "Cleanse",
    description: `Someone or something has been contaminated by supernatural forces, and you want to rid them of such influences. This could also be a curse, a possession, an infestation, or something else, such as a plague of silver worms in the attic.`,
  },
  {
    name: "Creation",
    description: `You want to make something. This might be a painting, a novel, a machine, or even an artefact. The creation might be for the character’s personal development, or it could be more central to the situation, such as an Occultist wanting to build an arcane machine that detects watchful spiders sent by The Web.`,
  },
  {
    name: "Defeat a Foe",
    description: `Someone stands in your way or is threatening you. You must overcome the challenge they represent. 
Defeat doesn’t always mean kill or even fight. Defeating a foe could mean beating them in a chess match or in a race to find a specific long-lost book. Or something as monumental as trying to prevent a new Avatar from attempting a ritual.`,
  },
  {
    name: "Defense",
    description: `A person, place, or thing is threatened, and you want to protect it.`,
  },
  {
    name: "Develop a Bond",
    description: `You want to get closer to another character. 
This might be to make a friend, find a mentor, or establish a contact in a position of power. It might be to turn a friend into a much closer friend. 
The character might be an NPC or a PC.`,
  },
  {
    name: "Enterprise",
    description: `You want to create and run a business or start an organization. 
Maybe you want to start your own podcast detailing your investigations into the supernatural. Maybe you like baking and you want to start a catering service. Or maybe you want to start a secret society to oppose the Entities. 
You’ll almost certainly have to make new connections, find (and somehow pay for) a location, and deal with all manner of administrative duties.`,
  },
  {
    name: "Establishment",
    description: `You want to prove yourself as someone of importance. This can take many forms—socially, within your occupation, financially, or even romantically. 
For example, a character may wish to establish themselves as a paramount researcher within their institute’s investigation arm.`,
  },
  {
    name: "Explore",
    description: `Something out there is unknown and you want to explore its secrets. This is most likely an area of wilderness, a hidden location (like a lost city or an island that shouldn’t exist), or even an otherworldly dimension created by one of the Entities.`,
  },
  {
    name: "Fall From Grace",
    description: `This is an odd character arc in that it’s (presumably) not something that a character would want. It is something a player selects on a meta level for the character because it makes for an interesting story. It also sets up the potential for future arcs, such as Redemption. 
It’s important that this involve actions you take. For example, you fall into substance abuse. You treat people badly. You make mistakes that endanger others. You ally yourself with the People’s Church of the Divine Host. In other words, the fall isn’t orchestrated by someone else—it’s all your own doing.`,
  },
  {
    name: "Finish a Great Work",
    description: `Something that was begun in the past must now be completed. This might involve destroying an artefact such as the pestilent scalpel, finishing the construction of a monument, organizing an archive with an uncatalogued collection of files, or uncovering a lost temple forgotten to the ages.`,
  },
  {
    name: "Growth",
    description: `Willingly or unwillingly, you are going to change. This is another meta arc. It’s less about a goal and more about character development. 
While it’s possible that the growth involved is intentional, in most people’s lives and stories, it is emergent. A character might become less selfish, braver, or a better leader, or experience some other form of growth.`,
  },
  {
    name: "Instruction",
    description: `You teach a pupil. You have knowledge on a topic and are willing to share. This can be a skill, an area of lore, a combat style, or the use of a special ability. 
This is usually a fairly long-term arc. Sometimes teaching a pupil is a side matter, and sometimes the pupil takes on more of an apprentice role and spends a great deal of time with you, traveling with you and perhaps even living in your house (or you living in theirs). 
For example, you may decide (or be asked) to mentor a new member of your institute.`,
  },
  {
    name: "Join an Organisation",
    description: `You want to join an organization. This might be anything from getting a job at a major corporation to infiltrating a cult (such as the Cult of the Lightless Flame) to joining a secret police force that takes on supernatural cases.`,
  },
  {
    name: "Justice",
    description: `You try to right a wrong or bring a wrongdoer to justice. Hunting down and destroying a vampire can be gaining justice, but so can turning over evidence of a smuggling operation to the police. It can even be taking in a family whose home was destroyed in a fire started by The Chosen of Flame.`,
  },
  {
    name: "Learn",
    description: `You want to learn something. 
This isn’t the same as the Uncover a Secret arc, in which you’re looking for a bit of information. This is a skill or whole area of knowledge you want to gain proficiency with. 
This is learning a new language, how to play an instrument, or how to be a good cook. Thus, it’s not about gaining a skill rank in endurance, but about learning to be an experienced skydiver.`,
  },
  {
    name: "Master a Skill",
    description: `You’re skilled, but you want to become the best. This arc might logically follow the Learn arc. As with the Learn arc, this can involve any kind of training at all, not just a skill.`,
  },
  {
    name: "Mysterious Background",
    description: `You don’t know who your parents were, but you want to find out. You saw something terrifying as a child and now that you’re an adult, you want to learn what it was. Maybe you were born with a mysterious mark on the back of your neck that resembles a bewebbed occult symbol, and you want to learn why. 
In any case, you want to know where you come from—there’s some kind of mystery in your past.`,
  },
  {
    name: "New Discovery",
    description: `You want to invent a new device, process, spell, or something similar. 
While similar to the Creation arc and the Learn arc, the New Discovery arc involves blazing a new trail. No one can teach you what you want to know. You’ve got to do it on your own.`,
  },
  {
    name: "Raise a Child",
    description: `You raise a child to adulthood. It can be your biological child or one you adopt. It can even be a child taken under your wing, more a young protégé than a son or daughter. This is obviously a very long-term arc.`,
  },
  {
    name: "Recover From a Wound (or Trauma)",
    description: `You need to heal. This isn’t just for healing simple damage. This involves recovering from a major debilitating injury, illness, or shock, maybe after an encounter with a powerful avatar. 
Severe damage, the loss of a body part, and emotional trauma all fall into this category.`,
  },
  {
    name: "Redemption",
    description: `You’ve done something very wrong, but you want to atone and make it right again. 
This is like the Justice arc or the Undo a Wrong arc, except you are the wrongdoer. This could be a follow-up to the Fall From Grace arc, when you want to make up for allying yourself with the People’s Church of the Divine Host.`,
  },
  {
    name: "Repay a Debt",
    description: `You owe someone something, and it’s time to make good. For instance, maybe The Vampire Hunter helped you survive a plague of vampires and has since made it clear they could use some help in return.`,
  },
  {
    name: "Rescue",
    description: `Someone or something of great importance has been taken, and you want to get them or it back. 
For instance, maybe a couple of deliverymen threw your best mate into a van and drove off. Now it’s on you to get them back.`,
  },
  {
    name: "Restoration",
    description: `You’re down but not out. You want to restore your good name. Recover what you’ve lost. Rebuild what has been destroyed. You’ve fallen down or have been knocked down, but either way, you want to pick yourself up. 
This is a possible follow-up to the Fall From Grace arc, or perhaps you can take this arc if your institute is infiltrated or completely destroyed.`,
  },
  {
    name: "Revenge",
    description: `Someone did something that harmed you. Unlike the Avenge arc, this arc probably isn’t about tracking down a murderer, but it might involve pursuing someone who stole from you, hurt you, or otherwise brought you grief. 
The key is that it’s personal. Otherwise, use the Justice arc. For instance, maybe an artefact dealer named Mikaele Salesa sold you what turned out to be a horribly cursed object that led to the deaths of people you know.`,
  },
  {
    name: "Romance",
    description: `You want to strike up a relationship with a romantic partner. Perhaps you have a specific person in mind, or maybe you’re just interested in a relationship in general.`,
  },
  {
    name: "Solve a Mystery",
    description: `Different from the Learn arc and the Uncover a Secret arc, this arc is about solving a crime or a similar action committed in the fairly recent past. 
It’s not about practice or study, but about questions and answers. In theory, the mystery doesn’t have to be a crime. 
It might be “Why is this strange caustic substance leaking into my basement?” or “Why does it seem like more and more people I meet have no inner life at all, no actual subjective experience?”`,
  },
  {
    name: "Theft",
    description: `Someone else has something you want, or something they absolutely should not have. For instance, you acquired one of Death’s game pieces at great personal cost, but now someone has stolen it from you, and you’d like it back.`,
  },
  {
    name: "Train a Creature",
    description: `You want to domesticate and train an animal. While the beast doesn’t need to be wild, it must not already be domesticated and trained. 
For instance, maybe you want to obtain an animal friend for your friend’s cat, The Admiral, from a nearby animal shelter.`,
  },
  {
    name: "Transformation",
    description: `You want to be different in a specific way. Because the Growth arc covers internal change, this one focuses primarily on external change. 
This could take many forms, from wanting to be more physically fit to becoming an Avatar. For the change to be an arc, it should be difficult and perhaps risky.`,
  },
  {
    name: "Uncover a Secret",
    description: `There is knowledge out there that you want. It could be an attempt to find and learn a specific special ability. 
This could also be a search for a lost key to an important safe deposit box that holds clues regarding a ritual, the true leader of a secret cult, the secret background of an important person, or how the ancients constructed that strange monolith.`,
  },
  {
    name: "Undo a Wrong",
    description: `Someone did something horrible, and its ramifications are still felt, even if it happened long ago. You seek to undo the damage, or at least stop it from continuing. 
This is different from the Justice arc because this isn’t about justice (or even revenge). It’s about literally undoing something bad that happened in the past, such as rebuilding a family’s home that burned down (as opposed to merely taking them in), cleaning out a basement filled with cockroaches spread by an Avatar, or restoring a long-missing artefact stolen from a museum.`,
  },
];
