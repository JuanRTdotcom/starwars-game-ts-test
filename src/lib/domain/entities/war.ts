import type { WarInterface } from "../interfaces/war_interface";

export class War implements WarInterface {
    constructor(
        public id: string,
        public idLocal: string,
        public idVisitante: string,
        public nombreLocal: string,
        public nombreVisitante: string,
        public idGanador: string,
        public idPerdedor: string,
        public nombreGanador: string,
        public nombrePerdedor: string,
        public fecha: string,
        public codigoUsuario: string,
        public estado: string,

    ) { }

}