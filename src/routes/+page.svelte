<script lang="ts">
	import { WarriorAdapter } from '$lib/adapters/implements/warrior_adapter';
	import { Warrior } from '$lib/domain/entities/warrior';
	import { GameState, gameStore, type GameStateType } from '$lib/store';
	import { GetWarriorsUseCase } from '$lib/usecases/get_warriors';
	import '../app.css';
	import { AddScoreUseCase } from '$lib/usecases/add_score';

	let gameState: GameStateType;
	let warriors: Warrior[];
	let guerreroAelegir: Warrior;
	let puntuacion: number;
	let ultimaPuntuacion: number;
	let alias: string;
	let verRegistroSalaFama = true;
	let registraEnSalonFamaTexto: string = "🏅 REGISTRA TU PUNTUACIÓN EN EL SALÓN DE LA FAMA 🏅";

	gameStore.update((_) => {
		return {
			currentGameState: GameState.SIN_GUERREROS,
			warriors: [],
			guerreroIndicado:Warrior.empty(),
			puntuacion:0,
			puntuacionMaxima:0,
		};
	})

	gameStore.subscribe((value) => {
		gameState = value.currentGameState;
		warriors = value.warriors
		guerreroAelegir = value.guerreroIndicado
		puntuacion = value.puntuacion
		ultimaPuntuacion = value.puntuacionMaxima
	});

	let reiniciar = (): void => {
		gameStore.update((_) => {
			return {
				..._,
				currentGameState: GameState.SIN_GUERREROS
			};
		});
	};

	let jugar = async (): Promise<void> => {
		alias = ''
		verRegistroSalaFama = true;
		gameStore.update((_) => {
			return {
				..._,
				currentGameState: GameState.BUSCANDO_GUERREROS
			};
		});
		let warriors: Warrior[] = [];
		let adaptador = new WarriorAdapter();
		let guerrerosUseCases = new GetWarriorsUseCase(adaptador);
		warriors = await guerrerosUseCases.execute();
		gameStore.update((_) => {
			return {
				..._,
				currentGameState: GameState.CON_GUERREROS,
				warriors: warriors,
				guerreroIndicado: warriors.find((warrior) => warrior.seleccionado) ?? Warrior.empty(),
			};
		});
	};

	let registrarMejorPuntuacion = async (): Promise<void> => {
		
		let res: boolean;
		registraEnSalonFamaTexto = "⌛ REGISTRANDO...⌛";
		let adaptador = new WarriorAdapter();
		let guerrerosUseCases = new AddScoreUseCase(adaptador);
		res = await guerrerosUseCases.execute(alias,ultimaPuntuacion);
		if(res){
			setTimeout(() => {
				verRegistroSalaFama = false;
			},3000)
			registraEnSalonFamaTexto = "🎉 REGISTRO CORRECTO. REVISAR SALON DE LA FAMA 🎉";
			
		}else{
			setTimeout(() => {
				registraEnSalonFamaTexto = "🏅 REGISTRA TU PUNTUACIÓN EN EL SALÓN DE LA FAMA 🏅";				
			},3000)
			registraEnSalonFamaTexto = "❌ ERROR. INTÉNTA DE NUEVO ❌";
			

		}
	};
	
	let volverAjugar = (): void	=> {
		ultimaPuntuacion=0;
		gameStore.update((_) => {
				return {
					..._,
					puntuacionMaxima:0
				};
			});
		jugar();
	}

	let elegirGuerrero = (warrior : Warrior): void => {
		if (warrior == guerreroAelegir){
			ultimaPuntuacion++;
			gameStore.update((_) => {
				return {
					..._,
					puntuacion: puntuacion + 1,
					puntuacionMaxima:puntuacion + 1
				};
			});
			jugar();
		}else{
			
			gameStore.update((_) => {
				return {
					..._,
					puntuacion: 0,
					currentGameState: GameState.ENDED
				};
			});

		}
	}

</script>

<svelte:head>
	<title>Coliseum | Star Wars</title>
</svelte:head>

<div class="game">
	<h1 class="header text-center">
		<h1 class="text-amber-300 mb-3 font-bold italic">... QUE TANTO SABES SOBRE ...</h1>
		<img src="/png/logo.png" width="150" alt="logo" class="m-auto" />
	</h1>
	{#if gameState == GameState.SIN_GUERREROS}
		<button class="coliseum flex items-center justify-center" on:click={jugar}>
			<div class="starwars-pressed-btn">
				<span>Jugar</span>
			</div>
		</button>
	{/if}
	{#if gameState == GameState.BUSCANDO_GUERREROS}
		<button class="coliseum flex items-center justify-center" disabled>
			<div class="starwars-pressed-btn">
				<svg
					class="animate-spin m-auto h-5 w-5 text-white mb-3"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span>Buscando...</span>
			</div> 
		</button>
	{/if}
	{#if gameState == GameState.CON_GUERREROS}
		<div class="coliseum">
			<button class="card-container active" on:click={() => elegirGuerrero(warriors[0])}>
				<div class="card guerreros local">
					<div class="front">
						<img
						src="{warriors[0].imagen}"
						alt="Frente de la carta"
						
						/>
					</div>
					<div class="back">
						<img src="/png/atras.jpg" alt="Reverso de la carta" />
					</div>
				</div>
				<!-- <div class="eleccion eleccion_local">Elegir local</div> -->
			</button>
			<div class="w-1/4 text-center flex flex-col justify-evenly items-center h-1/2">
				<h1 class="text-white w-full text-center mb-3 text-3xl font-bold ">Siendo fan <br> debes conocer a <br> <p class="warrior-picker mt-3 px-3 w-fit bg-yellow-500 text-black rounded-xl text-center font-semibold m-auto p-2"> {guerreroAelegir.nombre}</p> </h1>
				<div class="m-auto w-min text-center">
					<div class="border-2 border-yellow-500 w-min text-center rounded-full m-auto">
						<h1 class="text-white font-bold px-4 py-3 text-4xl text-center">{puntuacion}</h1>
					</div>
					<h1 class="text-white font-bold text-lg text-center mt-2">Puntos seguidos</h1>
				</div>
			</div>
			<button class="card-container active" on:click={() => elegirGuerrero(warriors[1])}>
				<div class="card guerreros visitante">
					<div class="front">
						<img
							src="{warriors[1].imagen}"
							alt="Frente de la carta"
						/>
					</div>
					<div class="back">
						<img src="/png/atras.jpg" alt="Reverso de la carta" />
					</div>
				</div>
				<!-- <div class="eleccion eleccion_visitante">Elegir visitante</div> -->
			</button>
		</div>
	{/if}
	{#if gameState == GameState.ENDED}
	<div class="loser flex flex-col justify-center items-center">
		<h1 class="text-white font-bold text-center mt-2 text-4xl">Perdiste 💀 con {ultimaPuntuacion} puntos</h1>
		<br>
		<video src="/video/{ultimaPuntuacion>=6?'god':ultimaPuntuacion>=4?'good':ultimaPuntuacion>= 2 ?'medio':'noob'}.mp4" width="250"  autoplay loop>
			<track kind="captions" src="noob.vtt" srclang="es" label="Spanish">
				Tu buscador no lo soporta.
		</video>
		<br>
			<h1 class="text-white font-bold text-center mt-2 text-2xl">Medalla: {ultimaPuntuacion>=6?'GOD 🔥':ultimaPuntuacion>=4?'MASTER 😎':ultimaPuntuacion>= 2 ?'MEEH! 😒':'NOOB 🐣'}</h1>
		<br>
		<button class=" flex items-center justify-center" on:click={volverAjugar}>
			<div class="starwars-pressed-btn">
				<span>Inténtalo una vez más</span>
			</div>
		</button>
		<br>
		{#if ultimaPuntuacion>=4 && verRegistroSalaFama}
			<form on:submit|preventDefault={registrarMejorPuntuacion} >
				<button type="submit" class=" flex items-center justify-center" >
					<div class=" bg-yellow-50 transition-colors hover:bg-yellow-500 font-bold text-center mt-2 text-md p-2 rounded-md">
						<span>{registraEnSalonFamaTexto}</span>
					</div>
				</button>
				<input type="text" required bind:value={alias} maxlength="10" minlength="3" placeholder="Ingresa tu alias" class="input input-bordered input-info w-full m-auto mt-2 p-2 outline-none rounded-md">
			</form>
		{/if}

	</div>
	{/if}

	<nav class="floating-menu">
		<ul>
			<li title="Coliseo">
				<div class="flex flex-col items-center justify-center">
					<button on:click={reiniciar}>
						<img src="/png/casco.png" alt="" />
					</button>
				</div>
			</li>
			<li title="Salón de la fama">
				<div class="flex flex-col items-center justify-center">
					<a href="/fama">
						<img src="/png/copa-de-trofeo.png" alt="" />
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
