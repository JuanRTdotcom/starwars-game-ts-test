/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Warrior } from "$lib/domain/entities/warrior";
import { GameRemoteRepository } from "$lib/repository/remote_repository";
import type { WarriorAdapterInterface } from "../interfaces/warrior_adapter_interface";

export class WarriorAdapter implements WarriorAdapterInterface {
    private repository: GameRemoteRepository;

    constructor() {
        this.repository = new GameRemoteRepository();
    }

    async obtenerGuerreros(): Promise<Warrior[]> {
        const data = await this.repository.obtenerGuerreros();
        const warriors: Warrior[] = data.map((personaje: any) => {
            return {
                id: personaje.url.split('/').filter(Boolean).pop() ?? '0',
                nombre: personaje.name ?? 'Sin nombre',
                altura: parseInt(personaje.height, 10) ?? 0,
                peso: parseInt(personaje.mass, 10) ?? 0,
                colorOjos: personaje.eye_color ?? 'Sin color',
                genero: personaje.gender ?? 'Sin genero',
                mundo: personaje.homeworld ?? 'Sin mundo',
                imagen: `https://starwars-visualguide.com/assets/img/characters/${personaje.url.split('/').filter(Boolean).pop()??'0'}.jpg`
            };
        });
        return warriors;
    }

}