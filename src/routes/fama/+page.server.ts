import { ProfileAdapter } from "$lib/adapters/implements/profile_adapter";
import { GetRankingUseCase } from "$lib/usecases/get_ranking";

export async function load() {
    const ranking = async () => {
        const adaptador = new ProfileAdapter();
		const profilesUseCases = new GetRankingUseCase(adaptador);
		const res = await profilesUseCases.execute();
        return res;
    }

    return {
        ranking: await ranking()
    }
}