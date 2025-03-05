import { ItemMockAPI } from "../item/item_mock_api";
import * as MockWalletData from "./wallet_mock_data";
import { Wallet, WalletItem, WalletItemView, WalletView } from "./wallet_mock_api_types";

export class WalletMockAPI {

    private itemMockAPI : ItemMockAPI;

    constructor() {
        this.itemMockAPI = new ItemMockAPI();
    }

    getWallet() : WalletView {
        const wallet = this._getWallet();
        const walletView = this._toWalletView(wallet);
        return walletView;
    }

    private _getWallet() : Wallet {
        return deepCopy(MockWalletData.MockWallet);
    }

    private _toWalletView(wallet : Wallet) {
        return {
            walletItems: wallet.walletItems.map(i => this._toWalletItemView(i))
        };
    }

    private _toWalletItemView(walletItem : WalletItem) : WalletItemView {
        return {
            itemID: walletItem.itemID,
            item: this.itemMockAPI.getItem(walletItem.itemID),
            count: walletItem.count
        };
    }
}

function deepCopy(obj : any) : any {
    return JSON.parse(JSON.stringify(obj));
}