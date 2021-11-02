<slot />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');
	* {
		@apply text-prussian;
		padding: 0;
		margin: 0;
	}

	:global(html) {
		background: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fspoonflower%2Fpublic%2Fdesign_thumbnails%2F0424%2F5908%2F1431605648965_shop_thumb.png&f=1&nofb=1") center center;
	}																												
</style>
