//This file will contain all the parameters required for an indicator to render.
//Different Default parameters depending on the indicator's Name.
const IndicatorsInitialValuesDb = (props: Record<string, any>) => {
	switch (true) {
		case props.name.startsWith("Exponential Moving Average"):
			return {
				name: props.name,
				indicatorType: props.indicatorType,
				color: "#FFFFFF",
				period: 26,
				lineWidth: 2,
				chartParameters: props.chartParameters,
				positionMultiplier: props.positionMultiplier,
			};
		case props.name.startsWith("Simple Moving Average"):
			return {
				name: props.name,
				indicatorType: props.indicatorType,
				color: "#FFFFFF",
				period: 26,
				lineWidth: 2,
				chartParameters: props.chartParameters,
				positionMultiplier: props.positionMultiplier,
			};
		case props.name.startsWith("Relative Strength Index"):
			return {
				name: props.name,
				indicatorType: props.indicatorType,
				color: "#FFFFFF",
				period: 26,
				lineWidth: 2,
				overboughtThreshold: 70,
				oversoldThreshold: 30,
				chartParameters: props.chartParameters,
				positionMultiplier: props.positionMultiplier,
			};
		default:
			return { name: "" };
	}
};

export default IndicatorsInitialValuesDb;
