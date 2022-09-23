import * as React from "react";
import { Chart } from "react-financial-charts";
import { ChartCanvas } from "react-financial-charts";
import { XAxis, YAxis } from "react-financial-charts";
import { ema } from "react-financial-charts";
import { discontinuousTimeScaleProviderBuilder } from "react-financial-charts";
import { LineSeries } from "react-financial-charts";
import { MovingAverageTooltip } from "react-financial-charts";
import { IOHLCData } from "../iOHLCData";
import { withDeviceRatio, withSize } from "react-financial-charts";
import { candlestickValueType } from "../../../types/typesCollection";

interface ChartProps {
	readonly data: candlestickValueType[];
	readonly height: number;
	readonly width: number;
	readonly ratio: number;
}

class EMAIndicator extends React.Component<ChartProps> {
	private readonly margin = { left: 0, right: 40, top: 8, bottom: 24 };
	private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: IOHLCData) => d.datetime);

	public render() {
		const { data: initialData, height, ratio, width } = this.props;

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

		const calculatedData = ema26(ema12(initialData));

		const { data, xScale, xAccessor, displayXAccessor } = this.xScaleProvider(calculatedData);

		const max = xAccessor(data[data.length - 1]);
		const min = xAccessor(data[Math.max(0, data.length - 100)]);
		const xExtents = [min, max];

		return <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />;
	}
}

export default EMAIndicator;
