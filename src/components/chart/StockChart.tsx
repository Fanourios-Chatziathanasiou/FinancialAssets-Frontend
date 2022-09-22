import { format } from "d3-format";
import { timeFormat, timeParse } from "d3-time-format";
import * as React from "react";
import {
	elderRay,
	ema,
	discontinuousTimeScaleProviderBuilder,
	Chart,
	ChartCanvas,
	CurrentCoordinate,
	BarSeries,
	CandlestickSeries,
	ElderRaySeries,
	LineSeries,
	MovingAverageTooltip,
	OHLCTooltip,
	SingleValueTooltip,
	lastVisibleItemBasedZoomAnchor,
	XAxis,
	YAxis,
	CrossHairCursor,
	EdgeIndicator,
	MouseCoordinateX,
	MouseCoordinateY,
	ZoomButtons,
	withDeviceRatio,
	withSize,
} from "react-financial-charts";
import { candlestickValueType } from "../../types/typesCollection";
import { IOHLCData } from "./iOHLCData";
import { withOHLCData } from "./withOHLCData";

interface StockChartProps {
	readonly data: candlestickValueType[];
	readonly height: number;
	readonly dateTimeFormat?: string;
	readonly width: number;
	readonly ratio: number;
}

const axisStyles = {
	strokeStyle: "#383E55", // Color.GRAY
	strokeWidth: 1,
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
// const parseDate = timeParse("%Y-%m-%d");

// const parseData = () => (d: candlestickValueType) => {
// 	const date = parseDate(d.datetime);
// 	date ? (d.datetime = new Date(date)) : (d.datetime = new Date(Number(d.datetime)));

// 	for (const key in d) {
// 		if (key !== "datetime" && Object.prototype.hasOwnProperty.call(d, key)) {
// 			d[key] = +d[key];
// 		}
// 	}

// 	return d;
// };

class StockChart extends React.Component<StockChartProps> {
	private readonly margin = { left: 0, right: 58, top: 20, bottom: 24 };
	private readonly pricesDisplayFormat = format(".3f");
	private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
		(d: candlestickValueType) => d.datetime
	);

	public render() {
		const { data: initialData, dateTimeFormat = "%Y-%m-%d", height, ratio, width } = this.props;

		const ema12 = ema()
			.id(1)
			.options({ windowSize: 12 })
			.merge((d: any, c: any) => {
				d.ema12 = c;
			})
			.accessor((d: any) => d.ema12);

		const ema26 = ema()
			.id(2)
			.options({ windowSize: 26 })
			.merge((d: any, c: any) => {
				d.ema26 = c;
			})
			.accessor((d: any) => d.ema26);

		const elder = elderRay();

		const calculatedData = elder(ema26(ema12(initialData)));

		const { margin, xScaleProvider } = this;

		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

		const max = xAccessor(data[data.length - 1]);
		const min = xAccessor(data[Math.max(0, data.length - 100)]);
		const xExtents = [min, max + 5];

		const gridHeight = height - margin.top - margin.bottom;

		const elderRayHeight = 100;
		const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
		const barChartHeight = gridHeight / 9;
		const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight - elderRayHeight - 20];
		const chartHeight = gridHeight - elderRayHeight - 20;

		const timeDisplayFormat = timeFormat(dateTimeFormat);

		return (
			<ChartCanvas
				height={height}
				ratio={ratio}
				width={width}
				margin={margin}
				data={data}
				displayXAccessor={displayXAccessor}
				seriesName="Data"
				xScale={xScale}
				xAccessor={xAccessor}
				xExtents={xExtents}
				zoomAnchor={lastVisibleItemBasedZoomAnchor}
			>
				{/* @ts-ignore */}
				<Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={this.barChartExtents}>
					<BarSeries fillStyle={this.volumeColor} yAccessor={this.volumeSeries} />
				</Chart>
				{/* @ts-ignore */}
				<Chart id={3} height={chartHeight} yExtents={this.candleChartExtents} padding={{ top: 20, bottom: 70 }}>
					<XAxis {...axisStyles} showGridLines showTicks={true} showTickLabel={true} />
					<YAxis {...axisStyles} showGridLines tickFormat={this.pricesDisplayFormat} />
					<CandlestickSeries />
					<LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
					<CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
					<LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
					<CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
					<MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} {...coordinateStyles} />
					<MouseCoordinateX displayFormat={timeDisplayFormat} {...coordinateStyles} />
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right}
						fill={this.openCloseColor}
						lineStroke={this.openCloseColor}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={this.yEdgeIndicator}
					/>
					<MovingAverageTooltip
						origin={[8, 24]}
						textFill={"#FFFFFF"}
						options={[
							{
								yAccessor: ema26.accessor(),
								type: "EMA",
								stroke: ema26.stroke(),
								windowSize: ema26.options().windowSize,
							},
							{
								yAccessor: ema12.accessor(),
								type: "EMA",
								stroke: ema12.stroke(),
								windowSize: ema12.options().windowSize,
							},
						]}
					/>

					<OHLCTooltip labelFill={coordinateStyles.fill} fontSize={15} textFill={this.textFill} origin={[8, 16]} />
				</Chart>
				{/* @ts-ignore */}
				<Chart
					id={4}
					height={elderRayHeight}
					yExtents={[0, elder.accessor()]}
					origin={elderRayOrigin}
					padding={{ top: 8, bottom: 8 }}
				>
					<XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
					<YAxis ticks={4} tickFormat={this.pricesDisplayFormat} />

					{/* <MouseCoordinateX displayFormat={timeDisplayFormat} /> */}
					<MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />

					<ElderRaySeries yAccessor={elder.accessor()} />

					<SingleValueTooltip
						yAccessor={elder.accessor()}
						yLabel="Elder Ray"
						yDisplayFormat={(d: any) => `${this.pricesDisplayFormat(d.bullPower)}, ${this.pricesDisplayFormat(d.bearPower)}`}
						origin={[8, 16]}
					/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}

	private readonly barChartExtents = (data: candlestickValueType) => {
		return Number(data.volume);
	};

	private readonly candleChartExtents = (data: candlestickValueType) => {
		return [Number(data.high), Number(data.low)];
	};

	private readonly yEdgeIndicator = (data: candlestickValueType) => {
		return Number(data.close);
	};

	private readonly volumeColor = (data: candlestickValueType) => {
		return Number(data.close) > Number(data.open) ? "rgba(38, 166, 154, 0.3)" : "rgba(239, 83, 80, 0.3)";
	};

	private readonly volumeSeries = (data: candlestickValueType) => {
		return Number(data.volume);
	};

	private readonly openCloseColor = (data: candlestickValueType) => {
		return Number(data.close) > Number(data.open) ? "#26a69a" : "#ef5350";
	};
	private readonly textFill = (data: candlestickValueType) => {
		return Number(data.close) > Number(data.open) ? "#26a69a" : "#ef5350";
	};
}

export default withSize({ style: { minHeight: "90vmin" } })(withDeviceRatio()(StockChart));

// export const MinutesStockChart = withOHLCData("MINUTES")(
// 	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
// );

// export const SecondsStockChart = withOHLCData("SECONDS")(
// 	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
// );
