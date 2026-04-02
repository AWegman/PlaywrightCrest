import { test } from "@playwright/test";
import { RaceType } from "./enums/race-types"; 
import { Race } from "./models/race";

test("Race type", () => {
    const race: Race = {
        naam: "Marathon",
        datum: new Date("2024-10-01"),
        afstand: "42.195 km",
        type: RaceType.Weg,
    };

    console.log(JSON.stringify(race, null, 2));
});