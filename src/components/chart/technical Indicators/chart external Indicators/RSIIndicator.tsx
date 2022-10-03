import * as React from "react";
import { Chart, ChartCanvas } from "react-financial-charts";
import { XAxis, YAxis } from "react-financial-charts";
import { rsi } from "react-financial-charts";
import { discontinuousTimeScaleProviderBuilder } from "react-financial-charts";
import { RSISeries } from "react-financial-charts";
import { RSITooltip } from "react-financial-charts";
import { withDeviceRatio, withSize } from "react-financial-charts";
import { RSIIndicatorTypes } from "../../../../types/typesCollection";
import uuid from "react-uuid";
import datasetSlice from "../../../../features/datasetSlice";
import { format } from "d3-format";

// interface ChartProps {
// 	readonly data: IOHLCData[];
// 	readonly height: number;
// 	readonly width: number;
// 	readonly ratio: number;
// }

const axisStyles = {
	strokeStyle: "#383E55", // Color.GRAY
	strokeWidth: 1,
	tickLabelFill: "#9EAAC7", // Color.LIGHT_GRAY
	tickStrokeStyle: "#383E55",
	gridLinesStrokeStyle: "rgba(56, 62, 85, 0.5)", // Color.GRAY w Opacity
};

class RSIIndicator extends React.Component<RSIIndicatorTypes> {
	constructor(props) {
		super(props);
		if (typeof this.props.indicatorsArray[this.props.positionMultiplier].yAccessor === typeof []) {
			const newel = [...this.props.indicatorsArray];
			console.log(newel);
			newel[this.props.positionMultiplier].yAccessor = this.rsiCalculator.accessor();
			this.props.setIndicatorsArray(newel);
		}
	}
	private readonly margin = { left: 0, right: 0, top: 0, bottom: 0 };
	// private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: IOHLCData) => d.date);
	private pricesDisplayFormat = format(".1f");
	private rsiCalculator = rsi()
		.options({ windowSize: this.props.period })
		.merge((d: any, c: any) => {
			d[`RSI_${this.props.period}`] = c;
		})
		.accessor((d: any) => d[`RSI_${this.props.period}`]);

	public render() {
		// const { height, ratio, width } = this.props;
		const { id } = this.props;

		const { data: initialData, xScale, xAccessor } = this.props.chartParameters;
		const calculatedData = this.rsiCalculator(initialData);

		// const max = xAccessor(data[data.length - 1]);
		// const min = xAccessor(data[Math.max(0, data.length - 100)]);
		// const xExtents = [min, max];

		const yAccessor = this.rsiCalculator.accessor();

		return (
			// @ts-ignore

			<>
				<YAxis
					{...axisStyles}
					tickValues={[0, this.props.oversoldThreshold, 50, this.props.overboughtThreshold, 100]}
					showTickLabel={true}
				/>
				<XAxis {...axisStyles} showGridLines showTicks={false} showTickLabel={false} />
				<RSISeries
					overBought={this.props.overboughtThreshold}
					overSold={this.props.oversoldThreshold}
					strokeStyle={{
						line: "#FFFFFF",
						top: "#FFFFFF",
						middle: "#FFFFFF",
						bottom: "#FFFFFF",
						outsideThreshold: this.props.color,
						insideThreshold: this.props.color,
					}}
					strokeWidth={{
						outsideThreshold: this.props.lineWidth,
						insideThreshold: this.props.lineWidth,
						top: 1,
						middle: 1,
						bottom: 1,
					}}
					yAccessor={yAccessor}
				/>

				<RSITooltip
					origin={[8, 0]}
					yAccessor={yAccessor}
					labelFill="#FFFFFF"
					textFill="#FFFFFF"
					options={this.rsiCalculator.options()}
				/>
			</>
		);
	}
}

export default RSIIndicator;
