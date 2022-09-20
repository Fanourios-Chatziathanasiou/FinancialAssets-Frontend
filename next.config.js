const withTM = require("next-transpile-modules")([
	"d3-array",
	"d3-format",
	"d3-time",
	"d3-time-format",
	"react-financial-charts",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
};

module.exports = withTM(nextConfig);
