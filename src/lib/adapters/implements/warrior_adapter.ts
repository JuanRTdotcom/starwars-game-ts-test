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
        let seleccionadoInicial = Math.random() >= 0.5;
        const warriors: Warrior[] = data.map((personaje: any) => {
            const seleccionadoIncidador = seleccionadoInicial;
            seleccionadoInicial = !seleccionadoInicial;
            return {
                id: personaje.url?personaje.url.split('/').filter(Boolean).pop() : '0',
                nombre: personaje.name ?? 'Sin nombre',
                altura: personaje.height ? parseInt(personaje.height, 10) : 0,
                peso: personaje.height ? parseInt(personaje.mass, 10) : 0,
                colorOjos: personaje.eye_color ?? 'Sin color',
                genero: personaje.gender ?? 'Sin genero',
                mundo: personaje.homeworld ?? 'Sin mundo',
                imagen: personaje.url?`https://starwars-visualguide.com/assets/img/characters/${personaje.url.split('/').filter(Boolean).pop()}.jpg`:'/png/notfount.png',
                seleccionado: seleccionadoIncidador,
            };
        });
        return warriors;
    }

    async registrarPuntuacion(nombre:string,puntos:number): Promise<boolean> {
        return await this.repository.registrarmejorPuntuacion(nombre,puntos);        
    }

}