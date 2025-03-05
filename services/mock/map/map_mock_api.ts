import * as MockAPITypes from "./map_mock_api_types";
import * as MockData from "./map_mock_data";

export default class MapMockAPI {
    listMissions() : MockAPITypes.Mission[] {
        return deepCopy(MockData.MISSIONS);
    }
}

function deepCopy(obj : any) : any {
    return JSON.parse(JSON.stringify(obj));
}