<script lang="ts">
	import { GameState, gameStore, type GameStateType } from '$lib/store';
	import '../app.css';

	let gameState: GameStateType;
	gameState = GameState.SIN_GUERREROS;

	gameStore.subscribe((value) => {
		gameState = value.currentGameState;
	});

	let reiniciar = (): void => {
		gameStore.update((_) => {
			return {
				..._,
				currentGameState: GameState.SIN_GUERREROS
			};
		});
	};

	let traerGuerreros = (): void => {
		gameStore.update((_) => {
			return {
				..._,
				currentGameState: GameState.BUSCANDO_GUERREROS
			};
		});
		setTimeout(() => {
			gameStore.update((_) => {
				return {
					..._,
					currentGameState: GameState.CON_GUERREROS
				};
			});
		}, 1000);
	};
</script>

<svelte:head>
	<title>Coliseum | Star Wars</title>
</svelte:head>

<div class="game">
	<h1 class="header text-center">
		<img src="/png/logo.png" width="150" alt="logo" class="m-auto" />
	</h1>
	{#if gameState == GameState.SIN_GUERREROS}
		<button class="coliseum flex items-center justify-center" on:click={traerGuerreros}>
			<div class="starwars-pressed-btn">
				<span>Buscar combatientes</span>
			</div>
		</button>
	{/if}
	{#if gameState == GameState.BUSCANDO_GUERREROS}
		<button class="coliseum flex items-center justify-center" disabled>
			<div class="starwars-pressed-btn">
				<svg
					class="animate-spin m-auto h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<br />
				<span>Buscando...</span>
			</div>
		</button>
	{/if}
	{#if gameState == GameState.CON_GUERREROS}
		<div class="coliseum">
			<div class="card-container">
				<div class="card guerreros local">
					<div class="front">
						<img
							src="https://starwars-visualguide.com/assets/img/characters/4.jpg"
							alt="Frente de la carta"
						/>
					</div>
					<div class="back">
						<img src="/png/atras.jpg" alt="Reverso de la carta" />
					</div>
				</div>
				<div class="eleccion eleccion_local">Elegir local</div>
			</div>
			<div class="card-container">
				<div class="card guerreros visitante">
					<div class="front">
						<img
							src="https://starwars-visualguide.com/assets/img/characters/8.jpg"
							alt="Frente de la carta"
						/>
					</div>
					<div class="back">
						<img src="/png/atras.jpg" alt="Reverso de la carta" />
					</div>
				</div>
				<div class="eleccion eleccion_visitante">Elegir visitante</div>
			</div>
		</div>
	{/if}

	<nav class="floating-menu">
		<ul>
			<li title="Coliseo">
				<div class="flex flex-col items-center justify-center">
					<a href="/">
						<img src="/png/casco.png" alt="" />
					</a>
				</div>
			</li>
			<li title="Perfil">
				<div class="flex flex-col items-center justify-center">
					<a href="/perfil">
						<img src="/png/usuario.png" alt="" />
					</a>
				</div>
			</li>
			<li title="Reiniciar">
				<div class="flex flex-col items-center justify-center">
					<button on:click={reiniciar}>
						<img src="/png/reiniciar.png" alt="" />
					</button>
				</div>
			</li>
		</ul>
	</nav>
</div>
