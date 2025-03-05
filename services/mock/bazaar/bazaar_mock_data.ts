import * as MockAPITypes from "./bazaar_mock_api_types";

export const PlayerInventory : MockAPITypes.PlayerInventory = {
    items: [
        {
            itemID : 1,
            count: 5
        },
        {
            itemID: 2,
            count : 3
        }
    ]
};

export const PlayerGrandBazaar : MockAPITypes.PlayerGrandBazaar = {
    bids: [
        {
            bidID: 1,
            itemID: 1,
            quantity: 50,
            quantityFilled: 30,
            pricePerItem: 6
        }
    ],
    offers : [
        {
            offerID: 1,
            itemID: 2,
            quantity: 50,
            quantityFilled: 25,
            pricePerItem: 3
        }
    ]
}