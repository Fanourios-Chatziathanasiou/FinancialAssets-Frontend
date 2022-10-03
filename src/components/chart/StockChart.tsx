import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import * as React from "react";
import {
	Chart,
	ChartCanvas,
	BarSeries,
	CandlestickSeries,
	OHLCTooltip,
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
import uuid from "react-uuid";
import { candlestickValueType } from "../../types/typesCollection";
import IndicatorsDb from "../chart/technical Indicators/IndicatorsDb";

//yExtents => what values does this chart get

interface StockChartProps {
	// data: candlestickValueType[];
	height: number;
	dateTimeFormat?: string;
	width: number;
	ratio: number;
	chartParameters: any;
	indicatorsArray: any[];
	setIndicatorsArray: any;
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

class StockChart extends React.Component<StockChartProps> {
	private margin = { left: 0, right: 58, top: 20, bottom: 20 };
	private pricesDisplayFormat = format(".3f");
	// private xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
	// 	(d: candlestickValueType) => d.datetime
	// );
	// constructor(props) {
	// 	super(props);
	// }

	public render() {
		let externalIndicatorsCount = 0;
		let internalIndicatorsCount = 0;
		this.props.indicatorsArray.forEach((indicator, index) => {
			indicator.indicatorType === "externalIndicator" ? externalIndicatorsCount++ : "";
		});
		//React-Financial-Charts defaults
		const { height, ratio, width } = this.props;
		const dateTimeFormat = "%Y-%m-%d";
		const { margin } = this;
		const { data, xScale, xAccessor, displayXAccessor } = this.props.chartParameters;
		const max = xAccessor(data[data.length - 1]);
		const min = xAccessor(data[Math.max(0, data.length - 100)]);
		const xExtents = [min, max + 5];
		const gridHeight = height - margin.top - margin.bottom;
		const barChartHeight = gridHeight / 9;
		const barChartOrigin = (_: number, h: number) => [0, chartHeight - barChartHeight];
		const chartHeight = gridHeight - externalIndicatorsCount * 130 - 30 * externalIndicatorsCount;
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
					{this.props.indicatorsArray.map((ChartInternalIndicator: any, index: number) => {
						return ChartInternalIndicator.indicatorType === "internalIndicator" ? (
							<React.Fragment key={uuid()}>
								{IndicatorsDb({ ...ChartInternalIndicator, positionMultiplier: index })}
							</React.Fragment>
						) : null;
					})}
					<CandlestickSeries />

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

					<OHLCTooltip labelFill={"#FFFFFF"} fontSize={15} textFill={this.textFill} origin={[8, 16]} />
				</Chart>

				{this.props.indicatorsArray.map((ChartInternalIndicator: any, index: number) => {
					return ChartInternalIndicator.indicatorType === "externalIndicator" ? (
						// @ts-ignore
						<Chart
							id={uuid()}
							key={uuid()}
							origin={[
								0,
								chartHeight + 30 + 30 * (index - internalIndicatorsCount) + (index - internalIndicatorsCount) * 130,
							]}
							height={130}
							yExtents={this.props.indicatorsArray[index].yAccessor}
						>
							{IndicatorsDb({
								...ChartInternalIndicator,
								positionMultiplier: index,
								chartHeight: chartHeight,
								setIndicatorsArray: this.props.setIndicatorsArray,
								indicatorsArray: this.props.indicatorsArray,
							})}
						</Chart>
					) : (
						internalIndicatorsCount++
					);
				})}
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

export default withSize({ style: { minHeight: "80vh" } })(withDeviceRatio()(StockChart));

// export const MinutesStockChart = withOHLCData("MINUTES")(
// 	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
// );

// export const SecondsStockChart = withOHLCData("SECONDS")(
// 	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
// );
