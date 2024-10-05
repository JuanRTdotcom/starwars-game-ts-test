
import { AWS_BASE_URL_FAMA, AWS_BASE_URL_RANKING, AWS_BASE_URL_WARRIOR } from "$lib/enviroment/constants";

export class GameRemoteRepository {

    async obtenerGuerreros(): Promise<unknown[]> {

        const randomId1 = Math.floor(Math.random() * 83) + 1;

        let randomId2;
        do {
            randomId2 = Math.floor(Math.random() * 83) + 1;
        } while (randomId2 === randomId1);

        const res = await Promise.all([
            fetch(`${AWS_BASE_URL_WARRIOR}?id=${randomId1}`),
            fetch(`${AWS_BASE_URL_WARRIOR}?id=${randomId2}`),
        ]);
        const data = await Promise.all(res.map(r => r.json()));
        return data.map(res => JSON.parse(res.body));
    }

    async registrarmejorPuntuacion(nombre: string, puntos: number): Promise<boolean> {
        let res = false;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const body = JSON.stringify({
            "nombre": nombre,
            "puntos": puntos
        });
    
        try {
            const response = await fetch(AWS_BASE_URL_FAMA, {
                method: "POST",
                headers: myHeaders,
                body: body,
                redirect: "follow"
            });
    
            if (response.status) {
                res = true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    
        return res; 
    }
    
    async listarRanking(): Promise<unknown[]> {
        try {
            const response = await fetch(AWS_BASE_URL_RANKING);
            const result = await response.json();
            return JSON.parse(result.body);
        } catch (error) {
            console.error("Error al listar el ranking:", error);
            return [];
        }
    }
    
    
    
}