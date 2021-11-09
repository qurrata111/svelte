const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontSize: {
				'xs': '12px',
				'sm': '14px',
				'md': '16px',
				'lg': '18px',
				'xl': '20px',
				'2xl': '24px',
				'3xl': '30px',
				'4xl': '36px',
				'5xl': '48px',
				'6xl': '60px',
				'7xl': '70px',
			},
		}
	},

	plugins: []
};

module.exports = config;
