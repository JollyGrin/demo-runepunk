import { Item } from "../item/item_mock_api_types"

export interface WalletItemView {
    itemID : number
    count : number
    item : Item
}

export type WalletItem = Omit<WalletItemView,"item">

export interface Wallet {
    walletItems :  WalletItem[]
}

export interface WalletView {
    walletItems : WalletItemView[]
}