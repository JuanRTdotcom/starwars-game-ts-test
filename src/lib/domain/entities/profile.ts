import type { ProfileInterface } from "../interfaces/profile_interface";
import type { WarInterface } from "../interfaces/war_interface";

export class Profile implements ProfileInterface {
    constructor(
        public id: string,
        public nombreUsuario: string,
        public codigoUsuario: string,
        public historial: WarInterface[],
    ) { }


}