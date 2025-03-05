import { NPC } from "../npc/npc_mock_api_types";

export interface Mission {
    missionID : number
    mapLocation : [number,number] // in "map coordinates", because map coords != screen coords
    name : string
    npcID : number
    npc: NPC
    description : string
    type : 'raid'|'arena' // drives map icon, maybe?
    difficultyGate: 1|2|3|4|5 // like the 'skulls' in Payday
}


