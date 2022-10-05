import uuid from "react-uuid";

//This file will contain all the parameters required for an indicator to render.
//Different Select options from the popup modal will end up providing different Incicator
//components
const indicatorsModalGeneratedComponentDb = (props: Record<string, any>): Record<string, any> => {
	switch (true) {
		case props.name.startsWith("Exponential Moving Average"):
			return {
				name: `${props.name} - ${props.period}`,
				indicatorName: props.name,
				indicatorType: props.indicatorType,
				color: props.color,
				period: props.period,
				lineWidth: props.lineWidth,
				chartParameters: props.chartParameters,
				positionMultiplier: props.positionMultiplier,
				id: uuid(),
			};
		case props.name.startsWith("Simple Moving Average"):
			return {
				name: `${props.name} - ${props.period}`,
				indicatorName: props.name,
				indicatorType: props.indicatorType,
				color: props.color,
				period: props.period,
				lineWidth: props.lineWidth,
				chartParameters: props.chartParameters,
				positionMultiplier: props.positionMultiplier,
				id: uuid(),
			};
		case props.name.startsWith("Relative Strength Index"):
			return {
				name: `${props.name} - ${props.period}`,
				indicatorName: props.name,
				indicatorType: props.indicatorType,
				color: props.color,
				period: props.period,
				lineWidth: props.lineWidth,
				chartParameters: props.chartParameters,
				positionMultiplier: props.positionMultiplier,
				overboughtThreshold: props.overboughtThreshold,
				oversoldThreshold: props.oversoldThreshold,
				id: uuid(),
			};
		case props.name.startsWith("Moving Average Convergence Divergence"):
			return {
				name: `${props.name} - ${props.fastEMA} - ${props.slowEMA} - ${props.signalLine} `,
				indicatorName: props.name,
				indicatorType: props.indicatorType,
				fastEMA: props.fastEMA,
				slowEMA: props.slowEMA,
				signalLine: props.signalLine,
				chartParameters: props.chartParameters,
				positionMultiplier: props.positionMultiplier,
				id: uuid(),
			};
		default:
			return {};
	}
};

export default indicatorsModalGeneratedComponentDb;
