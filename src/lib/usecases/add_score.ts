import type { WarriorAdapterInterface } from "$lib/adapters/interfaces/warrior_adapter_interface";

export class AddScoreUseCase {
    private adapter: WarriorAdapterInterface;
    constructor(warriostadapter: WarriorAdapterInterface) {
        this.adapter = warriostadapter;
     }

    async execute(nombre: string,puntos: number): Promise<boolean> {
        return await this.adapter.registrarPuntuacion(nombre,puntos);
    }
}