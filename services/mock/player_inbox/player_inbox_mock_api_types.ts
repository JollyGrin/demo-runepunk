import { NPC } from "../npc/npc_mock_api_types";

export interface PlayerInboxMessageView {
    messageID : number
    subjectLine : string
    body : string
    npcID : number
    npc : NPC
    status : 'read'|'unread'|'deleted'
}

export type PlayerInboxMessage = Omit<PlayerInboxMessageView,"npc">;

export interface PlayerInbox {
    messages : PlayerInboxMessage[]
}

export interface PlayerInboxView {
    messages : PlayerInboxMessageView[]
}