/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/**/*.{js,ts,jsx,tsx}",
		"./Layout/*.{js,ts,tsx,jsx}",
		"./pages/**/*.{ts,tsx}",
		"./public/**/*.html",
		"./src/**/*.html",
		"./node_modules/flowbite/**/*.js",
		"./node_modules/flowbite/**/*.ts",
		"./node_modules/flowbite/**/*.tsx",
	],

	theme: {
		// Palette 17
		colors: {
			// Primary
			"FA-Primary-purple-050": "#EAE2F8",
			"FA-Primary-purple-100": "#CFBCF2",
			"FA-Primary-purple-200": "#A081D9",
			"FA-Primary-purple-300": "#8662C7",
			"FA-Primary-purple-400": "#724BB7",
			"FA-Primary-purple-500": "#653CAD",
			"FA-Primary-purple-600": "#51279B",
			"FA-Primary-purple-700": "#421987",
			"FA-Primary-purple-800": "#34126F",
			"FA-Primary-purple-900": "#240754",

			"FA-Primary-red-vivid-050": "#FFE3E3",
			"FA-Primary-red-vivid-100": "#FFBDBD",
			"FA-Primary-red-vivid-200": "#FF9B9B",
			"FA-Primary-red-vivid-300": "#F86A6A",
			"FA-Primary-red-vivid-400": "#EF4E4E",
			"FA-Primary-red-vivid-500": "#E12D39",
			"FA-Primary-red-vivid-600": "#CF1124",
			"FA-Primary-red-vivid-700": "#AB091E",
			"FA-Primary-red-vivid-800": "#8A041A",
			"FA-Primary-red-vivid-900": "#610316",

			// Neutrals
			"FA-Primary-blue-grey-050": "#F0F4F8",
			"FA-Primary-blue-grey-100": "#D9E2EC",
			"FA-Primary-blue-grey-200": "#BCCCDC",
			"FA-Primary-blue-grey-300": "#9FB3C8",
			"FA-Primary-blue-grey-400": "#829AB1",
			"FA-Primary-blue-grey-500": "#627D98",
			"FA-Primary-blue-grey-600": "#486581",
			"FA-Primary-blue-grey-700": "#334E68",
			"FA-Primary-blue-grey-800": "#243B53",
			"FA-Primary-blue-grey-900": "#102A43",

			// Supporting
			"FA-Primary-teal-vivid-050": "#F0FCF9",
			"FA-Primary-teal-vivid-100": "#C6F7E9",
			"FA-Primary-teal-vivid-200": "#8EEDD1",
			"FA-Primary-teal-vivid-300": "#5FE3C0",
			"FA-Primary-teal-vivid-400": "#2DCCA7",
			"FA-Primary-teal-vivid-500": "#17B897",
			"FA-Primary-teal-vivid-600": "#079A82",
			"FA-Primary-teal-vivid-700": "#048271",
			"FA-Primary-teal-vivid-800": "#016457",
			"FA-Primary-teal-vivid-900": "#004440",

			"FA-Primary-yellow-vivid-050": "#FFFBEA",
			"FA-Primary-yellow-vivid-100": "#FFF3C4",
			"FA-Primary-yellow-vivid-200": "#FCE588",
			"FA-Primary-yellow-vivid-300": "#FADB5F",
			"FA-Primary-yellow-vivid-400": "#F7C948",
			"FA-Primary-yellow-vivid-500": "#F0B429",
			"FA-Primary-yellow-vivid-600": "#DE911D",
			"FA-Primary-yellow-vivid-700": "#CB6E17",
			"FA-Primary-yellow-vivid-800": "#B44D12",
			"FA-Primary-yellow-vivid-900": "#8D2B0B",
		},
		fontSize: {
			tiny: "1.2rem",
			xs: "1.6rem",
			sm: "1.8rem",
			base: "2.2rem",
			lg: "3rem",
			xl: "4rem",
			"2xl": "6rem",
		},
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
			mobile: { max: `768px` },
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			gridTemplateColumns: {
				"auto-fit": "repeat(auto-fill, minmax(250px, 1fr))",
			},
			backgroundImage: {
				"split-white-black": "linear-gradient(to bottom, #C6F7E9 60% , white 40%)",
			},
			boxShadow: {
				customwhite: "rgba(0, 0, 0, 0.6) 0px 3px 5px 2px, rgba(0, 0, 0, 0.35) 0px 3px 5px 1px",
			},
		},
	},
	plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
