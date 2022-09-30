import * as React from "react";
import { XAxis, YAxis } from "react-financial-charts";
import { macd } from "react-financial-charts";
import { MACDSeries } from "react-financial-charts";
import { MACDTooltip } from "react-financial-charts";

import { candlestickValueType, MACDIndicatorTypes } from "../../../../types/typesCollection";

interface ChartProps {
	readonly data: candlestickValueType[];
	readonly height: number;
	readonly width: number;
	readonly ratio: number;
}

class MACDIndicator extends React.Component<MACDIndicatorTypes> {
	private readonly macdAppearance = {
		fillStyle: {
			divergence: "#4682B4",
		},
		strokeStyle: {
			macd: "#0093FF",
			signal: "#D84315",
			zero: "rgba(0, 0, 0, 0.3)",
		},
	};
	private readonly margin = { left: 0, right: 40, top: 0, bottom: 24 };
	// private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: IOHLCData) => d.date);

	private readonly macdCalculator = macd()
		.options({
			fast: this.props.fastEMA,
			signal: this.props.signalLine,
			slow: this.props.slowEMA,
		})
		.merge((d: any, c: any) => {
			d.macd = c;
		})
		.accessor((d: any) => d.macd);

	public render() {
		const { data: initialData, xScale, xAccessor, displayXAccessor } = this.props.chartParameters;
		const calculatedData = this.macdCalculator(initialData);
		// const max = xAccessor(data[data.length - 1]);
		// const min = xAccessor(data[Math.max(0, data.length - 100)]);
		// const xExtents = [min, max];

		const yAccessor = this.macdCalculator.accessor();
		const options = this.macdCalculator.options();

		return (
			<>
				<XAxis />
				<YAxis />

				<MACDSeries yAccessor={yAccessor} {...this.macdAppearance} />

				<MACDTooltip origin={[8, 16]} appearance={this.macdAppearance} options={options} yAccessor={yAccessor} />
			</>
		);
	}
}

export default MACDIndicator;
