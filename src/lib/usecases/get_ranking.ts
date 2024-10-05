import type { ProfileAdapterInterface } from "$lib/adapters/interfaces/profile_adapter_interface";
import type { Profile } from "$lib/domain/entities/profile";

export class GetRankingUseCase {
    private adapter: ProfileAdapterInterface;
    constructor(profileadapter: ProfileAdapterInterface) {
        this.adapter = profileadapter;
     }

    async execute(): Promise<Profile[]> {
        return await this.adapter.obtenerRanking();
    }
}