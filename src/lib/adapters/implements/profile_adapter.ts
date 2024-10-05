/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Profile } from "$lib/domain/entities/profile";
import { GameRemoteRepository } from "$lib/repository/remote_repository";
import type { ProfileAdapterInterface } from "../interfaces/profile_adapter_interface";

export class ProfileAdapter implements ProfileAdapterInterface {
    private repository: GameRemoteRepository;

    constructor() {
        this.repository = new GameRemoteRepository();
    }
    async obtenerRanking(): Promise<Profile[]> {
        const data = await this.repository.listarRanking();
        
        const profiles: Profile[] = data.map((profile: any) => {
            return {
                nombreUsuario: profile.nombre,
                puntuacion: profile.puntos
            };
        });
        return profiles;
    }


}