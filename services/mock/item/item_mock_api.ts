import { Item } from "./item_mock_api_types";
import * as MockData from "./item_mock_data";

export class ItemMockAPI {
    listItemsUniverse() : Item[] {
        return deepCopy(MockData.ItemsUniverse);
    }

    getItem(itemID : number) {
        const matchingItems = MockData.ItemsUniverse.filter(i => i.itemID === itemID);
        if (matchingItems.length === 1) {
            return matchingItems[0];
        }
        else {
            throw new Error(`Count of items matching itemID = ${itemID} was ${matchingItems.length} != expected of 1`)
        }
    }
}

function deepCopy(obj : any) : any {
    return JSON.parse(JSON.stringify(obj));
}