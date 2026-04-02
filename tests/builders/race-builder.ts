import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import { RaceType } from "../enums/race-types";
import { Race } from "../models/race";

export class RaceBuilder {
    private readonly race: Race = {} as Race;

    private constructor() {}

    static create(): RaceBuilder {
        return new RaceBuilder();
   
 }    static createWithDefaults(): RaceBuilder {
        return RaceBuilder.create()
            .naam(faker.lorem.words(2))
            .datum(format(faker.date.future(), 'dd-MM-yyyy'))
            .afstand(`${faker.number.int({ min: 5, max: 42 })} km`)
            .type(faker.helpers.arrayElement(Object.values(RaceType)))
            .isPR(faker.datatype.boolean());
    }

    naam(naam: string): RaceBuilder {
        this.race.naam = naam;
        return this;
    }

    datum(datum: string): RaceBuilder {
        this.race.datum = datum;
        return this;
    }

    afstand(afstand: string): RaceBuilder {
        this.race.afstand = afstand;
        return this;
    }

    type(type: RaceType): RaceBuilder {
        this.race.type = type;
        return this;
    }

    isPR(isPr: boolean): RaceBuilder {
        this.race.isPr = isPr
        return this;
    }

    build(): Race {
        return this.race;
    }
}
