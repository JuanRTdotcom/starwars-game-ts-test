import type { WarInterface } from "./war_interface";

export interface ProfileInterface {
    id:string;
    nombreUsuario: string;
    codigoUsuario: string;
    historial: WarInterface[];
}   