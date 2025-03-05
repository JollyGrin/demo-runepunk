import { ItemMockAPI } from "../item/item_mock_api";
import { Item } from "../item/item_mock_api_types";
import * as MockAPITypes from "./bazaar_mock_api_types";
import * as MockData from "./bazaar_mock_data";

const PLAYER_BAZAAR = "PlayerBazaar";
const PLAYER_INVENTORY = "PlayerInventory";

export default class BazaarMockAPI {

    private itemMockAPI : ItemMockAPI; 

    constructor() {
        this.itemMockAPI = new ItemMockAPI();
    }

    // writes to localstorage
    cancelBid(bidID : number) : MockAPITypes.PlayerGrandBazaarView {
        const playerBazaar = this._getPlayerGrandBazaar();
        playerBazaar.bids = playerBazaar.bids.filter(bid => bid.bidID != bidID);
        this._setPlayerGrandBazaar(playerBazaar);
        return this._toPlayerGrandBazaarView(playerBazaar);
    }

    // writes to localstorage
    cancelOffer(offerID : number) : MockAPITypes.PlayerGrandBazaarView {
        const playerBazaar = this._getPlayerGrandBazaar();
        playerBazaar.offers = playerBazaar.offers.filter(offer => offer.offerID !== offerID);
        this._setPlayerGrandBazaar(playerBazaar);
        return this._toPlayerGrandBazaarView(playerBazaar);
    }

    makeBid(bid : MockAPITypes.Bid) : MockAPITypes.BidView {
        const playerBazaar = this._getPlayerGrandBazaar();
        if (playerBazaar.bids.filter(b => b.bidID === bid.bidID).length > 0) {
            throw Error(`This bid already created: ${bid.bidID}`);
        }
        playerBazaar.bids.push(bid);
        this._setPlayerGrandBazaar(playerBazaar);
        return this._toBidView(bid);
    }

    makeOffer(offer : MockAPITypes.Offer) : MockAPITypes.OfferView|'not-enough' {
        const playerBazaar = this._getPlayerGrandBazaar();
        if (playerBazaar.offers.filter(o => o.offerID === offer.offerID).length > 0) {
            throw Error(`This offer already created: ${offer.offerID}`);
        }
        const playerInventory = this._getPlayerInventory();
        if (!this._hasEnough(playerInventory, offer.itemID, offer.quantity)) {
            return 'not-enough';
        }
        playerInventory.items.filter(item => item.itemID === offer.itemID)[0].count -= offer.quantity;
        this._setPlayerInventory(playerInventory);
        playerBazaar.offers.push(offer);
        this._setPlayerGrandBazaar(playerBazaar);
        return this._toOfferView(offer);
    }

    listBidAvailableItems() : MockAPITypes.AvailableBidItems {
        return { items: this.itemMockAPI.listItemsUniverse() };
    }

    listOfferAvailableItems() : MockAPITypes.AvailableOfferItems {
        const playerInventory = this._getPlayerInventory();
        return { items: [...playerInventory.items] }
    }

    getPlayerGrandBazaar() : MockAPITypes.PlayerGrandBazaarView {
        return this._toPlayerGrandBazaarView(this._getPlayerGrandBazaar());
    }

    resetLocalStorage() {
        localStorage.removeItem(PLAYER_BAZAAR);
        localStorage.removeItem(PLAYER_INVENTORY);
    }

    private _getPlayerGrandBazaar() : MockAPITypes.PlayerGrandBazaar {
        return JSON.parse(localStorage.getItem(PLAYER_BAZAAR) || 'false') || deepCopy(MockData.PlayerGrandBazaar);
    }

    private _setPlayerGrandBazaar(playerGrandBazaar : MockAPITypes.PlayerGrandBazaar) {
        return localStorage.setItem(PLAYER_BAZAAR, JSON.stringify(playerGrandBazaar));
    } 

    private _getPlayerInventory() : MockAPITypes.PlayerInventory {
        return JSON.parse(localStorage.getItem(PLAYER_INVENTORY) || 'false') || deepCopy(MockData.PlayerInventory);
    }

    private _setPlayerInventory(playerInventory : MockAPITypes.PlayerInventory) {
        return localStorage.setItem(PLAYER_INVENTORY, JSON.stringify(playerInventory));
    }

    private _toPlayerGrandBazaarView(playerGrandBazaar : MockAPITypes.PlayerGrandBazaar) : MockAPITypes.PlayerGrandBazaarView {
        return {
            offers: playerGrandBazaar.offers.map(o => this._toOfferView(o)).sort(o => o.offerID),
            bids: playerGrandBazaar.bids.map(b => this._toBidView(b)).sort(b => b.bidID)
        };
    }

    private _toOfferView(offer: MockAPITypes.Offer) : MockAPITypes.OfferView {
        return { ...offer, item : this._getItem(offer.itemID) };
    }

    private _toBidView(bid: MockAPITypes.Bid) : MockAPITypes.BidView {
        return { ...bid, item: this._getItem(bid.itemID) };
    }

    private _getItem(itemID : number) : Item {
        return this.itemMockAPI.listItemsUniverse().filter(item => item.itemID === itemID)[0]!!;
    }

    private _hasEnough(playerInventory : MockAPITypes.PlayerInventory, itemID : number, count : number) {
        const item = playerInventory.items.filter(item => item.itemID === itemID)[0];
        if (item === undefined) {
            return false;
        }
        else if (item.count < count) {
            return false;
        }
        return true;
    }
}

function deepCopy(obj : any) : any {
    return JSON.parse(JSON.stringify(obj));
}