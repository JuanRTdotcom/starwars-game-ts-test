import type { ProfileInterface } from "../interfaces/profile_interface";

export class Profile implements ProfileInterface {
    constructor(
        public nombreUsuario: string,
        public puntuacion:number
    ) { }

    static empty(): Profile {
        return new Profile("", 0);
    }
}