// GameComponent.test.ts
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import GameComponent from '@routes/+page.svelte';
import { gameStore } from '$lib/store';
import { Warrior } from '$lib/domain/entities/warrior';
import { GameState } from '$lib/store';
import { get } from 'svelte/store';
import '@testing-library/jest-dom';

describe('GameComponent', () => {
    beforeEach(() => {
        // Resetea el estado de la tienda antes de cada prueba
        gameStore.set({
            currentGameState: GameState.SIN_GUERREROS,
            warriors: [],
            guerreroIndicado: Warrior.empty(),
            puntuacion: 0,
            puntuacionMaxima: 0,
        });
    });

    it('DEBE mostrar el botón de "Jugar" en el estado SIN_GUERREROS', () => {
        const { getByText } = render(GameComponent);
        expect(getByText('Jugar')).toBeInTheDocument();
    });
    

    it('DEBE iniciar el juego y cambiar el estado a BUSCANDO_GUERREROS', async () => {
        const { getByText } = render(GameComponent);
        
        const jugarButton = getByText('Jugar');
        await fireEvent.click(jugarButton);
        
        await waitFor(() => {
            expect(get(gameStore).currentGameState).toBe(GameState.BUSCANDO_GUERREROS);
        });
    });
    
});
