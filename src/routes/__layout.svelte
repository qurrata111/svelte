<style global lang="postcss">
	@tailwind base;
    @tailwind components;
    @tailwind utilities;

    :global(h1.ce-header) {
        @apply text-2xl font-extrabold;
    }

    :global(h2.ce-header) {
        @apply text-xl font-bold;
    }

    :global(h3.ce-header) {
        @apply text-lg font-semibold;
    }

    :global(h4.ce-header) {
        @apply text-md font-medium;
    }

    :global(h5.ce-header) {
        @apply text-sm font-medium;
    }

    :global(h6.ce-header) {
        @apply text-xs font-medium;
    }

</style>

<slot />
