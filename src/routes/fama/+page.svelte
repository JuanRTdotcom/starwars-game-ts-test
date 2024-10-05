<script lang="ts">
	import type { Profile } from '$lib/domain/entities/profile';
    import '../../app.css';
    export let data;

    let personas: Profile[] = data.ranking;

</script>
<svelte:head>
	<title>Salón de la fama | Star Wars</title>
</svelte:head>
<div class="game">
    <h1 class="header text-center">
		<h1 class="text-amber-300 mb-3 font-bold italic">SALÓN DE LA FAMA DE</h1>
		<img src="/png/logo.png" width="150" alt="logo" class="m-auto" />
	</h1>
    <div class="premios flex items-center justify-center gap-20">
        <div class=" text-center flex flex-col justify-evenly items-center h-auto rounded-xl mt-auto">
            <div>
                <img src="/png/copa-de-bronce.png" alt="" />
            </div>
            <div class="bg-amber-600 w-32 h-16 rounded-xl mb-3 font-bold uppercase text-2xl p-2">
                {personas[2].puntuacion}
            </div>
            <p class="text-white font-lg italic">
                {personas[2].nombreUsuario}

            </p>
        </div>
        <div class=" text-center flex flex-col justify-evenly items-center h-auto rounded-xl mt-auto">
            <div>
                <img src="/png/copa-oro.png" alt="" />
            </div>
            <div class="bg-amber-300 w-32 h-64 rounded-xl mb-3 font-bold uppercase text-2xl p-2">
                {personas[0].puntuacion}
            </div>
            <p class="text-white font-lg italic">
                {personas[0].nombreUsuario}

            </p>
        </div>
        <div class=" text-center flex flex-col justify-evenly items-center h-auto rounded-xl mt-auto">
            <div>
                <img src="/png/copa-plata.png" alt="" />
            </div>
            <div class="bg-slate-300 w-32 h-40 rounded-xl mb-3 font-bold uppercase text-2xl p-2">
                {personas[1].puntuacion}
            </div>
            <p class="text-white font-lg italic">
                {personas[1].nombreUsuario}

            </p>
        </div> 
    </div>
    <nav class="floating-menu">
		<ul>
			<li title="Coliseo">
				<div class="flex flex-col items-center justify-center">
					<a href="/">
						<img src="/png/casco.png" alt="" />
					</a>
				</div>
			</li>
			<li title="Salón de la fama">
				<div class="flex flex-col items-center justify-center">
					<a href="/fama">
						<img src="/png/copa-de-trofeo.png" alt="" />
					</a>
				</div>
			</li>
		</ul>
	</nav>
</div>