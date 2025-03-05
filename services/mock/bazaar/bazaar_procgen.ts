import { SeededRNG, hashStringToInt } from "@/services/mock/procgen";
import { Item } from "../item/item_mock_api_types";


export const USE_ITEM_PROCGEN = true;

const ITEMS_PROC_GEN_SEED = 42;

const namePart1s = [ 
    "Regal",
    "Shadowy",
    "Arcane",
    "Mystic",
    "Enchanted",
    "Sturdy",
    "Mighty",
    "Protective",
    "Nimble",
    "Silent",
    "Swift",
    "Luminous",
    "Ancient",
    "Fortified",
    "Wild",
    "Nocturnal",
    "Visionary",
    "Honorable",
    "Enduring",
    "Courageous",
    "Truthful",
    "Starry",
    "Furious",
    "Fiery"
];

const namePart2s = [ "Sword", "Shield", "Gauntlet", "Bracers", "Boots", "Helmet" ];

const namePart3s = [ 
    "Valor",
    "Fortitude",
    "Swiftness",
    "Agility",
    "Strength",
    "Resilience",
    "Power",
    "Protection",
    "Dexterity",
    "Wisdom",
    "the Magi",
    "Speed",
    "Shadows",
    "Courage",
    "Stability",
    "Light",
    "Defense",
    "the Ancients",
    "Fortitude",
    "Insight",
    "Healing",
    "the Phoenix",
    "the Wild",
    "the Night",
    "the Mystics",
    "Resistance",
    "Might",
    "Vision",
    "Honor",
    "Endurance",
    "Courage",
    "Truth",
    "the Wind",
    "the Moon",
    "the Stars",
    "Fury",
    "Power",
    "the Seer",
    "Fire",
    "Arcana",
    "Clarity",
];

const verbs = [ 
    "exude", 
    "emanate", 
    "secrete", 
    "conjure", 
    "create", 
    "materialize", 
    "manifest", 
    "radiate", 
    "reveal",
    "project"
];

const adjectives = [ 
    "opalescent", 
    "ephemeral", 
    "faint", 
    "shimmery", 
    "iridescent", 
    "translucent", 
    "diaphonous", 
    "subtle", 
    "fleeting", 
    "ethereal", 
    "thin" 
];

const nouns = [ 
    "presence", "film", "sheen", "aura", "glow", "mist", "veil", "haze", 
    "radiance", "halo", "luminescence",
    "glimmer", "sparkle", "gleam", "glow", "shadow", "coating"
 ];

 const adjective_2s = [
    "energy", "rarity", "wisdom", "power", "vitality", "uniqueness", "bravery", "charisma", "charm", "ferocity", "intensity", "tenacity",
    "finesse", "audacity", "grace", "clarity", "steadfastness", "courage"
 ];




function procGenTheItemsUniverse(seed: number) {
    const seededRNG = new SeededRNG(ITEMS_PROC_GEN_SEED);
    const itemNames : string[] = [];
    while (itemNames.length < 50) {
        let attempts = 0;
        let name = '';
        while (attempts < 10) {
            const part1Idx = seededRNG.nextInt(namePart1s.length);
            const part2Idx = seededRNG.nextInt(namePart2s.length);
            const part3Idx = seededRNG.nextInt(namePart3s.length);
            name = `${namePart1s[part1Idx]} ${namePart2s[part2Idx]} of ${namePart3s[part3Idx]}`;
            if (!itemNames.includes(name)) {
                break;
            }
            attempts += 1;
        }
        if (itemNames.includes(name)) {
            throw Error("Too many attempts to make a new unique item name - create more options to choose from.")
        }

        itemNames.push(name);
    }

    const itemDescriptions : string[] = [];
    itemNames.forEach((itemName) => {
        const description = procItemDescription(itemName);
        itemDescriptions.push(description);
    });

    const items : Item[] = [];
    let itemID = 1;
    itemNames.forEach((itemName,index) => {
        const itemDescription = itemDescriptions[index];
        const item = {
            itemID: itemID,
            name: itemName,
            description: itemDescription
        };
        items.push(item);
        itemID += 1;
    }); 

    return items;
}

function procItemDescription(itemName : string) : string {
    const nameHash = hashStringToInt(itemName);
    const rng = new SeededRNG(nameHash);
    const verb = verbs[rng.nextInt(verbs.length)];
    const verbPostfix = isPlural(itemName) ? '' : 's';
    const adjective = adjectives[rng.nextInt(verbs.length)];
    const noun = nouns[rng.nextInt(nouns.length)];
    const adjective_2 = adjective_2s[rng.nextInt(adjective_2s.length)];
    const indefiniteArticlePostfix = ['a','e','i','o','u'].includes(adjective[0]) ? 'n' : '';
    return `The ${itemName} ${verb}${verbPostfix} a${indefiniteArticlePostfix} ${adjective} ${noun} of ${adjective_2}`;
}


function isPlural(itemName : string) : boolean {
    return itemName.includes("Boots") || itemName.includes("Bracers");
}

export const ProcGenItemsUniverse = procGenTheItemsUniverse(ITEMS_PROC_GEN_SEED);