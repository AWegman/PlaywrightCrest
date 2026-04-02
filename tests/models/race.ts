import { RaceType } from "../enums/race-types";

export type Race = {
    naam: string;
    datum: string;
    afstand: string;
    type: RaceType;
    isPr?: boolean;
}