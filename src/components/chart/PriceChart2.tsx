import * as React from "react";
import { Chart, ChartCanvas } from "react-financial-charts";
import { XAxis, YAxis } from "react-financial-charts";
import { discontinuousTimeScaleProviderBuilder } from "react-financial-charts";
import { CandlestickSeries } from "react-financial-charts";
import { withDeviceRatio, withSize } from "react-financial-charts";
import { useAppSelector } from "../../app/hooks";
import { candlestickValueType } from "../../types/typesCollection";
import { IOHLCData } from "./iOHLCData";
import { withOHLCData } from "./withOHLCData";

interface ChartProps {
	readonly data: candlestickValueType[];
	readonly height: number;
	readonly width: number;
	readonly ratio: number;
}

const axisStyles = {
	strokeStyle: "#383E55", // Color.GRAY
	strokeWidth: 2,
	tickLabelFill: "#9EAAC7", // Color.LIGHT_GRAY
	tickStrokeStyle: "#383E55",
	gridLinesStrokeStyle: "rgba(56, 62, 85, 0.5)", // Color.GRAY w Opacity
};

const coordinateStyles = {
	fill: "#383E55",
	textFill: "#FFFFFF",
};

const zoomButtonStyles = {
	fill: "#383E55",
	fillOpacity: 0.75,
	strokeWidth: 0,
	textFill: "#9EAAC7",
};

const crossHairStyles = {
	strokeStyle: "#9EAAC7",
};

class BasicCandlestick extends React.Component<ChartProps> {
	private readonly margin = { left: 0, right: 40, top: 0, bottom: 40 };
	private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
		(d: candlestickValueType) => d.datetime
	);

	public render() {
		const { data: initialData, height, ratio, width } = this.props;

		const { data, xScale, xAccessor, displayXAccessor } = this.xScaleProvider(initialData);

		const max = xAccessor(data[data.length - 1]);
		const min = xAccessor(data[Math.max(0, data.length - 100)]);
		const xExtents = [min, max];

		return (
			<ChartCanvas
				height={height}
				ratio={ratio}
				width={width}
				margin={this.margin}
				data={data}
				displayXAccessor={displayXAccessor}
				seriesName="Data"
				xScale={xScale}
				xAccessor={xAccessor}
				xExtents={xExtents}
			>
				<Chart id={1} padding={{ left: 0, right: 40, top: 40, bottom: 40 } as any} yExtents={this.yExtents}>
					<CandlestickSeries />
					<XAxis {...axisStyles} showGridLines />
					<YAxis {...axisStyles} showGridLines />
				</Chart>
			</ChartCanvas>
		);
	}

	private readonly yExtents = (data: candlestickValueType) => {
		return [data.high, data.low];
	};
}

export const Daily = withOHLCData("DAILY")(withSize({ style: { minHeight: 600 } })(withDeviceRatio()(BasicCandlestick)));

// export const Intraday = withSize({ style: { minHeight: 600 } })(withDeviceRatio()(BasicCandlestick));
