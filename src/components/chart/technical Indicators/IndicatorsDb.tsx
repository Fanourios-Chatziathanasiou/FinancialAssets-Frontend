import React from "react";
import uuid from "react-uuid";
import EmaIndicator from "./chart internal Indicators/EmaIndicator";

//This file will contain all the parameters required for an indicator to render.
//Different Select options from the popup modal will end up providing different Incicator
//components
const IndicatorsDb = (props: Record<string, any>) => {
	switch (props.name) {
		case "EMA":
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
		default:
			break;
	}
};

export default IndicatorsDb;
