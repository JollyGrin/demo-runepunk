import { NPC } from "../npc/npc_mock_api_types";
import { NPCs } from "../npc/npc_mock_data";
import * as MockData from "./player_inbox_mock_api_data"; 
import * as MockAPITypes from "./player_inbox_mock_api_types";

const PlayerInbox = "PlayerInbox";

export class PlayerInboxMockAPI {

    listInboxMessages() : MockAPITypes.PlayerInboxView  {
        const playerInbox = this._getPlayerInbox();
        return this._toPlayerInboxView(playerInbox);
    }

    getMessage(messageID : number) : MockAPITypes.PlayerInboxMessageView|undefined {
        const playerInbox = this._getPlayerInbox();
        const playerInboxMessage = this._getMessageFromPlayerInbox(messageID, playerInbox);
        if (playerInboxMessage.status === 'deleted') {
            return undefined;
        }
        return this._toPlayerInboxMessageView(playerInboxMessage);
    }

    markAsRead(messageID : number) : MockAPITypes.PlayerInboxMessageView {
        const playerInbox = this._getPlayerInbox();
        const message = this._getMessageFromPlayerInbox(messageID, playerInbox);
        message.status = 'read';
        this._setPlayerInbox(playerInbox);
        return this._toPlayerInboxMessageView(message);
    }

    markAsDeleted(messageID : number) {
        const playerInbox = this._getPlayerInbox();
        const message = this._getMessageFromPlayerInbox(messageID, playerInbox);
        message.status = 'deleted';
        this._setPlayerInbox(playerInbox);
    }

    resetLocalStorage() {
        localStorage.removeItem(PlayerInbox);
    }

    private _getPlayerInbox() : MockAPITypes.PlayerInbox {
        return JSON.parse(localStorage.getItem(PlayerInbox) || 'false') || deepCopy(MockData.PLAYER_INBOX_MESSAGES);
    }

    private _setPlayerInbox(playerInbox : MockAPITypes.PlayerInbox) {
        localStorage.setItem(PlayerInbox, JSON.stringify(playerInbox));
    }

    private _getMessageFromPlayerInbox(messageID : number, playerInbox : MockAPITypes.PlayerInbox) : MockAPITypes.PlayerInboxMessage {
        const playerInboxMessage = playerInbox.messages.filter(m => m.messageID === messageID)[0];
        if (playerInboxMessage == null) {
            throw new Error(`No message with ID ${messageID}`);
        }
        return playerInboxMessage;
    }    

    private _toPlayerInboxView(playerInbox : MockAPITypes.PlayerInbox) : MockAPITypes.PlayerInboxView {
        return {
            messages: playerInbox.messages.filter(m => m.status !== 'deleted').map(m => this._toPlayerInboxMessageView(m))
        }
    }

    private _toPlayerInboxMessageView(m : MockAPITypes.PlayerInboxMessage) : MockAPITypes.PlayerInboxMessageView {
        return {
            messageID: m.messageID,
            subjectLine: m.subjectLine,
            body: m.body,
            status: m.status,
            npcID: m.npcID,
            npc : this._getNPC(m.npcID)
        }
    }

    private _getNPC(npcID : number) : NPC {
        const matches = NPCs.filter(npc => npc.npcID === npcID);
        if (matches.length === 0) {
            throw new Error(`No NPC with ID ${npcID}`);
        }
        else if (matches.length > 1) {
            throw new Error(`${matches.length} NPCs with ID ${npcID}`);
        }
        return matches[0]!!;
    }
}

function deepCopy(obj : any) : any {
    return JSON.parse(JSON.stringify(obj));
}