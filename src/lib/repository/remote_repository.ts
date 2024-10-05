
import { AWS_BASE_URL_WARRIOR } from "$lib/enviroment/constants";

export class GameRemoteRepository {
    
    async obtenerGuerreros(): Promise<unknown[]> {
        
        const randomId1 = Math.floor(Math.random() * 83) + 1; 
        const randomId2 = Math.floor(Math.random() * 83) + 1;

        const res = await Promise.all([
            fetch(`${AWS_BASE_URL_WARRIOR}?id=${randomId1}`),
            fetch(`${AWS_BASE_URL_WARRIOR}?id=${randomId2}`),
        ]);
        const data = await Promise.all(res.map(r => r.json()));
        return data.map(res => JSON.parse(res.body));
    }
}