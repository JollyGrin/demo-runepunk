import { PlayerInbox, PlayerInboxMessage } from "./player_inbox_mock_api_types";

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`

interface PlayerInboxMessageSpec {
    subjectLine : string
    npcID : number
}

const playerInboxMessages : PlayerInboxMessage[] = [
    { subjectLine: "Hey! Did you know you can X on Y?", npcID : 1 },
    { subjectLine: "You may want to check out the Z for A!", npcID : 2 },
    { subjectLine: "Can you check on the ABC? You may like it.", npcID : 3 },
    { subjectLine: "The XYZ is offering an ABC on DEF.", npcID : 4 },
].map(toPlayerInboxMessage);

function toPlayerInboxMessage(spec: PlayerInboxMessageSpec, index : number) : PlayerInboxMessage {
    return {
        messageID: index + 1,
        subjectLine: spec.subjectLine,
        npcID: spec.npcID,
        body: LOREM_IPSUM,
        status: 'unread'
    }
}

export const PLAYER_INBOX_MESSAGES : PlayerInbox = {
    messages: playerInboxMessages
}