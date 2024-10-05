import type { WarriorInterface } from "../interfaces/warrior_interface";

export class Warrior implements WarriorInterface {
    constructor(
        public id: string,
        public nombre: string,
        public altura: number,
        public peso: number,
        public colorOjos: string,
        public genero: string,
        public mundo: string,
        public imagen: string,
        public seleccionado: boolean
    ) { }
    static empty(): Warrior {
        return new Warrior('', '', 0, 0, '', '', '', '',false);
    }
}