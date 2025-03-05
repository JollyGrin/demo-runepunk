import { Item } from "./item_mock_api_types";
import { SeededRNG, hashStringToInt } from "@/services/mock/procgen";
import * as ProcGenData from "./item_procgen";

export const ItemsUniverse : Item[] = ProcGenData.USE_ITEM_PROCGEN ? ProcGenData.ProcGenItemsUniverse : [
    {
        itemID: 1,
        name : "Awesome Sword",
        description : "Sword is awesome"
    },
    {
        itemID: 2,
        name : "Awesome Shield",
        description : "Shield is awesome"
    },
    {
        itemID: 3,
        name : "Awesome Boots",
        description : "These boots are awesome"
    }
];

