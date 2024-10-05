import type { Profile } from "$lib/domain/entities/profile";

export interface ProfileAdapterInterface {
    obtenerRanking(): Promise<Profile[]>;
}