import type { Warrior } from "$lib/domain/entities/warrior";

export interface WarriorAdapterInterface {
    obtenerGuerreros(): Promise<Warrior[]>;
}