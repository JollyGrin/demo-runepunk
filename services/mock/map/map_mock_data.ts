import { SeededRNG, hashStringToInt } from "../procgen";
import * as MockAPITypes from "./map_mock_api_types";
import { NPC } from "../npc/npc_mock_api_types";
import { NPCs } from "../npc/npc_mock_data";

// all non-randomizable aspects of the mission
interface MissionSpec {
    name : string,
    description: string,
    mapLocation : [number,number],
    type : 'arena'|'raid'
}

// I'm still fuzzy on the lore so it's not lore consistent.  We can update easily as we like.
export const MissionSpecs : MissionSpec[] = [
    {
        name : "Rat Roundup",
        description: "Man's oldest enemy, and they just keep coming back.",
        mapLocation: [50,50],
        type: 'raid'
    },
    {
        name : "Arcane Artifact",
        description: "Somewhere in the dark sewer is a long-lost arcane artifact.  But what stands in our way?",
        mapLocation: [60,50],
        type: 'raid'
    }, 
    {
        name: "Overgrowth",
        description: "Things have gotten... wild.",
        mapLocation: [30,40],
        type: 'raid'
    },

    {
        name: "Protection Racket",
        description: "Defend the tennis players at all costs",
        mapLocation: [70,70],
        type: 'raid'
    },

    {
        name: "Cosmic Arena",
        description: "A sacred battleground filled with dim whisps of starry light.",
        mapLocation: [15,35],
        type: 'arena'
    },

    {
        name: "Rifted Ruins",
        description: "The ground is torn by endless battles. Can you hold your own?",
        mapLocation: [65,35],
        type: 'arena'
    },

    {
        name: "Baker's Pit",
        description: "This used to be a bakery, now the only ingredients are smoke and blood.",
        mapLocation: [55,15],
        type: 'arena'
    },
];

// per Dev, derive full Mission object from minimal spec to save time on edits later
function makeMission(spec : MissionSpec, index : number) {
    const mission  : MockAPITypes.Mission =  {
        name: spec.name,
        description: spec.description,
        missionID : index + 1,
        mapLocation: spec.mapLocation,
        npcID : deriveNPCID(spec.name),
        npc: deriveNPC(spec.name),
        difficultyGate: deriveDifficultyGate(spec.name),
        type: spec.type
    };
    return mission;
}

export const MISSIONS : MockAPITypes.Mission[] = MissionSpecs.map(makeMission);


function deriveNPCID(name : string) {
    const seed = hashStringToInt(name);
    const rng = new SeededRNG(seed);
    return rng.nextInt(NPCs.length);
}

function deriveNPC(name : string) : NPC {
    const id = deriveNPCID(name);
    return NPCs.filter(npc => npc.npcID == id)[0];
}

function deriveDifficultyGate(name : string) : 1|2|3|4|5 {
    const seed = hashStringToInt(name);
    const rng = new SeededRNG(seed);
    return rng.nextInt(5)+1 as (1|2|3|4|5);
}