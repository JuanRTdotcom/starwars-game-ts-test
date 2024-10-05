import type { WarriorAdapterInterface } from "$lib/adapters/interfaces/warrior_adapter_interface";
import type { Warrior } from "$lib/domain/entities/warrior";

export class GetWarriorsUseCase {
    private adapter: WarriorAdapterInterface;
    constructor(warriostadapter: WarriorAdapterInterface) {
        this.adapter = warriostadapter;
     }

    async execute(): Promise<Warrior[]> {
        return await this.adapter.obtenerGuerreros();
    }
}