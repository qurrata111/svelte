<script context="module">
</script>

<script>
	import axios from 'axios';
	import variables from '$lib/variables';
	import { format } from 'date-fns';

	let loading = false;

	// default date
	let today = new Date();
	today.setDate(today.getDate() - 1);
	let date = format(today, 'yyyy-MM-dd');

	let result;

	// request
	const handleRequest = async () => {
		loading = true;
		try {
			const resp = await axios
				.get(`${variables.VITE_APOD_API}`, {
					params: {
						api_key: variables.VITE_APOD_API_KEY,
						date: date
					}
				})
				.then((response) => {
					if (response.status == '200') {
						result = response.data;
					}
				})
				.then((error) => {
					console.log(error);
				});
		} catch (error) {}
		loading = false;
	};

	handleRequest();
</script>

<svelte:head>
	<title>NASA Picture of the Day - qurrata111</title>
</svelte:head>
<div class="flex flex-col">
	<div class="p-4">
		<div class="flex flex-col justify-center items-center">
			<div class="p-4 text-center">
				<div class="p-8">
					<div class="text-2xl">Astronomy Picture of the Day</div>
					<div class="text-sm">
						Credit to: <a class="font-bold underline" href="https://api.nasa.gov/" target="blank"
							>NASA APIs</a
						>
					</div>
				</div>
				<div class="p-2">
					<div class="p-1">Masukkan tanggal</div>
					<input class="border rounded py-1 px-2 shadow-sm" type="date" bind:value={date} max={format(new Date(), "yyyy-MM-dd")} />
					<span class="items-center" >
						<button on:click={handleRequest} class="p-2 items-center bg-gray-100 rounded shadow-sm hover:bg-gray-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-search-heart-fill"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M9.318 12.359A6.474 6.474 0 0 1 6.5 13 6.496 6.496 0 0 1 0 6.5a6.5 6.5 0 1 1 11.742 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002a6.5 6.5 0 0 1-1.027.617ZM6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"
								/>
							</svg>
						</button>
					</span>
				</div>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 pb-4 flex justify-center">
		<div class="p-2 flex justify-center text-center">
			{#if loading}
				<button class="flex justify-center text-center p-2" type="button" disabled>
					<svg class="animate-spin bg-gray-500 h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
					</svg>
				</button>
			{:else if result.media_type === 'image'}
				<img
					class="border rounded shadow"
					src={result.hdurl ? result.hdurl : result.url}
					alt={result.title}
				/>
			{:else if result.media_type === 'video'}
				<a class="underline" href={result.url} target="blank">{result.url}</a>
			{/if}
		</div>
		{#if loading}
			<button class="flex justify-center text-center p-2" type="button" disabled>
				<svg class="animate-spin bg-gray-500 h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
				</svg>
			</button>
		{:else}
			<div class="p-2">
				<div class="py-1 pb-2">
					<div class="text-center text-xl font-bold">{result.title ? result.title : ''}</div>
					<div class="text-center text-sm">
						{result.date ? format(new Date(result.date), 'dd MMMM yyyy') : ''}
					</div>
				</div>
				<div class="text-justify">{result.explanation ? result.explanation : ''}</div>
			</div>
		{/if}
	</div>
</div>
