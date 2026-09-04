import type { Gender } from "../../generated/prisma/enums";

export class Person {
    id!: number;
    first_name!: string;
    last_name!: string;
    dob!: Date;
    gender!: Gender;
}