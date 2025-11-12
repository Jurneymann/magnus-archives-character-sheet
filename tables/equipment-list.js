// Weapons Table
const WEAPONS_DATA = [
  {
    Item: "Ammo (box of 50 rounds)",
    Value: "Inexpensive",
    Damage: "-",
    Notes: "",
  },
  {
    Item: "Knife",
    Value: "Inexpensive",
    Damage: "Light weapon",
    Notes: "Prone to breaking",
  },
  {
    Item: "Pepper spray",
    Value: "Inexpensive",
    Damage: "-",
    Notes: "Immediate range, hinders target’s tasks for one round",
  },
  {
    Item: "Baton/nightstick",
    Value: "Moderately Priced",
    Damage: "Light weapon",
    Notes: "",
  },
  {
    Item: "Hand axe",
    Value: "Moderately Priced",
    Damage: "Medium weapon",
    Notes: "",
  },
  {
    Item: "Hunting knife",
    Value: "Moderately Priced",
    Damage: "Light weapon",
    Notes: "",
  },
  {
    Item: "Machete",
    Value: "Moderately Priced",
    Damage: "Medium weapon",
    Notes: "",
  },
  {
    Item: "Slingshot",
    Value: "Moderately Priced",
    Damage: "Light weapon",
    Notes: "Medium range",
  },
  {
    Item: "Bow",
    Value: "Expensive",
    Damage: "Medium weapon",
    Notes: "Long range",
  },
  {
    Item: "Extendable baton",
    Value: "Expensive",
    Damage: "Light weapon",
    Notes: "Collapses to size ideal for a pocket/purse",
  },
  {
    Item: "Handgun",
    Value: "Expensive",
    Damage: "Medium weapon",
    Notes: "Long range",
  },
  {
    Item: "Pocket handgun",
    Value: "Expensive",
    Damage: "Light weapon",
    Notes: "Short range",
  },
  {
    Item: "Rifle",
    Value: "Expensive",
    Damage: "Medium weapon",
    Notes: "Long range",
  },
  {
    Item: "Shotgun",
    Value: "Expensive",
    Damage: "Heavy weapon",
    Notes: "Immediate range",
  },
  {
    Item: "Sawed-off shotgun",
    Value: "Expensive",
    Damage: "Medium weapon",
    Notes: "Immediate range (can be used one-handed)",
  },
  {
    Item: "Assault rifle",
    Value: "Very Expensive",
    Damage: "Heavy weapon",
    Notes: "Rapid-fire weapon, long range",
  },
  {
    Item: "Heavy rifle",
    Value: "Very Expensive",
    Damage: "Heavy weapon",
    Notes: "300-foot (90 m) range",
  },
  { Item: "Katana", Value: "Very Expensive", Damage: "", Notes: "" },
  {
    Item: "Large-caliber handgun",
    Value: "Very Expensive",
    Damage: "Heavy weapon",
    Notes: "Long range",
  },
  {
    Item: "Submachine gun",
    Value: "Very Expensive",
    Damage: "Medium weapon",
    Notes: "Rapid-fire weapon, short range",
  },
];

// Items Table
const ITEMS_DATA = [
  { Item: "Car or rideshare fare", Value: "Inexpensive", Notes: "" },
  {
    Item: "Duct tape roll",
    Value: "Inexpensive",
    Notes: "Useful and ubiquitous",
  },
  {
    Item: "Energy bars, handful",
    Value: "Inexpensive",
    Notes: "Feeds a person for one day",
  },
  { Item: "Flashlight", Value: "Inexpensive", Notes: "" },
  { Item: "Gloves", Value: "Inexpensive", Notes: "" },
  { Item: "Journal and pen", Value: "Inexpensive", Notes: "" },
  {
    Item: "Lockpick set",
    Value: "Inexpensive",
    Notes: "Asset for lockpicking tasks",
  },
  { Item: "Multitool", Value: "Inexpensive", Notes: "" },
  { Item: "Padlock with keys", Value: "Inexpensive", Notes: "" },
  { Item: "Purse", Value: "Inexpensive", Notes: "" },
  { Item: "Secure briefcase", Value: "Inexpensive", Notes: "Level 5 lock" },
  { Item: "Sunglasses", Value: "Inexpensive", Notes: "" },
  { Item: "Thrift clothing", Value: "Inexpensive", Notes: "" },
  { Item: "Wallet", Value: "Inexpensive", Notes: "" },
  { Item: "Backpack", Value: "Moderately Priced", Notes: "" },
  {
    Item: "Bee suit",
    Value: "Moderately Priced",
    Notes: "Prevents wasp and bee stings",
  },
  {
    Item: "Binoculars",
    Value: "Moderately Priced",
    Notes: "Asset for perception tasks at range",
  },
  { Item: "Bolt cutters", Value: "Moderately Priced", Notes: "" },
  { Item: "Budget cell phone", Value: "Moderately Priced", Notes: "" },
  {
    Item: "Case of heavy tools",
    Value: "Moderately Priced",
    Notes: "Suitable for plumbing, electrical work, construction, and similar",
  },
  {
    Item: "Case of light tools",
    Value: "Moderately Priced",
    Notes:
      "Suitable for electronic repair, watch repair, lockpicking, and similar",
  },
  { Item: "Chainsaw", Value: "Moderately Priced", Notes: "" },
  {
    Item: "Climbing gear",
    Value: "Moderately Priced",
    Notes: "Asset for climbing tasks",
  },
  { Item: "Crowbar", Value: "Moderately Priced", Notes: "" },
  { Item: "Digital audio recorder", Value: "Moderately Priced", Notes: "" },
  {
    Item: "Disguise kit",
    Value: "Moderately Priced",
    Notes: "Asset for disguise tasks",
  },
  { Item: "Electric lantern", Value: "Moderately Priced", Notes: "" },
  { Item: "EMF detector", Value: "Moderately Priced", Notes: "" },
  { Item: "Everyday clothing", Value: "Moderately Priced", Notes: "" },
  {
    Item: "First aid kit",
    Value: "Moderately Priced",
    Notes: "Asset for healing tasks",
  },
  { Item: "Handcuffs", Value: "Moderately Priced", Notes: "Level 5" },
  { Item: "Professional clothing", Value: "Moderately Priced", Notes: "" },
  { Item: "Rope", Value: "Moderately Priced", Notes: "Nylon, 50 feet (16 m)" },
  { Item: "Sleeping bag", Value: "Moderately Priced", Notes: "" },
  {
    Item: "Survival kit",
    Value: "Moderately Priced",
    Notes:
      "Includes emergency blanket, 2 flares, flashlight, 50-ft. (16 m) rope, rubber gloves, sewing kit, cheap knife",
  },
  { Item: "Tent", Value: "Moderately Priced", Notes: "" },
  { Item: "Train ticket", Value: "Moderately Priced", Notes: "" },
  { Item: "Airline ticket", Value: "Expensive", Notes: "" },
  {
    Item: "Camera designed to be concealed",
    Value: "Expensive",
    Notes: "Transmits over wifi",
  },
  { Item: "Cold weather camping gear", Value: "Expensive", Notes: "" },
  { Item: "Hazmat suit (with respirator)", Value: "Expensive", Notes: "" },
  { Item: "Laptop", Value: "Expensive", Notes: "" },
  {
    Item: "Microphone designed to be concealed",
    Value: "Expensive",
    Notes: "Transmits over wifi",
  },
  {
    Item: "Nightvision goggles",
    Value: "Expensive",
    Notes: "See in darkness, but perception tasks are hindered",
  },
  { Item: "Scuba gear", Value: "Expensive", Notes: "" },
  { Item: "Smartphone", Value: "Expensive", Notes: "" },
  { Item: "Straightjacket", Value: "Expensive", Notes: "" },
  { Item: "Stylish clothing", Value: "Expensive", Notes: "" },
  { Item: "Designer/bespoke clothing", Value: "Very Expensive", Notes: "" },
  { Item: "Modest vehicle", Value: "Very Expensive", Notes: "Level 3" },
  { Item: "Small boat", Value: "Very Expensive", Notes: "Level 3" },
  { Item: "Luxury vehicle", Value: "Priceless", Notes: "Level 5 or 6" },
  { Item: "Private plane", Value: "Priceless", Notes: "Level 5" },
  { Item: "Yacht", Value: "Priceless", Notes: "Level 5" },
  {
    Item: "Orbital space station",
    Value: "Exorbitant",
    Notes:
      "Useful for running experiments in weightless, isolated environments",
  },
];
// Export weapons and items data for use in other scripts
if (typeof window !== "undefined") {
  window.WEAPONS_DATA = WEAPONS_DATA;
  window.ITEMS_DATA = ITEMS_DATA;
}
