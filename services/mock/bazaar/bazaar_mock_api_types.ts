import { Item } from "../item/item_mock_api_types";


type InventoryItem = { itemID : number, count : number }

export interface PlayerInventory {
    items : InventoryItem[]
}

export interface BidView {
    bidID : number
    item : Item
    quantity : number
    quantityFilled : number
    pricePerItem : number
}

export type Bid = Omit<BidView, "item"> & { itemID : number };

export interface OfferView {
    offerID : number
    item : Item
    quantity : number
    quantityFilled : number
    pricePerItem : number
}

export type Offer = Omit<OfferView, "item"> & { itemID : number };

export interface AvailableOfferItems {
    items : InventoryItem[]
}

export interface AvailableBidItems {
    items : Item[]
}

export interface PlayerGrandBazaar {
    offers: Offer[]
    bids : Bid[]
}

export interface PlayerGrandBazaarView {
    offers: OfferView[]
    bids : BidView[]
}