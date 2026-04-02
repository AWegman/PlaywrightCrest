import { test } from "@playwright/test";
import { RaceBuilder } from "./builders/race-builder";
import { RaceType } from "./enums/race-types"; 
import { Race } from "./models/race";

test("Race zonder builder", async () => {
    const race: Race = {
        naam: "Marathon",
        datum: "2024-10-01",
        afstand: "42.195 km",
        type: RaceType.Weg,
    };

    console.log(JSON.stringify(race, null, 2));
});

test("Race met builder", async () => {
    const race: Race = RaceBuilder.createWithDefaults()
    .naam("Halve Marathon")
    .datum("2024-09-15")
    .afstand("21.097 km")
    .type(RaceType.Weg)
    .isPR(true)
    .build();

    console.log(JSON.stringify(race, null, 2));
});

test("Race met builder met default waarden", async () => {
    const race: Race = RaceBuilder.createWithDefaults().build();

    console.log(JSON.stringify(race, null, 2));
});

test("Race met default waarden overschrijven", async () => {
    const race: Race = RaceBuilder.createWithDefaults().naam("Aangepaste Naam").build();
    
    console.log(JSON.stringify(race, null, 2));
});


