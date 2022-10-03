import React from "react";
import uuid from "react-uuid";
import MACDIndicator from "./chart external Indicators/MACDIndicator";
import RSIIndicator from "./chart external Indicators/RSIIndicator";
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
		case props.name.startsWith("Relative Strength Index"):
			return (
				// @ts-ignore
				<RSIIndicator
					chartParameters={props.chartParameters}
					positionMultiplier={props.positionMultiplier}
					data={props.data}
					color={props.color}
					period={props.period}
					id={props.id}
					overboughtThreshold={props.overboughtThreshold}
					oversoldThreshold={props.oversoldThreshold}
					indicatorsArray={props.indicatorsArray}
					setIndicatorsArray={props.setIndicatorsArray}
					lineWidth={props.lineWidth}
				/>
			);
		case props.name.startsWith("Moving Average Convergence Divergence"):
			return (
				// @ts-ignore
				<MACDIndicator
					chartParameters={props.chartParameters}
					data={props.data}
					id={props.id}
					fastEMA={props.fastEMA}
					slowEMA={props.slowEMA}
					signalLine={props.signalLine}
					indicatorsArray={props.indicatorsArray}
					setIndicatorsArray={props.setIndicatorsArray}
					positionMultiplier={props.positionMultiplier}
				/>
			);
		default:
			break;
	}
};

export default IndicatorsDb;
