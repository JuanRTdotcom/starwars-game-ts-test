import { writable } from 'svelte/store';

// Definición de tipos
export type GameStateType = 'sin_guerrero' | 'buscando_guerreros' | 'con_guerrero' | 'sin_eleccion_de_guerrero' | 'con_eleccion_de_guerrero' | 'ended';
export type CardStateType = 'face_up' | 'face_down' | 'discarded' | 'played';
export type PlayerTypeType = 'human' | 'ai' | 'spectator';
export type PlayerActionType = 'draw' | 'play' | 'discard' | 'pass';
export type GameResultType = 'win' | 'loss' | 'draw';

// Enumeraciones
export const GameState = {
    SIN_GUERREROS: 'sin_guerrero' as GameStateType,
    BUSCANDO_GUERREROS: 'buscando_guerreros' as GameStateType,
    CON_GUERREROS: 'con_guerrero' as GameStateType,
    SIN_ELECCION_DE_GUERRERO: 'sin_eleccion_de_guerrero' as GameStateType,
    CON_ELECCION_DE_GUERRERO: 'con_eleccion_de_guerrero' as GameStateType,
    ENDED: 'ended' as GameStateType
};

export const CardState = {
    FACE_UP: 'face_up' as CardStateType,
    FACE_DOWN: 'face_down' as CardStateType,
    DISCARDED: 'discarded' as CardStateType,
    PLAYED: 'played' as CardStateType
};

export const PlayerType = {
    HUMAN: 'human' as PlayerTypeType,
    AI: 'ai' as PlayerTypeType,
    SPECTATOR: 'spectator' as PlayerTypeType
};

export const PlayerAction = {
    DRAW: 'draw' as PlayerActionType,
    PLAY: 'play' as PlayerActionType,
    DISCARD: 'discard' as PlayerActionType,
    PASS: 'pass' as PlayerActionType
};

export const GameResult = {
    WIN: 'win' as GameResultType,
    LOSS: 'loss' as GameResultType,
    DRAW: 'draw' as GameResultType
};

// Tipos para el estado del juego
interface Player {
    id: string;
    type: PlayerTypeType;
    hand: string[]; // O el tipo correspondiente de cartas
}

interface GameStoreState {
    currentGameState: GameStateType;
    players: Player[];
    deck: string[]; // O el tipo correspondiente de cartas
    currentTurn: Player | null;
}

// State Store
export const gameStore = writable<GameStoreState>({
    currentGameState: GameState.SIN_GUERREROS,
    players: [],
    deck: [],
    currentTurn: null
});
