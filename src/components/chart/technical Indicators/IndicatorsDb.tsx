import React from "react";
import EmaIndicator from "./chart internal Indicators/EmaIndicator";
import SmaIndicator from "./chart internal Indicators/SmaIndicator";

//This file will contain all the parameters required for an indicator to render.
//Different Select options from the popup modal will end up providing different Incicator
//components
const IndicatorsDb = (props: Record<string, any>) => {
	switch (true) {
		case props.name.startsWith("Exponential Moving Average"):
			return (
				<EmaIndicator
					data={props.data}
					color={props.color}
					lineWidth={props.lineWidth}
					period={props.period}
					id={props.id}
					positionMultiplier={props.positionMultiplier}
					chartParameters={props.chartParameters}
				/>
			);
		case props.name.startsWith("Simple Moving Average"):
			return (
				<SmaIndicator
					data={props.data}
					color={props.color}
					lineWidth={props.lineWidth}
					period={props.period}
					id={props.id}
					positionMultiplier={props.positionMultiplier}
					chartParameters={props.chartParameters}
				/>
			);
		default:
			break;
	}
};

export default IndicatorsDb;
