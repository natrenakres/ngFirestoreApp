import { InMemoryDbService } from "angular-in-memory-web-api";

import { Competition } from "./models/competition";

export class CompetitionData implements InMemoryDbService {
    createDb() {
        const competitions: Competition[] = [
            {
                id: "championsleague",
                name: "Champions League"
            },
            {
                id: "sportotosuperlig",
                name: "Sportoto Süper Lig"
            }
        ];
        return { competitions };
    }
}
